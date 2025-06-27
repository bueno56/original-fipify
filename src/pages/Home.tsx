import React, { useEffect } from 'react';
import { Car, CheckCircle, Shield, Clock, FileText, TrendingUp, Award, BarChart3, Target, Zap, Users, Brain, Calendar, DollarSign, Eye, Lightbulb } from 'lucide-react';

const Home: React.FC = () => {
  useEffect(() => {
    document.title = "Fipify - Descubra o Verdadeiro Valor do Seu Carro";
  }, []);

  const targetAudience = [
    {
      icon: DollarSign,
      title: "Proprietários que querem saber o valor real do seu carro",
      description: "Tenha certeza do valor atual e futuro do seu veículo"
    },
    {
      icon: Eye,
      title: "Pessoas curiosas que desejam entender o histórico e a valorização",
      description: "Explore dados detalhados sobre a evolução do seu modelo"
    },
    {
      icon: TrendingUp,
      title: "Quem está pensando em vender e quer saber o momento ideal",
      description: "Descubra quando vender para maximizar seu retorno"
    },
    {
      icon: Calendar,
      title: "Donos que querem manter o carro e planejar sua valorização ou troca futura",
      description: "Planeje suas decisões com base em projeções confiáveis"
    },
    {
      icon: FileText,
      title: "Quem vai negociar e quer ter um relatório confiável em mãos",
      description: "Negocie com dados oficiais e análises profissionais"
    }
  ];

  const features = [
    {
      icon: Calendar,
      title: "Projeção de valor para os próximos 24 meses",
      description: "Veja a estimativa de quanto seu carro tende a valer no futuro, com base em tendências reais."
    },
    {
      icon: Clock,
      title: "Melhor época para vender",
      description: "Descubra qual o momento mais estratégico para vender e lucrar mais com a negociação."
    },
    {
      icon: Award,
      title: "Classificação de desvalorização",
      description: "Saiba se o seu carro está entre os modelos que mais ou menos perdem valor no mercado."
    },
    {
      icon: DollarSign,
      title: "Análise de custos de manutenção",
      description: "Receba uma média de gastos estimados com manutenção, de acordo com a categoria do seu carro."
    },
    {
      icon: Shield,
      title: "Checklist para venda segura",
      description: "Checklist completo para garantir uma venda sem riscos ou prejuízos, evitando fraudes e erros comuns."
    },
    {
      icon: Target,
      title: "Selo de recomendação inteligente",
      description: "O sistema avalia se vale a pena vender agora ou manter o veículo, com base no seu perfil e na performance do carro."
    },
    {
      icon: BarChart3,
      title: "Evolução histórica do preço",
      description: "Veja como o valor do seu carro se comportou nos últimos anos, identificando quedas e picos relevantes."
    },
    {
      icon: Brain,
      title: "Simulador de preço futuro",
      description: "Tenha uma visão clara do quanto seu carro pode valer em 12, 24 e 36 meses, mesmo que ainda não esteja pensando em vender."
    }
  ];

  const steps = [
    {
      number: 1,
      title: "Você clica no botão de compra e faz o pagamento (PIX ou cartão)",
      icon: DollarSign
    },
    {
      number: 2,
      title: "É redirecionado automaticamente para a página de acesso",
      icon: Zap
    },
    {
      number: 3,
      title: "Informa os dados do carro (marca, modelo e ano)",
      icon: Car
    },
    {
      number: 4,
      title: "Gera e baixa seu relatório em PDF na mesma hora",
      icon: FileText
    }
  ];

  return (
    <div className="bg-background">
      {/* Hero Section */}
      <section className="relative py-20 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/20 via-background to-secondary/20"></div>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(138,43,226,0.3),transparent_50%)] bg-[radial-gradient(circle_at_70%_80%,rgba(0,255,255,0.2),transparent_50%)]"></div>
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-5xl mx-auto text-center">
            <div className="inline-flex items-center gap-3 bg-primary/10 px-6 py-3 rounded-full border border-primary/30 mb-8 backdrop-blur-sm">
              <Brain className="w-5 h-5 text-secondary animate-pulse" />
              <span className="text-secondary font-semibold text-sm font-orbitron">INTELIGÊNCIA ARTIFICIAL AVANÇADA</span>
            </div>
            
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-text mb-6 font-orbitron leading-tight">
              DESCUBRA O <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">VERDADEIRO VALOR</span> DO SEU CARRO COM O FIPIFY
            </h1>
            
            <p className="text-text/90 text-xl md:text-2xl mb-8 leading-relaxed max-w-4xl mx-auto">
              <strong className="text-secondary">Evite prejuízos e negocie com inteligência</strong>
            </p>
            
            <div className="bg-accent/50 backdrop-blur-sm border border-primary/20 rounded-2xl p-8 mb-12 shadow-neon">
              <div className="space-y-4 text-lg md:text-xl text-text/90">
                <p>🤔 <strong>Você sabe quanto seu carro realmente vale hoje?</strong></p>
                <p>📈 <strong>Sabe quanto ele vai valer daqui a um ano?</strong></p>
                <p className="text-red-400">⚠️ <strong>A maioria dos proprietários perde dinheiro por falta de informação.</strong></p>
              </div>
            </div>
            
            <p className="text-text/80 text-lg md:text-xl mb-12 leading-relaxed max-w-4xl mx-auto">
              Com o <strong className="text-secondary">Relatório Fipify Premium</strong>, você recebe um documento completo, 
              gerado por inteligência artificial, com dados oficiais da Tabela Fipe e análises que te ajudam a 
              tomar decisões mais inteligentes sobre o seu veículo.
            </p>
            
            <a
              href="https://pay.kiwify.com.br/Z2IuOs0"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-3 bg-gradient-to-r from-primary to-secondary text-black font-bold py-6 px-12 rounded-xl text-xl transition-all duration-300 hover:scale-105 hover:shadow-2xl font-orbitron shadow-[0_0_30px_#00FFFF] mb-8"
            >
              <Brain className="w-6 h-6" />
              Quero meu Relatório Premium por R$50
            </a>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12">
              <div className="flex items-center justify-center gap-3 p-4 bg-accent/30 rounded-lg border border-primary/20 backdrop-blur-sm">
                <Zap className="w-6 h-6 text-secondary" />
                <span className="text-text font-medium font-orbitron">Acesso imediato após o pagamento</span>
              </div>
              
              <div className="flex items-center justify-center gap-3 p-4 bg-accent/30 rounded-lg border border-primary/20 backdrop-blur-sm">
                <FileText className="w-6 h-6 text-secondary" />
                <span className="text-text font-medium font-orbitron">Relatório com visual profissional</span>
              </div>
              
              <div className="flex items-center justify-center gap-3 p-4 bg-accent/30 rounded-lg border border-primary/20 backdrop-blur-sm">
                <Shield className="w-6 h-6 text-secondary" />
                <span className="text-text font-medium font-orbitron">Entrega 100% digital e segura</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Target Audience Section */}
      <section className="py-20 bg-gradient-to-br from-accent/30 to-background">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16">
              <div className="inline-flex items-center gap-3 bg-primary/10 px-6 py-3 rounded-full border border-primary/30 mb-6">
                <Users className="w-5 h-5 text-secondary" />
                <span className="text-secondary font-semibold text-sm font-orbitron">PARA QUEM É O FIPIFY</span>
              </div>
              <h2 className="text-3xl md:text-4xl font-bold text-text mb-4 font-orbitron">
                Para quem é o Fipify
              </h2>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {targetAudience.map((item, index) => {
                const IconComponent = item.icon;
                return (
                  <div key={index} className="card p-8 hover:shadow-neon-hover transition-all duration-300 group">
                    <div className="flex items-center gap-4 mb-4">
                      <div className="p-3 bg-primary/10 rounded-lg group-hover:bg-primary/20 transition-colors">
                        <IconComponent className="w-6 h-6 text-secondary" />
                      </div>
                    </div>
                    <h3 className="text-lg font-semibold text-text mb-3 font-orbitron leading-tight">
                      {item.title}
                    </h3>
                    <p className="text-text/80 leading-relaxed">
                      {item.description}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16">
              <div className="inline-flex items-center gap-3 bg-primary/10 px-6 py-3 rounded-full border border-primary/30 mb-6">
                <FileText className="w-5 h-5 text-secondary" />
                <span className="text-secondary font-semibold text-sm font-orbitron">RELATÓRIO PREMIUM</span>
              </div>
              <h2 className="text-3xl md:text-4xl font-bold text-text mb-4 font-orbitron">
                O que você recebe no Relatório Fipify Premium
              </h2>
              <p className="text-text/80 text-lg max-w-3xl mx-auto">
                Análise completa e profissional do seu veículo com inteligência artificial avançada
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {features.map((feature, index) => {
                const IconComponent = feature.icon;
                return (
                  <div key={index} className="card p-8 hover:shadow-neon-hover transition-all duration-300 group">
                    <div className="flex items-start gap-4">
                      <div className="p-3 bg-primary/10 rounded-lg group-hover:bg-primary/20 transition-colors flex-shrink-0">
                        <IconComponent className="w-6 h-6 text-secondary" />
                      </div>
                      <div>
                        <h3 className="text-xl font-semibold text-text mb-3 font-orbitron">
                          {feature.title}
                        </h3>
                        <p className="text-text/80 leading-relaxed">
                          {feature.description}
                        </p>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* How it Works Section */}
      <section className="py-20 bg-gradient-to-br from-primary/10 to-secondary/10">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto">
            <div className="text-center mb-16">
              <div className="inline-flex items-center gap-3 bg-primary/10 px-6 py-3 rounded-full border border-primary/30 mb-6">
                <Lightbulb className="w-5 h-5 text-secondary" />
                <span className="text-secondary font-semibold text-sm font-orbitron">PROCESSO SIMPLES</span>
              </div>
              <h2 className="text-3xl md:text-4xl font-bold text-text mb-4 font-orbitron">
                Como funciona
              </h2>
              <p className="text-text/80 text-lg">
                Processo simples e rápido em 4 passos
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {steps.map((step, index) => {
                const IconComponent = step.icon;
                return (
                  <div key={index} className="text-center group">
                    <div className="relative mb-6">
                      <div className="w-20 h-20 bg-gradient-to-r from-primary to-secondary rounded-full flex items-center justify-center text-black font-bold text-2xl mx-auto shadow-lg group-hover:scale-110 transition-transform duration-300">
                        {step.number}
                      </div>
                      <div className="absolute -top-2 -right-2 p-2 bg-accent rounded-full border border-primary/20">
                        <IconComponent className="w-5 h-5 text-secondary" />
                      </div>
                    </div>
                    <p className="text-text/90 leading-relaxed font-medium">
                      {step.title}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="card p-12 text-center shadow-neon-hover">
              <div className="inline-flex items-center gap-3 bg-primary/10 px-6 py-3 rounded-full border border-primary/30 mb-8">
                <DollarSign className="w-5 h-5 text-secondary" />
                <span className="text-secondary font-semibold text-sm font-orbitron">OFERTA ESPECIAL</span>
              </div>
              
              <h2 className="text-4xl md:text-5xl font-bold text-text mb-6 font-orbitron">
                Valor: <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">R$50</span>
              </h2>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
                <div className="p-6 bg-accent/50 rounded-lg border border-primary/20">
                  <Zap className="w-8 h-8 text-secondary mx-auto mb-3" />
                  <h3 className="font-semibold text-text mb-2 font-orbitron">Acesso imediato</h3>
                  <p className="text-text/80 text-sm">após o pagamento</p>
                </div>
                
                <div className="p-6 bg-accent/50 rounded-lg border border-primary/20">
                  <FileText className="w-8 h-8 text-secondary mx-auto mb-3" />
                  <h3 className="font-semibold text-text mb-2 font-orbitron">Relatório profissional</h3>
                  <p className="text-text/80 text-sm">visual e fácil leitura</p>
                </div>
                
                <div className="p-6 bg-accent/50 rounded-lg border border-primary/20">
                  <Shield className="w-8 h-8 text-secondary mx-auto mb-3" />
                  <h3 className="font-semibold text-text mb-2 font-orbitron">Entrega digital</h3>
                  <p className="text-text/80 text-sm">100% segura</p>
                </div>
              </div>
              
              <a
                href="https://pay.kiwify.com.br/Z2IuOs0"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-3 bg-gradient-to-r from-primary to-secondary text-black font-bold py-6 px-12 rounded-xl text-xl transition-all duration-300 hover:scale-105 hover:shadow-2xl font-orbitron shadow-[0_0_30px_#00FFFF]"
              >
                <Brain className="w-6 h-6" />
                Quero meu Relatório Premium por R$50
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA Section */}
      <section className="py-20 bg-gradient-to-br from-accent/50 to-background">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <div className="bg-gradient-to-r from-primary/20 to-secondary/20 p-12 rounded-2xl border border-primary/30 shadow-2xl backdrop-blur-sm">
              <h2 className="text-3xl md:text-4xl font-bold text-text mb-6 font-orbitron">
                A decisão é sua, o controle também
              </h2>
              
              <p className="text-text/90 text-xl mb-8 leading-relaxed">
                <strong className="text-red-400">Evite perder dinheiro por falta de informação.</strong><br/>
                Com o Fipify, você negocia com <strong className="text-secondary">dados, não com achismos.</strong>
              </p>
              
              <p className="text-text/80 text-lg mb-10">
                Clique abaixo e receba seu relatório agora mesmo.
              </p>
              
              <a
                href="https://pay.kiwify.com.br/Z2IuOs0"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-3 bg-gradient-to-r from-primary to-secondary text-black font-bold py-6 px-12 rounded-xl text-xl transition-all duration-300 hover:scale-105 hover:shadow-2xl font-orbitron shadow-[0_0_30px_#00FFFF]"
              >
                <Target className="w-6 h-6" />
                Quero meu Relatório Premium por R$50
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Trust Indicators */}
      <section className="py-16 bg-background">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="text-center p-8 card">
                <BarChart3 className="w-12 h-12 text-secondary mx-auto mb-4" />
                <h3 className="text-xl font-bold text-text mb-2 font-orbitron">Dados Oficiais</h3>
                <p className="text-text/80">Baseado na Tabela FIPE oficial e análise de mercado</p>
              </div>
              
              <div className="text-center p-8 card">
                <Brain className="w-12 h-12 text-secondary mx-auto mb-4" />
                <h3 className="text-xl font-bold text-text mb-2 font-orbitron">IA Avançada</h3>
                <p className="text-text/80">Análise inteligente com projeções precisas</p>
              </div>
              
              <div className="text-center p-8 card">
                <Award className="w-12 h-12 text-secondary mx-auto mb-4" />
                <h3 className="text-xl font-bold text-text mb-2 font-orbitron">Relatório Premium</h3>
                <p className="text-text/80">Documento profissional e detalhado</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;