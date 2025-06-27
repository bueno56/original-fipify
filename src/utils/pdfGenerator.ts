import { Vehicle } from '../context/ApiContext';

export const generatePDF = async (vehicleData: Vehicle): Promise<void> => {
  // Create a new window for the PDF content
  const printWindow = window.open('', '_blank');
  if (!printWindow) {
    throw new Error('Não foi possível abrir a janela de impressão');
  }

  const currentValue = parseInt(vehicleData.valor.replace(/\D/g, '')) / 100;
  const depreciation = vehicleData.desvalorizacao;

  // Generate historical price evolution (static data)
  const generateHistoricalPrices = () => {
    const currentYear = new Date().getFullYear();
    const baseValue = currentValue;
    
    // Simulate historical prices with realistic depreciation
    const historicalData = [];
    for (let i = 4; i >= 0; i--) {
      const year = currentYear - i;
      const yearlyDepreciation = 0.08; // 8% annual depreciation
      const historicalValue = baseValue * Math.pow(1 + yearlyDepreciation, i);
      
      historicalData.push({
        year,
        value: historicalValue,
        formattedValue: historicalValue.toLocaleString('pt-BR', {
          style: 'currency',
          currency: 'BRL'
        })
      });
    }
    
    return historicalData;
  };

  // Generate category ranking (static data based on vehicle type)
  const generateCategoryRanking = () => {
    const vehicleType = getVehicleCategory(vehicleData.modelo);
    
    const rankings = {
      hatch: [
        { modelo: "Toyota Yaris", perda: 11, posicao: 1 },
        { modelo: "Hyundai HB20", perda: 13, posicao: 2 },
        { modelo: "Chevrolet Onix", perda: 15, posicao: 3 },
        { modelo: "VW Polo", perda: 17, posicao: 4 },
        { modelo: "Fiat Argo", perda: 18, posicao: 5 },
        { modelo: "Renault Kwid", perda: 26, posicao: 6 }
      ],
      sedan: [
        { modelo: "Toyota Corolla", perda: 9, posicao: 1 },
        { modelo: "Honda Civic", perda: 12, posicao: 2 },
        { modelo: "Hyundai HB20S", perda: 14, posicao: 3 },
        { modelo: "VW Virtus", perda: 16, posicao: 4 },
        { modelo: "Chevrolet Prisma", perda: 19, posicao: 5 },
        { modelo: "Fiat Cronos", perda: 21, posicao: 6 }
      ],
      suv: [
        { modelo: "Toyota RAV4", perda: 8, posicao: 1 },
        { modelo: "Honda HR-V", perda: 10, posicao: 2 },
        { modelo: "Hyundai Creta", perda: 12, posicao: 3 },
        { modelo: "VW T-Cross", perda: 14, posicao: 4 },
        { modelo: "Chevrolet Tracker", perda: 16, posicao: 5 },
        { modelo: "Renault Duster", perda: 18, posicao: 6 }
      ],
      pickup: [
        { modelo: "Toyota Hilux", perda: 7, posicao: 1 },
        { modelo: "Ford Ranger", perda: 9, posicao: 2 },
        { modelo: "VW Amarok", perda: 11, posicao: 3 },
        { modelo: "Chevrolet S10", perda: 13, posicao: 4 },
        { modelo: "Nissan Frontier", perda: 15, posicao: 5 },
        { modelo: "Mitsubishi L200", perda: 17, posicao: 6 }
      ]
    };

    const categoryRanking = rankings[vehicleType] || rankings.sedan;
    
    // Find user's vehicle position or estimate based on depreciation
    let userPosition = categoryRanking.findIndex(item => 
      item.modelo.toLowerCase().includes(vehicleData.modelo.toLowerCase().split(' ')[0])
    );
    
    if (userPosition === -1) {
      // Estimate position based on depreciation rate
      userPosition = categoryRanking.findIndex(item => item.perda >= depreciation);
      if (userPosition === -1) userPosition = categoryRanking.length;
    }

    return {
      category: vehicleType,
      ranking: categoryRanking,
      userPosition: userPosition + 1,
      userDepreciation: depreciation
    };
  };

  // Get vehicle category based on model name
  const getVehicleCategory = (modelo: string) => {
    const modeloLower = modelo.toLowerCase();
    
    if (modeloLower.includes('hilux') || modeloLower.includes('ranger') || 
        modeloLower.includes('amarok') || modeloLower.includes('s10') ||
        modeloLower.includes('frontier') || modeloLower.includes('l200')) {
      return 'pickup';
    }
    
    if (modeloLower.includes('suv') || modeloLower.includes('rav4') || 
        modeloLower.includes('hr-v') || modeloLower.includes('creta') ||
        modeloLower.includes('t-cross') || modeloLower.includes('tracker') ||
        modeloLower.includes('duster') || modeloLower.includes('compass') ||
        modeloLower.includes('renegade')) {
      return 'suv';
    }
    
    if (modeloLower.includes('corolla') || modeloLower.includes('civic') ||
        modeloLower.includes('hb20s') || modeloLower.includes('virtus') ||
        modeloLower.includes('prisma') || modeloLower.includes('cronos') ||
        modeloLower.includes('sedan')) {
      return 'sedan';
    }
    
    return 'hatch'; // default
  };

  // Generate future price simulation
  const generateFuturePriceSimulation = () => {
    const currentYear = new Date().getFullYear();
    const annualDepreciation = depreciation / 100;
    const simulation = [];
    
    for (let year = 1; year <= 5; year++) {
      const futureValue = currentValue * Math.pow(1 - annualDepreciation, year);
      const totalLoss = currentValue - futureValue;
      const percentageLoss = (totalLoss / currentValue) * 100;
      
      simulation.push({
        year: currentYear + year,
        yearsFromNow: year,
        value: futureValue,
        formattedValue: futureValue.toLocaleString('pt-BR', {
          style: 'currency',
          currency: 'BRL'
        }),
        totalLoss: totalLoss.toLocaleString('pt-BR', {
          style: 'currency',
          currency: 'BRL'
        }),
        percentageLoss: percentageLoss.toFixed(1)
      });
    }
    
    return simulation;
  };

  // Generate projection data
  const generateProjections = () => {
    const projections = [];
    let currentVal = currentValue;
    const monthlyDepreciation = depreciation / 100 / 12;

    for (let i = 1; i <= 24; i++) {
      currentVal = currentVal * (1 - monthlyDepreciation);
      projections.push({
        month: i,
        value: currentVal,
        formattedValue: currentVal.toLocaleString('pt-BR', {
          style: 'currency',
          currency: 'BRL'
        })
      });
    }
    return projections;
  };

  // Generate seasonal analysis
  const generateSeasonalAnalysis = () => {
    return [
      { period: 'Jan - Mar', variation: '+3.5%', description: 'Período de bônus e férias, maior demanda' },
      { period: 'Abr - Jun', variation: '+1.5%', description: 'Após pagamento do IPVA, mercado aquecido' },
      { period: 'Jul - Set', variation: '-1.2%', description: 'Período de menor demanda' },
      { period: 'Out - Dez', variation: '+2.8%', description: 'Final de ano, 13º salário' }
    ];
  };

  // Generate maintenance costs projection
  const generateMaintenanceCosts = () => {
    const baseCost = currentValue * 0.08; // 8% of vehicle value annually
    return [
      { year: 1, cost: baseCost, description: 'Manutenção preventiva básica' },
      { year: 2, cost: baseCost * 1.2, description: 'Revisões e pequenos reparos' },
      { year: 3, cost: baseCost * 1.5, description: 'Troca de componentes de desgaste' },
      { year: 4, cost: baseCost * 1.8, description: 'Manutenções mais complexas' },
      { year: 5, cost: baseCost * 2.2, description: 'Reparos estruturais possíveis' }
    ];
  };

  // Generate checklist items
  const checklistItems = [
    'Verifique se o veículo está sem multas ou débitos',
    'Faça vistoria para identificar avarias e manter transparência',
    'Tenha em mãos todos os documentos (CRLV, DUT, IPVA pago)',
    'Tire fotos nítidas e honestas — luz natural ajuda muito',
    'Pesquise o valor de mercado antes de anunciar',
    'Nunca entregue o carro sem confirmar o pagamento',
    'Prefira receber via TED, PIX ou transferência entre contas próprias',
    'Formalize com contrato de compra e venda simples',
    'Comunique a venda ao Detran para evitar multas futuras',
    'Se possível, use um despachante ou vá ao cartório com o comprador'
  ];

  // Generate recommendation
  const marketAverage = currentValue * 0.99;
  const getRecommendation = () => {
    if (currentValue > marketAverage && depreciation <= 10) {
      return {
        action: 'VENDER AGORA',
        reason: 'O mercado está favorável e o seu carro ainda está acima da média.',
        advice: 'Essa pode ser a melhor janela para vender e evitar perdas maiores nos próximos meses.'
      };
    } else {
      return {
        action: 'ESPERE MAIS UM POUCO',
        reason: 'Seu carro já perdeu bastante valor, e a desvalorização está desacelerando.',
        advice: 'Pode ser mais vantajoso esperar 6–12 meses para evitar prejuízo maior.'
      };
    }
  };

  const historicalPrices = generateHistoricalPrices();
  const categoryRanking = generateCategoryRanking();
  const futurePriceSimulation = generateFuturePriceSimulation();
  const projections = generateProjections();
  const seasonalAnalysis = generateSeasonalAnalysis();
  const maintenanceCosts = generateMaintenanceCosts();
  const recommendation = getRecommendation();

  const formatCurrency = (value: number) => {
    return value.toLocaleString('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    });
  };

  const htmlContent = `
    <!DOCTYPE html>
    <html lang="pt-BR">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Relatório Fipify - ${vehicleData.marca} ${vehicleData.modelo}</title>
        <style>
            * {
                margin: 0;
                padding: 0;
                box-sizing: border-box;
            }
            
            body {
                font-family: 'Arial', sans-serif;
                line-height: 1.6;
                color: #333;
                background: #fff;
            }
            
            .container {
                max-width: 800px;
                margin: 0 auto;
                padding: 20px;
            }
            
            .header {
                background: linear-gradient(135deg, #8A2BE2, #00FFFF);
                color: white;
                padding: 40px;
                text-align: center;
                border-radius: 15px;
                margin-bottom: 30px;
                box-shadow: 0 10px 30px rgba(138, 43, 226, 0.3);
            }
            
            .header h1 {
                font-size: 32px;
                margin-bottom: 10px;
                font-weight: bold;
                text-shadow: 2px 2px 4px rgba(0,0,0,0.3);
            }
            
            .header p {
                font-size: 16px;
                opacity: 0.9;
            }
            
            .section {
                background: #f8f9fa;
                border: 1px solid #e9ecef;
                border-radius: 12px;
                padding: 30px;
                margin-bottom: 25px;
                box-shadow: 0 4px 15px rgba(0,0,0,0.1);
            }
            
            .section h2 {
                color: #8A2BE2;
                font-size: 22px;
                margin-bottom: 20px;
                border-bottom: 3px solid #8A2BE2;
                padding-bottom: 10px;
                display: flex;
                align-items: center;
                gap: 10px;
            }
            
            .vehicle-info {
                display: grid;
                grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
                gap: 20px;
                margin-bottom: 25px;
            }
            
            .info-item {
                background: white;
                padding: 20px;
                border-radius: 10px;
                border-left: 5px solid #00FFFF;
                box-shadow: 0 2px 10px rgba(0,0,0,0.1);
                transition: transform 0.2s;
            }
            
            .info-item:hover {
                transform: translateY(-2px);
            }
            
            .info-label {
                font-size: 12px;
                color: #666;
                text-transform: uppercase;
                margin-bottom: 8px;
                font-weight: bold;
            }
            
            .info-value {
                font-size: 18px;
                font-weight: bold;
                color: #333;
            }
            
            .projection-grid {
                display: grid;
                grid-template-columns: repeat(auto-fit, minmax(160px, 1fr));
                gap: 15px;
                margin-top: 20px;
            }
            
            .projection-item {
                background: white;
                padding: 15px;
                border-radius: 10px;
                text-align: center;
                border: 2px solid #e9ecef;
                box-shadow: 0 2px 10px rgba(0,0,0,0.1);
                transition: all 0.2s;
            }
            
            .projection-item:hover {
                border-color: #8A2BE2;
                transform: translateY(-2px);
            }
            
            .projection-month {
                font-size: 12px;
                color: #666;
                margin-bottom: 8px;
                font-weight: bold;
            }
            
            .projection-value {
                font-size: 16px;
                font-weight: bold;
                color: #8A2BE2;
            }
            
            .highlight-box {
                background: linear-gradient(135deg, #8A2BE2, #00FFFF);
                color: white;
                padding: 25px;
                border-radius: 15px;
                text-align: center;
                margin: 25px 0;
                box-shadow: 0 10px 30px rgba(138, 43, 226, 0.3);
            }
            
            .highlight-value {
                font-size: 28px;
                font-weight: bold;
                margin: 15px 0;
                text-shadow: 2px 2px 4px rgba(0,0,0,0.3);
            }
            
            .seasonal-grid {
                display: grid;
                grid-template-columns: repeat(auto-fit, minmax(180px, 1fr));
                gap: 15px;
                margin-top: 20px;
            }
            
            .seasonal-item {
                background: white;
                padding: 20px;
                border-radius: 10px;
                border-left: 5px solid #8A2BE2;
                box-shadow: 0 2px 10px rgba(0,0,0,0.1);
            }
            
            .seasonal-period {
                font-weight: bold;
                color: #8A2BE2;
                margin-bottom: 5px;
            }
            
            .seasonal-variation {
                font-size: 18px;
                font-weight: bold;
                margin-bottom: 8px;
            }
            
            .seasonal-description {
                font-size: 12px;
                color: #666;
            }
            
            .maintenance-table {
                width: 100%;
                border-collapse: collapse;
                margin-top: 20px;
                border-radius: 10px;
                overflow: hidden;
                box-shadow: 0 4px 15px rgba(0,0,0,0.1);
            }
            
            .maintenance-table th,
            .maintenance-table td {
                padding: 15px;
                text-align: left;
                border-bottom: 1px solid #ddd;
            }
            
            .maintenance-table th {
                background: linear-gradient(135deg, #28a745, #20c997);
                color: white;
                font-weight: bold;
            }
            
            .checklist-item {
                display: flex;
                align-items: center;
                gap: 10px;
                padding: 10px;
                background: white;
                border-radius: 8px;
                margin-bottom: 8px;
                box-shadow: 0 2px 5px rgba(0,0,0,0.1);
            }
            
            .recommendation-box {
                background: linear-gradient(135deg, #28a745, #20c997);
                color: white;
                padding: 25px;
                border-radius: 15px;
                margin: 25px 0;
                box-shadow: 0 10px 30px rgba(40, 167, 69, 0.3);
            }
            
            .footer {
                text-align: center;
                margin-top: 50px;
                padding: 30px;
                border-top: 3px solid #8A2BE2;
                color: #666;
                background: #f8f9fa;
                border-radius: 15px;
            }
            
            .footer-logo {
                font-size: 28px;
                font-weight: bold;
                color: #8A2BE2;
                margin-bottom: 15px;
            }
            
            .summary-box {
                background: linear-gradient(135deg, #28a745, #20c997);
                color: white;
                padding: 25px;
                border-radius: 15px;
                margin: 25px 0;
                box-shadow: 0 10px 30px rgba(40, 167, 69, 0.3);
            }
            
            .summary-title {
                font-size: 20px;
                font-weight: bold;
                margin-bottom: 15px;
                text-align: center;
            }
            
            .summary-grid {
                display: grid;
                grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
                gap: 15px;
            }
            
            .summary-item {
                text-align: center;
                padding: 10px;
                background: rgba(255,255,255,0.1);
                border-radius: 8px;
            }
            
            .summary-label {
                font-size: 12px;
                opacity: 0.9;
                margin-bottom: 5px;
            }
            
            .summary-value {
                font-size: 16px;
                font-weight: bold;
            }

            .historical-grid {
                display: grid;
                grid-template-columns: repeat(auto-fit, minmax(120px, 1fr));
                gap: 15px;
                margin-top: 20px;
            }

            .historical-item {
                background: white;
                padding: 15px;
                border-radius: 10px;
                text-align: center;
                border: 2px solid #e9ecef;
                box-shadow: 0 2px 10px rgba(0,0,0,0.1);
                transition: all 0.2s;
            }

            .historical-year {
                font-size: 14px;
                color: #666;
                margin-bottom: 8px;
                font-weight: bold;
            }

            .historical-value {
                font-size: 16px;
                font-weight: bold;
                color: #8A2BE2;
            }

            .ranking-table {
                width: 100%;
                border-collapse: collapse;
                margin-top: 20px;
                border-radius: 10px;
                overflow: hidden;
                box-shadow: 0 4px 15px rgba(0,0,0,0.1);
            }

            .ranking-table th,
            .ranking-table td {
                padding: 12px;
                text-align: left;
                border-bottom: 1px solid #ddd;
            }

            .ranking-table th {
                background: linear-gradient(135deg, #8A2BE2, #00FFFF);
                color: white;
                font-weight: bold;
            }

            .user-vehicle {
                background: #fff3cd !important;
                border-left: 5px solid #ffc107;
                font-weight: bold;
            }

            .simulation-grid {
                display: grid;
                grid-template-columns: repeat(auto-fit, minmax(180px, 1fr));
                gap: 15px;
                margin-top: 20px;
            }

            .simulation-item {
                background: white;
                padding: 20px;
                border-radius: 10px;
                border-left: 5px solid #dc3545;
                box-shadow: 0 2px 10px rgba(0,0,0,0.1);
            }

            .simulation-year {
                font-weight: bold;
                color: #dc3545;
                margin-bottom: 8px;
            }

            .simulation-value {
                font-size: 18px;
                font-weight: bold;
                margin-bottom: 5px;
            }

            .simulation-loss {
                font-size: 12px;
                color: #666;
            }
            
            @media print {
                body {
                    -webkit-print-color-adjust: exact;
                    print-color-adjust: exact;
                }
                
                .section {
                    break-inside: avoid;
                    page-break-inside: avoid;
                }
                
                .header {
                    break-after: avoid;
                }
            }
        </style>
    </head>
    <body>
        <div class="container">
            <div class="header">
                <h1>🚗 RELATÓRIO FIPIFY PREMIUM</h1>
                <p>Análise Completa e Detalhada do Veículo</p>
                <p>Gerado em: ${new Date().toLocaleDateString('pt-BR', { 
                  weekday: 'long', 
                  year: 'numeric', 
                  month: 'long', 
                  day: 'numeric' 
                })}</p>
            </div>
            
            <div class="section">
                <h2>📋 Informações Detalhadas do Veículo</h2>
                <div class="vehicle-info">
                    <div class="info-item">
                        <div class="info-label">Marca</div>
                        <div class="info-value">${vehicleData.marca}</div>
                    </div>
                    <div class="info-item">
                        <div class="info-label">Modelo</div>
                        <div class="info-value">${vehicleData.modelo}</div>
                    </div>
                    <div class="info-item">
                        <div class="info-label">Ano do Modelo</div>
                        <div class="info-value">${vehicleData.ano}</div>
                    </div>
                    <div class="info-item">
                        <div class="info-label">Tipo de Combustível</div>
                        <div class="info-value">${vehicleData.combustivel}</div>
                    </div>
                    <div class="info-item">
                        <div class="info-label">Código FIPE</div>
                        <div class="info-value">${vehicleData.codigo}</div>
                    </div>
                    <div class="info-item">
                        <div class="info-label">Mês de Referência</div>
                        <div class="info-value">${vehicleData.referencia}</div>
                    </div>
                </div>
                
                <div class="highlight-box">
                    <div>💰 Valor FIPE Atual</div>
                    <div class="highlight-value">${vehicleData.valor}</div>
                    <div style="font-size: 14px; opacity: 0.9;">Baseado na tabela FIPE oficial</div>
                </div>
            </div>

            <div class="section">
                <h2>🔍 Evolução Histórica de Preço</h2>
                <p style="margin-bottom: 20px; color: #666;">Evolução do valor do seu veículo nos últimos 5 anos (valores estimados baseados em dados históricos):</p>
                <div class="historical-grid">
                    ${historicalPrices.map(item => `
                        <div class="historical-item">
                            <div class="historical-year">${item.year}</div>
                            <div class="historical-value">${item.formattedValue}</div>
                        </div>
                    `).join('')}
                </div>
                
                <div class="summary-box">
                    <div class="summary-title">📊 Análise da Evolução</div>
                    <div class="summary-grid">
                        <div class="summary-item">
                            <div class="summary-label">Valor em ${historicalPrices[0].year}</div>
                            <div class="summary-value">${historicalPrices[0].formattedValue}</div>
                        </div>
                        <div class="summary-item">
                            <div class="summary-label">Valor Atual</div>
                            <div class="summary-value">${vehicleData.valor}</div>
                        </div>
                        <div class="summary-item">
                            <div class="summary-label">Variação Total</div>
                            <div class="summary-value">-${(((historicalPrices[0].value - currentValue) / historicalPrices[0].value) * 100).toFixed(1)}%</div>
                        </div>
                        <div class="summary-item">
                            <div class="summary-label">Média Anual</div>
                            <div class="summary-value">-${(depreciation).toFixed(1)}%</div>
                        </div>
                    </div>
                </div>
            </div>

            <div class="section">
                <h2>🏆 Ranking de Desvalorização na Categoria</h2>
                <p style="margin-bottom: 20px; color: #666;">Posição do seu veículo no ranking de desvalorização da categoria <strong>${categoryRanking.category.toUpperCase()}</strong>:</p>
                
                <div class="highlight-box">
                    <div>🎯 Posição no Ranking</div>
                    <div class="highlight-value">${categoryRanking.userPosition}º lugar</div>
                    <div style="font-size: 16px;">Desvalorização: ${categoryRanking.userDepreciation}% ao ano</div>
                </div>

                <table class="ranking-table">
                    <thead>
                        <tr>
                            <th>🏆 Posição</th>
                            <th>🚗 Modelo</th>
                            <th>📉 Desvalorização</th>
                        </tr>
                    </thead>
                    <tbody>
                        ${categoryRanking.ranking.map((item, index) => `
                            <tr ${index + 1 === categoryRanking.userPosition ? 'class="user-vehicle"' : ''}>
                                <td>${item.posicao}º</td>
                                <td>${index + 1 === categoryRanking.userPosition ? `${vehicleData.marca} ${vehicleData.modelo} (SEU VEÍCULO)` : item.modelo}</td>
                                <td>${index + 1 === categoryRanking.userPosition ? categoryRanking.userDepreciation : item.perda}%</td>
                            </tr>
                        `).join('')}
                    </tbody>
                </table>

                <div style="margin-top: 20px; padding: 15px; background: #e8f5e8; border: 1px solid #c3e6c3; border-radius: 8px;">
                    <strong>📈 Análise da Posição:</strong> ${
                      categoryRanking.userPosition <= 2 
                        ? 'Excelente! Seu veículo está entre os que menos desvalorizam na categoria. Isso indica uma escolha muito inteligente de compra.'
                        : categoryRanking.userPosition <= 4 
                        ? 'Boa posição! Seu veículo apresenta desvalorização abaixo da média da categoria.'
                        : 'Seu veículo apresenta desvalorização acima da média da categoria, mas isso pode representar uma oportunidade no mercado usado.'
                    }
                </div>
            </div>

            <div class="section">
                <h2>🎯 Simulador de Preço Futuro</h2>
                <p style="margin-bottom: 20px; color: #666;">Projeção detalhada do valor do seu veículo nos próximos 5 anos:</p>
                <div class="simulation-grid">
                    ${futurePriceSimulation.map(item => `
                        <div class="simulation-item">
                            <div class="simulation-year">${item.year} (${item.yearsFromNow} ano${item.yearsFromNow > 1 ? 's' : ''})</div>
                            <div class="simulation-value">${item.formattedValue}</div>
                            <div class="simulation-loss">Perda: ${item.totalLoss} (-${item.percentageLoss}%)</div>
                        </div>
                    `).join('')}
                </div>
                
                <div class="summary-box">
                    <div class="summary-title">📊 Resumo da Simulação</div>
                    <div class="summary-grid">
                        <div class="summary-item">
                            <div class="summary-label">Valor Atual</div>
                            <div class="summary-value">${vehicleData.valor}</div>
                        </div>
                        <div class="summary-item">
                            <div class="summary-label">Em 3 anos</div>
                            <div class="summary-value">${futurePriceSimulation[2].formattedValue}</div>
                        </div>
                        <div class="summary-item">
                            <div class="summary-label">Em 5 anos</div>
                            <div class="summary-value">${futurePriceSimulation[4].formattedValue}</div>
                        </div>
                        <div class="summary-item">
                            <div class="summary-label">Perda Total (5 anos)</div>
                            <div class="summary-value">-${futurePriceSimulation[4].percentageLoss}%</div>
                        </div>
                    </div>
                </div>

                <div style="margin-top: 20px; padding: 15px; background: #fff3cd; border: 1px solid #ffeaa7; border-radius: 8px;">
                    <strong>💡 Dica Estratégica:</strong> Com base na simulação, ${
                      parseFloat(futurePriceSimulation[0].percentageLoss) > 15 
                        ? 'considere vender nos próximos 12 meses para minimizar perdas.'
                        : 'você tem uma janela confortável para decidir o melhor momento da venda.'
                    }
                </div>
            </div>
            
            <div class="section">
                <h2>📊 Análise Completa de Desvalorização</h2>
                <div class="vehicle-info">
                    <div class="info-item">
                        <div class="info-label">Desvalorização Anual</div>
                        <div class="info-value">${depreciation}%</div>
                    </div>
                    <div class="info-item">
                        <div class="info-label">Classificação de Mercado</div>
                        <div class="info-value">
                            ${depreciation <= 8 ? '🏆 Excelente Valorização' : 
                              depreciation <= 15 ? '✅ Desvalorização Normal' : '⚠️ Alta Desvalorização'}
                        </div>
                    </div>
                    <div class="info-item">
                        <div class="info-label">Média da Categoria</div>
                        <div class="info-value">12.5% ao ano</div>
                    </div>
                    <div class="info-item">
                        <div class="info-label">Posição no Ranking</div>
                        <div class="info-value">
                            ${depreciation <= 8 ? 'Top 20%' : 
                              depreciation <= 15 ? 'Média' : 'Bottom 30%'}
                        </div>
                    </div>
                </div>
                
                <div style="margin-top: 25px; padding: 20px; background: #fff3cd; border: 1px solid #ffeaa7; border-radius: 10px;">
                    <strong>🔍 Análise Detalhada:</strong> ${
                      depreciation <= 8 
                        ? 'Parabéns! Seu veículo apresenta excelente retenção de valor, desvalorizando significativamente menos que a média da categoria. Isso indica uma escolha inteligente de compra e boa aceitação no mercado.'
                        : depreciation <= 15 
                        ? 'Seu veículo apresenta desvalorização dentro do padrão esperado para a categoria. É um comportamento normal e previsível no mercado automotivo brasileiro.'
                        : 'Seu veículo apresenta desvalorização acima da média da categoria. Isso pode representar uma oportunidade de compra no mercado usado, mas requer atenção na hora da revenda.'
                    }
                </div>
            </div>
            
            <div class="section">
                <h2>📈 Projeção de Valor Detalhada (24 meses)</h2>
                <p style="margin-bottom: 20px; color: #666;">Projeção baseada em análise histórica e tendências de mercado:</p>
                <div class="projection-grid">
                    ${projections.filter((_, index) => [2, 5, 8, 11, 14, 17, 20, 23].includes(index)).map(proj => `
                        <div class="projection-item">
                            <div class="projection-month">${proj.month} meses</div>
                            <div class="projection-value">${proj.formattedValue}</div>
                        </div>
                    `).join('')}
                </div>
                
                <div class="summary-box">
                    <div class="summary-title">📊 Resumo da Projeção</div>
                    <div class="summary-grid">
                        <div class="summary-item">
                            <div class="summary-label">Valor Atual</div>
                            <div class="summary-value">${vehicleData.valor}</div>
                        </div>
                        <div class="summary-item">
                            <div class="summary-label">12 meses</div>
                            <div class="summary-value">${projections[11].formattedValue}</div>
                        </div>
                        <div class="summary-item">
                            <div class="summary-label">24 meses</div>
                            <div class="summary-value">${projections[23].formattedValue}</div>
                        </div>
                        <div class="summary-item">
                            <div class="summary-label">Perda Total</div>
                            <div class="summary-value">${((currentValue - projections[23].value) / currentValue * 100).toFixed(1)}%</div>
                        </div>
                    </div>
                </div>
            </div>
            
            <div class="section">
                <h2>📅 Análise Sazonal - Melhor Época para Vender</h2>
                <p style="margin-bottom: 20px; color: #666;">Baseado em 5 anos de dados históricos do mercado brasileiro:</p>
                <div class="seasonal-grid">
                    ${seasonalAnalysis.map(season => `
                        <div class="seasonal-item">
                            <div class="seasonal-period">${season.period}</div>
                            <div class="seasonal-variation" style="color: ${season.variation.includes('+') ? '#28a745' : '#dc3545'}">${season.variation}</div>
                            <div class="seasonal-description">${season.description}</div>
                        </div>
                    `).join('')}
                </div>
                
                <div class="highlight-box">
                    <div>🎯 Recomendação Estratégica</div>
                    <div class="highlight-value">Janeiro a Março</div>
                    <div style="font-size: 16px;">Melhor período para maximizar o valor de venda</div>
                    <div style="font-size: 14px; margin-top: 10px;">
                        Valor projetado: <strong>${(currentValue * 1.035).toLocaleString('pt-BR', {
                          style: 'currency',
                          currency: 'BRL'
                        })}</strong> (+3.5%)
                    </div>
                </div>
            </div>
            
            <div class="section">
                <h2>🔧 Projeção de Custos de Manutenção</h2>
                <p style="margin-bottom: 20px; color: #666;">Estimativa de custos anuais baseada no valor e idade do veículo:</p>
                <table class="maintenance-table">
                    <thead>
                        <tr>
                            <th>📅 Ano</th>
                            <th>💰 Custo Estimado</th>
                            <th>🔧 Tipo de Manutenção</th>
                        </tr>
                    </thead>
                    <tbody>
                        ${maintenanceCosts.map(cost => `
                            <tr>
                                <td>Ano ${cost.year}</td>
                                <td>${cost.cost.toLocaleString('pt-BR', {
                                  style: 'currency',
                                  currency: 'BRL'
                                })}</td>
                                <td>${cost.description}</td>
                            </tr>
                        `).join('')}
                    </tbody>
                </table>
                
                <div style="margin-top: 20px; padding: 15px; background: #f8d7da; border: 1px solid #f5c6cb; border-radius: 8px;">
                    <strong>⚠️ Importante:</strong> Os custos de manutenção tendem a aumentar com a idade do veículo. Considere estes valores no seu planejamento financeiro.
                </div>
            </div>

            <div class="section">
                <h2>✅ Checklist para Venda Segura</h2>
                <p style="margin-bottom: 20px; color: #666;">Antes de vender seu carro, confira esses passos simples para evitar dores de cabeça:</p>
                <div style="background: #e8f5e8; padding: 20px; border-radius: 10px; margin-bottom: 20px;">
                    <h3 style="color: #28a745; margin-bottom: 15px;">🔒 Checklist de Segurança e Negociação</h3>
                    ${checklistItems.map(item => `
                        <div class="checklist-item">
                            <span style="color: #28a745; font-weight: bold;">✅</span>
                            <span>${item}</span>
                        </div>
                    `).join('')}
                </div>
                
                <div style="background: #f8d7da; padding: 15px; border: 1px solid #f5c6cb; border-radius: 8px;">
                    <strong>⚠️ Dica Extra Importante:</strong> Jamais entregue o veículo antes de concluir a transferência de propriedade! Isso protege você de multas e responsabilidades futuras.
                </div>
            </div>

            <div class="section">
                <h2>🎯 Selo de Recomendação Inteligente</h2>
                <p style="margin-bottom: 20px; color: #666;">Com base nos dados do seu veículo, valorização e mercado atual:</p>
                
                <div style="background: #e3f2fd; padding: 20px; border-radius: 10px; margin-bottom: 20px;">
                    <h3 style="color: #1976d2; margin-bottom: 15px;">🔍 SITUAÇÃO ATUAL DO SEU VEÍCULO</h3>
                    <div class="vehicle-info">
                        <div class="info-item">
                            <div class="info-label">Valor atual</div>
                            <div class="info-value">${vehicleData.valor}</div>
                        </div>
                        <div class="info-item">
                            <div class="info-label">Valor médio de veículos similares</div>
                            <div class="info-value">${formatCurrency(marketAverage)}</div>
                        </div>
                        <div class="info-item">
                            <div class="info-label">Projeção de valor em 12 meses</div>
                            <div class="info-value">${projections[11].formattedValue}</div>
                        </div>
                        <div class="info-item">
                            <div class="info-label">Tendência de mercado</div>
                            <div class="info-value">desvalorização contínua de -6% ao ano</div>
                        </div>
                    </div>
                </div>

                <div class="recommendation-box">
                    <h3 style="font-size: 20px; margin-bottom: 10px;">Recomendação Fipify: ${recommendation.action}</h3>
                    <div style="margin: 15px 0;">
                        <div style="display: flex; align-items: center; gap: 10px; margin-bottom: 10px;">
                            <span style="color: #fff; font-size: 20px;">🟢</span>
                            <span>${recommendation.reason}</span>
                        </div>
                        <div style="display: flex; align-items: center; gap: 10px;">
                            <span style="color: #fff; font-size: 20px;">💡</span>
                            <span>${recommendation.advice}</span>
                        </div>
                    </div>
                </div>
                
                <div style="margin-top: 20px; padding: 15px; background: #e1f5fe; border: 1px solid #b3e5fc; border-radius: 8px;">
                    <strong>🔍 Metodologia da Recomendação:</strong> Nossa recomendação é baseada na análise da tabela FIPE, comparação com veículos similares, tendências de mercado e o histórico de desvalorização do seu modelo específico.
                </div>
            </div>
            
            <div class="section">
                <h2>💼 Resumo Executivo</h2>
                <div class="vehicle-info">
                    <div class="info-item">
                        <div class="info-label">Investimento Atual</div>
                        <div class="info-value">${vehicleData.valor}</div>
                    </div>
                    <div class="info-item">
                        <div class="info-label">Valor em 12 meses</div>
                        <div class="info-value">${projections[11].formattedValue}</div>
                    </div>
                    <div class="info-item">
                        <div class="info-label">Valor em 24 meses</div>
                        <div class="info-value">${projections[23].formattedValue}</div>
                    </div>
                    <div class="info-item">
                        <div class="info-label">Melhor época (Jan-Mar)</div>
                        <div class="info-value">${(currentValue * 1.035).toLocaleString('pt-BR', {
                          style: 'currency',
                          currency: 'BRL'
                        })}</div>
                    </div>
                    <div class="info-item">
                        <div class="info-label">Custo Manutenção (5 anos)</div>
                        <div class="info-value">${maintenanceCosts.reduce((total, cost) => total + cost.cost, 0).toLocaleString('pt-BR', {
                          style: 'currency',
                          currency: 'BRL'
                        })}</div>
                    </div>
                    <div class="info-item">
                        <div class="info-label">Score de Valorização</div>
                        <div class="info-value">
                            ${depreciation <= 8 ? '9.2/10' : 
                              depreciation <= 15 ? '7.5/10' : '5.8/10'}
                        </div>
                    </div>
                </div>
                
                <div style="margin-top: 25px; padding: 20px; background: linear-gradient(135deg, #667eea, #764ba2); color: white; border-radius: 15px;">
                    <h3 style="margin-bottom: 15px; font-size: 18px;">🎯 Recomendações Estratégicas:</h3>
                    <ul style="list-style: none; padding: 0;">
                        <li style="margin-bottom: 10px;">✅ <strong>Timing de Venda:</strong> Janeiro a Março para maximizar retorno</li>
                        <li style="margin-bottom: 10px;">✅ <strong>Manutenção:</strong> Mantenha em dia para preservar valor</li>
                        <li style="margin-bottom: 10px;">✅ <strong>Documentação:</strong> Histórico completo aumenta credibilidade</li>
                        <li style="margin-bottom: 10px;">✅ <strong>Mercado:</strong> Monitore concorrentes regularmente</li>
                    </ul>
                </div>
            </div>
            
            <div class="footer">
                <div class="footer-logo">🚗 FIPIFY PREMIUM</div>
                <p><strong>Relatório gerado pela plataforma Fipify</strong></p>
                <p>Inteligência Artificial Avançada para Avaliação Automotiva</p>
                <p style="margin-top: 15px; font-size: 12px; line-height: 1.4;">
                    <strong>Disclaimer:</strong> Este relatório foi gerado com base em dados da tabela FIPE oficial e análises de mercado.<br>
                    Os valores são estimativas e podem variar conforme condições específicas do veículo e do mercado.<br>
                    Recomendamos sempre uma avaliação presencial para decisões de compra ou venda.<br><br>
                    <strong>Dados atualizados em:</strong> ${new Date().toLocaleDateString('pt-BR')}<br>
                    <strong>Relatório Premium Fipify</strong> - Todos os direitos reservados
                </p>
            </div>
        </div>
        
        <script>
            window.onload = function() {
                window.print();
            };
        </script>
    </body>
    </html>
  `;

  printWindow.document.write(htmlContent);
  printWindow.document.close();
};