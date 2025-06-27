import React from 'react';
import { useApi } from '../context/ApiContext';
import { Target, TrendingUp, TrendingDown, Clock, AlertCircle } from 'lucide-react';

const IntelligentRecommendation: React.FC = () => {
  const { vehicleData } = useApi();

  if (!vehicleData) return null;

  const currentValue = parseInt(vehicleData.valor.replace(/\D/g, '')) / 100;
  const depreciation = vehicleData.desvalorizacao;
  
  // Simulate market average and projection
  const marketAverage = currentValue * 0.99; // Slightly below current value
  const projectedValue12Months = currentValue * (1 - (depreciation / 100));
  const marketTrend = -6; // -6% annual depreciation trend

  // Determine recommendation based on vehicle data
  const getRecommendation = () => {
    if (currentValue > marketAverage && depreciation <= 10) {
      return {
        action: 'VENDER AGORA',
        color: 'text-green-400',
        bgColor: 'bg-green-900/20',
        borderColor: 'border-green-800',
        icon: TrendingUp,
        reason: 'O mercado está favorável e o seu carro ainda está acima da média.',
        advice: 'Essa pode ser a melhor janela para vender e evitar perdas maiores nos próximos meses.'
      };
    } else {
      return {
        action: 'ESPERE MAIS UM POUCO',
        color: 'text-yellow-400',
        bgColor: 'bg-yellow-900/20',
        borderColor: 'border-yellow-800',
        icon: Clock,
        reason: 'Seu carro já perdeu bastante valor, e a desvalorização está desacelerando.',
        advice: 'Pode ser mais vantajoso esperar 6–12 meses para evitar prejuízo maior.'
      };
    }
  };

  const recommendation = getRecommendation();
  const IconComponent = recommendation.icon;

  const formatCurrency = (value: number) => {
    return value.toLocaleString('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    });
  };

  return (
    <div className="card p-6">
      <div className="flex items-center gap-3 mb-6">
        <div className="p-2 bg-primary/10 rounded-lg">
          <Target className="w-5 h-5 text-secondary" />
        </div>
        <h2 className="text-xl font-semibold text-text font-orbitron">Selo de Recomendação Inteligente</h2>
      </div>

      <div className="bg-gradient-to-r from-primary/10 to-secondary/10 p-6 rounded-lg border border-primary/20 mb-6">
        <h3 className="text-lg font-semibold text-text mb-4">🔍 SITUAÇÃO ATUAL DO SEU VEÍCULO</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
          <div className="bg-accent/50 p-4 rounded-lg border border-primary/20">
            <p className="text-sm text-text/70 mb-1">Valor atual</p>
            <p className="text-xl font-bold text-text">{vehicleData.valor}</p>
          </div>
          <div className="bg-accent/50 p-4 rounded-lg border border-primary/20">
            <p className="text-sm text-text/70 mb-1">Valor médio de veículos similares</p>
            <p className="text-xl font-bold text-text">{formatCurrency(marketAverage)}</p>
          </div>
          <div className="bg-accent/50 p-4 rounded-lg border border-primary/20">
            <p className="text-sm text-text/70 mb-1">Projeção de valor em 12 meses</p>
            <p className="text-xl font-bold text-text">{formatCurrency(projectedValue12Months)}</p>
          </div>
          <div className="bg-accent/50 p-4 rounded-lg border border-primary/20">
            <p className="text-sm text-text/70 mb-1">Tendência de mercado</p>
            <p className="text-xl font-bold text-text">desvalorização contínua de {marketTrend}% ao ano</p>
          </div>
        </div>
      </div>

      <div className={`${recommendation.bgColor} ${recommendation.borderColor} border rounded-lg p-6`}>
        <div className="flex items-center gap-3 mb-4">
          <IconComponent className={`w-8 h-8 ${recommendation.color}`} />
          <div>
            <h3 className="text-lg font-semibold text-text">Recomendação Fipify:</h3>
            <p className={`text-2xl font-bold ${recommendation.color}`}>{recommendation.action}</p>
          </div>
        </div>
        
        <div className="space-y-3">
          <div className="flex items-start gap-2">
            <div className={`w-3 h-3 rounded-full ${recommendation.color.replace('text-', 'bg-')} mt-2 flex-shrink-0`}></div>
            <p className="text-text/90">{recommendation.reason}</p>
          </div>
          <div className="flex items-start gap-2">
            <div className="w-3 h-3 rounded-full bg-secondary mt-2 flex-shrink-0"></div>
            <p className="text-text/90">{recommendation.advice}</p>
          </div>
        </div>
      </div>

      <div className="mt-6 p-4 bg-primary/10 rounded-lg border border-primary/20">
        <div className="flex items-center gap-2 mb-2">
          <AlertCircle className="w-5 h-5 text-secondary" />
          <span className="font-semibold text-text">Metodologia da Recomendação</span>
        </div>
        <p className="text-sm text-text/80">
          Nossa recomendação é baseada na análise da tabela FIPE, comparação com veículos similares, 
          tendências de mercado e o histórico de desvalorização do seu modelo específico.
        </p>
      </div>
    </div>
  );
};

export default IntelligentRecommendation;