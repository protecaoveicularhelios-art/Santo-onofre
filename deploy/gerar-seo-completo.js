const fs = require('fs');
const path = require('path');

const DOMAIN = 'https://santoonofrevigilancia.com.br';
const TEL = '(31) 98729-9396';
const WATEL = '5531987299396';

// Garante que nenhum <title> passe de 60 caracteres (limite pratico do Google nos resultados de busca)
function tituloSeo(nome, cidade, uf, max = 60) {
  const candidatos = [
    `${nome} em ${cidade} - ${uf} | Santo Onofre`,
    `${nome} em ${cidade}, ${uf} | Santo Onofre`,
    `${nome} em ${cidade} - ${uf}`,
    `${nome} em ${cidade}, ${uf}`,
    `${nome} em ${cidade}`
  ];
  for (const c of candidatos) if (c.length <= max) return c;
  const base = candidatos[candidatos.length - 1];
  const cortado = base.slice(0, max).replace(/\s+\S*$/, '');
  return cortado.length > 0 ? cortado : base.slice(0, max);
}


// ============================================================
// 28 SERVIÇOS
// ============================================================
const servicos = [
  {
    slug: 'vigilancia-patrimonial',
    nome: 'Vigilância Patrimonial',
    h1: (c, uf) => `Vigilância Patrimonial em ${c}, ${uf}`,
    title: (c, uf) => tituloSeo('Vigilância Patrimonial', c, uf),
    desc: (c, uf) => `Vigilância patrimonial em ${c}, ${uf}. Profissionais treinados, controle de acesso e orientação de público 24h. Solicite proposta gratuita.`,
    hero: c => `A Santo Onofre oferece vigilância patrimonial profissional em <strong>${c}</strong> com profissionais treinados em controle de acesso e orientação de público, cobertura 24 horas e relatórios periódicos para empresas, condomínios e indústrias.`,
    badge: 'Vigilância Patrimonial',
    faq: [
      { p: 'O que é vigilância patrimonial?', r: 'É o serviço de proteção de bens, instalações e pessoas com controle de acesso, orientação de público e monitoramento contínuo, com relatórios periódicos de ocorrências.' },
      { p: 'Como funciona a equipe da Santo Onofre?', r: 'Nossa equipe é formada por profissionais treinados em controle de acesso e orientação de público, atuando com postura, discrição e foco na segurança do seu patrimônio.' }
    ]
  },
  {
    slug: 'seguranca-patrimonial',
    nome: 'Segurança Patrimonial',
    h1: (c, uf) => `Empresa de Segurança Patrimonial em ${c}, ${uf}`,
    title: (c, uf) => tituloSeo('Segurança Patrimonial', c, uf),
    desc: (c, uf) => `Empresa de segurança patrimonial em ${c}, ${uf}. Proteção para empresas e condomínios com vigilantes 24h. Solicite proposta gratuita.`,
    hero: c => `A Santo Onofre é especialista em segurança patrimonial em <strong>${c}</strong>, protegendo empresas, condomínios e indústrias com controle de acesso, orientação de público e monitoramento eletrônico integrado.`,
    badge: 'Segurança Patrimonial',
    faq: [
      { p: 'Qual a diferença entre segurança patrimonial e vigilância?', r: 'A segurança patrimonial engloba toda a estratégia de proteção — vigilantes, câmeras, controle de acesso e rondas. Vigilância é um dos elementos desse conjunto.' },
      { p: 'Como é feita a gestão da segurança patrimonial?', r: 'Realizamos análise de vulnerabilidades, definimos escala de vigilantes, integramos sistemas eletrônicos e emitimos relatórios periódicos ao cliente.' }
    ]
  },
  {
    slug: 'empresa-de-seguranca',
    nome: 'Empresa de Segurança',
    h1: (c, uf) => `Empresa de Segurança em ${c}, ${uf}`,
    title: (c, uf) => tituloSeo('Empresa de Segurança', c, uf),
    desc: (c, uf) => `Empresa de segurança em ${c}, ${uf}. Vigilância, monitoramento, controle de acesso e rondas para empresas e condomínios. Solicite proposta.`,
    hero: c => `A Santo Onofre Serviços é uma empresa de segurança em <strong>${c}</strong> com mais de 10 anos de mercado, oferecendo soluções completas: vigilantes, câmeras, controle de acesso e rondas motorizadas.`,
    badge: 'Empresa de Segurança',
    faq: [
      { p: 'Como escolher uma empresa de segurança confiável?', r: 'Avalie a experiência no setor, o treinamento das equipes e a capacidade de atender seu perfil de negócio. A Santo Onofre oferece controle de acesso e orientação de público com profissionalismo e comprometimento.' },
      { p: 'A Santo Onofre atende empresas de todos os portes?', r: 'Sim. Atendemos pequenos comércios, condomínios e grandes indústrias com soluções de controle de acesso e orientação de público adaptadas a cada necessidade.' }
    ]
  },
  {
    slug: 'empresa-de-vigilantes',
    nome: 'Empresa de Vigilantes',
    h1: (c, uf) => `Empresa de Vigilantes em ${c}, ${uf}`,
    title: (c, uf) => tituloSeo('Empresa de Vigilantes', c, uf),
    desc: (c, uf) => `Empresa de vigilantes em ${c}, ${uf}. Profissionais de controle de acesso e orientação de público para empresas, condomínios e indústrias. Solicite proposta.`,
    hero: c => `A Santo Onofre fornece profissionais de controle de acesso e orientação de público para empresas e condomínios em <strong>${c}</strong>. Todos passam por treinamento técnico contínuo com foco em postura, segurança e atendimento.`,
    badge: 'Controle de Acesso',
    faq: [
      { p: 'Como contratar profissionais de controle de acesso para minha empresa?', r: 'Entre em contato, descrevemos seu perfil de operação e dimensionamos a equipe ideal para seu negócio em ${c} com agilidade.' },
      { p: 'Os profissionais da Santo Onofre têm treinamento específico?', r: 'Sim. Nossa equipe recebe treinamento operacional contínuo em controle de acesso, orientação de público e gestão de fluxo de pessoas.' }
    ]
  },
  {
    slug: 'seguranca-para-eventos',
    nome: 'Segurança para Eventos',
    h1: (c, uf) => `Segurança para Eventos em ${c}, ${uf}`,
    title: (c, uf) => tituloSeo('Segurança para Eventos', c, uf),
    desc: (c, uf) => `Segurança para eventos em ${c}, ${uf}. Equipes para shows, formaturas, feiras e eventos corporativos. Solicite orçamento.`,
    hero: c => `A Santo Onofre oferece equipes especializadas em segurança para eventos em <strong>${c}</strong>: shows, formaturas, feiras, eventos corporativos e celebrações. Controle de acesso, gestão de fluxo e segurança operacional.`,
    badge: 'Segurança para Eventos',
    faq: [
      { p: 'Quantos vigilantes preciso para meu evento?', r: 'O número depende do porte, perfil do público e layout do evento. Nossa equipe faz uma avaliação prévia e recomenda a quantidade adequada.' },
      { p: 'A Santo Onofre faz segurança para eventos ao ar livre?', r: 'Sim. Atendemos shows, festivais e feiras ao ar livre com equipes preparadas para gestão de grandes públicos e controle de perímetro.' }
    ]
  },
  {
    slug: 'seguranca-para-shows',
    nome: 'Segurança para Shows',
    h1: (c, uf) => `Segurança para Shows em ${c}, ${uf}`,
    title: (c, uf) => tituloSeo('Segurança para Shows', c, uf),
    desc: (c, uf) => `Segurança para shows e festivais em ${c}, ${uf}. Equipes treinadas para controle de acesso e gestão de público. Solicite orçamento agora.`,
    hero: c => `Para shows e eventos musicais em <strong>${c}</strong>, a Santo Onofre oferece equipes treinadas em segurança de grandes públicos, controle de acesso, gestão de barreiras e prevenção de incidentes em palcos e backstage.`,
    badge: 'Segurança para Shows',
    faq: [
      { p: 'Como funciona a segurança em shows e festivais?', r: 'Realizamos planejamento prévio com os organizadores, definimos pontos de controle, alocamos equipes para cada área e mantemos comunicação constante durante o evento.' },
      { p: 'A Santo Onofre faz proteção de artistas em shows?', r: 'Oferecemos segurança de backstage e de acesso restrito, além de coordenação com equipes dos artistas.' }
    ]
  },
  {
    slug: 'seguranca-para-rodeios',
    nome: 'Segurança para Rodeios',
    h1: (c, uf) => `Segurança para Rodeios em ${c}, ${uf}`,
    title: (c, uf) => tituloSeo('Segurança para Rodeios', c, uf),
    desc: (c, uf) => `Segurança para rodeios e festas do peão em ${c}, ${uf}. Controle de acesso e segurança de público para grandes eventos rurais. Solicite orçamento.`,
    hero: c => `A Santo Onofre garante segurança completa para rodeios e festas do peão em <strong>${c}</strong>. Equipes experientes em controle de acesso, gestão de aglomerações, segurança de arena e shows musicais.`,
    badge: 'Segurança para Rodeios',
    faq: [
      { p: 'Quais cuidados especiais um rodeio exige em segurança?', r: 'Rodeios exigem atenção especial à arena, proteção dos peões, controle do público nas arquibancadas e segurança dos shows musicais. Nossa equipe tem experiência em todos esses pontos.' },
      { p: 'A Santo Onofre atende festas do peão de todos os portes?', r: 'Sim. Atendemos desde pequenas festas regionais até grandes rodeios com público de dezenas de milhares de pessoas.' }
    ]
  },
  {
    slug: 'seguranca-para-festas',
    nome: 'Segurança para Festas',
    h1: (c, uf) => `Segurança para Festas e Eventos em ${c}, ${uf}`,
    title: (c, uf) => tituloSeo('Segurança para Festas', c, uf),
    desc: (c, uf) => `Segurança para festas, formaturas e eventos sociais em ${c}, ${uf}. Equipes discretas e profissionais. Solicite orçamento personalizado.`,
    hero: c => `Para festas, formaturas, casamentos e eventos sociais em <strong>${c}</strong>, a Santo Onofre oferece equipes discretas e profissionais que garantem a tranquilidade dos anfitriões e a segurança dos convidados.`,
    badge: 'Segurança para Festas',
    faq: [
      { p: 'Preciso de segurança para uma festa privada?', r: 'Para eventos com muitos convidados ou em locais abertos, a presença de vigilantes garante a ordem e previne incidentes. Dimensionamos equipes para qualquer perfil de evento.' },
      { p: 'A Santo Onofre faz segurança para formaturas?', r: 'Sim. Temos experiência em formaturas, com equipes que garantem controle de acesso e segurança discreta sem interferir na celebração.' }
    ]
  },
  {
    slug: 'portaria-de-predio',
    nome: 'Portaria de Prédio',
    h1: (c, uf) => `Portaria de Prédio em ${c}, ${uf}`,
    title: (c, uf) => tituloSeo('Portaria de Prédio', c, uf),
    desc: (c, uf) => `Portaria de prédio profissional em ${c}, ${uf}. Porteiros treinados para triagem, identificação e atendimento ao público. Solicite proposta.`,
    hero: c => `A Santo Onofre fornece porteiros profissionais para prédios comerciais e residenciais em <strong>${c}</strong>, com treinamento em triagem, identificação de visitantes, atendimento ao público e protocolo de emergências.`,
    badge: 'Portaria de Prédio',
    faq: [
      { p: 'Qual a função do porteiro de prédio?', r: 'O porteiro controla o acesso de moradores, visitantes e prestadores de serviço, identifica pessoas, recebe correspondências e aciona o protocolo de emergência quando necessário.' },
      { p: 'Qual a diferença entre porteiro e orientador de público?', r: 'O porteiro foca em triagem e atendimento de moradores. O orientador de público faz gestão de fluxo, controle de acesso e abordagem discreta em ambientes de maior movimento. Oferecemos os dois perfis integrados.' }
    ]
  },
  {
    slug: 'portaria-de-condominio',
    nome: 'Portaria de Condomínio',
    h1: (c, uf) => `Portaria de Condomínio em ${c}, ${uf}`,
    title: (c, uf) => tituloSeo('Portaria de Condomínio', c, uf),
    desc: (c, uf) => `Portaria de condomínio profissional em ${c}, ${uf}. Gestão de acesso de moradores e visitantes com segurança e hospitalidade. Solicite proposta.`,
    hero: c => `A Santo Onofre oferece portaria profissional para condomínios residenciais e comerciais em <strong>${c}</strong>. Porteiros treinados para controle de acesso, triagem de visitantes e atendimento hospitaleiro aos moradores.`,
    badge: 'Portaria de Condomínio',
    faq: [
      { p: 'Como funciona a portaria de condomínio?', r: 'Nossos porteiros controlam o acesso de moradores, visitantes e prestadores de serviço, registram ocorrências e coordenam com a vigilância para garantir a segurança.' },
      { p: 'A Santo Onofre faz portaria 24 horas para condomínios?', r: 'Sim. Operamos em regime de revezamento 24/7 com escala rigorosamente gerenciada para garantir cobertura ininterrupta.' }
    ]
  },
  {
    slug: 'portaria-virtual',
    nome: 'Portaria Virtual',
    h1: (c, uf) => `Portaria Virtual em ${c}, ${uf}`,
    title: (c, uf) => tituloSeo('Portaria Virtual', c, uf),
    desc: (c, uf) => `Portaria virtual para condomínios em ${c}, ${uf}. Controle de acesso remoto com câmeras e interfone. Economia e segurança 24h. Solicite proposta.`,
    hero: c => `A Santo Onofre implementa portaria virtual para condomínios em <strong>${c}</strong>: controle de acesso remoto com câmeras HD, interfone digital e central de monitoramento 24h. Economia sem abrir mão da segurança.`,
    badge: 'Portaria Virtual',
    faq: [
      { p: 'O que é portaria virtual?', r: 'Portaria virtual é o controle remoto do acesso ao condomínio por câmeras, interfone e central de monitoramento, eliminando a necessidade de porteiro físico no local.' },
      { p: 'A portaria virtual é segura?', r: 'Sim, quando bem implementada. Utilizamos câmeras de alta resolução, comunicação criptografada e protocolos de resposta rápida equivalentes à portaria presencial.' }
    ]
  },
  {
    slug: 'seguranca-para-obras',
    nome: 'Segurança para Obras',
    h1: (c, uf) => `Segurança para Obras em ${c}, ${uf}`,
    title: (c, uf) => tituloSeo('Segurança para Obras', c, uf),
    desc: (c, uf) => `Segurança para obras e canteiros de construção em ${c}, ${uf}. Vigilantes e vigias 24h para proteção de materiais e equipamentos. Solicite proposta.`,
    hero: c => `A Santo Onofre protege canteiros de obras em <strong>${c}</strong> com vigilantes especializados na proteção de materiais, equipamentos e máquinas contra furtos e vandalismo, em regime diurno, noturno ou 24 horas.`,
    badge: 'Segurança para Obras',
    faq: [
      { p: 'Por que contratar segurança para uma obra?', r: 'Canteiros de obras são alvos frequentes de furto de materiais e equipamentos. A presença de vigilantes reduz drasticamente as perdas e garante a continuidade da obra.' },
      { p: 'A Santo Onofre faz segurança noturna em obras?', r: 'Sim. Oferecemos vigilância noturna e 24 horas para canteiros de obras, com vigias fixos, rondas periódicas e comunicação com central de monitoramento.' }
    ]
  },
  {
    slug: 'vigia-para-obras',
    nome: 'Vigia para Obras',
    h1: (c, uf) => `Vigia para Obras em ${c}, ${uf}`,
    title: (c, uf) => tituloSeo('Vigia para Obras', c, uf),
    desc: (c, uf) => `Vigia para obras em ${c}, ${uf}. Profissionais especializados em proteção de canteiros de construção. Cobertura diurna e noturna. Solicite proposta.`,
    hero: c => `A Santo Onofre fornece vigias especializados para obras em <strong>${c}</strong>, garantindo proteção contínua de materiais, ferramentas e equipamentos no canteiro de construção, em regime diurno, noturno ou 24 horas.`,
    badge: 'Vigia para Obras',
    faq: [
      { p: 'Qual é o papel do vigia em uma obra?', r: 'O vigia monitora o canteiro em períodos de inatividade, controla o acesso de pessoas, registra ocorrências e aciona autoridades em caso de invasão ou furto.' },
      { p: 'Vigia de obra é diferente de vigilante patrimonial?', r: 'O vigia de obra é específico para canteiros de construção. O vigilante patrimonial tem habilitação federal mais ampla. Oferecemos os dois perfis conforme a necessidade.' }
    ]
  },
  {
    slug: 'seguranca-para-construcao',
    nome: 'Segurança para Construção Civil',
    h1: (c, uf) => `Segurança para Construção Civil em ${c}, ${uf}`,
    title: (c, uf) => tituloSeo('Segurança para Construção', c, uf),
    desc: (c, uf) => `Segurança para construção civil em ${c}, ${uf}. Proteção de canteiros, materiais e maquinário com equipes especializadas. Solicite proposta.`,
    hero: c => `Para empreendimentos de construção civil em <strong>${c}</strong>, a Santo Onofre oferece segurança completa: proteção de canteiro, controle de acesso de trabalhadores e fornecedores, vigilância de maquinário e monitoramento eletrônico.`,
    badge: 'Segurança para Construção',
    faq: [
      { p: 'Como proteger equipamentos pesados em obras?', r: 'Combinamos vigilância presencial com monitoramento eletrônico (câmeras e rastreadores), além de controle rigoroso de acesso ao canteiro para reduzir o risco de furto.' },
      { p: 'A Santo Onofre atende construtoras e incorporadoras?', r: 'Sim. Temos experiência em atender construtoras de grande porte, com gestão de múltiplos canteiros e relatórios integrados para a diretoria.' }
    ]
  },
  {
    slug: 'seguranca-eletronica',
    nome: 'Segurança Eletrônica',
    h1: (c, uf) => `Segurança Eletrônica em ${c}, ${uf}`,
    title: (c, uf) => tituloSeo('Segurança Eletrônica', c, uf),
    desc: (c, uf) => `Segurança eletrônica em ${c}, ${uf}. Câmeras CFTV, alarmes, controle de acesso eletrônico e monitoramento 24h. Solicite proposta.`,
    hero: c => `A Santo Onofre implementa sistemas de segurança eletrônica em <strong>${c}</strong>: câmeras CFTV de alta definição, alarmes perimetrais, controle de acesso eletrônico e central de monitoramento 24 horas para empresas e condomínios.`,
    badge: 'Segurança Eletrônica',
    faq: [
      { p: 'O que inclui um sistema de segurança eletrônica?', r: 'Câmeras CFTV, alarmes de intrusão, controle de acesso por biometria ou cartão, interfones, cercas elétricas e central de monitoramento, integrados para cobertura completa.' },
      { p: 'Segurança eletrônica substitui vigilantes?', r: 'A segurança eletrônica complementa a vigilância presencial. O mais eficaz é a combinação dos dois, onde os sistemas eletrônicos ampliam a capacidade dos vigilantes.' }
    ]
  },
  {
    slug: 'instalacao-de-cameras',
    nome: 'Instalação de Câmeras de Segurança',
    h1: (c, uf) => `Instalação de Câmeras de Segurança em ${c}, ${uf}`,
    title: (c, uf) => tituloSeo('Instalação de Câmeras', c, uf),
    desc: (c, uf) => `Instalação de câmeras de segurança em ${c}, ${uf}. CFTV, câmeras IP e sistemas de monitoramento para empresas e condomínios. Solicite orçamento.`,
    hero: c => `A Santo Onofre realiza instalação de câmeras de segurança em <strong>${c}</strong>: sistemas CFTV analógicos e digitais, câmeras IP de alta resolução, gravação em nuvem e acesso remoto pelo smartphone para empresas e condomínios.`,
    badge: 'Câmeras de Segurança',
    faq: [
      { p: 'Que tipo de câmera é melhor para minha empresa?', r: 'Depende do ambiente: interna ou externa, área coberta, nível de iluminação e necessidade de visão noturna. Nossa equipe faz um levantamento e indica o sistema mais adequado.' },
      { p: 'As câmeras instaladas gravam em nuvem?', r: 'Sim, oferecemos sistemas com gravação local (DVR/NVR) e em nuvem, com acesso remoto pelo celular para o proprietário verificar imagens em tempo real.' }
    ]
  },
  {
    slug: 'monitoramento-de-cameras',
    nome: 'Monitoramento de Câmeras',
    h1: (c, uf) => `Monitoramento de Câmeras 24h em ${c}, ${uf}`,
    title: (c, uf) => tituloSeo('Monitoramento de Câmeras', c, uf),
    desc: (c, uf) => `Monitoramento de câmeras 24h em ${c}, ${uf}. Central de monitoramento com resposta imediata para empresas e condomínios. Solicite proposta.`,
    hero: c => `A Santo Onofre oferece monitoramento remoto de câmeras 24 horas em <strong>${c}</strong>. Nossa central acompanha as imagens em tempo real e aciona equipes de resposta imediata em caso de incidentes.`,
    badge: 'Monitoramento 24h',
    faq: [
      { p: 'Como funciona o monitoramento de câmeras 24h?', r: 'Nossa central recebe as imagens em tempo real. Operadores monitoram continuamente e acionam a equipe de resposta ou autoridades imediatamente ao detectar qualquer anomalia.' },
      { p: 'O monitoramento inclui resposta presencial?', r: 'Sim. Em casos de alarme detectado pelas câmeras, enviamos equipe presencial de resposta rápida enquanto coordenamos com as autoridades.' }
    ]
  },
  {
    slug: 'cftv',
    nome: 'CFTV',
    h1: c => `CFTV em ${c} — Sistema de Câmeras de Segurança`,
    title: (c, uf) => tituloSeo('CFTV', c, uf),
    desc: (c, uf) => `CFTV em ${c}, ${uf}. Instalação e monitoramento de Circuito Fechado de TV para empresas e condomínios. Solicite orçamento.`,
    hero: c => `A Santo Onofre instala e monitora sistemas de CFTV (Circuito Fechado de Televisão) em <strong>${c}</strong>: câmeras analógicas e IP, DVR/NVR de alta capacidade, visão noturna e acesso remoto para verificação das imagens.`,
    badge: 'CFTV',
    faq: [
      { p: 'O que é CFTV?', r: 'CFTV (Circuito Fechado de Televisão) é o sistema de câmeras que captura e grava imagens de áreas internas e externas, transmitindo para monitores controlados pelo usuário.' },
      { p: 'Qual a resolução das câmeras CFTV instaladas?', r: 'Trabalhamos com câmeras de Full HD (1080p) a 4K, conforme a necessidade do cliente, para identificação facial e de placas com precisão.' }
    ]
  },
  {
    slug: 'ronda-motorizada',
    nome: 'Ronda Motorizada',
    h1: (c, uf) => `Ronda Motorizada em ${c}, ${uf}`,
    title: (c, uf) => tituloSeo('Ronda Motorizada', c, uf),
    desc: (c, uf) => `Ronda motorizada em ${c}, ${uf}. Patrulhamento preventivo com veículos para empresas, condomínios e comércios. Solicite proposta gratuita.`,
    hero: c => `A Santo Onofre oferece ronda motorizada em <strong>${c}</strong> — patrulhamento preventivo com veículos e vigilantes que percorrem os pontos contratados em intervalos variados, garantindo presença ostensiva e dissuasão de crimes.`,
    badge: 'Ronda Motorizada',
    faq: [
      { p: 'O que é ronda motorizada?', r: 'É um serviço de patrulhamento preventivo onde vigilantes em veículos percorrem os locais contratados em intervalos programados ou aleatórios, verificando o perímetro e registrando ocorrências.' },
      { p: 'A ronda motorizada substitui o vigilante fixo?', r: 'Para muitos clientes sim — a ronda é uma alternativa mais econômica ao vigilante fixo 24h. Para outros, é um complemento. Avaliamos a melhor solução para cada caso.' }
    ]
  },
  {
    slug: 'vigilancia-noturna',
    nome: 'Vigilância Noturna',
    h1: (c, uf) => `Vigilância Noturna em ${c}, ${uf}`,
    title: (c, uf) => tituloSeo('Vigilância Noturna', c, uf),
    desc: (c, uf) => `Vigilância noturna em ${c}, ${uf}. Proteção de empresas, canteiros e condomínios durante a noite com profissionais treinados. Solicite proposta.`,
    hero: c => `A Santo Onofre oferece vigilância noturna em <strong>${c}</strong> para empresas, canteiros de obra, condomínios e comércios. Profissionais treinados em controle de acesso e orientação de público garantem proteção durante as horas de maior vulnerabilidade, com rondas e comunicação contínua.`,
    badge: 'Vigilância Noturna',
    faq: [
      { p: 'Como funciona a vigilância noturna?', r: 'Nossos vigilantes assumem o posto ao final do expediente, realizam rondas periódicas pelo perímetro, monitoram câmeras e registram toda a movimentação até o início do próximo dia.' },
      { p: 'A vigilância noturna inclui monitoramento eletrônico?', r: 'Sim. Integramos a vigilância presencial noturna com sistemas de câmeras e alarmes, garantindo cobertura completa nos períodos de menor atividade.' }
    ]
  },
  {
    slug: 'controle-de-acesso',
    nome: 'Controle de Acesso',
    h1: (c, uf) => `Controle de Acesso em ${c}, ${uf}`,
    title: (c, uf) => tituloSeo('Controle de Acesso', c, uf),
    desc: (c, uf) => `Controle de acesso em ${c}, ${uf}. Sistemas eletrônicos e presenciais para empresas, condomínios e indústrias. Biometria e catracas. Solicite proposta.`,
    hero: c => `A Santo Onofre implementa controle de acesso em <strong>${c}</strong>: sistemas com biometria, leitores de cartão, catracas e cancelas, integrados à vigilância presencial para gestão completa da entrada e saída de pessoas e veículos.`,
    badge: 'Controle de Acesso',
    faq: [
      { p: 'Que tecnologias são usadas no controle de acesso?', r: 'Utilizamos biometria digital e facial, cartões RFID, códigos PIN, interfones com câmera e catracas eletrônicas, escolhendo a solução mais adequada.' },
      { p: 'O controle de acesso gera relatórios?', r: 'Sim. Todos os sistemas geram registros detalhados de entradas e saídas, com horário, data e identificação da pessoa, disponíveis para consulta pelo cliente.' }
    ]
  },
  {
    slug: 'seguranca-para-industrias',
    nome: 'Segurança para Indústrias',
    h1: (c, uf) => `Segurança para Indústrias em ${c}, ${uf}`,
    title: (c, uf) => tituloSeo('Segurança para Indústrias', c, uf),
    desc: (c, uf) => `Segurança para indústrias em ${c}, ${uf}. Vigilância patrimonial, controle de acesso e monitoramento 24h. Solicite proposta.`,
    hero: c => `A Santo Onofre oferece segurança especializada para indústrias em <strong>${c}</strong>: controle de acesso de funcionários e fornecedores, orientação de público no perímetro, monitoramento de pátios e proteção de equipamentos de alto valor.`,
    badge: 'Segurança Industrial',
    faq: [
      { p: 'Quais os principais riscos de segurança em indústrias?', r: 'Furto de insumos e produtos, sabotagem de equipamentos e acesso não autorizado são os principais desafios. A Santo Onofre tem protocolos específicos para cada tipo de indústria.' },
      { p: 'A Santo Onofre atende indústrias de alto risco?', r: 'Sim. Temos protocolos de controle de acesso e orientação de público para indústrias químicas, farmacêuticas, petroquímicas e mineradoras, adaptados aos riscos específicos de cada ambiente.' }
    ]
  },
  {
    slug: 'seguranca-para-fabricas',
    nome: 'Segurança para Fábricas',
    h1: (c, uf) => `Segurança para Fábricas em ${c}, ${uf}`,
    title: (c, uf) => tituloSeo('Segurança para Fábricas', c, uf),
    desc: (c, uf) => `Segurança para fábricas em ${c}, ${uf}. Proteção de instalações industriais, maquinário e estoques com vigilantes 24h. Solicite proposta.`,
    hero: c => `Para fábricas e plantas industriais em <strong>${c}</strong>, a Santo Onofre oferece segurança completa: vigilantes de perímetro, controle de acesso de funcionários e caminhões, monitoramento de estoque e proteção de maquinário.`,
    badge: 'Segurança para Fábricas',
    faq: [
      { p: 'Como proteger o estoque da fábrica contra furtos?', r: 'Combinamos controle de acesso rigoroso às áreas de estoque, vigilantes fixos ou em ronda, câmeras 24h e registros detalhados de movimentação de produtos.' },
      { p: 'A Santo Onofre faz segurança em turnos de produção noturna?', r: 'Sim. Cobrimos todos os turnos de produção, incluindo o noturno, com equipes treinadas para operar em ambientes industriais com maquinário em funcionamento.' }
    ]
  },
  {
    slug: 'seguranca-para-prefeituras',
    nome: 'Segurança para Prefeituras',
    h1: (c, uf) => `Segurança para Prefeituras em ${c}, ${uf}`,
    title: (c, uf) => tituloSeo('Segurança para Prefeituras', c, uf),
    desc: (c, uf) => `Segurança para prefeituras e órgãos públicos em ${c}, ${uf}. Vigilância patrimonial para prédios públicos e secretarias. Solicite proposta.`,
    hero: c => `A Santo Onofre fornece segurança para prefeituras e órgãos públicos em <strong>${c}</strong>: vigilantes para prédios da administração pública, câmaras municipais e secretarias, com controle de acesso e vigilância discreta.`,
    badge: 'Segurança Pública',
    faq: [
      { p: 'Prefeituras podem contratar segurança privada?', r: 'Sim. Prefeituras e órgãos públicos municipais podem contratar empresas de segurança privada para prédios e instalações, via licitação conforme a legislação.' },
      { p: 'A Santo Onofre tem experiência em segurança de órgãos públicos?', r: 'Sim. Atendemos secretarias municipais e câmaras com profissionais treinados para o ambiente de atendimento ao cidadão.' }
    ]
  },
  {
    slug: 'seguranca-para-comercios',
    nome: 'Segurança para Comércios',
    h1: (c, uf) => `Segurança para Comércios em ${c}, ${uf}`,
    title: (c, uf) => tituloSeo('Segurança para Comércios', c, uf),
    desc: (c, uf) => `Segurança para comércios em ${c}, ${uf}. Vigilantes, câmeras e prevenção de perdas para lojas e estabelecimentos. Solicite proposta.`,
    hero: c => `A Santo Onofre protege estabelecimentos comerciais em <strong>${c}</strong>: lojas, supermercados, atacados e centros comerciais, com vigilantes de prevenção de perdas, controle de acesso e monitoramento eletrônico.`,
    badge: 'Segurança Comercial',
    faq: [
      { p: 'Como reduzir perdas por furto no comércio?', r: 'A combinação de vigilantes de prevenção de perdas, câmeras estrategicamente posicionadas e controle de acesso reduz significativamente o furto por shoplifting e desvio interno.' },
      { p: 'A Santo Onofre atende pequenos comércios?', r: 'Sim. Temos planos acessíveis para pequenos e médios estabelecimentos, com opções de vigilante fixo, rondas periódicas ou monitoramento eletrônico.' }
    ]
  },
  {
    slug: 'seguranca-para-condominio',
    nome: 'Segurança para Condomínio',
    h1: (c, uf) => `Segurança para Condomínio em ${c}, ${uf}`,
    title: (c, uf) => tituloSeo('Segurança para Condomínio', c, uf),
    desc: (c, uf) => `Segurança para condomínios em ${c}, ${uf}. Vigilantes, portaria profissional e monitoramento 24h. Solicite proposta gratuita.`,
    hero: c => `A Santo Onofre oferece segurança completa para condomínios em <strong>${c}</strong>: porteiros treinados, vigilantes patrimoniais, controle de acesso eletrônico e monitoramento 24 horas para tranquilidade de moradores e condôminos.`,
    badge: 'Segurança para Condomínios',
    faq: [
      { p: 'Como melhorar a segurança do meu condomínio?', r: 'Combinamos portaria profissional, vigilância patrimonial, câmeras CFTV, iluminação de segurança e controle de acesso para criar múltiplas camadas de proteção.' },
      { p: 'A Santo Onofre atende condomínios horizontais?', r: 'Sim. Atendemos condomínios verticais e horizontais de todos os portes, dimensionando equipes e tecnologia conforme as características de cada empreendimento.' }
    ]
  },
  {
    slug: 'seguranca-para-escolas',
    nome: 'Segurança para Escolas',
    h1: (c, uf) => `Segurança para Escolas em ${c}, ${uf}`,
    title: (c, uf) => tituloSeo('Segurança para Escolas', c, uf),
    desc: (c, uf) => `Segurança para escolas em ${c}, ${uf}. Controle de acesso, vigilância discreta e proteção de alunos e funcionários. Solicite proposta.`,
    hero: c => `A Santo Onofre fornece segurança especializada para escolas e instituições de ensino em <strong>${c}</strong>: controle de acesso de alunos, responsáveis e visitantes, vigilância discreta no entorno e monitoramento eletrônico.`,
    badge: 'Segurança Escolar',
    faq: [
      { p: 'Como garantir segurança em ambiente escolar?', r: 'Controle rigoroso de quem entra e sai, identificação de visitantes, câmeras nas áreas externas e vigilantes com abordagem discreta são as bases da segurança escolar.' },
      { p: 'A Santo Onofre tem abordagem adequada para ambiente escolar?', r: 'Sim. Nossos vigilantes são treinados para atuar de forma discreta e não intimidadora em ambientes educacionais, priorizando o bem-estar dos alunos.' }
    ]
  },
  {
    slug: 'seguranca-para-hospitais',
    nome: 'Segurança para Hospitais',
    h1: (c, uf) => `Segurança para Hospitais e Clínicas em ${c}, ${uf}`,
    title: (c, uf) => tituloSeo('Segurança para Hospitais', c, uf),
    desc: (c, uf) => `Segurança para hospitais e clínicas em ${c}, ${uf}. Controle de acesso e vigilância 24h para ambientes de saúde. Solicite proposta.`,
    hero: c => `A Santo Onofre oferece segurança especializada para hospitais, clínicas e centros de saúde em <strong>${c}</strong>. Profissionais discretos, com controle de acesso a áreas restritas e vigilância 24 horas respeitando o ambiente de saúde.`,
    badge: 'Segurança Hospitalar',
    faq: [
      { p: 'Quais os desafios de segurança em hospitais?', r: 'Controle de acesso em UTIs, proteção de medicamentos e equipamentos de alto valor, gestão de visitantes e segurança em emergências são os principais desafios hospitalares.' },
      { p: 'A Santo Onofre treina vigilantes para ambientes de saúde?', r: 'Sim. Treinamos com protocolos específicos para hospitais e clínicas, incluindo abordagem respeitosa a pacientes e familiares e coordenação com equipes de saúde.' }
    ]
  },
  {
    slug: 'cameras-de-seguranca',
    nome: 'Câmeras de Segurança',
    h1: (c, uf) => `Câmeras de Segurança em ${c}, ${uf}`,
    title: (c, uf) => tituloSeo('Câmeras de Segurança', c, uf),
    desc: c => `Câmeras de segurança em ${c} com instalação profissional. Sistemas CFTV, câmeras IP e monitoramento 24h. Santo Onofre Serviços.`,
    hero: c => `A Santo Onofre fornece e instala câmeras de segurança em <strong>${c}</strong>: sistemas CFTV analógicos e digitais, câmeras IP de alta resolução, gravação em nuvem e monitoramento remoto para empresas, condomínios e comércios.`,
    badge: 'Câmeras de Segurança',
    faq: [
      { p: 'Que tipo de câmera é indicada para ambientes externos?', r: 'Para áreas externas indicamos câmeras IP com proteção IP66/67 contra chuva e poeira, visão noturna infravermelho e resolução Full HD a 4K, garantindo imagens nítidas em qualquer condição climática.' },
      { p: 'As câmeras da Santo Onofre gravam em nuvem?', r: 'Sim. Oferecemos gravação local em DVR/NVR e também em nuvem, com acesso remoto pelo smartphone para visualizar as imagens em tempo real de qualquer lugar.' },
      { p: 'A Santo Onofre atende condomínios?', r: 'Sim. Fornecemos e instalamos sistemas de câmeras para condomínios residenciais e comerciais, cobrindo portarias, garagens, áreas comuns e perímetro externo.' },
      { p: 'Qual o prazo de instalação?', r: 'Após a visita técnica e definição do projeto, a instalação costuma ser concluída em poucos dias úteis, conforme a quantidade de câmeras e a complexidade do local.' }
    ]
  },
  {
    slug: 'recepcionista',
    nome: 'Recepcionista Profissional',
    h1: (c, uf) => `Recepcionista Profissional em ${c}, ${uf}`,
    title: (c, uf) => tituloSeo('Recepcionista', c, uf),
    desc: c => `Recepcionista profissional em ${c} para empresas e condomínios. Atendimento, triagem e controle de acesso. Santo Onofre Serviços.`,
    hero: c => `A Santo Onofre disponibiliza recepcionistas treinadas para atendimento ao público, triagem de visitantes e controle de entrada em empresas, condomínios e clínicas em <strong>${c}</strong>.`,
    badge: 'Recepcionista Profissional',
    faq: [
      { p: 'Qual a diferença entre recepcionista e porteiro?', r: 'A recepcionista foca no atendimento ao público, agendamentos e triagem de visitantes em ambientes corporativos como clínicas, escritórios e hotéis. O porteiro foca no controle de entrada e saída em ambiente residencial.' },
      { p: 'A recepcionista da Santo Onofre faz triagem de visitantes?', r: 'Sim. Nossas recepcionistas são treinadas para identificar e registrar visitantes, direcionar atendimentos e seguir os protocolos de acesso definidos pelo cliente.' },
      { p: 'Atendem condomínios residenciais?', r: 'Sim. Disponibilizamos recepcionistas para condomínios residenciais e comerciais, com foco em atendimento cordial a moradores e visitantes.' },
      { p: 'O serviço pode ser contratado por período parcial?', r: 'Sim. Oferecemos contratos para jornada integral, meio período ou horários específicos, conforme a necessidade da sua empresa ou condomínio.' }
    ]
  },
  {
    slug: 'vigia-profissional',
    nome: 'Vigia Profissional',
    h1: (c, uf) => `Vigia Profissional em ${c}, ${uf}`,
    title: (c, uf) => tituloSeo('Vigia Profissional', c, uf),
    desc: c => `Vigia profissional em ${c} para empresas e condomínios. Observação patrimonial e controle de perímetro 24h. Santo Onofre Serviços.`,
    hero: c => `A Santo Onofre disponibiliza vigias profissionais treinados para observação patrimonial, controle de perímetro e dissuasão de ocorrências em empresas, comércios e condomínios em <strong>${c}</strong>.`,
    badge: 'Vigia Profissional',
    faq: [
      { p: 'Qual a diferença entre vigia e vigilante armado?', r: 'O vigia profissional da Santo Onofre atua em observação patrimonial e apoio operacional, sem porte de arma ou atribuições regulamentadas pela Polícia Federal. O foco é a presença ostensiva e o controle de perímetro.' },
      { p: 'O vigia da Santo Onofre trabalha à noite?', r: 'Sim. Disponibilizamos vigias em regime diurno, noturno ou 24 horas, conforme a necessidade de observação patrimonial do seu negócio.' },
      { p: 'Atendem condomínios?', r: 'Sim. Disponibilizamos vigias profissionais para condomínios, comércios, galpões e empresas de todos os portes.' },
      { p: 'É possível contratar vigia por escala ou turno?', r: 'Sim. Montamos escalas por turno fixo, revezamento ou cobertura 24 horas, de acordo com o perfil de risco e o horário de funcionamento do local.' }
    ]
  },
  {
    slug: 'controlador-de-acesso',
    nome: 'Controlador de Acesso',
    h1: (c, uf) => `Controlador de Acesso em ${c}, ${uf}`,
    title: (c, uf) => tituloSeo('Controlador de Acesso', c, uf),
    desc: c => `Controlador de acesso em ${c}: gestão presencial de entrada e saída para empresas e condomínios. Santo Onofre Serviços.`,
    hero: c => `A Santo Onofre fornece controladores de acesso profissionais treinados para gestão presencial de entrada e saída de pessoas e veículos em empresas, indústrias e condomínios em <strong>${c}</strong>.`,
    badge: 'Controlador de Acesso',
    faq: [
      { p: 'O que faz um controlador de acesso?', r: 'O controlador de acesso é o profissional responsável pela gestão presencial de entrada e saída de pessoas e veículos, identificação de visitantes e registro de movimentações em empresas, indústrias e condomínios.' },
      { p: 'Qual a diferença entre controlador de acesso e porteiro?', r: 'O controlador de acesso tem foco operacional em ambientes empresariais e industriais, com protocolos de identificação e registro mais rígidos. O porteiro tem perfil mais voltado ao atendimento residencial em condomínios.' },
      { p: 'O controlador registra entradas e saídas?', r: 'Sim. Mantemos registro detalhado de visitantes, prestadores de serviço e veículos, com relatórios periódicos para o cliente.' },
      { p: 'Atendem obras e canteiros?', r: 'Sim. Disponibilizamos controladores de acesso para canteiros de obras, controlando a entrada de trabalhadores, fornecedores e veículos.' }
    ]
  },
  {
    slug: 'porteiro',
    nome: 'Porteiro',
    h1: (c, uf) => `Porteiro em ${c}, ${uf}`,
    title: (c, uf) => tituloSeo('Porteiro', c, uf),
    desc: c => `Porteiro profissional em ${c} para condomínios, prédios e empresas. Triagem e controle de acesso. Santo Onofre Serviços.`,
    hero: c => `A Santo Onofre disponibiliza porteiros profissionais para condomínios, prédios comerciais, empresas e estabelecimentos em <strong>${c}</strong>. Triagem, identificação de visitantes e controle de entrada com registro completo.`,
    badge: 'Porteiro Profissional',
    faq: [
      { p: 'Qual a diferença entre porteiro e controlador de acesso?', r: 'O porteiro tem perfil mais voltado ao atendimento e triagem em condomínios e prédios. O controlador de acesso atua em ambientes empresariais e industriais, com protocolos de registro mais rígidos para pessoas e veículos.' },
      { p: 'O porteiro da Santo Onofre trabalha em turnos de 12h?', r: 'Sim. Montamos escalas de 12x36, diurnas, noturnas ou cobertura 24 horas, conforme a necessidade do condomínio ou empresa.' },
      { p: 'Atendem condomínios horizontais?', r: 'Sim. Disponibilizamos porteiros para condomínios horizontais e verticais, prédios comerciais, empresas e estabelecimentos de todos os portes.' },
      { p: 'É possível terceirizar apenas o porteiro do turno noturno?', r: 'Sim. Oferecemos contratação de turnos específicos, incluindo apenas o período noturno, conforme a necessidade do cliente.' }
    ]
  }
];

// ============================================================
// CIDADES — dados ricos para as 30 principais
// ============================================================
const cidadesRicas = [
  { nome: 'Belo Horizonte', slug: 'belo-horizonte', uf: 'MG', ufNome: 'Minas Gerais', desc: 'Belo Horizonte é a capital de Minas Gerais e um dos maiores centros empresariais do Brasil, com mais de 2,7 milhões de habitantes. A alta concentração de empresas, condomínios comerciais e industriais torna a segurança patrimonial uma necessidade estratégica. A Santo Onofre atua em todos os bairros da capital com equipes treinadas e resposta rápida.', bairros: 'Savassi, Lourdes, Buritis, Barreiro, Venda Nova, Pampulha, Centro, Santa Efigênia', faq: [{ p: 'A Santo Onofre atende condomínios residenciais em BH?', r: 'Sim. Atendemos condomínios verticais e horizontais em todos os bairros de Belo Horizonte, com porteiros, vigilantes e controle de acesso eletrônico.' }, { p: 'Qual o prazo para início do serviço em Belo Horizonte?', r: 'Após a assinatura do contrato, conseguimos iniciar em até 5 dias úteis na capital, dependendo do porte da operação.' }] },
  { nome: 'Uberlândia', slug: 'uberlandia', uf: 'MG', ufNome: 'Minas Gerais', desc: 'Uberlândia é o segundo maior município de Minas Gerais e o maior do Triângulo Mineiro, com forte vocação comercial e logística. O crescimento do setor atacadista, industrial e de galpões de distribuição aumenta a demanda por vigilância profissional. A Santo Onofre oferece soluções completas para empresas e condomínios em toda a cidade.', bairros: 'Centro, Santa Mônica, Tibery, Jardim Karaíba, Morada da Colina, Planalto, Industrial', faq: [{ p: 'Vocês atendem galpões e centros de distribuição em Uberlândia?', r: 'Sim. Temos experiência em segurança para galpões logísticos com vigilância armada, controle de acesso de veículos e monitoramento por câmeras.' }, { p: 'É possível contratar segurança para eventos corporativos em Uberlândia?', r: 'Sim, oferecemos equipes para eventos corporativos, formaturas e feiras em Uberlândia e toda a região do Triângulo.' }] },
  { nome: 'Contagem', slug: 'contagem', uf: 'MG', ufNome: 'Minas Gerais', desc: 'Contagem é o maior polo industrial da Região Metropolitana de Belo Horizonte, abrigando centenas de indústrias nos distritos industriais do Riacho e Nacional. A proteção de ativos industriais e controle de acesso são demandas constantes das empresas locais. A Santo Onofre atende indústrias de todos os portes em Contagem.', bairros: 'Riacho das Pedras, Nacional, Eldorado, Cinco, Industrial Sinduscon, Ressaca', faq: [{ p: 'Vocês atendem indústrias e fábricas em Contagem?', r: 'Sim. Temos experiência específica em segurança industrial, incluindo controle de acesso de caminhões, vigilância de perímetro e monitoramento de turno noturno.' }, { p: 'Como funciona o controle de acesso para empresas com muitos funcionários em Contagem?', r: 'Utilizamos sistemas eletrônicos com catracas, leitores biométricos ou por cartão, integrados à vigilância presencial, garantindo rastreabilidade total.' }] },
  { nome: 'Juiz de Fora', slug: 'juiz-de-fora', uf: 'MG', ufNome: 'Minas Gerais', desc: 'Juiz de Fora é o principal centro da Zona da Mata Mineira, com destaque para os setores de comércio, saúde e educação. A cidade abriga grandes hospitais, shoppings e campus universitários que demandam segurança profissional. A Santo Onofre oferece vigilância especializada para o perfil comercial e institucional de Juiz de Fora.', bairros: 'Centro, São Mateus, Cascatinha, Graminha, Alto dos Passos, Benfica, Jardim Glória', faq: [{ p: 'Vocês atendem estabelecimentos de saúde em Juiz de Fora?', r: 'Sim. Temos experiência em segurança para clínicas, hospitais e laboratórios, com abordagem discreta e treinamento específico para ambientes de saúde.' }, { p: 'A Santo Onofre faz segurança para shoppings em JF?', r: 'Sim, atendemos centros comerciais com equipes de segurança operacional, controle de fluxo e prevenção de perdas.' }] },
  { nome: 'Betim', slug: 'betim', uf: 'MG', ufNome: 'Minas Gerais', desc: 'Betim é um dos maiores polos industriais do Brasil, sede de grandes empresas do setor automotivo e petroquímico. A proteção de instalações industriais de grande porte, com acesso controlado 24 horas e vigilância armada, é a principal demanda das empresas betinenses.', bairros: 'PTB, Citrolândia, Braúnas, Centro, Imbiruçu, Jardim das Alterosas, Industrial', faq: [{ p: 'A Santo Onofre atende empresas do setor automotivo em Betim?', r: 'Sim. Temos protocolos para indústrias do setor automotivo, incluindo controle de acesso de fornecedores e vigilância de pátios.' }, { p: 'É possível fazer segurança em turnos noturnos nas fábricas de Betim?', r: 'Sim, oferecemos cobertura ininterrupta com vigilantes treinados para operação noturna, rondas e comunicação com central de monitoramento.' }] },
  { nome: 'Montes Claros', slug: 'montes-claros', uf: 'MG', ufNome: 'Minas Gerais', desc: 'Montes Claros é o principal centro urbano do Norte de Minas Gerais, com forte crescimento do setor de serviços, saúde e comércio atacadista. A posição estratégica como polo regional faz da cidade um ponto de convergência de negócios que exigem segurança profissional.', bairros: 'Centro, Ibituruna, Major Prates, Morada do Parque, Cintra, São João, Augusta Mota', faq: [{ p: 'Vocês atendem empresas do comércio atacadista em Montes Claros?', r: 'Sim. Atendemos distribuidoras, depósitos e centros atacadistas com segurança de perímetro, controle de acesso e monitoramento por câmeras.' }, { p: 'A Santo Onofre tem cobertura em toda a área urbana de Montes Claros?', r: 'Sim, atendemos todos os bairros e distritos industriais de Montes Claros.' }] },
  { nome: 'Ribeirão das Neves', slug: 'ribeirao-das-neves', uf: 'MG', ufNome: 'Minas Gerais', desc: 'Ribeirão das Neves integra a Região Metropolitana de Belo Horizonte e tem registrado crescimento populacional e comercial expressivo. O aumento de condomínios residenciais, comércios e pequenas indústrias cria demanda crescente por serviços de segurança acessíveis e eficientes.', bairros: 'Centro, Justinópolis, Bairro das Neves, Veneza, Areias, Sevilha, Areias II', faq: [{ p: 'Vocês atendem pequenas empresas e comércios em Ribeirão das Neves?', r: 'Sim. Oferecemos planos acessíveis para pequenos e médios estabelecimentos, com vigilante fixo ou rondas programadas.' }, { p: 'Qual a diferença entre vigilância e portaria em condomínios de Ribeirão das Neves?', r: 'O porteiro faz triagem e atendimento, enquanto o vigilante patrimonial tem poder de agir em situações de risco. Oferecemos os dois serviços integrados.' }] },
  { nome: 'Uberaba', slug: 'uberaba', uf: 'MG', ufNome: 'Minas Gerais', desc: 'Uberaba é polo agropecuário e biotecnológico do Triângulo Mineiro, sede de grandes empresas do setor de genética bovina e agronegócio. A crescente demanda por segurança em fazendas, centros de pesquisa, shoppings e indústrias faz de Uberaba um mercado em expansão.', bairros: 'Centro, Mercês, Abadia, Boa Vista, Fabrício, Lídice, São Benedito', faq: [{ p: 'A Santo Onofre atende empresas do agronegócio em Uberaba?', r: 'Sim. Temos experiência em segurança para centros de pesquisa, unidades agroindustriais e instalações de alto valor.' }, { p: 'Vocês fazem segurança para eventos de exposição agropecuária em Uberaba?', r: 'Sim, oferecemos equipes para grandes eventos como feiras e exposições, com controle de fluxo e segurança de instalações.' }] },
  { nome: 'Governador Valadares', slug: 'governador-valadares', uf: 'MG', ufNome: 'Minas Gerais', desc: 'Governador Valadares é o principal centro comercial e de serviços do Vale do Rio Doce, concentrando atacadistas, redes de varejo e empresas de logística regional. A dinamicidade comercial da cidade exige vigilância profissional com agilidade de resposta.', bairros: 'Centro, Turmalina, Bom Jardim, Costa Rica, Vila Bretas, Altinópolis, Esperança', faq: [{ p: 'Vocês atendem comércios e distribuidoras no centro de Governador Valadares?', r: 'Sim. Atendemos estabelecimentos comerciais de todos os portes, com vigilantes fixos, rondas e monitoramento por câmeras.' }, { p: 'É possível contratar segurança avulsa para eventos em Governador Valadares?', r: 'Sim, oferecemos segurança avulsa e pontual para eventos sem necessidade de contrato de longa duração.' }] },
  { nome: 'Ipatinga', slug: 'ipatinga', uf: 'MG', ufNome: 'Minas Gerais', desc: 'Ipatinga integra o Vale do Aço e é sede de grandes usinas siderúrgicas, tornando-se um polo industrial de relevância nacional. A proteção de instalações industriais, controle de acesso de trabalhadores e segurança de perímetro são as principais demandas locais.', bairros: 'Centro, Horto, Cariru, Bom Retiro, Bela Vista, Vila Celeste, Castelo', faq: [{ p: 'A Santo Onofre atende empresas do setor siderúrgico em Ipatinga?', r: 'Sim. Temos profissionais treinados para atuar em ambientes industriais de alta complexidade, com foco em segurança de perímetro.' }, { p: 'Vocês cobrem toda a região do Vale do Aço?', r: 'Sim, além de Ipatinga atendemos também Coronel Fabriciano, Timóteo e municípios vizinhos.' }] },
  { nome: 'Sete Lagoas', slug: 'sete-lagoas', uf: 'MG', ufNome: 'Minas Gerais', desc: 'Sete Lagoas é um importante polo industrial e comercial da região central de Minas Gerais, com destaque para os setores metalúrgico, alimentício e de logística. A cidade registra crescimento constante de condomínios empresariais e indústrias que demandam segurança profissional.', bairros: 'Centro, Eldorado, São João, Santo Antônio, Fazenda Velha, Várzea, Jardim Arizona', faq: [{ p: 'Vocês atendem condomínios empresariais em Sete Lagoas?', r: 'Sim. Oferecemos vigilância para condomínios empresariais com controle de acesso de veículos, rondas e monitoramento 24 horas.' }, { p: 'A Santo Onofre faz segurança para o setor alimentício em Sete Lagoas?', r: 'Sim, atendemos indústrias alimentícias com protocolos adaptados às normas do setor.' }] },
  { nome: 'Divinópolis', slug: 'divinopolis', uf: 'MG', ufNome: 'Minas Gerais', desc: 'Divinópolis é o maior polo têxtil e de confecções de Minas Gerais, além de concentrar indústrias metalúrgicas e de alimentos. O grande volume de mercadorias circulando torna a segurança patrimonial essencial para os negócios locais.', bairros: 'Centro, Niterói, Sidil, São José, Interlagos, Belvedere, Danilo Passos', faq: [{ p: 'A Santo Onofre atende empresas do setor têxtil em Divinópolis?', r: 'Sim. Temos experiência em segurança para fábricas de confecções e centros de distribuição, com controle de acesso e monitoramento de estoque.' }, { p: 'Vocês atendem condomínios residenciais em Divinópolis?', r: 'Sim, oferecemos portaria profissional e vigilância para condomínios em todos os bairros de Divinópolis.' }] },
  { nome: 'Santa Luzia', slug: 'santa-luzia', uf: 'MG', ufNome: 'Minas Gerais', desc: 'Santa Luzia integra a Região Metropolitana de Belo Horizonte e tem crescimento expressivo nos setores de comércio e serviços. A proximidade com a capital e o aumento de condomínios residenciais e empresariais elevam a demanda por segurança profissional.', bairros: 'Centro, Palmital, Salgado Filho, Jardim Alterosas, São Benedito, Nova Pampulha, Floramar', faq: [{ p: 'A Santo Onofre atende condomínios residenciais em Santa Luzia?', r: 'Sim. Oferecemos portaria profissional, vigilância patrimonial e controle de acesso para condomínios em Santa Luzia.' }, { p: 'Qual o tempo de resposta para atendimento em Santa Luzia?', r: 'Como cidade da RMBH, Santa Luzia conta com cobertura rápida e equipes locais para atendimentos urgentes.' }] },
  { nome: 'Ibirité', slug: 'ibirite', uf: 'MG', ufNome: 'Minas Gerais', desc: 'Ibirité é um dos municípios da RMBH com maior crescimento populacional recente, impulsionado pela expansão de condomínios residenciais e comércios locais. A demanda por segurança em novos empreendimentos cresce junto com a cidade.', bairros: 'Centro, Jardim das Oliveiras, Jardim Leblon, Milionários, São Francisco, Parque Durval', faq: [{ p: 'Vocês atendem novos empreendimentos residenciais em Ibirité?', r: 'Sim. Atendemos condomínios em fase de implantação e consolidados, com equipes treinadas e contratos flexíveis.' }, { p: 'A Santo Onofre faz rondas noturnas em Ibirité?', r: 'Sim, oferecemos rondas ostensivas em horários programados para negócios e condomínios que precisam de cobertura sem vigilante fixo.' }] },
  { nome: 'Poços de Caldas', slug: 'pocos-de-caldas', uf: 'MG', ufNome: 'Minas Gerais', desc: 'Poços de Caldas é um importante polo turístico e comercial do Sul de Minas Gerais, com forte presença do setor de hotelaria, eventos e comércio. A segurança em hotéis, centros de convenções e shoppings é uma necessidade permanente.', bairros: 'Centro, Jardim Quisisana, Alto da Bela Vista, Cascata, São Sebastião, Jardim Esperança', faq: [{ p: 'Vocês atendem hotéis e resorts em Poços de Caldas?', r: 'Sim. Temos experiência em segurança para meios de hospedagem, com porteiros treinados e vigilantes discretos.' }, { p: 'A Santo Onofre faz segurança para eventos em Poços de Caldas?', r: 'Sim, oferecemos equipes para eventos corporativos, convenções e feiras com controle de acesso e segurança operacional.' }] },
  { nome: 'Patos de Minas', slug: 'patos-de-minas', uf: 'MG', ufNome: 'Minas Gerais', desc: 'Patos de Minas é polo agroindustrial do Alto Paranaíba, com destaque para o processamento de grãos, frigoríficos e cooperativas agropecuárias. A movimentação de mercadorias de alto valor exige vigilância especializada com controle rigoroso de acesso.', bairros: 'Centro, Alvorada, Nações, Padre Cícero, Santa Terezinha, Jardim Esperança, Industrial', faq: [{ p: 'A Santo Onofre atende cooperativas e agroindústrias em Patos de Minas?', r: 'Sim. Temos experiência em segurança para unidades agroindustriais, silos, frigoríficos e cooperativas.' }, { p: 'Vocês fazem segurança para transporte de cargas em Patos de Minas?', r: 'Oferecemos segurança de instalações, controle de acesso de veículos e monitoramento de pátios para empresas de transporte.' }] },
  { nome: 'Pouso Alegre', slug: 'pouso-alegre', uf: 'MG', ufNome: 'Minas Gerais', desc: 'Pouso Alegre é um polo industrial e de serviços do Sul de Minas Gerais, com crescimento expressivo no setor de indústrias farmacêuticas, metalúrgicas e de logística. A posição estratégica às margens da Fernão Dias faz da cidade um hub logístico que demanda segurança profissional.', bairros: 'Centro, Miriam, Fátima, Jardim das Nações, Bela Vista, Alto da Boa Vista, Industrial', faq: [{ p: 'Vocês atendem indústrias farmacêuticas em Pouso Alegre?', r: 'Sim. Oferecemos segurança para instalações farmacêuticas com rigoroso controle de acesso e monitoramento 24h.' }, { p: 'A Santo Onofre faz segurança em centros logísticos em Pouso Alegre?', r: 'Sim, atendemos centros de distribuição e galpões logísticos na região, com controle de acesso de caminhões.' }] },
  { nome: 'Teófilo Otoni', slug: 'teofilo-otoni', uf: 'MG', ufNome: 'Minas Gerais', desc: 'Teófilo Otoni é o principal centro comercial do Vale do Mucuri e referência nacional no comércio de gemas e pedras preciosas. O alto valor das mercadorias comercializadas torna a segurança patrimonial uma exigência do setor.', bairros: 'Centro, Fátima, Minas Brasil, Santa Rita, Palmeiras, Ipiranga, Vila Cel. Oliveira', faq: [{ p: 'A Santo Onofre atende lojas de gemas e joalherias em Teófilo Otoni?', r: 'Sim. Oferecemos segurança para estabelecimentos do comércio gemológico com vigilantes treinados para ambientes de alto valor.' }, { p: 'Vocês fazem segurança em eventos do setor gemológico em Teófilo Otoni?', r: 'Sim, oferecemos segurança de instalações e acompanhamento em eventos e feiras do setor realizados em Teófilo Otoni.' }] },
  { nome: 'Barbacena', slug: 'barbacena', uf: 'MG', ufNome: 'Minas Gerais', desc: 'Barbacena é conhecida como a cidade das rosas e é polo regional do Campo das Vertentes, com destaque para os setores de saúde, educação e floricultura. A presença de grandes hospitais, faculdades e centros de distribuição de flores cria demandas específicas de segurança.', bairros: 'Centro, São Sebastião, Mangabeiras, Frei Orlando, Industrial, Jardim Marajá, Boa Vista', faq: [{ p: 'Vocês atendem hospitais e instituições de saúde em Barbacena?', r: 'Sim. Temos experiência em segurança hospitalar, com abordagem discreta e controle de acesso de visitantes.' }, { p: 'A Santo Onofre atende empresas do setor de floricultura em Barbacena?', r: 'Sim, oferecemos segurança para galpões de armazenamento e centros de distribuição de flores.' }] },
  { nome: 'Sabará', slug: 'sabara', uf: 'MG', ufNome: 'Minas Gerais', desc: 'Sabará é um município histórico da RMBH, com patrimônio arquitetônico barroco e crescente desenvolvimento industrial e residencial. A proteção de patrimônio histórico, instalações industriais e condomínios são as principais demandas de segurança local.', bairros: 'Centro Histórico, Carmo do Cajuru, Ravena, Mestre Caetano, Roças Novas', faq: [{ p: 'A Santo Onofre faz segurança para o patrimônio histórico de Sabará?', r: 'Sim. Oferecemos vigilância discreta para museus, igrejas históricas e imóveis tombados.' }, { p: 'Vocês atendem condomínios no distrito de Ravena em Sabará?', r: 'Sim, atendemos todos os distritos e localidades de Sabará, incluindo Ravena, com equipes próprias.' }] },
  { nome: 'Varginha', slug: 'varginha', uf: 'MG', ufNome: 'Minas Gerais', desc: 'Varginha é a capital do café e polo regional do Sul de Minas Gerais, com forte presença de tradings, torrefadoras e empresas do agronegócio cafeeiro. O alto valor das operações ligadas ao café eleva a demanda por vigilância patrimonial.', bairros: 'Centro, Jardim Andere, São Geraldo, Santa Luzia, Cândido Rodrigues, Industrial, Nova Varginha', faq: [{ p: 'A Santo Onofre atende tradings e empresas do setor cafeeiro em Varginha?', r: 'Sim. Oferecemos segurança para armazéns, torrefadoras e escritórios do setor cafeeiro.' }, { p: 'Vocês atendem o setor industrial de Varginha?', r: 'Sim, atendemos o distrito industrial de Varginha com vigilância de perímetro e controle de acesso de veículos.' }] },
  { nome: 'Conselheiro Lafaiete', slug: 'conselheiro-lafaiete', uf: 'MG', ufNome: 'Minas Gerais', desc: 'Conselheiro Lafaiete está no coração do Quadrilátero Ferrífero e é polo de mineração e siderurgia. A segurança de instalações de alto valor, equipamentos pesados e acesso de fornecedores é prioridade para as empresas locais.', bairros: 'Centro, Cachoeirinha, Industrial, Jardim Europa, São Joaquim, Belo Vale, Lavapés', faq: [{ p: 'A Santo Onofre atende mineradoras e siderúrgicas em Conselheiro Lafaiete?', r: 'Sim. Oferecemos segurança para instalações do setor mineral, com vigilância de perímetro e controle de acesso de veículos pesados.' }, { p: 'Vocês fazem segurança para escritórios corporativos de mineração na região?', r: 'Sim, atendemos escritórios e instalações de apoio das empresas do setor mineral.' }] },
  { nome: 'Viçosa', slug: 'vicosa', uf: 'MG', ufNome: 'Minas Gerais', desc: 'Viçosa é um polo universitário da Zona da Mata Mineira, sede da UFV e de dezenas de empresas de agropecuária e tecnologia. O fluxo intenso de estudantes e pesquisadores cria demandas específicas de segurança para o setor educacional e empresarial.', bairros: 'Centro, Silvestre, Nova Viçosa, Ramos, Centro Universitário, Passos, Santo Antônio', faq: [{ p: 'A Santo Onofre faz segurança para empresas de agritech em Viçosa?', r: 'Sim. Atendemos empresas de tecnologia agrícola, laboratórios e centros de pesquisa com controle de acesso e monitoramento.' }, { p: 'Vocês atendem condomínios residenciais em Viçosa?', r: 'Sim, atendemos condomínios residenciais formais em Viçosa com portaria e vigilância.' }] },
  { nome: 'Itabira', slug: 'itabira', uf: 'MG', ufNome: 'Minas Gerais', desc: 'Itabira é berço da mineração de ferro no Brasil e sede histórica da Vale. A presença de operações mineiras de grande escala, além de comércio e serviços, cria demanda constante por segurança patrimonial.', bairros: 'Centro, Melo Viana, Nova Itabira, Cubas, Bom Jesus, Ventura, Industrial', faq: [{ p: 'A Santo Onofre atende fornecedores da mineração em Itabira?', r: 'Sim. Atendemos empresas do ecossistema minerário com segurança de instalações, controle de acesso e monitoramento eletrônico.' }, { p: 'Vocês fazem segurança para os condomínios residenciais em Itabira?', r: 'Sim, atendemos condomínios horizontais e verticais em Itabira com portaria e vigilância patrimonial.' }] },
  { nome: 'Itaúna', slug: 'itauna', uf: 'MG', ufNome: 'Minas Gerais', desc: 'Itaúna é um município dinâmico do Centro-Oeste Mineiro, com destaque para o setor têxtil, metalúrgico e de bebidas. A variedade do parque industrial local exige soluções de segurança flexíveis e adaptadas.', bairros: 'Centro, Lagoa dos Patos, Novo Horizonte, São Geraldo, Industrial, Bom Jesus, Esplanada', faq: [{ p: 'Vocês atendem indústrias de bebidas e alimentação em Itaúna?', r: 'Sim. Temos experiência em segurança para indústrias do setor alimentício e de bebidas com protocolos adaptados.' }, { p: 'A Santo Onofre faz monitoramento eletrônico para empresas em Itaúna?', r: 'Sim, oferecemos instalação e monitoramento de sistemas CFTV integrados à vigilância presencial.' }] },
  { nome: 'Coronel Fabriciano', slug: 'coronel-fabriciano', uf: 'MG', ufNome: 'Minas Gerais', desc: 'Coronel Fabriciano integra o Vale do Aço junto com Ipatinga e Timóteo, formando um dos maiores polos industriais de Minas Gerais. A concentração de siderúrgicas, metalúrgicas e empresas de logística industrial na região cria alta demanda por segurança profissional.', bairros: 'Centro, Caladinho, Amaro Lanari, Olaria, Construção, Industrial, Girassóis', faq: [{ p: 'A Santo Onofre atende empresas metalúrgicas em Coronel Fabriciano?', r: 'Sim. Oferecemos segurança para instalações metalúrgicas com vigilância de perímetro e controle de acesso.' }, { p: 'Vocês cobrem os três municípios do Vale do Aço?', r: 'Sim, atendemos toda a região do Vale do Aço com equipes locais e cobertura integrada nos três municípios.' }] },
  { nome: 'Muriaé', slug: 'muriae', uf: 'MG', ufNome: 'Minas Gerais', desc: 'Muriaé é polo regional da Zona da Mata Mineira, com destaque para os setores de confecções, comércio atacadista e serviços de saúde. O dinamismo comercial e o crescimento de novos bairros residenciais aumentam a demanda por segurança patrimonial.', bairros: 'Centro, Aeroporto, São Cristóvão, São Judas Tadeu, Industrial, Bom Pastor, Santa Terezinha', faq: [{ p: 'Vocês atendem o setor de confecções em Muriaé?', r: 'Sim. Oferecemos segurança para centros de distribuição e lojas atacadistas com controle de acesso e vigilância de estoque.' }, { p: 'A Santo Onofre faz segurança para clínicas em Muriaé?', r: 'Sim, temos experiência em segurança para estabelecimentos de saúde com abordagem discreta.' }] },
  { nome: 'Araguari', slug: 'araguari', uf: 'MG', ufNome: 'Minas Gerais', desc: 'Araguari é polo agroindustrial do Triângulo Mineiro, com forte presença de cooperativas, cerealistas e empresas do setor de café e soja. A movimentação de grandes volumes de produtos agrícolas eleva a demanda por vigilância profissional.', bairros: 'Centro, Independência, Tabajaras, Santa Luzia, Dona Amélia, Industrial, Bom Jesus', faq: [{ p: 'A Santo Onofre atende cerealistas e cooperativas em Araguari?', r: 'Sim. Oferecemos segurança para silos, armazéns e cooperativas com vigilância de perímetro e controle de acesso.' }, { p: 'Vocês atendem o setor logístico em Araguari?', r: 'Sim, atendemos centros de distribuição e transportadoras com monitoramento eletrônico e vigilância de pátios.' }] },
  { nome: 'Ubá', slug: 'uba', uf: 'MG', ufNome: 'Minas Gerais', desc: 'Ubá é a capital moveleira de Minas Gerais e um dos maiores polos do setor de móveis do Brasil. A proteção de ativos industriais, estoques de alto valor e controle de acesso nas fábricas são demandas prioritárias do setor moveleiro.', bairros: 'Centro, São Sebastião, Industrial, Universitário, Boa Vista, Santa Luzia, Aeroporto', faq: [{ p: 'A Santo Onofre atende fábricas de móveis em Ubá?', r: 'Sim. Temos experiência em segurança para o polo moveleiro, com controle de acesso de funcionários e vigilância de estoque.' }, { p: 'Vocês fazem segurança para showrooms do polo moveleiro de Ubá?', r: 'Sim, atendemos showrooms e pontos de venda com vigilantes treinados e sistemas de monitoramento eletrônico.' }] },
  { nome: 'Lavras', slug: 'lavras', uf: 'MG', ufNome: 'Minas Gerais', desc: 'Lavras é polo universitário e agroindustrial do Sul de Minas, sede da UFLA e de empresas do setor de sementes, agroquímicos e agroindústria. O ambiente universitário e a presença de centros de pesquisa de alto valor criam demandas específicas de segurança.', bairros: 'Centro, Primavera, Jardim Glória, Nossa Senhora de Lourdes, Industrial, São Vicente', faq: [{ p: 'A Santo Onofre atende empresas do setor de sementes e agroquímicos em Lavras?', r: 'Sim. Oferecemos segurança para laboratórios, armazéns e centros de pesquisa do setor agrícola.' }, { p: 'Vocês fazem segurança para empresas que prestam serviço à UFLA em Lavras?', r: 'Sim, atendemos empresas parceiras e prestadoras de serviço do entorno universitário.' }] },
  { nome: 'São Paulo', slug: 'sao-paulo', uf: 'SP', ufNome: 'São Paulo', desc: 'São Paulo é a maior cidade do Brasil e o principal centro financeiro e corporativo da América Latina, com mais de 11 milhões de habitantes. A altíssima concentração de sedes empresariais, condomínios comerciais e residenciais de alto padrão torna a segurança patrimonial e o controle de acesso uma necessidade estratégica para negócios de todos os portes. A Santo Onofre atua nas principais regiões da capital paulista com equipes treinadas e resposta ágil.', bairros: 'Avenida Paulista, Itaim Bibi, Vila Olímpia, Moema, Pinheiros, Santana, Tatuapé, Santo Amaro', faq: [{ p: 'A Santo Onofre atende empresas e condomínios em toda São Paulo capital?', r: 'Sim. Atuamos nas principais regiões da capital, com foco em condomínios comerciais, torres corporativas e condomínios residenciais de médio e alto padrão.' }, { p: 'Qual o prazo para início do serviço em São Paulo?', r: 'Após a assinatura do contrato, conseguimos iniciar em até 5 dias úteis na capital, dependendo do porte da operação.' }] },
  { nome: 'Guarulhos', slug: 'guarulhos', uf: 'SP', ufNome: 'São Paulo', desc: 'Guarulhos é o segundo maior município do estado de São Paulo e sede do maior aeroporto internacional do Brasil, o que faz da cidade um polo logístico e industrial de relevância nacional. A alta concentração de galpões, centros de distribuição e empresas ligadas ao comércio exterior eleva a demanda por controle de acesso e vigilância patrimonial. A Santo Onofre atende empresas e condomínios em toda a extensão de Guarulhos.', bairros: 'Centro, Cumbica, Vila Galvão, Bonsucesso, Cidade Soberana, Pimentas, Água Chata', faq: [{ p: 'Vocês atendem galpões e centros de distribuição próximos ao aeroporto em Guarulhos?', r: 'Sim. Temos experiência em segurança para operações logísticas e de comércio exterior, com controle de acesso de veículos e monitoramento de cargas.' }, { p: 'A Santo Onofre atende condomínios residenciais em Guarulhos?', r: 'Sim, atendemos condomínios verticais e horizontais em toda a cidade, com porteiros, vigilantes e controle de acesso eletrônico.' }] },
  { nome: 'Santo André', slug: 'santo-andre', uf: 'SP', ufNome: 'São Paulo', desc: 'Santo André é um dos municípios centrais do ABC Paulista, região historicamente ligada à indústria automotiva e metalúrgica brasileira. A combinação de parques industriais consolidados com um centro comercial denso e condomínios residenciais cria demanda constante por segurança patrimonial profissional. A Santo Onofre atende empresas e condomínios em toda Santo André.', bairros: 'Centro, Vila Assunção, Jardim, Bairro Casa Branca, Utinga, Vila Guiomar, Paraíso', faq: [{ p: 'Vocês atendem empresas do setor industrial do ABC em Santo André?', r: 'Sim. Temos experiência em segurança para plantas industriais e metalúrgicas, com controle de acesso de fornecedores e vigilância de perímetro.' }, { p: 'A Santo Onofre atende condomínios comerciais no centro de Santo André?', r: 'Sim, atendemos edifícios comerciais e condomínios residenciais no centro e nos principais bairros da cidade.' }] },
  { nome: 'São Bernardo do Campo', slug: 'sao-bernardo-do-campo', uf: 'SP', ufNome: 'São Paulo', desc: 'São Bernardo do Campo é o coração industrial do ABC Paulista, sede histórica de grandes montadoras e fornecedores do setor automotivo. A presença de plantas industriais de grande porte, com acesso controlado 24 horas e vigilância de perímetro, é a principal demanda das empresas locais. A Santo Onofre tem expertise no atendimento a indústrias de alto padrão de segurança.', bairros: 'Centro, Rudge Ramos, Baeta Neves, Anchieta, Assunção, Demarchi, Jardim do Mar', faq: [{ p: 'A Santo Onofre atende empresas do setor automotivo em São Bernardo do Campo?', r: 'Sim. Temos protocolos específicos para o setor automotivo, incluindo controle de acesso de fornecedores, vigilância de pátios e monitoramento de ativos.' }, { p: 'É possível fazer segurança em turnos noturnos nas fábricas de SBC?', r: 'Sim, oferecemos cobertura ininterrupta com vigilantes treinados para operação noturna, rondas e comunicação com central de monitoramento.' }] },
  { nome: 'Osasco', slug: 'osasco', uf: 'SP', ufNome: 'São Paulo', desc: 'Osasco é um dos principais polos financeiros e comerciais da Grande São Paulo, com forte presença de agências bancárias, torres corporativas e grandes centros comerciais. O intenso fluxo de pessoas em edifícios corporativos e shoppings exige controle de acesso rigoroso e orientação de público qualificada. A Santo Onofre atende empresas e condomínios em toda Osasco.', bairros: 'Centro, Presidente Altino, Vila Yara, Km 18, Jardim Piratininga, Bela Vista, Rochdale', faq: [{ p: 'Vocês atendem torres corporativas e agências bancárias em Osasco?', r: 'Sim. Temos experiência em segurança para edifícios corporativos e agências, com controle de acesso rigoroso e orientação de público.' }, { p: 'A Santo Onofre atende condomínios residenciais em Osasco?', r: 'Sim, atendemos condomínios de todos os portes com portaria profissional e vigilância patrimonial.' }] },
  { nome: 'Diadema', slug: 'diadema', uf: 'SP', ufNome: 'São Paulo', desc: 'Diadema integra o ABC Paulista e é conhecida por concentrar um dos maiores polos farmoquímicos e industriais do país, além de forte presença de pequenas e médias indústrias. A alta densidade de galpões e empresas exige vigilância patrimonial e controle de acesso rigoroso para proteção de ativos e insumos. A Santo Onofre atende o parque industrial de Diadema com equipes especializadas.', bairros: 'Centro, Piraporinha, Eldorado, Vila Nogueira, Campanário, Serraria, Inamar', faq: [{ p: 'A Santo Onofre atende indústrias químicas e farmacêuticas em Diadema?', r: 'Sim. Temos protocolos de controle de acesso e vigilância adaptados aos riscos específicos de plantas químicas e farmacêuticas.' }, { p: 'Vocês fazem segurança para pequenas indústrias em Diadema?', r: 'Sim, atendemos empresas de todos os portes, com planos de vigilância fixa ou rondas programadas conforme a necessidade.' }] },
  { nome: 'Barueri', slug: 'barueri', uf: 'SP', ufNome: 'São Paulo', desc: 'Barueri é um dos municípios mais dinâmicos da região oeste da Grande São Paulo, sede de Alphaville e de um dos maiores polos corporativos fora da capital. A concentração de sedes de empresas, condomínios residenciais de alto padrão e centros empresariais eleva a exigência por segurança patrimonial de alto nível. A Santo Onofre atende empresas e condomínios em toda Barueri.', bairros: 'Alphaville, Centro, Jardim Silveira, Aldeia da Serra, Tamboré, Jardim Belval', faq: [{ p: 'A Santo Onofre atende condomínios de alto padrão em Alphaville e Barueri?', r: 'Sim. Temos experiência em segurança para condomínios residenciais e comerciais de alto padrão, com portaria discreta e protocolos rigorosos.' }, { p: 'Vocês atendem sedes corporativas em Barueri?', r: 'Sim, oferecemos controle de acesso e vigilância para torres corporativas e centros empresariais da região.' }] },
  { nome: 'Mogi das Cruzes', slug: 'mogi-das-cruzes', uf: 'SP', ufNome: 'São Paulo', desc: 'Mogi das Cruzes é o principal polo comercial e agroindustrial do Alto Tietê, na região leste da Grande São Paulo, com forte presença de horticultura, comércio atacadista e indústrias. O crescimento constante de condomínios e empresas na região eleva a demanda por segurança patrimonial profissional. A Santo Onofre atende empresas e condomínios em toda Mogi das Cruzes.', bairros: 'Centro, Vila Oliveira, Braz Cubas, Jundiapeba, Cezar de Souza, Vila Nova União', faq: [{ p: 'Vocês atendem empresas do agronegócio e centrais de abastecimento em Mogi das Cruzes?', r: 'Sim. Temos experiência em segurança para centrais de abastecimento, entrepostos e propriedades rurais próximas à cidade.' }, { p: 'A Santo Onofre atende condomínios residenciais em Mogi das Cruzes?', r: 'Sim, atendemos condomínios verticais e horizontais com porteiros, vigilantes e controle de acesso eletrônico.' }] },
  { nome: 'Suzano', slug: 'suzano', uf: 'SP', ufNome: 'São Paulo', desc: 'Suzano é um importante polo industrial do Alto Tietê, reconhecido nacionalmente pelo setor de papel e celulose, além de concentrar comércio e condomínios em expansão. A presença de grandes plantas industriais e a movimentação constante de cargas exigem vigilância de perímetro e controle de acesso rigoroso. A Santo Onofre atende empresas e condomínios em toda Suzano.', bairros: 'Centro, Cidade Miguel Badra, Jardim Revista, Palmeiras, Jardim Imperial, Vila Amorim', faq: [{ p: 'A Santo Onofre atende indústrias de papel e celulose em Suzano?', r: 'Sim. Temos experiência em segurança industrial de grande porte, com controle de acesso de caminhões e vigilância de perímetro.' }, { p: 'Vocês atendem condomínios comerciais em Suzano?', r: 'Sim, oferecemos portaria profissional e vigilância patrimonial para condomínios comerciais e residenciais da cidade.' }] },
  { nome: 'Itaquaquecetuba', slug: 'itaquaquecetuba', uf: 'SP', ufNome: 'São Paulo', desc: 'Itaquaquecetuba é um dos municípios de maior crescimento populacional e comercial do Alto Tietê, na região leste da Grande São Paulo. A expansão acelerada de comércios, pequenas indústrias e condomínios residenciais aumenta a demanda por serviços de segurança acessíveis e eficientes. A Santo Onofre atende empresas e residências em toda Itaquaquecetuba.', bairros: 'Centro, Cidade Kemel, Jardim Textil, Vila Vitória, Jardim Nossa Senhora Auxiliadora', faq: [{ p: 'Vocês atendem pequenas empresas e comércios em Itaquaquecetuba?', r: 'Sim. Oferecemos planos acessíveis para pequenos e médios estabelecimentos, com vigilante fixo ou rondas programadas.' }, { p: 'A Santo Onofre faz rondas noturnas em Itaquaquecetuba?', r: 'Sim, oferecemos rondas ostensivas em horários programados para negócios e condomínios que precisam de cobertura sem vigilante fixo.' }] },
  { nome: 'São José dos Campos', slug: 'sao-jose-dos-campos', uf: 'SP', ufNome: 'São Paulo', desc: 'São José dos Campos é a maior cidade do Vale do Paraíba e um dos principais polos tecnológicos e aeroespaciais do Brasil, sede de grandes empresas de engenharia e de institutos de pesquisa. A presença de instalações de alta tecnologia e parques industriais de grande porte exige segurança patrimonial especializada e controle de acesso rigoroso. A Santo Onofre atende empresas e condomínios em toda São José dos Campos.', bairros: 'Centro, Jardim Aquarius, Urbanova, Vila Adyana, Jardim Satélite, Putim, Eugênio de Melo', faq: [{ p: 'A Santo Onofre atende empresas do setor aeroespacial e de tecnologia em São José dos Campos?', r: 'Sim. Temos experiência em segurança para instalações industriais e tecnológicas de alta complexidade, com controle de acesso rigoroso.' }, { p: 'Vocês atendem condomínios residenciais em São José dos Campos?', r: 'Sim, atendemos condomínios de todos os portes com portaria profissional, vigilância patrimonial e controle de acesso eletrônico.' }] },
  { nome: 'Taubaté', slug: 'taubate', uf: 'SP', ufNome: 'São Paulo', desc: 'Taubaté é um dos principais polos industriais do Vale do Paraíba, com forte presença do setor automotivo e de autopeças, além de comércio e condomínios em expansão. A proteção de instalações industriais de grande porte e o controle de acesso de fornecedores são demandas prioritárias das empresas locais. A Santo Onofre atende empresas e condomínios em toda Taubaté.', bairros: 'Centro, Jardim das Nações, Independência, Vila São José, Estação, Jardim Maria Augusta', faq: [{ p: 'A Santo Onofre atende empresas do setor automotivo em Taubaté?', r: 'Sim. Temos protocolos específicos para indústrias automotivas e de autopeças, com vigilância de perímetro e controle de acesso.' }, { p: 'Vocês atendem condomínios residenciais em Taubaté?', r: 'Sim, oferecemos portaria profissional e vigilância patrimonial para condomínios de todos os portes em Taubaté.' }] },
  { nome: 'Jacareí', slug: 'jacarei', uf: 'SP', ufNome: 'São Paulo', desc: 'Jacareí é um importante polo logístico e industrial do Vale do Paraíba, estrategicamente localizado às margens da Rodovia Presidente Dutra. A alta concentração de galpões, centros de distribuição e indústrias exige vigilância de perímetro e controle de acesso de veículos de carga. A Santo Onofre atende empresas e condomínios em toda Jacareí.', bairros: 'Centro, Jardim Flórida, Parque Meia Lua, Jardim Santa Maria, Vila Branca, Parque Vila Nova', faq: [{ p: 'Vocês atendem centros de distribuição às margens da Dutra em Jacareí?', r: 'Sim. Temos experiência em segurança para galpões logísticos, com controle de acesso de caminhões e monitoramento de cargas.' }, { p: 'A Santo Onofre atende condomínios residenciais em Jacareí?', r: 'Sim, atendemos condomínios verticais e horizontais com porteiros e vigilância patrimonial.' }] },
  { nome: 'Pindamonhangaba', slug: 'pindamonhangaba', uf: 'SP', ufNome: 'São Paulo', desc: 'Pindamonhangaba é um polo industrial em crescimento do Vale do Paraíba, com presença consolidada nos setores automotivo, aeroespacial e metalúrgico. A expansão de indústrias e condomínios na cidade eleva a demanda por segurança patrimonial profissional. A Santo Onofre atende empresas e condomínios em toda Pindamonhangaba.', bairros: 'Centro, Alto do Cardoso, Cidade Nova, Bosque, Feital, Araretama', faq: [{ p: 'A Santo Onofre atende indústrias automotivas e aeroespaciais em Pindamonhangaba?', r: 'Sim. Temos experiência em segurança industrial para os setores automotivo e aeroespacial, com controle de acesso rigoroso.' }, { p: 'Vocês atendem condomínios residenciais em Pindamonhangaba?', r: 'Sim, oferecemos portaria profissional e vigilância patrimonial para condomínios da cidade.' }] },
  { nome: 'Guaratinguetá', slug: 'guaratingueta', uf: 'SP', ufNome: 'São Paulo', desc: 'Guaratinguetá é um polo industrial e comercial do Vale do Paraíba, com presença de indústrias aeroespaciais e metalúrgicas, além de intenso fluxo de visitantes ligado ao turismo religioso da região. A diversidade de operações locais exige soluções de segurança flexíveis e adaptadas. A Santo Onofre atende empresas, comércios e condomínios em toda Guaratinguetá.', bairros: 'Centro, Pedregulho, Jardim Aeroporto, Chácara das Rosas, Vila São Benedito', faq: [{ p: 'A Santo Onofre atende indústrias e fornecedores do setor aeroespacial em Guaratinguetá?', r: 'Sim. Temos experiência em segurança para plantas industriais e fornecedores do setor aeroespacial da região.' }, { p: 'Vocês atendem comércios e estabelecimentos no centro de Guaratinguetá?', r: 'Sim, atendemos estabelecimentos comerciais de todos os portes com vigilantes fixos e monitoramento por câmeras.' }] },
  { nome: 'Caraguatatuba', slug: 'caraguatatuba', uf: 'SP', ufNome: 'São Paulo', desc: 'Caraguatatuba é o principal centro urbano do Litoral Norte de São Paulo, com forte sazonalidade turística e crescente presença de condomínios residenciais e comerciais. O aumento expressivo da população flutuante em temporada de verão exige segurança patrimonial reforçada e controle de acesso eficiente. A Santo Onofre atende empresas e condomínios em toda Caraguatatuba.', bairros: 'Centro, Indaiá, Martim de Sá, Jardim Primavera, Porto Novo, Sumaré', faq: [{ p: 'A Santo Onofre atende condomínios de temporada em Caraguatatuba?', r: 'Sim. Temos experiência em segurança para condomínios residenciais com alta variação sazonal de ocupação, comum no Litoral Norte.' }, { p: 'Vocês reforçam a equipe em períodos de alta temporada em Caraguatatuba?', r: 'Sim, dimensionamos a equipe conforme a sazonalidade, com reforço de vigilantes e porteiros nos períodos de maior movimento.' }] },
  { nome: 'São Sebastião', slug: 'sao-sebastiao', uf: 'SP', ufNome: 'São Paulo', desc: 'São Sebastião é um município estratégico do Litoral Norte de São Paulo, sede de um dos maiores terminais portuários e petrolíferos do país, além de forte vocação turística. A combinação de instalações industriais de alto valor com condomínios residenciais e comerciais exige segurança patrimonial especializada. A Santo Onofre atende empresas e condomínios em toda São Sebastião.', bairros: 'Centro, Topolândia, Maresias, Boiçucanga, Juquehy, Barequeçaba', faq: [{ p: 'A Santo Onofre atende empresas ligadas ao setor portuário em São Sebastião?', r: 'Sim. Temos experiência em segurança de perímetro e controle de acesso para operações próximas a instalações portuárias e industriais.' }, { p: 'Vocês atendem condomínios nas praias de São Sebastião, como Maresias e Boiçucanga?', r: 'Sim, atendemos condomínios residenciais em toda a orla de São Sebastião, com portaria e vigilância adaptadas à sazonalidade.' }] },
  { nome: 'Cruzeiro', slug: 'cruzeiro', uf: 'SP', ufNome: 'São Paulo', desc: 'Cruzeiro é um polo industrial do Vale do Paraíba próximo à divisa com o Rio de Janeiro, com presença de indústrias metalúrgicas e de autopeças. O crescimento comercial e industrial da região eleva a demanda por segurança patrimonial profissional. A Santo Onofre atende empresas e condomínios em toda Cruzeiro.', bairros: 'Centro, Vila Espanha, Jardim Esperança, Vila São José, Cidade Nova', faq: [{ p: 'A Santo Onofre atende indústrias metalúrgicas e de autopeças em Cruzeiro?', r: 'Sim. Temos experiência em segurança industrial para o setor metalúrgico e de autopeças, com vigilância de perímetro e controle de acesso.' }, { p: 'Vocês atendem condomínios residenciais em Cruzeiro?', r: 'Sim, oferecemos portaria profissional e vigilância patrimonial para condomínios da cidade.' }] }
];

// ============================================================
// CIDADES EXTRAS — template automático
// ============================================================
function ct(nome, slug, uf = 'MG', ufNome = 'Minas Gerais') {
  const variacoes = [
    `${nome} é um município de ${ufNome} com economia ativa e crescente demanda por serviços de segurança patrimonial profissional. A expansão comercial e de condomínios residenciais na cidade eleva constantemente a necessidade de controle de acesso e orientação de público. A Santo Onofre Serviços atende empresas, condomínios e indústrias em ${nome} com equipes treinadas.`,
    `${nome} conta com setor comercial e industrial em crescimento, o que aumenta a demanda por segurança patrimonial profissional. A Santo Onofre Serviços oferece vigilância, controle de acesso e monitoramento eletrônico para empresas e condomínios em ${nome} e toda a região.`,
    `Com desenvolvimento econômico consistente, ${nome} concentra empresas, condomínios e estabelecimentos que necessitam de proteção patrimonial especializada. A Santo Onofre oferece soluções completas de segurança para todos os portes de negócio em ${nome}, ${uf}.`
  ];
  const hash = slug.length % 3;
  return {
    nome, slug, uf, ufNome,
    desc: variacoes[hash],
    bairros: 'Centro, Bairro Industrial, Área Comercial, Bairros Residenciais',
    faq: [
      { p: `Como contratar segurança patrimonial em ${nome}?`, r: `Entre em contato via WhatsApp ${TEL} ou pelo formulário do site. Nossa equipe prepara proposta personalizada para sua empresa em ${nome} em até 24 horas.` },
      { p: `A Santo Onofre atende ${nome} com equipe treinada?`, r: `Sim. Atendemos ${nome} com profissionais treinados em controle de acesso e orientação de público, com suporte da nossa central de operações em ${ufNome}.` }
    ]
  };
}

const cidadesExtras = [
  // RMBH
  'Nova Lima|nova-lima', 'Matozinhos|matozinhos', 'Brumadinho|brumadinho', 'Igarapé|igarape',
  'São Joaquim de Bicas|sao-joaquim-de-bicas', 'Caeté|caete', 'Raposos|raposos',
  'Barão de Cocais|barao-de-cocais', 'Taquaraçu de Minas|taquaracu-de-minas',
  'Capim Branco|capim-branco', 'Paraopeba|paraopeba', 'Esmeraldas|esmeraldas',
  'Pedro Leopoldo|pedro-leopoldo', 'Vespasiano|vespasiano', 'Mario Campos|mario-campos',
  'Mateus Leme|mateus-leme', 'Juatuba|juatuba', 'Sarzedo|sarzedo', 'Lagoa Santa|lagoa-santa',
  'Santa Bárbara|santa-barbara', 'Itabirito|itabirito', 'Ouro Preto|ouro-preto',
  'Mariana|mariana', 'Congonhas|congonhas', 'João Monlevade|joao-monlevade',
  // Norte de MG
  'Bocaiúva|bocaiuva', 'Januária|januaria', 'Pirapora|pirapora', 'Salinas|salinas',
  'Janaúba|janauba', 'São Francisco|sao-francisco', 'Curvelo|curvelo',
  'Paracatu|paracatu', 'Unaí|unai', 'Diamantina|diamantina', 'Francisco Sá|francisco-sa',
  'Coração de Jesus|coracao-de-jesus', 'Capitão Enéas|capitao-eneas',
  'Porteirinha|porteirinha', 'Brasília de Minas|brasilia-de-minas',
  'Buritizeiro|buritizeiro', 'Várzea da Palma|varzea-da-palma', 'Manga|manga',
  // Sul de MG
  'Alfenas|alfenas', 'Passos|passos', 'São Sebastião do Paraíso|sao-sebastiao-do-paraiso',
  'Guaxupé|guaxupe', 'Itajubá|itajuba', 'São Lourenço|sao-lourenco', 'Caxambu|caxambu',
  'Três Pontas|tres-pontas', 'Três Corações|tres-coracoes', 'Campo Belo|campo-belo',
  'Muzambinho|muzambinho', 'Machado|machado', 'Andradas|andradas', 'Extrema|extrema',
  'Cambuí|cambui', 'Monte Sião|monte-siao', 'Jacutinga|jacutinga',
  'Nepomuceno|nepomuceno', 'Elói Mendes|eloi-mendes', 'Carmo do Rio Claro|carmo-do-rio-claro',
  'São Gonçalo do Sapucaí|sao-goncalo-do-sapucai', 'Boa Esperança|boa-esperanca',
  'Formiga|formiga', 'Oliveira|oliveira', 'Arcos|arcos', 'Bambuí|bambui',
  'Camanducaia|camanducaia', 'Pouso Alto|pouso-alto', 'Cristina|cristina',
  'Cambuquira|cambuquira', 'Baependi|baependi', 'Passa Quatro|passa-quatro',
  // Triângulo/Alto Paranaíba
  'Ituiutaba|ituiutaba', 'Frutal|frutal', 'Araxá|araxa', 'Patrocínio|patrocinio',
  'Monte Carmelo|monte-carmelo', 'Sacramento|sacramento', 'São Gotardo|sao-gotardo',
  'Coromandel|coromandel', 'Prata|prata', 'Iturama|iturama',
  'Capinópolis|capinopolis', 'Tupaciguara|tupaciguara', 'Campina Verde|campina-verde',
  'Fronteira|fronteira', 'Canápolis|canapolis', 'Lagoa Formosa|lagoa-formosa',
  // Zona da Mata
  'Cataguases|cataguases', 'Leopoldina|leopoldina', 'Além Paraíba|alem-paraiba',
  'São João del-Rei|sao-joao-del-rei', 'Rio Pomba|rio-pomba',
  'Visconde do Rio Branco|visconde-do-rio-branco', 'Carangola|carangola',
  'São João Nepomuceno|sao-joao-nepomuceno',
  // Vale do Rio Doce / Vale do Aço
  'Timóteo|timoteo', 'Caratinga|caratinga', 'Manhuaçu|manhuacu', 'Nanuque|nanuque',
  'Aimorés|aimores', 'Conselheiro Pena|conselheiro-pena', 'Inhapim|inhapim',
  'Guanhães|guanhaes', 'Santana do Paraíso|santana-do-paraiso',
  // Centro-Oeste de MG
  'Bom Despacho|bom-despacho', 'Pará de Minas|para-de-minas', 'Nova Serrana|nova-serrana',
  'Dores do Indaiá|dores-do-indaia', 'Abaeté|abaete', 'Pompéu|pompeu', 'Luz|luz',
  'Martinho Campos|martinho-campos', 'Papagaios|papagaios', 'Pitangui|pitangui',
  'Carmo do Cajuru|carmo-do-cajuru', 'Perdigão|perdigao',
  // Jequitinhonha/Mucuri
  'Araçuaí|aracuai', 'Almenara|almenara', 'Medina|medina', 'Pedra Azul|pedra-azul',
  'Capelinha|capelinha', 'Turmalina|turmalina', 'Itaobim|itaobim',
  'Itambacuri|itambacuri', 'Carlos Chagas|carlos-chagas', 'Poté|pote',
  'Pedras de Maria da Cruz|pedras-de-maria-da-cruz',
  // extras
  'Ouro Branco|ouro-branco', 'Rio Acima|rio-acima',
  'São Sebastião do Oeste|sao-sebastiao-do-oeste', 'Abadia dos Dourados|abadia-dos-dourados',
  'Perdizes|perdizes', 'Ibiá|ibia',
  'Lagoa da Prata|lagoa-da-prata',
  'João Pinheiro|joao-pinheiro', 'Vazante|vazante', 'Presidente Olegário|presidente-olegario'
].map(s => { const [nome, slug] = s.split('|'); return ct(nome, slug); })
  // Remover duplicatas de slug
  .filter((c, i, arr) => arr.findIndex(x => x.slug === c.slug) === i);

// ============================================================
// CIDADES EXTRAS — SP (RMSP + Vale do Paraíba / RMVale, sem página-pilar própria)
// ============================================================
const cidadesExtrasSP = [
  // RMSP
  'Arujá|aruja', 'Biritiba Mirim|biritiba-mirim', 'Caieiras|caieiras', 'Cajamar|cajamar',
  'Carapicuíba|carapicuiba', 'Cotia|cotia', 'Embu das Artes|embu-das-artes',
  'Embu-Guaçu|embu-guacu', 'Ferraz de Vasconcelos|ferraz-de-vasconcelos',
  'Francisco Morato|francisco-morato', 'Franco da Rocha|franco-da-rocha', 'Guararema|guararema',
  'Itapecerica da Serra|itapecerica-da-serra', 'Itapevi|itapevi', 'Jandira|jandira',
  'Juquitiba|juquitiba', 'Mairiporã|mairipora', 'Mauá|maua',
  'Pirapora do Bom Jesus|pirapora-do-bom-jesus', 'Poá|poa', 'Ribeirão Pires|ribeirao-pires',
  'Rio Grande da Serra|rio-grande-da-serra', 'Salesópolis|salesopolis', 'Santa Isabel|santa-isabel',
  'Santana de Parnaíba|santana-de-parnaiba', 'São Caetano do Sul|sao-caetano-do-sul',
  'São Lourenço da Serra|sao-lourenco-da-serra', 'Taboão da Serra|taboao-da-serra',
  'Vargem Grande Paulista|vargem-grande-paulista',
  // Vale do Paraíba / RMVale
  'Aparecida|aparecida', 'Arapeí|arapei', 'Areias|areias', 'Bananal|bananal',
  'Caçapava|cacapava', 'Cachoeira Paulista|cachoeira-paulista', 'Campos do Jordão|campos-do-jordao',
  'Canas|canas', 'Cunha|cunha', 'Igaratá|igarata', 'Ilhabela|ilhabela', 'Jambeiro|jambeiro',
  'Lagoinha|lagoinha', 'Lavrinhas|lavrinhas', 'Lorena|lorena', 'Monteiro Lobato|monteiro-lobato',
  'Natividade da Serra|natividade-da-serra', 'Paraibuna|paraibuna', 'Piquete|piquete',
  'Potim|potim', 'Queluz|queluz', 'Redenção da Serra|redencao-da-serra', 'Roseira|roseira',
  'Santa Branca|santa-branca', 'Santo Antônio do Pinhal|santo-antonio-do-pinhal',
  'São Bento do Sapucaí|sao-bento-do-sapucai', 'São José do Barreiro|sao-jose-do-barreiro',
  'São Luiz do Paraitinga|sao-luiz-do-paraitinga', 'Silveiras|silveiras', 'Tremembé|tremembe',
  'Ubatuba|ubatuba'
].map(s => { const [nome, slug] = s.split('|'); return ct(nome, slug, 'SP', 'São Paulo'); })
  .filter((c, i, arr) => arr.findIndex(x => x.slug === c.slug) === i);

const cidades = [...cidadesRicas, ...cidadesExtras, ...cidadesExtrasSP];

// Apenas as cidades "ricas" ganham página-pilar /seguranca-{slug}/ (geradas por gerar-lps.js).
// Cidades fora dessa lista não têm essa página — não podem virar link, senão quebram (404).
const cidadesComPilar = new Set(cidadesRicas.map(c => c.slug));

// CSS agora em /seo.css — edite lá para atualizar todas as páginas de uma vez

// Serviços em destaque para cross-linking entre páginas da mesma cidade
const servicosDestaqueIcones = {
  'vigilancia-patrimonial': '<path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>',
  'controle-de-acesso': '<rect x="3" y="11" width="18" height="11" rx="2"/><path d="M7 11V7a5 5 0 0110 0v4"/>',
  'monitoramento-de-cameras': '<rect x="2" y="3" width="20" height="14" rx="2"/><path d="M8 21h8M12 17v4"/>',
  'ronda-motorizada': '<circle cx="12" cy="12" r="10"/><path d="M12 8v4l3 3"/>',
  'seguranca-para-eventos': '<rect x="3" y="4" width="18" height="18" rx="2"/><path d="M16 2v4M8 2v4M3 10h18"/>',
  'portaria-de-condominio': '<path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z"/><path d="M9 22V12h6v10"/>',
  'seguranca-patrimonial': '<path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>'
};
const slugsDestaque = Object.keys(servicosDestaqueIcones);

// ============================================================
// GERADOR DE PÁGINA
// ============================================================
function gerarPagina(srv, cid) {
  const canonicalSlug = `${srv.slug}-em-${cid.slug}`;
  const url = `${DOMAIN}/${canonicalSlug}/`;
  const faqHtml = [...srv.faq, ...cid.faq].map(f => `
<div class="faq-item">
  <h3 class="faq-q">${f.p}</h3>
  <p class="faq-a">${f.r}</p>
</div>`).join('');

  const schema = JSON.stringify({
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "name": "Santo Onofre Serviços",
    "description": `${srv.nome} em ${cid.nome}, ${cid.uf}`,
    "url": DOMAIN,
    "telephone": `+${WATEL}`,
    "areaServed": `${cid.nome}, ${cid.ufNome}`,
    "serviceType": srv.nome,
    "address": { "@type": "PostalAddress", "addressLocality": cid.nome, "addressRegion": cid.uf, "addressCountry": "BR" }
  });

  // Cidades da mesma UF que têm página-pilar, para cross-linking (nunca aponta pra outro estado)
  const cidadesDestaque = cidades.filter(c => c.uf === cid.uf && cidadesComPilar.has(c.slug) && c.slug !== cid.slug).slice(0, 12);

  // 6 outros serviços na mesma cidade, para cross-linking (nunca o próprio srv.slug)
  const outrosSlugs = slugsDestaque.filter(s => s !== srv.slug).slice(0, 6);
  const outrosServicos = outrosSlugs.map(s => {
    const def = servicos.find(x => x.slug === s);
    return { slug: s, nome: def.nome, icon: servicosDestaqueIcones[s] };
  });

  return `<!DOCTYPE html>
<html lang="pt-BR">
<head>
<meta charset="UTF-8"/>
<meta name="viewport" content="width=device-width,initial-scale=1.0"/>
<link rel="icon" type="image/svg+xml" href="/favicon.svg"/>
<meta name="description" content="${srv.desc(cid.nome, cid.uf)}"/>
<title>${srv.title(cid.nome, cid.uf)}</title>
<meta name="robots" content="index, follow"/>
<link rel="canonical" href="${url}"/>
<meta property="og:title" content="${srv.title(cid.nome, cid.uf)}"/>
<meta property="og:description" content="${srv.desc(cid.nome, cid.uf)}"/>
<meta property="og:url" content="${url}"/>
<meta property="og:type" content="website"/>
<script type="application/ld+json">${schema}<\/script>
<link rel="stylesheet" href="/seo.css"/>
</head>
<body>
<div id="topbar"><div class="tb-wrap">
<a href="tel:+${WATEL}" class="tb-item">Contrate: ${TEL}</a>
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
<div class="breadcrumb">
  <a href="/">Início</a><span>›</span>
  ${cidadesComPilar.has(cid.slug) ? `<a href="/seguranca-${cid.slug}/">${cid.nome}</a>` : `<span style="color:rgba(255,255,255,.5)">${cid.nome}</span>`}<span>›</span>
  <span style="color:rgba(255,255,255,.5)">${srv.nome}</span>
</div>
<div class="lp-tag">${srv.badge} em ${cid.nome} - ${cid.uf}</div>
<h1>${srv.h1(cid.nome, cid.uf).replace(cid.nome, `<span>${cid.nome}</span>`)}</h1>
<p>${srv.hero(cid.nome)}</p>
<div class="hero-btns">
<a href="/contato.html" class="btn-gold">Solicitar proposta em ${cid.nome} <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#0B1829" stroke-width="2.5"><path d="M5 12h14M12 5l7 7-7 7"/></svg></a>
<a href="https://wa.me/${WATEL}" target="_blank" class="btn-ghost">WhatsApp</a>
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
<span class="stag">Nossa presença em ${cid.nome}</span>
<h2>${srv.nome} em ${cid.nome}, ${cid.uf}</h2>
<div class="gold-line"></div>
<div class="local-box"><p>${cid.desc}</p></div>
<h3 style="font-size:14px;font-weight:700;color:#0B1829;margin-bottom:12px;">Regiões atendidas em ${cid.nome}:</h3>
<div class="bairros-wrap">
${cid.bairros.split(', ').map(b => `<span class="bairro-tag">${b}</span>`).join('')}
</div>
</div>
</section>

<section class="sec sec-light">
<div class="wrap">
<span class="stag">Serviços em ${cid.nome}</span>
<h2>${srv.nome} e Mais — Solução Completa em ${cid.nome}</h2>
<p class="sec-sub">Além de <strong>${srv.nome}</strong>, a Santo Onofre oferece soluções completas de segurança para empresas de todos os portes em <strong>${cid.nome}</strong> e região.</p>
<div class="gold-line"></div>
<div class="srv-grid">
${outrosServicos.map(s => `<a href="/${s.slug}-em-${cid.slug}/" class="srv-card"><div class="srv-icon"><svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#FFCC00" stroke-width="1.8">${s.icon}</svg></div><h3>${s.nome} em ${cid.nome}</h3><p>Conheça nosso serviço de ${s.nome.toLowerCase()} em ${cid.nome}, ${cid.uf}.</p></a>`).join('\n')}
</div>
</div>
</section>

<section style="padding:48px 6%;background:#fff;border-top:1px solid var(--bo);">
<div class="wrap">
<span class="stag">Você procurou e nos encontrou</span>
<h2 style="font-size:18px;font-weight:800;color:#0B1829;margin-bottom:20px;">Você procurou por <strong>${srv.nome}</strong> em <strong>${cid.nome}</strong>? Que bom que nos achou!</h2>
<p style="font-size:13px;color:var(--mu);margin-bottom:16px;">A Santo Onofre Serviços atende as principais buscas relacionadas a segurança e controle de acesso em ${cid.nome} e região de ${cid.ufNome}:</p>
<ul style="display:flex;flex-wrap:wrap;gap:10px;list-style:none;">
${[
  `${srv.nome} em ${cid.nome}`,
  `${srv.nome} em ${cid.nome} ${cid.uf}`,
  `Empresa de ${srv.nome.toLowerCase()} em ${cid.nome}`,
  `${srv.nome} em ${cid.nome} e região`,
  `Controle de acesso em ${cid.nome}`,
  `Orientador de público em ${cid.nome}`,
  `Monitoramento patrimonial em ${cid.nome}`,
  `Observação patrimonial ${cid.nome} ${cid.uf}`,
  `Apoio operacional em ${cid.nome}`,
  `${srv.nome} ${cid.nome} - Santo Onofre Serviços`
].map(t => `<li style="background:var(--li);border:1px solid var(--bo);border-radius:20px;padding:6px 14px;font-size:11px;color:var(--mu);">${t}</li>`).join('')}
</ul>
</div>
</section>

<section class="faq-sec">
<div class="wrap">
<span class="stag">Dúvidas frequentes</span>
<h2>Perguntas sobre ${srv.nome} em ${cid.nome}</h2>
<div class="gold-line"></div>
${faqHtml}
</div>
</section>

<section class="sec sec-dark">
<div class="wrap">
<span class="stag">Por que a Santo Onofre?</span>
<h2>Referência em Segurança em ${cid.nome} e ${cid.uf}</h2>
<div class="gold-line" style="background:linear-gradient(90deg,#FFCC00,#FFE033);"></div>
<div class="why-grid">
<div class="why-card"><div class="why-num">+10</div><div class="why-label">Anos de experiência em segurança patrimonial em ${cid.uf}</div></div>
<div class="why-card"><div class="why-num">100%</div><div class="why-label">Profissionais treinados em controle de acesso e orientação de público</div></div>
<div class="why-card"><div class="why-num">24/7</div><div class="why-label">Atendimento e cobertura ininterrupta para sua empresa</div></div>
<div class="why-card"><div class="why-num">0</div><div class="why-label">Burocracia — contratos flexíveis e proposta rápida</div></div>
</div>
</div>
</section>

<section class="sec sec-light">
<div class="wrap">
<span class="stag">Abrangência</span>
<h2>Atendemos ${cid.nome} e Toda a Região de ${cid.uf}</h2>
<p class="sec-sub">Além de ${cid.nome}, a Santo Onofre atende nas principais cidades de ${cid.ufNome}.</p>
<div class="gold-line"></div>
<div style="border-radius:14px;overflow:hidden;border:1px solid var(--bo);margin-bottom:28px;">
<iframe src="https://www.google.com/maps?q=${encodeURIComponent(cid.nome + ', ' + cid.uf + ', Brasil')}&output=embed" width="100%" height="320" style="border:0;display:block;" loading="lazy" referrerpolicy="no-referrer-when-downgrade" title="Mapa de ${cid.nome}, ${cid.uf}"></iframe>
</div>
<div class="cidades-grid">
${cidadesDestaque.map(c => `<a href="/seguranca-${c.slug}/" class="cidade-tag">${c.nome}</a>`).join('\n')}
</div>
</div>
</section>

<section class="cta-sec">
<div class="wrap">
<h2>Precisa de ${srv.nome} em ${cid.nome}?</h2>
<p>Entre em contato agora e receba uma proposta personalizada para sua empresa ou condomínio em ${cid.nome}, ${cid.uf}.</p>
<div class="cta-btns">
<a href="/contato.html" class="btn-gold">Solicitar proposta gratuita <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#0B1829" stroke-width="2.5"><path d="M5 12h14M12 5l7 7-7 7"/></svg></a>
<a href="https://wa.me/${WATEL}" target="_blank" class="btn-outline">Falar no WhatsApp</a>
</div>
</div>
</section>

<footer>
<div class="wrap">
<div class="footer-grid">
<div><span class="ft-name">Santo Onofre Serviços</span><p class="ft-desc" style="margin-top:8px;">${srv.nome} em ${cid.nome} e em toda ${cid.ufNome}.</p></div>
<div><div class="ft-title">Serviços</div><a href="/servicos.html" class="ft-link">Vigilância Patrimonial</a><a href="/servicos.html" class="ft-link">Controle de Acesso</a><a href="/servicos.html" class="ft-link">Monitoramento</a><a href="/servicos.html" class="ft-link">Seg. em Eventos</a></div>
<div><div class="ft-title">Cidades</div>${cidadesDestaque.slice(0,4).map(c=>`<a href="/seguranca-${c.slug}/" class="ft-link">${c.nome}</a>`).join('')}</div>
<div><div class="ft-title">Fale Conosco</div><a href="https://wa.me/${WATEL}" class="ft-link" target="_blank">${TEL}</a><span class="ft-link" style="cursor:default">${cid.ufNome}</span></div>
</div>
<div class="ft-bottom"><span class="ft-copy">© 2026 Santo Onofre Serviços · Todos os direitos reservados</span></div>
<p style="font-size:10px;color:rgba(255,255,255,.12);line-height:1.6;margin-top:14px;max-width:860px;">A Santo Onofre Serviços não realiza atividade de segurança privada, vigilância patrimonial ou serviços regulamentados pela Polícia Federal, atuando exclusivamente em monitoramento, controle de acesso, apoio operacional e observação patrimonial.</p>
</div>
</footer>

<a href="https://wa.me/${WATEL}" target="_blank" class="wa" aria-label="WhatsApp">
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

// ============================================================
// GERADOR DE SITEMAP
// ============================================================
function gerarSitemap(servicos, cidades) {
  const hoje = new Date().toISOString().split('T')[0];
  const urlsPrincipais = [
    `<url><loc>${DOMAIN}/</loc><changefreq>weekly</changefreq><priority>1.0</priority><lastmod>${hoje}</lastmod></url>`,
    `<url><loc>${DOMAIN}/servicos.html</loc><changefreq>monthly</changefreq><priority>0.9</priority><lastmod>${hoje}</lastmod></url>`,
    `<url><loc>${DOMAIN}/sobre.html</loc><changefreq>monthly</changefreq><priority>0.8</priority><lastmod>${hoje}</lastmod></url>`,
    `<url><loc>${DOMAIN}/contato.html</loc><changefreq>monthly</changefreq><priority>0.8</priority><lastmod>${hoje}</lastmod></url>`,
    `<url><loc>${DOMAIN}/blog.html</loc><changefreq>weekly</changefreq><priority>0.8</priority><lastmod>${hoje}</lastmod></url>`,
  ].join('\n  ');

  const urlsLpsCidades = cidades
    .filter(c => cidadesComPilar.has(c.slug))
    .map(c =>
      `<url><loc>${DOMAIN}/seguranca-${c.slug}/</loc><changefreq>monthly</changefreq><priority>0.7</priority><lastmod>${hoje}</lastmod></url>`
    ).join('\n  ');

  const urlsSeo = servicos.flatMap(s =>
    cidades.map(c =>
      `<url><loc>${DOMAIN}/${s.slug}-em-${c.slug}/</loc><changefreq>monthly</changefreq><priority>0.7</priority><lastmod>${hoje}</lastmod></url>`
    )
  ).join('\n  ');

  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  ${urlsPrincipais}
  ${urlsLpsCidades}
  ${urlsSeo}
</urlset>`;
}

// ============================================================
// EXECUÇÃO
// ============================================================
const baseDir = __dirname;
let count = 0;
const erros = [];

console.log(`\n🚀 Santo Onofre — Gerador SEO Completo`);
console.log(`   ${servicos.length} serviços × ${cidades.length} cidades = ${servicos.length * cidades.length} páginas\n`);

servicos.forEach(srv => {
  cidades.forEach(cid => {
    const dirName = `${srv.slug}-em-${cid.slug}`;
    const dirPath = path.join(baseDir, dirName);
    try {
      if (!fs.existsSync(dirPath)) fs.mkdirSync(dirPath, { recursive: true });
      fs.writeFileSync(path.join(dirPath, 'index.html'), gerarPagina(srv, cid), 'utf8');
      count++;
      if (count % 100 === 0) process.stdout.write(`  ✓ ${count} páginas...\r`);
    } catch (e) {
      erros.push(`${dirName}: ${e.message}`);
    }
  });
});

console.log(`\n  ✅ ${count} páginas geradas com sucesso!`);

// Sitemap
const sitemapPath = path.join(baseDir, 'sitemap.xml');
fs.writeFileSync(sitemapPath, gerarSitemap(servicos, cidades), 'utf8');
console.log(`  ✅ sitemap.xml atualizado (${servicos.length * cidades.length + cidades.length + 5} URLs)`);

if (erros.length) {
  console.log(`\n  ⚠️  ${erros.length} erros:`);
  erros.forEach(e => console.log(`     ${e}`));
}

console.log(`\n  📁 Diretório: ${baseDir}`);
console.log(`  🌐 Domínio: ${DOMAIN}\n`);
