import React from 'react';
import { useApi } from '../context/ApiContext';
import { CheckCircle, Shield, AlertTriangle, FileText } from 'lucide-react';

const SafeSaleChecklist: React.FC = () => {
  const { vehicleData } = useApi();

  if (!vehicleData) return null;

  const checklistItems = [
    {
      icon: Shield,
      title: 'Verifique se o veículo está sem multas ou débitos',
      description: 'Consulte o site do Detran para verificar pendências'
    },
    {
      icon: CheckCircle,
      title: 'Faça vistoria para identificar avarias e manter transparência',
      description: 'Documente todos os detalhes do veículo'
    },
    {
      icon: FileText,
      title: 'Tenha em mãos todos os documentos (CRLV, DUT, IPVA pago)',
      description: 'Documentação completa e em dia é essencial'
    },
    {
      icon: CheckCircle,
      title: 'Tire fotos nítidas e honestas — luz natural ajuda muito',
      description: 'Transparência gera confiança com compradores'
    },
    {
      icon: CheckCircle,
      title: 'Pesquise o valor de mercado antes de anunciar',
      description: 'Use a tabela FIPE como referência base'
    },
    {
      icon: AlertTriangle,
      title: 'Nunca entregue o carro sem confirmar o pagamento',
      description: 'Aguarde a compensação antes da entrega'
    },
    {
      icon: Shield,
      title: 'Prefira receber via TED, PIX ou transferência entre contas próprias',
      description: 'Evite dinheiro em espécie para valores altos'
    },
    {
      icon: FileText,
      title: 'Formalize com contrato de compra e venda simples',
      description: 'Protege ambas as partes na negociação'
    },
    {
      icon: CheckCircle,
      title: 'Comunique a venda ao Detran para evitar multas futuras',
      description: 'Faça a comunicação de venda online'
    },
    {
      icon: Shield,
      title: 'Se possível, use um despachante ou vá ao cartório com o comprador',
      description: 'Garante que a transferência seja feita corretamente'
    }
  ];

  return (
    <div className="card p-6">
      <div className="flex items-center gap-3 mb-6">
        <div className="p-2 bg-primary/10 rounded-lg">
          <CheckCircle className="w-5 h-5 text-secondary" />
        </div>
        <h2 className="text-xl font-semibold text-text font-orbitron">Checklist para Venda Segura</h2>
      </div>

      <div className="bg-gradient-to-r from-primary/10 to-secondary/10 p-6 rounded-lg border border-primary/20 mb-6">
        <div className="flex items-center gap-3 mb-4">
          <Shield className="w-6 h-6 text-secondary" />
          <h3 className="text-lg font-semibold text-text">Checklist de Segurança e Negociação</h3>
        </div>
        <p className="text-text/80 mb-4">
          Antes de vender seu carro, confira esses passos simples para evitar dores de cabeça e garantir uma venda tranquila:
        </p>
      </div>

      <div className="space-y-4">
        {checklistItems.map((item, index) => {
          const IconComponent = item.icon;
          return (
            <div key={index} className="flex items-start gap-4 p-4 bg-accent/30 rounded-lg border border-primary/10 hover:bg-accent/50 transition-colors">
              <div className="flex-shrink-0 mt-1">
                <IconComponent className="w-5 h-5 text-secondary" />
              </div>
              <div className="flex-grow">
                <h4 className="font-medium text-text mb-1">{item.title}</h4>
                <p className="text-sm text-text/70">{item.description}</p>
              </div>
              <div className="flex-shrink-0">
                <CheckCircle className="w-5 h-5 text-green-400" />
              </div>
            </div>
          );
        })}
      </div>

      <div className="mt-6 p-4 bg-red-900/20 rounded-lg border border-red-800">
        <div className="flex items-center gap-2 mb-2">
          <AlertTriangle className="w-5 h-5 text-red-400" />
          <span className="font-semibold text-red-400">Dica Extra Importante</span>
        </div>
        <p className="text-red-300 text-sm">
          <strong>Jamais entregue o veículo antes de concluir a transferência de propriedade!</strong> 
          Isso protege você de multas e responsabilidades futuras.
        </p>
      </div>
    </div>
  );
};

export default SafeSaleChecklist;