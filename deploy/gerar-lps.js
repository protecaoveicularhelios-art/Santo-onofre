const fs = require('fs');
const path = require('path');

const cidades = [
  {
    nome: "Belo Horizonte", slug: "belo-horizonte",
    desc: "Belo Horizonte é a capital de Minas Gerais e um dos maiores centros empresariais do Brasil, com mais de 2,7 milhões de habitantes. A alta concentração de empresas, condomínios comerciais e industriais na região Centro-Sul, Barreiro e Venda Nova torna a segurança patrimonial uma necessidade estratégica. A Santo Onofre atua em todos os bairros da capital com equipes treinadas e resposta rápida.",
    bairros: "Savassi, Lourdes, Buritis, Barreiro, Venda Nova, Pampulha, Centro, Santa Efigênia",
    faq: [
      { p: "A Santo Onofre atende condomínios residenciais em BH?", r: "Sim. Atendemos condomínios verticais e horizontais em todos os bairros de Belo Horizonte, com porteiros, vigilantes e controle de acesso eletrônico." },
      { p: "Qual o prazo para início do serviço em Belo Horizonte?", r: "Após a assinatura do contrato, conseguimos iniciar o serviço em até 5 dias úteis na capital, dependendo do porte da operação." }
    ]
  },
  {
    nome: "Uberlândia", slug: "uberlandia",
    desc: "Uberlândia é o segundo maior município de Minas Gerais e o maior do Triângulo Mineiro, com forte vocação comercial e logística. O crescimento acelerado do setor atacadista, industrial e de galpões de distribuição aumenta a demanda por vigilância profissional. A Santo Onofre oferece soluções completas para empresas, depósitos e condomínios em toda a cidade.",
    bairros: "Centro, Santa Mônica, Tibery, Jardim Karaíba, Morada da Colina, Planalto, Industrial",
    faq: [
      { p: "Vocês atendem galpões e centros de distribuição em Uberlândia?", r: "Sim. Temos experiência em segurança para galpões logísticos e centros de distribuição, com vigilância armada, controle de acesso de veículos e monitoramento por câmeras." },
      { p: "É possível contratar segurança para eventos corporativos em Uberlândia?", r: "Sim, oferecemos equipes especializadas para eventos corporativos, formaturas e feiras em Uberlândia e toda a região do Triângulo Mineiro." }
    ]
  },
  {
    nome: "Contagem", slug: "contagem",
    desc: "Contagem é o maior polo industrial da Região Metropolitana de Belo Horizonte, abrigando centenas de indústrias nos distritos industriais do Riacho e Nacional. A proteção de ativos industriais, controle de acesso de funcionários e monitoramento de perímetro são demandas constantes das empresas locais. A Santo Onofre atende indústrias de todos os portes em Contagem.",
    bairros: "Riacho das Pedras, Nacional, Eldorado, Cinco, Industrial Sinduscon, Ressaca",
    faq: [
      { p: "Vocês atendem indústrias e fábricas em Contagem?", r: "Sim. Temos experiência específica em segurança industrial, incluindo controle de acesso de caminhões, vigilância de perímetro e monitoramento de turno noturno." },
      { p: "Como funciona o controle de acesso para empresas com muitos funcionários em Contagem?", r: "Utilizamos sistemas eletrônicos com catracas, leitores biométricos ou por cartão, integrados à vigilância presencial, garantindo rastreabilidade total das entradas e saídas." }
    ]
  },
  {
    nome: "Juiz de Fora", slug: "juiz-de-fora",
    desc: "Juiz de Fora é o principal centro da Zona da Mata Mineira, com destaque para os setores de comércio, saúde e educação. A cidade abriga grandes hospitais, shoppings e campus universitários que demandam segurança profissional e discreta. A Santo Onofre oferece vigilância especializada para o perfil comercial e institucional de Juiz de Fora.",
    bairros: "Centro, São Mateus, Cascatinha, Graminha, Alto dos Passos, Benfica, Jardim Glória",
    faq: [
      { p: "Vocês atendem estabelecimentos de saúde em Juiz de Fora?", r: "Sim. Temos experiência em segurança para clínicas, hospitais e laboratórios, com abordagem discreta e treinamento específico para ambientes de saúde." },
      { p: "A Santo Onofre faz segurança para shoppings e centros comerciais em JF?", r: "Sim, atendemos centros comerciais com equipes de segurança operacional, controle de fluxo e prevenção de perdas." }
    ]
  },
  {
    nome: "Betim", slug: "betim",
    desc: "Betim é um dos maiores polos industriais do Brasil, sede da Fiat Chrysler e de centenas de empresas do setor automotivo e petroquímico. A proteção de instalações industriais de grande porte, com acesso controlado 24 horas e vigilância armada, é a principal demanda das empresas betinenses. A Santo Onofre tem expertise no atendimento a indústrias de alto risco.",
    bairros: "PTB, Citrolândia, Braúnas, Centro, Imbiruçu, Jardim das Alterosas, Industrial",
    faq: [
      { p: "A Santo Onofre atende empresas do setor automotivo em Betim?", r: "Sim. Temos protocolos específicos para indústrias do setor automotivo, incluindo controle de acesso de fornecedores, vigilância de pátios e monitoramento de ativos." },
      { p: "É possível fazer segurança em turnos noturnos nas fábricas de Betim?", r: "Sim, oferecemos cobertura ininterrupta com vigilantes treinados para operação noturna, rondas e comunicação com central de monitoramento." }
    ]
  },
  {
    nome: "Montes Claros", slug: "montes-claros",
    desc: "Montes Claros é o principal centro urbano do Norte de Minas Gerais, com forte crescimento do setor de serviços, saúde e comércio atacadista. A posição estratégica como polo regional faz da cidade um ponto de convergência de negócios que exigem segurança profissional. A Santo Onofre atende empresas e condomínios em toda a extensão de Montes Claros.",
    bairros: "Centro, Ibituruna, Major Prates, Morada do Parque, Cintra, São João, Augusta Mota",
    faq: [
      { p: "Vocês atendem empresas do comércio atacadista em Montes Claros?", r: "Sim. Atendemos distribuidoras, depósitos e centros atacadistas com segurança de perímetro, controle de acesso de fornecedores e monitoramento por câmeras." },
      { p: "A Santo Onofre tem cobertura em toda a área urbana de Montes Claros?", r: "Sim, atendemos todos os bairros e distritos industriais de Montes Claros, com equipes locais e suporte da central de operações." }
    ]
  },
  {
    nome: "Ribeirão das Neves", slug: "ribeirao-das-neves",
    desc: "Ribeirão das Neves integra a Região Metropolitana de Belo Horizonte e tem registrado crescimento populacional e comercial expressivo nos últimos anos. O aumento de condomínios residenciais, comércios e pequenas indústrias cria demanda crescente por serviços de segurança acessíveis e eficientes. A Santo Onofre atende empresas e residências em toda Ribeirão das Neves.",
    bairros: "Centro, Justinópolis, Bairro das Neves, Veneza, Areias, Sevilha, Areias II",
    faq: [
      { p: "Vocês atendem pequenas empresas e comércios em Ribeirão das Neves?", r: "Sim. Oferecemos planos acessíveis para pequenos e médios estabelecimentos, com vigilante fixo ou rondas programadas conforme a necessidade." },
      { p: "Qual a diferença entre vigilância e portaria em condomínios de Ribeirão das Neves?", r: "O porteiro faz a triagem e atendimento ao público, enquanto o vigilante patrimonial tem poder de agir em situações de risco. Oferecemos os dois serviços integrados." }
    ]
  },
  {
    nome: "Uberaba", slug: "uberaba",
    desc: "Uberaba é polo agropecuário e biotecnológico do Triângulo Mineiro, sede de grandes empresas do setor de genética bovina e agronegócio. A crescente demanda por segurança em fazendas, centros de pesquisa, shoppings e indústrias faz de Uberaba um mercado em expansão para serviços especializados. A Santo Onofre está pronta para atender toda a região.",
    bairros: "Centro, Mercês, Abadia, Boa Vista, Fabrício, Lídice, São Benedito",
    faq: [
      { p: "A Santo Onofre atende empresas do agronegócio e biotecnologia em Uberaba?", r: "Sim. Temos experiência em segurança para centros de pesquisa, unidades agroindustriais e instalações de alto valor, com controle de acesso rigoroso." },
      { p: "Vocês fazem segurança para eventos de exposição agropecuária em Uberaba?", r: "Sim, oferecemos equipes especializadas para grandes eventos como feiras e exposições, com experiência em controle de fluxo e segurança de instalações temporárias." }
    ]
  },
  {
    nome: "Governador Valadares", slug: "governador-valadares",
    desc: "Governador Valadares é o principal centro comercial e de serviços do Vale do Rio Doce, concentrando atacadistas, redes de varejo e empresas de logística regional. A dinamicidade comercial da cidade exige vigilância profissional com agilidade de resposta. A Santo Onofre oferece soluções adaptadas ao perfil empresarial de Governador Valadares.",
    bairros: "Centro, Turmalina, Bom Jardim, Costa Rica, Vila Bretas, Altinópolis, Esperança",
    faq: [
      { p: "Vocês atendem comércios e distribuidoras no centro de Governador Valadares?", r: "Sim. Atendemos estabelecimentos comerciais de todos os portes, com vigilantes fixos, rondas e monitoramento por câmeras." },
      { p: "É possível contratar segurança avulsa para eventos em Governador Valadares?", r: "Sim, oferecemos segurança avulsa e pontual para eventos sem necessidade de contrato de longa duração." }
    ]
  },
  {
    nome: "Ipatinga", slug: "ipatinga",
    desc: "Ipatinga integra o Vale do Aço e é sede de grandes usinas siderúrgicas, tornando-se um polo industrial de relevância nacional. A proteção de instalações industriais de grande porte, controle de acesso de trabalhadores e segurança de perímetro são as principais demandas locais. A Santo Onofre tem expertise em atender o perfil industrial do Vale do Aço.",
    bairros: "Centro, Horto, Cariru, Bom Retiro, Bela Vista, Vila Celeste, Castelo",
    faq: [
      { p: "A Santo Onofre atende empresas do setor siderúrgico em Ipatinga?", r: "Sim. Temos profissionais treinados para atuar em ambientes industriais de alta complexidade, com foco em segurança de perímetro e controle de acesso." },
      { p: "Vocês cobrem toda a região do Vale do Aço?", r: "Sim, além de Ipatinga atendemos também Coronel Fabriciano, Timóteo e municípios vizinhos do Vale do Aço." }
    ]
  },
  {
    nome: "Sete Lagoas", slug: "sete-lagoas",
    desc: "Sete Lagoas é um importante polo industrial e comercial da região central de Minas Gerais, com destaque para os setores metalúrgico, alimentício e de logística. A cidade registra crescimento constante de condomínios empresariais e indústrias que demandam segurança profissional. A Santo Onofre atende toda a extensão de Sete Lagoas com equipes qualificadas.",
    bairros: "Centro, Eldorado, São João, Santo Antônio, Fazenda Velha, Várzea, Jardim Arizona",
    faq: [
      { p: "Vocês atendem condomínios empresariais em Sete Lagoas?", r: "Sim. Oferecemos vigilância para condomínios empresariais com controle de acesso de veículos, rondas e monitoramento 24 horas." },
      { p: "A Santo Onofre faz segurança para o setor alimentício em Sete Lagoas?", r: "Sim, atendemos indústrias alimentícias com protocolos de segurança adaptados às normas do setor, incluindo controle de acesso sanitário." }
    ]
  },
  {
    nome: "Divinópolis", slug: "divinopolis",
    desc: "Divinópolis é o maior polo têxtil e de confecções de Minas Gerais, além de concentrar indústrias metalúrgicas e de alimentos. O grande volume de mercadorias circulando no setor de confecções e as instalações industriais tornam a segurança patrimonial essencial para os negócios locais. A Santo Onofre atende empresas e condomínios em toda Divinópolis.",
    bairros: "Centro, Niterói, Sidil, São José, Interlagos, Belvedere, Danilo Passos",
    faq: [
      { p: "A Santo Onofre atende empresas do setor têxtil em Divinópolis?", r: "Sim. Temos experiência em segurança para fábricas de confecções e centros de distribuição, com controle de acesso de funcionários e monitoramento de estoque." },
      { p: "Vocês atendem condomínios residenciais em Divinópolis?", r: "Sim, oferecemos portaria profissional e vigilância para condomínios verticais e horizontais em todos os bairros de Divinópolis." }
    ]
  },
  {
    nome: "Santa Luzia", slug: "santa-luzia",
    desc: "Santa Luzia integra a Região Metropolitana de Belo Horizonte e tem crescimento expressivo nos setores de comércio e serviços. A proximidade com a capital e o aumento de condomínios residenciais e empresariais elevam a demanda por serviços de segurança profissional. A Santo Onofre atende toda Santa Luzia com equipes treinadas e resposta ágil.",
    bairros: "Centro, Palmital, Salgado Filho, Jardim Alterosas, São Benedito, Nova Pampulha, Floramar",
    faq: [
      { p: "A Santo Onofre atende condomínios residenciais em Santa Luzia?", r: "Sim. Oferecemos portaria profissional, vigilância patrimonial e controle de acesso para condomínios de todos os portes em Santa Luzia." },
      { p: "Qual o tempo de resposta para atendimento em Santa Luzia?", r: "Como cidade da RMBH, Santa Luzia conta com cobertura rápida e equipes locais para atendimentos urgentes." }
    ]
  },
  {
    nome: "Ibirité", slug: "ibirite",
    desc: "Ibirité é um dos municípios da Região Metropolitana de Belo Horizonte com maior crescimento populacional recente, impulsionado pela expansão de condomínios residenciais e comércios locais. A demanda por segurança em novos empreendimentos residenciais e comerciais cresce junto com a cidade. A Santo Onofre oferece cobertura completa em Ibirité.",
    bairros: "Centro, Jardim das Oliveiras, Jardim Leblon, Milionários, São Francisco, Parque Durval",
    faq: [
      { p: "Vocês atendem novos empreendimentos residenciais em Ibirité?", r: "Sim. Atendemos condomínios em fase de implantação e consolidados, com equipes treinadas e contratos flexíveis." },
      { p: "A Santo Onofre faz rondas noturnas em Ibirité?", r: "Sim, oferecemos rondas ostensivas em horários programados para negócios e condomínios que precisam de cobertura sem vigilante fixo." }
    ]
  },
  {
    nome: "Poços de Caldas", slug: "pocos-de-caldas",
    desc: "Poços de Caldas é um importante polo turístico e comercial do Sul de Minas Gerais, com forte presença do setor de hotelaria, eventos e comércio de luxo. A segurança em hotéis, centros de convenções, clínicas e shoppings é uma necessidade permanente nessa cidade. A Santo Onofre oferece serviços especializados para o perfil de Poços de Caldas.",
    bairros: "Centro, Jardim Quisisana, Alto da Bela Vista, Cascata, São Sebastião, Jardim Esperança",
    faq: [
      { p: "Vocês atendem hotéis e resorts em Poços de Caldas?", r: "Sim. Temos experiência em segurança para meios de hospedagem, com porteiros treinados e vigilantes discretos para não impactar a experiência dos hóspedes." },
      { p: "A Santo Onofre faz segurança para eventos e convenções em Poços de Caldas?", r: "Sim, oferecemos equipes para eventos corporativos, convenções e feiras com controle de acesso e segurança operacional." }
    ]
  },
  {
    nome: "Patos de Minas", slug: "patos-de-minas",
    desc: "Patos de Minas é polo agroindustrial do Alto Paranaíba, com destaque para o processamento de grãos, frigoríficos e cooperativas agropecuárias. A movimentação de mercadorias de alto valor no setor agroindustrial exige vigilância especializada com controle rigoroso de acesso. A Santo Onofre oferece segurança adaptada às necessidades do setor produtivo de Patos de Minas.",
    bairros: "Centro, Alvorada, Nações, Padre Cícero, Santa Terezinha, Jardim Esperança, Industrial",
    faq: [
      { p: "A Santo Onofre atende cooperativas e agroindústrias em Patos de Minas?", r: "Sim. Temos experiência em segurança para unidades agroindustriais, silos, frigoríficos e cooperativas, com vigilância de perímetro e controle de acesso." },
      { p: "Vocês fazem segurança para transporte de cargas em Patos de Minas?", r: "Oferecemos segurança de instalações, controle de acesso de veículos e monitoramento de pátios para empresas de transporte e logística." }
    ]
  },
  {
    nome: "Pouso Alegre", slug: "pouso-alegre",
    desc: "Pouso Alegre é um polo industrial e de serviços do Sul de Minas Gerais, com crescimento expressivo do setor de indústrias farmacêuticas, metalúrgicas e de logística. A posição estratégica às margens da Fernão Dias faz da cidade um hub logístico que demanda segurança profissional. A Santo Onofre atende empresas de todos os setores em Pouso Alegre.",
    bairros: "Centro, Miriam, Fátima, Jardim das Nações, Bela Vista, Alto da Boa Vista, Industrial",
    faq: [
      { p: "Vocês atendem indústrias farmacêuticas em Pouso Alegre?", r: "Sim. Oferecemos segurança para instalações farmacêuticas com rigoroso controle de acesso, monitoramento 24h e vigilantes com treinamento específico." },
      { p: "A Santo Onofre faz segurança em centros logísticos às margens da Fernão Dias?", r: "Sim, atendemos centros de distribuição e galpões logísticos na região, com controle de acesso de caminhões e monitoramento de cargas." }
    ]
  },
  {
    nome: "Teófilo Otoni", slug: "teofilo-otoni",
    desc: "Teófilo Otoni é o principal centro comercial do Vale do Mucuri e referência nacional no comércio de gemas e pedras preciosas. O alto valor das mercadorias comercializadas e a movimentação de joalheiros e compradores internacionais tornam a segurança patrimonial uma exigência do setor. A Santo Onofre oferece segurança especializada para esse mercado único.",
    bairros: "Centro, Fátima, Minas Brasil, Santa Rita, Palmeiras, Ipiranga, Vila Cel. Oliveira",
    faq: [
      { p: "A Santo Onofre atende lojas de gemas e joalherias em Teófilo Otoni?", r: "Sim. Oferecemos segurança para estabelecimentos do comércio gemológico com vigilantes treinados para ambientes de alto valor." },
      { p: "Vocês fazem escolta ou proteção patrimonial para transporte de gemas?", r: "Oferecemos segurança de instalações e acompanhamento em eventos e feiras do setor gemológico realizados em Teófilo Otoni." }
    ]
  },
  {
    nome: "Barbacena", slug: "barbacena",
    desc: "Barbacena é conhecida como a cidade das rosas e é polo regional do Campo das Vertentes, com destaque para os setores de saúde, educação e floricultura. A presença de grandes hospitais psiquiátricos, faculdades e centros de distribuição de flores cria demandas específicas de segurança. A Santo Onofre oferece soluções adaptadas ao perfil de Barbacena.",
    bairros: "Centro, São Sebastião, Mangabeiras, Frei Orlando, Industrial, Jardim Marajá, Boa Vista",
    faq: [
      { p: "Vocês atendem hospitais e instituições de saúde em Barbacena?", r: "Sim. Temos experiência em segurança hospitalar, com abordagem discreta, controle de acesso de visitantes e vigilância de áreas restritas." },
      { p: "A Santo Onofre atende empresas do setor de floricultura em Barbacena?", r: "Sim, oferecemos segurança para galpões de armazenamento e centros de distribuição de flores, com monitoramento e controle de acesso." }
    ]
  },
  {
    nome: "Sabará", slug: "sabara",
    desc: "Sabará é um município histórico da Região Metropolitana de BH, com patrimônio arquitetônico barroco e crescente desenvolvimento industrial e residencial. A proteção de patrimônio histórico, instalações industriais e condomínios que integram a cidade ao eixo metropolitano são as principais demandas de segurança local. A Santo Onofre atende toda Sabará.",
    bairros: "Centro Histórico, Carmo do Cajuru, Ravena, Mestre Caetano, Nova Lima, Roças Novas",
    faq: [
      { p: "A Santo Onofre faz segurança para o patrimônio histórico de Sabará?", r: "Sim. Oferecemos vigilância discreta para museus, igrejas históricas e imóveis tombados, com profissionais orientados para preservação do patrimônio." },
      { p: "Vocês atendem condomínios no distrito de Ravena em Sabará?", r: "Sim, atendemos todos os distritos e localidades de Sabará, incluindo Ravena, com equipes próprias e resposta ágil." }
    ]
  },
  {
    nome: "Varginha", slug: "varginha",
    desc: "Varginha é a capital do café e polo regional do Sul de Minas Gerais, com forte presença de tradings, torrefadoras e empresas do agronegócio cafeeiro. O alto valor das operações comerciais ligadas ao café e a presença de grandes armazéns e silos elevam a demanda por vigilância patrimonial. A Santo Onofre atende o setor produtivo e o comércio de Varginha.",
    bairros: "Centro, Jardim Andere, São Geraldo, Santa Luzia, Cândido Rodrigues, Industrial, Nova Varginha",
    faq: [
      { p: "A Santo Onofre atende tradings e empresas do setor cafeeiro em Varginha?", r: "Sim. Oferecemos segurança para armazéns, torrefadoras e escritórios do setor cafeeiro, com controle de acesso e monitoramento de estoque." },
      { p: "Vocês atendem o setor industrial de Varginha?", r: "Sim, atendemos o distrito industrial de Varginha com vigilância de perímetro, controle de acesso de veículos e monitoramento eletrônico." }
    ]
  },
  {
    nome: "Conselheiro Lafaiete", slug: "conselheiro-lafaiete",
    desc: "Conselheiro Lafaiete está no coração do Quadrilátero Ferrífero e é polo de mineração e siderurgia, com forte presença de mineradoras e empresas de beneficiamento de minério. A segurança de instalações de alto valor, equipamentos pesados e acesso de fornecedores é prioridade para as empresas locais. A Santo Onofre tem expertise para atender esse setor.",
    bairros: "Centro, Cachoeirinha, Industrial, Jardim Europa, São Joaquim, Belo Vale, Lavapés",
    faq: [
      { p: "A Santo Onofre atende mineradoras e siderúrgicas em Conselheiro Lafaiete?", r: "Sim. Oferecemos segurança para instalações do setor mineral, com vigilância de perímetro, controle de acesso de veículos pesados e monitoramento 24h." },
      { p: "Vocês fazem segurança para escritórios corporativos de mineração na região?", r: "Sim, atendemos escritórios, áreas administrativas e instalações de apoio das empresas do setor mineral com equipes treinadas." }
    ]
  },
  {
    nome: "Viçosa", slug: "vicosa",
    desc: "Viçosa é um polo universitário da Zona da Mata Mineira, sede da renomada Universidade Federal de Viçosa (UFV) e de dezenas de empresas de agropecuária e tecnologia. O fluxo intenso de estudantes, pesquisadores e visitantes cria demandas específicas de segurança para o setor educacional e empresarial. A Santo Onofre oferece serviços adaptados ao perfil de Viçosa.",
    bairros: "Centro, Silvestre, Nova Viçosa, Ramos, Centro Universitário, Passos, Santo Antônio",
    faq: [
      { p: "A Santo Onofre faz segurança para empresas e startups de agritech em Viçosa?", r: "Sim. Atendemos empresas de tecnologia agrícola, laboratórios e centros de pesquisa com controle de acesso e monitoramento de instalações." },
      { p: "Vocês atendem condomínios e repúblicas estudantis em Viçosa?", r: "Atendemos condomínios residenciais formais em Viçosa. Para repúblicas, oferecemos consultoria de segurança e instalação de sistemas de monitoramento." }
    ]
  },
  {
    nome: "Itabira", slug: "itabira",
    desc: "Itabira é berço da mineração de ferro no Brasil e sede histórica da Vale, uma das maiores mineradoras do mundo. A presença de operações mineiras de grande escala, além de comércio e serviços desenvolvidos para atender os trabalhadores do setor, cria demanda constante por segurança patrimonial. A Santo Onofre atende empresas e condomínios em toda Itabira.",
    bairros: "Centro, Melo Viana, Nova Itabira, Cubas, Bom Jesus, Ventura, Industrial",
    faq: [
      { p: "A Santo Onofre atende fornecedores e prestadores de serviço da mineração em Itabira?", r: "Sim. Atendemos empresas do ecossistema minerário com segurança de instalações, controle de acesso e monitoramento eletrônico." },
      { p: "Vocês fazem segurança para os condomínios residenciais que cresceram com a mineração em Itabira?", r: "Sim, atendemos condomínios horizontais e verticais em Itabira com portaria e vigilância patrimonial." }
    ]
  },
  {
    nome: "Itaúna", slug: "itauna",
    desc: "Itaúna é um município dinâmico do Centro-Oeste Mineiro, com destaque para o setor têxtil, metalúrgico e de bebidas. A variedade do parque industrial local exige soluções de segurança flexíveis e adaptadas a diferentes tipos de operação. A Santo Onofre atende indústrias, comércios e condomínios em toda Itaúna.",
    bairros: "Centro, Lagoa dos Patos, Novo Horizonte, São Geraldo, Industrial, Bom Jesus, Esplanada",
    faq: [
      { p: "Vocês atendem indústrias de bebidas e alimentação em Itaúna?", r: "Sim. Temos experiência em segurança para indústrias do setor alimentício e de bebidas, com protocolos adaptados às normas sanitárias do setor." },
      { p: "A Santo Onofre faz monitoramento eletrônico para empresas em Itaúna?", r: "Sim, oferecemos instalação e monitoramento de sistemas CFTV integrados à vigilância presencial para empresas de todos os portes em Itaúna." }
    ]
  },
  {
    nome: "Coronel Fabriciano", slug: "coronel-fabriciano",
    desc: "Coronel Fabriciano integra o Vale do Aço junto com Ipatinga e Timóteo, formando um dos maiores polos industriais de Minas Gerais. A concentração de siderúrgicas, metalúrgicas e empresas de logística industrial na região cria alta demanda por segurança profissional. A Santo Onofre oferece cobertura completa no Vale do Aço.",
    bairros: "Centro, Caladinho, Amaro Lanari, Olaria, Construção, Industrial, Girassóis",
    faq: [
      { p: "A Santo Onofre atende empresas metalúrgicas em Coronel Fabriciano?", r: "Sim. Oferecemos segurança para instalações metalúrgicas com vigilância de perímetro, controle de acesso e monitoramento de equipamentos." },
      { p: "Vocês cobrem os três municípios do Vale do Aço — Fabriciano, Ipatinga e Timóteo?", r: "Sim, atendemos toda a região do Vale do Aço com equipes locais e cobertura integrada nos três municípios." }
    ]
  },
  {
    nome: "Muriaé", slug: "muriae",
    desc: "Muriaé é polo regional da Zona da Mata Mineira, com destaque para os setores de confecções, comércio atacadista e serviços de saúde. O dinamismo comercial e o crescimento de novos bairros residenciais aumentam a demanda por segurança patrimonial. A Santo Onofre oferece serviços completos para empresas e condomínios de Muriaé.",
    bairros: "Centro, Aeroporto, São Cristóvão, São Judas Tadeu, Industrial, Bom Pastor, Santa Terezinha",
    faq: [
      { p: "Vocês atendem o setor de confecções e comércio atacadista em Muriaé?", r: "Sim. Oferecemos segurança para centros de distribuição e lojas atacadistas com controle de acesso e vigilância de estoque." },
      { p: "A Santo Onofre faz segurança para clínicas e hospitais em Muriaé?", r: "Sim, temos experiência em segurança para estabelecimentos de saúde com abordagem discreta e controle de acesso especializado." }
    ]
  },
  {
    nome: "Araguari", slug: "araguari",
    desc: "Araguari é polo agroindustrial do Triângulo Mineiro, com forte presença de cooperativas, cerealistas e empresas do setor de café e soja. A movimentação de grandes volumes de produtos agrícolas e a expansão do setor logístico elevam a demanda por vigilância profissional. A Santo Onofre atende o setor produtivo e o comércio de Araguari.",
    bairros: "Centro, Independência, Tabajaras, Santa Luzia, Dona Amélia, Industrial, Bom Jesus",
    faq: [
      { p: "A Santo Onofre atende cerealistas e cooperativas em Araguari?", r: "Sim. Oferecemos segurança para silos, armazéns e cooperativas com vigilância de perímetro e controle de acesso de veículos de carga." },
      { p: "Vocês atendem o setor logístico em Araguari?", r: "Sim, atendemos centros de distribuição e transportadoras com monitoramento eletrônico e vigilância de pátios." }
    ]
  },
  {
    nome: "Ubá", slug: "uba",
    desc: "Ubá é a capital moveleira de Minas Gerais e um dos maiores polos do setor de móveis do Brasil, com centenas de fábricas e empresas do segmento. A proteção de ativos industriais, estoques de alto valor e controle de acesso nas fábricas são demandas prioritárias do setor moveleiro. A Santo Onofre oferece soluções especializadas para o polo de Ubá.",
    bairros: "Centro, São Sebastião, Industrial, Universitário, Boa Vista, Santa Luzia, Aeroporto",
    faq: [
      { p: "A Santo Onofre atende fábricas de móveis em Ubá?", r: "Sim. Temos experiência em segurança para o polo moveleiro, com controle de acesso de funcionários, vigilância de estoque e monitoramento de instalações." },
      { p: "Vocês fazem segurança para showrooms e lojas do polo moveleiro de Ubá?", r: "Sim, atendemos showrooms e pontos de venda com vigilantes treinados e sistemas de monitoramento eletrônico." }
    ]
  },
  {
    nome: "Lavras", slug: "lavras",
    desc: "Lavras é polo universitário e agroindustrial do Sul de Minas, sede da Universidade Federal de Lavras (UFLA) e de empresas do setor de sementes, agroquímicos e agroindústria. O ambiente universitário e a presença de centros de pesquisa de alto valor criam demandas específicas de segurança. A Santo Onofre atende o setor acadêmico e produtivo de Lavras.",
    bairros: "Centro, Primavera, Jardim Glória, Nossa Senhora de Lourdes, Industrial, São Vicente, Aeroporto",
    faq: [
      { p: "A Santo Onofre atende empresas do setor de sementes e agroquímicos em Lavras?", r: "Sim. Oferecemos segurança para laboratórios, armazéns e centros de pesquisa do setor agrícola, com controle de acesso e monitoramento de ativos." },
      { p: "Vocês fazem segurança para empresas que prestam serviço à UFLA em Lavras?", r: "Sim, atendemos empresas parceiras e prestadoras de serviço do entorno universitário com soluções adequadas ao perfil acadêmico." }
    ]
  }
];

// Serviços em destaque linkados a partir de cada página-pilar de cidade
// (slugs devem bater com o array `servicos` de gerar-seo-completo.js)
const servicosDestaque = [
  { slug: 'vigilancia-patrimonial', nome: 'Vigilância Patrimonial', desc: 'Vigilantes treinados para proteção de empresas, indústrias e condomínios 24 horas.', icon: '<path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>' },
  { slug: 'controle-de-acesso', nome: 'Controle de Acesso', desc: 'Gestão eletrônica e presencial de entrada e saída com registros completos.', icon: '<rect x="3" y="11" width="18" height="11" rx="2"/><path d="M7 11V7a5 5 0 0110 0v4"/>' },
  { slug: 'monitoramento-de-cameras', nome: 'Monitoramento Eletrônico', desc: 'Câmeras CFTV e central de monitoramento 24h integrados à vigilância presencial.', icon: '<rect x="2" y="3" width="20" height="14" rx="2"/><path d="M8 21h8M12 17v4"/>' },
  { slug: 'ronda-motorizada', nome: 'Ronda Motorizada', desc: 'Patrulhamento preventivo em horários programados para máxima proteção do patrimônio.', icon: '<circle cx="12" cy="12" r="10"/><path d="M12 8v4l3 3"/>' },
  { slug: 'seguranca-para-eventos', nome: 'Segurança em Eventos', desc: 'Equipes especializadas para eventos corporativos, formaturas e shows.', icon: '<rect x="3" y="4" width="18" height="18" rx="2"/><path d="M16 2v4M8 2v4M3 10h18"/>' },
  { slug: 'portaria-de-condominio', nome: 'Portaria Profissional', desc: 'Porteiros treinados para triagem, identificação e atendimento em condomínios e empresas.', icon: '<path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z"/><path d="M9 22V12h6v10"/>' }
];

// Garante <title> unico e nunca acima de 60 caracteres. Sempre comeca com "Santo Onofre" —
// nenhum dos 33 servicos de gerar-seo-completo.js usa esse padrao, entao o titulo da
// pagina-pilar nunca colide com o titulo de uma pagina de servico da mesma cidade.
function tituloSeoPilar(cidade, max = 60) {
  const candidatos = [
    `Santo Onofre Serviços em ${cidade}, MG | Segurança e Vigilância`,
    `Santo Onofre em ${cidade}, MG — Segurança e Vigilância`,
    `Santo Onofre Serviços em ${cidade}, MG`,
    `Santo Onofre em ${cidade}, MG`
  ];
  for (const t of candidatos) if (t.length <= max) return t;
  const base = candidatos[candidatos.length - 1];
  const cortado = base.slice(0, max).replace(/\s+\S*$/, '');
  return cortado.length > 0 ? cortado : base.slice(0, max);
}

function gerarPagina(c) {
  const { nome, slug, desc, bairros, faq } = c;
  const faqHtml = faq.map(f => `
<div class="faq-item">
  <h3 class="faq-q">${f.p}</h3>
  <p class="faq-a">${f.r}</p>
</div>`).join('');

  return `<!DOCTYPE html>
<html lang="pt-BR">
<head>
<meta charset="UTF-8"/>
<meta name="viewport" content="width=device-width,initial-scale=1.0"/>
<link rel="icon" type="image/svg+xml" href="/favicon.svg"/>
<meta name="description" content="Empresa de segurança patrimonial em ${nome}, MG. Vigilância, controle de acesso, monitoramento eletrônico e rondas ostensivas. Solicite proposta agora."/>
<title>${tituloSeoPilar(nome)}</title>
<meta name="robots" content="index, follow"/>
<link rel="canonical" href="https://santoonofrevigilancia.com.br/seguranca-${slug}/"/>
<script type="application/ld+json">
{"@context":"https://schema.org","@type":"LocalBusiness","name":"Santo Onofre Serviços","description":"Empresa de segurança patrimonial em ${nome}, MG","url":"https://santoonofrevigilancia.com.br","telephone":"+5531987299396","areaServed":"${nome}, Minas Gerais","serviceType":"Segurança Patrimonial","address":{"@type":"PostalAddress","addressLocality":"${nome}","addressRegion":"MG","addressCountry":"BR"}}
<\/script>
<style>
*{box-sizing:border-box;margin:0;padding:0;}html{scroll-behavior:smooth;}body{font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif;color:#0B1829;overflow-x:hidden;}
:root{--gold:#FFCC00;--gold2:#FFE033;--gd:rgba(255,204,0,.15);--mu:#5A6A7E;--li:#F4F6F9;--bo:#DDE3ED;}
a{text-decoration:none;color:inherit;}svg{display:block;flex-shrink:0;}
#topbar{background:#000;position:fixed;top:0;left:0;right:0;z-index:201;height:36px;border-bottom:1px solid rgba(255,255,255,.1);display:flex;align-items:center;padding:0 6%;}
.tb-wrap{display:flex;align-items:center;justify-content:flex-end;gap:24px;max-width:1140px;margin:0 auto;width:100%;}
.tb-item{font-size:11px;color:rgba(255,255,255,.7);font-weight:500;display:flex;align-items:center;gap:5px;transition:.2s;}.tb-item:hover{color:#fff;}
#nav{position:fixed;top:36px;left:0;right:0;z-index:200;display:flex;align-items:center;justify-content:space-between;padding:0 6%;height:68px;background:#fff;box-shadow:0 2px 12px rgba(0,0,0,.08);}
.nlogo{display:flex;align-items:center;}.nlinks{display:flex;align-items:center;gap:4px;}
.nlink{color:#333;font-size:12px;font-weight:500;padding:7px 13px;border-radius:7px;transition:.2s;}.nlink:hover{color:#000;background:rgba(0,0,0,.05);}
.ncta{background:var(--gold);color:#0B1829;font-size:12px;font-weight:800;padding:9px 20px;border-radius:8px;transition:.2s;margin-left:6px;}.ncta:hover{background:var(--gold2);}
.ham{display:none;flex-direction:column;gap:5px;background:none;border:none;cursor:pointer;padding:4px;}.ham span{display:block;width:20px;height:2px;background:#000;border-radius:2px;}
.mob{display:none;position:fixed;top:104px;left:0;right:0;z-index:199;background:rgba(0,0,0,.98);padding:12px 6%;}
.mob.op{display:flex;flex-direction:column;gap:2px;}.mob a{color:rgba(255,255,255,.65);font-size:14px;padding:12px;border-radius:9px;display:block;font-weight:500;}.mob a:last-child{color:var(--gold2);font-weight:700;}
.lp-hero{background:linear-gradient(135deg,#000 0%,#1a1a1a 100%);padding:110px 6% 80px;margin-top:104px;position:relative;overflow:hidden;}
.lp-hero::before{content:"";position:absolute;inset:0;background:radial-gradient(ellipse 60% 80% at 80% 50%,rgba(255,204,0,.08),transparent);}
.lp-hero-wrap{max-width:1140px;margin:0 auto;position:relative;}
.breadcrumb{display:flex;align-items:center;gap:8px;font-size:12px;color:rgba(255,255,255,.35);margin-bottom:20px;flex-wrap:wrap;}
.breadcrumb a{color:rgba(255,255,255,.35);}.breadcrumb a:hover{color:var(--gold);}
.lp-tag{background:var(--gold);color:#0B1829;font-size:10px;font-weight:800;padding:4px 14px;border-radius:100px;width:fit-content;margin-bottom:20px;text-transform:uppercase;letter-spacing:.5px;}
.lp-hero h1{font-size:clamp(28px,4vw,52px);font-weight:900;color:#F4F0E6;line-height:1.1;margin-bottom:16px;}
.lp-hero h1 span{color:var(--gold);}
.lp-hero p{font-size:15px;color:rgba(255,255,255,.5);line-height:1.8;max-width:580px;margin-bottom:32px;}
.hero-btns{display:flex;gap:12px;flex-wrap:wrap;}
.btn-gold{background:var(--gold);color:#0B1829;font-size:13px;font-weight:800;padding:14px 28px;border-radius:10px;display:inline-flex;align-items:center;gap:8px;transition:.2s;}.btn-gold:hover{background:var(--gold2);transform:translateY(-1px);}
.btn-ghost{background:rgba(255,255,255,.06);color:#fff;font-size:13px;font-weight:600;padding:14px 24px;border-radius:10px;border:1px solid rgba(255,255,255,.15);display:inline-flex;align-items:center;gap:7px;transition:.2s;}.btn-ghost:hover{background:rgba(255,255,255,.1);}
.hero-stats{display:flex;gap:36px;margin-top:48px;padding-top:32px;border-top:1px solid rgba(255,255,255,.08);flex-wrap:wrap;}
.hs-n{font-size:28px;font-weight:900;color:#fff;}.hs-n span{color:var(--gold);}.hs-l{font-size:10px;color:rgba(255,255,255,.28);margin-top:3px;letter-spacing:.3px;}
.sec{padding:72px 6%;}.sec-light{background:var(--li);}.sec-dark{background:#000;}
.wrap{max-width:1140px;margin:0 auto;}
.stag{font-size:10px;font-weight:700;letter-spacing:2.5px;color:var(--gold);margin-bottom:10px;display:block;text-transform:uppercase;}
.sec h2{font-size:clamp(22px,3vw,34px);font-weight:900;color:#0B1829;line-height:1.2;margin-bottom:12px;}
.sec-dark h2{color:#F4F0E6;}
.sec-sub{font-size:14px;color:var(--mu);line-height:1.75;max-width:560px;margin-bottom:40px;}
.gold-line{width:44px;height:3px;border-radius:2px;background:linear-gradient(90deg,var(--gold),var(--gold2));margin:14px 0 36px;}
.srv-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:16px;}
.srv-card{display:block;background:#fff;border-radius:14px;padding:26px 22px;border:1px solid var(--bo);transition:.3s;position:relative;overflow:hidden;}
.srv-card::after{content:"";position:absolute;bottom:0;left:0;right:0;height:3px;background:linear-gradient(90deg,var(--gold),var(--gold2));transform:scaleX(0);transform-origin:left;transition:.3s;}
.srv-card:hover{transform:translateY(-3px);box-shadow:0 14px 36px rgba(0,0,0,.09);}.srv-card:hover::after{transform:scaleX(1);}
.srv-icon{width:48px;height:48px;border-radius:12px;background:var(--gd);display:flex;align-items:center;justify-content:center;margin-bottom:16px;}
.srv-card h3{font-size:14px;font-weight:800;color:#0B1829;margin-bottom:8px;}
.srv-card p{font-size:13px;color:var(--mu);line-height:1.65;}
.why-grid{display:grid;grid-template-columns:repeat(4,1fr);gap:20px;margin-top:8px;}
.why-card{background:rgba(255,255,255,.04);border:1px solid rgba(255,255,255,.08);border-radius:14px;padding:24px 20px;text-align:center;}
.why-num{font-size:32px;font-weight:900;color:var(--gold);margin-bottom:6px;}
.why-label{font-size:12px;color:rgba(255,255,255,.45);line-height:1.5;}
.local-sec{padding:64px 6%;background:#fff;}
.local-box{background:var(--li);border-left:4px solid var(--gold);border-radius:0 12px 12px 0;padding:28px 32px;margin-bottom:28px;}
.local-box p{font-size:15px;color:#2a3a4a;line-height:1.85;}
.bairros-wrap{display:flex;flex-wrap:wrap;gap:10px;margin-top:8px;}
.bairro-tag{background:#fff;border:1px solid var(--bo);border-radius:20px;padding:6px 16px;font-size:12px;color:var(--mu);font-weight:500;}
.faq-sec{padding:64px 6%;background:var(--li);}
.faq-item{background:#fff;border-radius:12px;padding:24px 28px;margin-bottom:14px;border:1px solid var(--bo);}
.faq-q{font-size:15px;font-weight:800;color:#0B1829;margin-bottom:10px;}
.faq-a{font-size:14px;color:var(--mu);line-height:1.75;}
.cidades-grid{display:grid;grid-template-columns:repeat(5,1fr);gap:10px;margin-top:8px;}
.cidade-tag{background:#fff;border:1px solid var(--bo);border-radius:8px;padding:10px 14px;font-size:12px;color:var(--mu);font-weight:500;text-align:center;transition:.2s;display:block;}.cidade-tag:hover{border-color:var(--gold);color:#0B1829;background:var(--gd);}
.cta-sec{background:linear-gradient(135deg,#000,#111);padding:80px 6%;text-align:center;}
.cta-sec h2{font-size:clamp(22px,3vw,34px);font-weight:900;color:#F4F0E6;margin-bottom:14px;}
.cta-sec p{font-size:14px;color:rgba(255,255,255,.45);margin-bottom:32px;max-width:520px;margin-left:auto;margin-right:auto;}
.cta-btns{display:flex;gap:12px;justify-content:center;flex-wrap:wrap;}
.btn-outline{background:transparent;color:rgba(255,255,255,.7);font-size:13px;font-weight:600;padding:13px 24px;border-radius:10px;border:1px solid rgba(255,255,255,.15);display:inline-flex;align-items:center;gap:8px;transition:.2s;}.btn-outline:hover{border-color:var(--gold);color:var(--gold);}
footer{background:#000;border-top:1px solid rgba(255,255,255,.06);padding:48px 6% 24px;}
.footer-grid{display:grid;grid-template-columns:2fr 1fr 1fr 1fr;gap:36px;margin-bottom:36px;}
.ft-name{color:#F4F0E6;font-size:13px;font-weight:800;}.ft-desc{color:rgba(255,255,255,.22);font-size:12px;line-height:1.7;max-width:230px;}
.ft-title{color:rgba(255,255,255,.35);font-size:9px;font-weight:700;letter-spacing:2px;text-transform:uppercase;margin-bottom:12px;}
.ft-link{display:block;color:rgba(255,255,255,.26);font-size:12px;margin-bottom:8px;transition:.2s;}.ft-link:hover{color:var(--gold2);}
.ft-bottom{border-top:1px solid rgba(255,255,255,.07);padding-top:18px;display:flex;justify-content:space-between;align-items:center;flex-wrap:wrap;gap:8px;}
.ft-copy{color:rgba(255,255,255,.16);font-size:11px;}
.wa{position:fixed;bottom:24px;right:24px;z-index:300;width:54px;height:54px;border-radius:50%;background:#25D366;display:flex;align-items:center;justify-content:center;box-shadow:0 6px 20px rgba(37,211,102,.4);transition:.25s;}.wa:hover{transform:scale(1.08);}
@media(max-width:960px){.nlinks{display:none;}.ham{display:flex;}.srv-grid{grid-template-columns:1fr 1fr;}.why-grid{grid-template-columns:1fr 1fr;}.cidades-grid{grid-template-columns:repeat(3,1fr);}.footer-grid{grid-template-columns:1fr 1fr;gap:24px;}}
@media(max-width:560px){.srv-grid{grid-template-columns:1fr;}.cidades-grid{grid-template-columns:repeat(2,1fr);}.footer-grid{grid-template-columns:1fr;}}
</style>
</head>
<body>
<div id="topbar"><div class="tb-wrap">
<a href="tel:+5531987299396" class="tb-item">Contrate: (31) 98729-9396</a>
<a href="https://instagram.com/santoonofrevigilangia" target="_blank" class="tb-item">@santoonofrevigilangia</a>
</div></div>
<nav id="nav">
<a href="/" class="nlogo"><img src="/navbaronofre.jpg" alt="Santo Onofre Segurança" style="height:52px;width:auto;object-fit:contain;"></a>
<div class="nlinks">
<a href="/" class="nlink">Home</a>
<a href="/servicos.html" class="nlink">Serviços</a>
<a href="/sobre.html" class="nlink">Institucional</a>
<a href="/blog.html" class="nlink">Blog</a>
<a href="/contato.html" class="nlink">Contato</a>
<a href="/contato.html" class="ncta">Falar com Especialista</a>
</div>
<button class="ham" id="ham" aria-label="Menu"><span></span><span></span><span></span></button>
</nav>
<div class="mob" id="mob">
<a href="/" onclick="cm()">Home</a>
<a href="/servicos.html" onclick="cm()">Serviços</a>
<a href="/sobre.html" onclick="cm()">Institucional</a>
<a href="/blog.html" onclick="cm()">Blog</a>
<a href="/contato.html" onclick="cm()">Contato</a>
<a href="/contato.html" onclick="cm()">Falar com Especialista →</a>
</div>

<section class="lp-hero">
<div class="lp-hero-wrap">
<div class="breadcrumb"><a href="/">Início</a><span>›</span><span style="color:rgba(255,255,255,.5)">Segurança em ${nome}</span></div>
<div class="lp-tag">Atendemos ${nome} - MG</div>
<h1>Empresa de Segurança<br>em <span>${nome}</span>, MG</h1>
<p>A Santo Onofre Serviços oferece vigilância patrimonial, controle de acesso, monitoramento eletrônico e segurança para eventos em <strong>${nome}</strong> e região. Mais de 10 anos protegendo empresas, condomínios e indústrias em Minas Gerais.</p>
<div class="hero-btns">
<a href="/contato.html" class="btn-gold">Solicitar proposta em ${nome} <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#0B1829" stroke-width="2.5"><path d="M5 12h14M12 5l7 7-7 7"/></svg></a>
<a href="https://wa.me/5531987299396" target="_blank" class="btn-ghost">WhatsApp</a>
</div>
<div class="hero-stats">
<div><div class="hs-n">+<span>10</span></div><div class="hs-l">ANOS DE EXPERIÊNCIA</div></div>
<div><div class="hs-n"><span>24</span><small style="font-size:14px;color:rgba(255,255,255,.22)">/7</small></div><div class="hs-l">ATENDIMENTO</div></div>
<div><div class="hs-n"><span>100</span><small style="font-size:14px;color:rgba(255,255,255,.22)">%</small></div><div class="hs-l">CERTIFICADOS</div></div>
</div>
</div>
</section>

<section class="local-sec">
<div class="wrap">
<span class="stag">Nossa presença em ${nome}</span>
<h2>Segurança Patrimonial em ${nome}, MG</h2>
<div class="gold-line"></div>
<div class="local-box">
<p>${desc}</p>
</div>
<h3 style="font-size:14px;font-weight:700;color:#0B1829;margin-bottom:12px;">Bairros e regiões atendidos em ${nome}:</h3>
<div class="bairros-wrap">
${bairros.split(', ').map(b => `<span class="bairro-tag">${b}</span>`).join('')}
</div>
</div>
</section>

<section class="sec sec-light">
<div class="wrap">
<span class="stag">Nossos serviços em ${nome}</span>
<h2>Segurança Completa para Empresas em ${nome}, MG</h2>
<p class="sec-sub">Soluções personalizadas de segurança patrimonial para negócios de todos os portes em <strong>${nome}</strong> e cidades da região.</p>
<div class="gold-line"></div>
<div class="srv-grid">
${servicosDestaque.map(s => `<a href="/${s.slug}-em-${slug}/" class="srv-card"><div class="srv-icon"><svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#FFCC00" stroke-width="1.8">${s.icon}</svg></div><h3>${s.nome} em ${nome}</h3><p>${s.desc}</p></a>`).join('\n')}
</div>
</div>
</section>

<section class="faq-sec">
<div class="wrap">
<span class="stag">Dúvidas frequentes</span>
<h2>Perguntas sobre Segurança em ${nome}</h2>
<div class="gold-line"></div>
${faqHtml}
</div>
</section>

<section class="sec sec-dark">
<div class="wrap">
<span class="stag">Por que a Santo Onofre?</span>
<h2>Referência em Segurança em ${nome} e MG</h2>
<div class="gold-line" style="background:linear-gradient(90deg,#FFCC00,#FFE033);"></div>
<div class="why-grid">
<div class="why-card"><div class="why-num">+10</div><div class="why-label">Anos de experiência em segurança patrimonial em MG</div></div>
<div class="why-card"><div class="why-num">100%</div><div class="why-label">Vigilantes certificados e treinados pela Polícia Federal</div></div>
<div class="why-card"><div class="why-num">24/7</div><div class="why-label">Atendimento e cobertura ininterrupta para sua empresa</div></div>
<div class="why-card"><div class="why-num">0</div><div class="why-label">Burocracia — contratos flexíveis e proposta rápida</div></div>
</div>
</div>
</section>

<section class="sec sec-light">
<div class="wrap">
<span class="stag">Abrangência</span>
<h2>Atendemos ${nome} e Toda a Região de MG</h2>
<p class="sec-sub">Além de ${nome}, a Santo Onofre atende empresas e condomínios nas principais cidades de Minas Gerais.</p>
<div class="gold-line"></div>
<div style="border-radius:14px;overflow:hidden;border:1px solid var(--bo);margin-bottom:28px;">
<iframe src="https://www.google.com/maps?q=${encodeURIComponent(nome + ', MG, Brasil')}&output=embed" width="100%" height="320" style="border:0;display:block;" loading="lazy" referrerpolicy="no-referrer-when-downgrade" title="Mapa de ${nome}, MG"></iframe>
</div>
<div class="cidades-grid">
<a href="/seguranca-belo-horizonte/" class="cidade-tag">Belo Horizonte</a>
<a href="/seguranca-uberlandia/" class="cidade-tag">Uberlândia</a>
<a href="/seguranca-contagem/" class="cidade-tag">Contagem</a>
<a href="/seguranca-juiz-de-fora/" class="cidade-tag">Juiz de Fora</a>
<a href="/seguranca-betim/" class="cidade-tag">Betim</a>
<a href="/seguranca-montes-claros/" class="cidade-tag">Montes Claros</a>
<a href="/seguranca-uberaba/" class="cidade-tag">Uberaba</a>
<a href="/seguranca-governador-valadares/" class="cidade-tag">Gov. Valadares</a>
<a href="/seguranca-ipatinga/" class="cidade-tag">Ipatinga</a>
<a href="/seguranca-sete-lagoas/" class="cidade-tag">Sete Lagoas</a>
<a href="/seguranca-divinopolis/" class="cidade-tag">Divinópolis</a>
<a href="/seguranca-pocos-de-caldas/" class="cidade-tag">Poços de Caldas</a>
<a href="/seguranca-varginha/" class="cidade-tag">Varginha</a>
<a href="/seguranca-itabira/" class="cidade-tag">Itabira</a>
<a href="/seguranca-pouso-alegre/" class="cidade-tag">Pouso Alegre</a>
</div>
</div>
</section>

<section class="cta-sec">
<div class="wrap">
<h2>Precisa de Segurança em ${nome}?</h2>
<p>Entre em contato agora e receba uma proposta personalizada para sua empresa ou condomínio em ${nome}, MG.</p>
<div class="cta-btns">
<a href="/contato.html" class="btn-gold">Solicitar proposta gratuita <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#0B1829" stroke-width="2.5"><path d="M5 12h14M12 5l7 7-7 7"/></svg></a>
<a href="https://wa.me/5531987299396" target="_blank" class="btn-outline">Falar no WhatsApp</a>
</div>
</div>
</section>

<footer>
<div class="wrap">
<div class="footer-grid">
<div><span class="ft-name">Santo Onofre Serviços</span><p class="ft-desc" style="margin-top:8px;">Segurança patrimonial em ${nome} e em toda Minas Gerais.</p></div>
<div><div class="ft-title">Serviços</div><a href="/servicos.html" class="ft-link">Vigilância Patrimonial</a><a href="/servicos.html" class="ft-link">Controle de Acesso</a><a href="/servicos.html" class="ft-link">Monitoramento</a><a href="/servicos.html" class="ft-link">Seg. em Eventos</a></div>
<div><div class="ft-title">Cidades</div><a href="/seguranca-belo-horizonte/" class="ft-link">Belo Horizonte</a><a href="/seguranca-contagem/" class="ft-link">Contagem</a><a href="/seguranca-betim/" class="ft-link">Betim</a><a href="/seguranca-uberlandia/" class="ft-link">Uberlândia</a></div>
<div><div class="ft-title">Fale Conosco</div><a href="https://wa.me/5531987299396" class="ft-link" target="_blank">(31) 98729-9396</a><span class="ft-link" style="cursor:default">Minas Gerais</span></div>
</div>
<div class="ft-bottom"><span class="ft-copy">© 2026 Santo Onofre Serviços · Todos os direitos reservados</span></div>
</div>
</footer>

<a href="https://wa.me/5531987299396" target="_blank" class="wa" aria-label="WhatsApp">
<svg width="26" height="26" viewBox="0 0 24 24" fill="#fff"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
</a>
<script>
const h=document.getElementById('ham'),m=document.getElementById('mob');
function cm(){m.classList.remove('op');}
h.addEventListener('click',()=>m.classList.toggle('op'));
</script>
</body>
</html>`;
}

cidades.forEach(c => {
  const dir = path.join(__dirname, `seguranca-${c.slug}`);
  if (!fs.existsSync(dir)) fs.mkdirSync(dir);
  fs.writeFileSync(path.join(dir, 'index.html'), gerarPagina(c), 'utf8');
  console.log(`✓ seguranca-${c.slug}/index.html`);
});

console.log(`\nConcluído! ${cidades.length} páginas geradas.`);
