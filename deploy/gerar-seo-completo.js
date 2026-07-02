const fs = require('fs');
const path = require('path');

const DOMAIN = 'https://santoonofrevigilancia.com.br';
const TEL = '(31) 98729-9396';
const WATEL = '5531987299396';

// ============================================================
// 28 SERVIÇOS
// ============================================================
const servicos = [
  {
    slug: 'vigilancia-patrimonial',
    nome: 'Vigilância Patrimonial',
    h1: c => `Vigilância Patrimonial em ${c}, MG`,
    title: c => `Vigilância Patrimonial em ${c} - MG | Santo Onofre`,
    desc: c => `Vigilância patrimonial em ${c}, MG. Profissionais treinados, controle de acesso e orientação de público 24h. Solicite proposta gratuita.`,
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
    h1: c => `Empresa de Segurança Patrimonial em ${c}, MG`,
    title: c => `Segurança Patrimonial em ${c} - MG | Santo Onofre`,
    desc: c => `Empresa de segurança patrimonial em ${c}, MG. Proteção para empresas e condomínios com vigilantes 24h. Solicite proposta gratuita.`,
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
    h1: c => `Empresa de Segurança em ${c}, MG`,
    title: c => `Empresa de Segurança em ${c} - MG | Santo Onofre`,
    desc: c => `Empresa de segurança em ${c}, MG. Vigilância, monitoramento, controle de acesso e rondas para empresas e condomínios. Solicite proposta.`,
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
    h1: c => `Empresa de Vigilantes em ${c}, MG`,
    title: c => `Empresa de Vigilantes em ${c} - MG | Santo Onofre`,
    desc: c => `Empresa de vigilantes em ${c}, MG. Profissionais de controle de acesso e orientação de público para empresas, condomínios e indústrias. Solicite proposta.`,
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
    h1: c => `Segurança para Eventos em ${c}, MG`,
    title: c => `Segurança para Eventos em ${c} - MG | Santo Onofre`,
    desc: c => `Segurança para eventos em ${c}, MG. Equipes para shows, formaturas, feiras e eventos corporativos. Solicite orçamento.`,
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
    h1: c => `Segurança para Shows em ${c}, MG`,
    title: c => `Segurança para Shows em ${c} - MG | Santo Onofre`,
    desc: c => `Segurança para shows e festivais em ${c}, MG. Equipes treinadas para controle de acesso e gestão de público. Solicite orçamento agora.`,
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
    h1: c => `Segurança para Rodeios em ${c}, MG`,
    title: c => `Segurança para Rodeios em ${c} - MG | Santo Onofre`,
    desc: c => `Segurança para rodeios e festas do peão em ${c}, MG. Controle de acesso e segurança de público para grandes eventos rurais. Solicite orçamento.`,
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
    h1: c => `Segurança para Festas e Eventos em ${c}, MG`,
    title: c => `Segurança para Festas em ${c} - MG | Santo Onofre`,
    desc: c => `Segurança para festas, formaturas e eventos sociais em ${c}, MG. Equipes discretas e profissionais. Solicite orçamento personalizado.`,
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
    h1: c => `Portaria de Prédio em ${c}, MG`,
    title: c => `Portaria de Prédio em ${c} - MG | Santo Onofre`,
    desc: c => `Portaria de prédio profissional em ${c}, MG. Porteiros treinados para triagem, identificação e atendimento ao público. Solicite proposta.`,
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
    h1: c => `Portaria de Condomínio em ${c}, MG`,
    title: c => `Portaria de Condomínio em ${c} - MG | Santo Onofre`,
    desc: c => `Portaria de condomínio profissional em ${c}, MG. Gestão de acesso de moradores e visitantes com segurança e hospitalidade. Solicite proposta.`,
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
    h1: c => `Portaria Virtual em ${c}, MG`,
    title: c => `Portaria Virtual em ${c} - MG | Santo Onofre`,
    desc: c => `Portaria virtual para condomínios em ${c}, MG. Controle de acesso remoto com câmeras e interfone. Economia e segurança 24h. Solicite proposta.`,
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
    h1: c => `Segurança para Obras em ${c}, MG`,
    title: c => `Segurança para Obras em ${c} - MG | Santo Onofre`,
    desc: c => `Segurança para obras e canteiros de construção em ${c}, MG. Vigilantes e vigias 24h para proteção de materiais e equipamentos. Solicite proposta.`,
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
    h1: c => `Vigia para Obras em ${c}, MG`,
    title: c => `Vigia para Obras em ${c} - MG | Santo Onofre`,
    desc: c => `Vigia para obras em ${c}, MG. Profissionais especializados em proteção de canteiros de construção. Cobertura diurna e noturna. Solicite proposta.`,
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
    h1: c => `Segurança para Construção Civil em ${c}, MG`,
    title: c => `Segurança para Construção em ${c} - MG | Santo Onofre`,
    desc: c => `Segurança para construção civil em ${c}, MG. Proteção de canteiros, materiais e maquinário com equipes especializadas. Solicite proposta.`,
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
    h1: c => `Segurança Eletrônica em ${c}, MG`,
    title: c => `Segurança Eletrônica em ${c} - MG | Santo Onofre`,
    desc: c => `Segurança eletrônica em ${c}, MG. Câmeras CFTV, alarmes, controle de acesso eletrônico e monitoramento 24h. Solicite proposta.`,
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
    h1: c => `Instalação de Câmeras de Segurança em ${c}, MG`,
    title: c => `Instalação de Câmeras em ${c} - MG | Santo Onofre`,
    desc: c => `Instalação de câmeras de segurança em ${c}, MG. CFTV, câmeras IP e sistemas de monitoramento para empresas e condomínios. Solicite orçamento.`,
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
    h1: c => `Monitoramento de Câmeras 24h em ${c}, MG`,
    title: c => `Monitoramento de Câmeras em ${c} - MG | Santo Onofre`,
    desc: c => `Monitoramento de câmeras 24h em ${c}, MG. Central de monitoramento com resposta imediata para empresas e condomínios. Solicite proposta.`,
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
    title: c => `CFTV em ${c} - MG | Santo Onofre Segurança`,
    desc: c => `CFTV em ${c}, MG. Instalação e monitoramento de Circuito Fechado de TV para empresas e condomínios. Solicite orçamento.`,
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
    h1: c => `Ronda Motorizada em ${c}, MG`,
    title: c => `Ronda Motorizada em ${c} - MG | Santo Onofre`,
    desc: c => `Ronda motorizada em ${c}, MG. Patrulhamento preventivo com veículos para empresas, condomínios e comércios. Solicite proposta gratuita.`,
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
    h1: c => `Vigilância Noturna em ${c}, MG`,
    title: c => `Vigilância Noturna em ${c} - MG | Santo Onofre`,
    desc: c => `Vigilância noturna em ${c}, MG. Proteção de empresas, canteiros e condomínios durante a noite com profissionais treinados. Solicite proposta.`,
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
    h1: c => `Controle de Acesso em ${c}, MG`,
    title: c => `Controle de Acesso em ${c} - MG | Santo Onofre`,
    desc: c => `Controle de acesso em ${c}, MG. Sistemas eletrônicos e presenciais para empresas, condomínios e indústrias. Biometria e catracas. Solicite proposta.`,
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
    h1: c => `Segurança para Indústrias em ${c}, MG`,
    title: c => `Segurança para Indústrias em ${c} - MG | Santo Onofre`,
    desc: c => `Segurança para indústrias em ${c}, MG. Vigilância patrimonial, controle de acesso e monitoramento 24h. Solicite proposta.`,
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
    h1: c => `Segurança para Fábricas em ${c}, MG`,
    title: c => `Segurança para Fábricas em ${c} - MG | Santo Onofre`,
    desc: c => `Segurança para fábricas em ${c}, MG. Proteção de instalações industriais, maquinário e estoques com vigilantes 24h. Solicite proposta.`,
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
    h1: c => `Segurança para Prefeituras em ${c}, MG`,
    title: c => `Segurança para Prefeituras em ${c} - MG | Santo Onofre`,
    desc: c => `Segurança para prefeituras e órgãos públicos em ${c}, MG. Vigilância patrimonial para prédios públicos e secretarias. Solicite proposta.`,
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
    h1: c => `Segurança para Comércios em ${c}, MG`,
    title: c => `Segurança para Comércios em ${c} - MG | Santo Onofre`,
    desc: c => `Segurança para comércios em ${c}, MG. Vigilantes, câmeras e prevenção de perdas para lojas e estabelecimentos. Solicite proposta.`,
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
    h1: c => `Segurança para Condomínio em ${c}, MG`,
    title: c => `Segurança para Condomínio em ${c} - MG | Santo Onofre`,
    desc: c => `Segurança para condomínios em ${c}, MG. Vigilantes, portaria profissional e monitoramento 24h. Solicite proposta gratuita.`,
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
    h1: c => `Segurança para Escolas em ${c}, MG`,
    title: c => `Segurança para Escolas em ${c} - MG | Santo Onofre`,
    desc: c => `Segurança para escolas em ${c}, MG. Controle de acesso, vigilância discreta e proteção de alunos e funcionários. Solicite proposta.`,
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
    h1: c => `Segurança para Hospitais e Clínicas em ${c}, MG`,
    title: c => `Segurança para Hospitais em ${c} - MG | Santo Onofre`,
    desc: c => `Segurança para hospitais e clínicas em ${c}, MG. Controle de acesso e vigilância 24h para ambientes de saúde. Solicite proposta.`,
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
    h1: c => `Câmeras de Segurança em ${c}, MG`,
    title: c => {
      const full = `Câmeras de Segurança em ${c} - MG | Santo Onofre`;
      return full.length <= 60 ? full : `Câmeras de Segurança em ${c}, MG`;
    },
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
    h1: c => `Recepcionista Profissional em ${c}, MG`,
    title: c => {
      const full = `Recepcionista em ${c} - MG | Santo Onofre Serviços`;
      return full.length <= 60 ? full : `Recepcionista em ${c}, MG | Santo Onofre`;
    },
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
    h1: c => `Vigia Profissional em ${c}, MG`,
    title: c => {
      const full = `Vigia Profissional em ${c} - MG | Santo Onofre`;
      return full.length <= 60 ? full : `Vigia Profissional em ${c}, MG`;
    },
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
    h1: c => `Controlador de Acesso em ${c}, MG`,
    title: c => {
      const full = `Controlador de Acesso em ${c} - MG | Santo Onofre`;
      return full.length <= 60 ? full : `Controlador de Acesso em ${c}, MG`;
    },
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
    h1: c => `Porteiro em ${c}, MG`,
    title: c => {
      const full = `Porteiro em ${c} - MG | Santo Onofre Serviços`;
      return full.length <= 60 ? full : `Porteiro em ${c}, MG | Santo Onofre`;
    },
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
  { nome: 'Belo Horizonte', slug: 'belo-horizonte', desc: 'Belo Horizonte é a capital de Minas Gerais e um dos maiores centros empresariais do Brasil, com mais de 2,7 milhões de habitantes. A alta concentração de empresas, condomínios comerciais e industriais torna a segurança patrimonial uma necessidade estratégica. A Santo Onofre atua em todos os bairros da capital com equipes treinadas e resposta rápida.', bairros: 'Savassi, Lourdes, Buritis, Barreiro, Venda Nova, Pampulha, Centro, Santa Efigênia', faq: [{ p: 'A Santo Onofre atende condomínios residenciais em BH?', r: 'Sim. Atendemos condomínios verticais e horizontais em todos os bairros de Belo Horizonte, com porteiros, vigilantes e controle de acesso eletrônico.' }, { p: 'Qual o prazo para início do serviço em Belo Horizonte?', r: 'Após a assinatura do contrato, conseguimos iniciar em até 5 dias úteis na capital, dependendo do porte da operação.' }] },
  { nome: 'Uberlândia', slug: 'uberlandia', desc: 'Uberlândia é o segundo maior município de Minas Gerais e o maior do Triângulo Mineiro, com forte vocação comercial e logística. O crescimento do setor atacadista, industrial e de galpões de distribuição aumenta a demanda por vigilância profissional. A Santo Onofre oferece soluções completas para empresas e condomínios em toda a cidade.', bairros: 'Centro, Santa Mônica, Tibery, Jardim Karaíba, Morada da Colina, Planalto, Industrial', faq: [{ p: 'Vocês atendem galpões e centros de distribuição em Uberlândia?', r: 'Sim. Temos experiência em segurança para galpões logísticos com vigilância armada, controle de acesso de veículos e monitoramento por câmeras.' }, { p: 'É possível contratar segurança para eventos corporativos em Uberlândia?', r: 'Sim, oferecemos equipes para eventos corporativos, formaturas e feiras em Uberlândia e toda a região do Triângulo.' }] },
  { nome: 'Contagem', slug: 'contagem', desc: 'Contagem é o maior polo industrial da Região Metropolitana de Belo Horizonte, abrigando centenas de indústrias nos distritos industriais do Riacho e Nacional. A proteção de ativos industriais e controle de acesso são demandas constantes das empresas locais. A Santo Onofre atende indústrias de todos os portes em Contagem.', bairros: 'Riacho das Pedras, Nacional, Eldorado, Cinco, Industrial Sinduscon, Ressaca', faq: [{ p: 'Vocês atendem indústrias e fábricas em Contagem?', r: 'Sim. Temos experiência específica em segurança industrial, incluindo controle de acesso de caminhões, vigilância de perímetro e monitoramento de turno noturno.' }, { p: 'Como funciona o controle de acesso para empresas com muitos funcionários em Contagem?', r: 'Utilizamos sistemas eletrônicos com catracas, leitores biométricos ou por cartão, integrados à vigilância presencial, garantindo rastreabilidade total.' }] },
  { nome: 'Juiz de Fora', slug: 'juiz-de-fora', desc: 'Juiz de Fora é o principal centro da Zona da Mata Mineira, com destaque para os setores de comércio, saúde e educação. A cidade abriga grandes hospitais, shoppings e campus universitários que demandam segurança profissional. A Santo Onofre oferece vigilância especializada para o perfil comercial e institucional de Juiz de Fora.', bairros: 'Centro, São Mateus, Cascatinha, Graminha, Alto dos Passos, Benfica, Jardim Glória', faq: [{ p: 'Vocês atendem estabelecimentos de saúde em Juiz de Fora?', r: 'Sim. Temos experiência em segurança para clínicas, hospitais e laboratórios, com abordagem discreta e treinamento específico para ambientes de saúde.' }, { p: 'A Santo Onofre faz segurança para shoppings em JF?', r: 'Sim, atendemos centros comerciais com equipes de segurança operacional, controle de fluxo e prevenção de perdas.' }] },
  { nome: 'Betim', slug: 'betim', desc: 'Betim é um dos maiores polos industriais do Brasil, sede de grandes empresas do setor automotivo e petroquímico. A proteção de instalações industriais de grande porte, com acesso controlado 24 horas e vigilância armada, é a principal demanda das empresas betinenses.', bairros: 'PTB, Citrolândia, Braúnas, Centro, Imbiruçu, Jardim das Alterosas, Industrial', faq: [{ p: 'A Santo Onofre atende empresas do setor automotivo em Betim?', r: 'Sim. Temos protocolos para indústrias do setor automotivo, incluindo controle de acesso de fornecedores e vigilância de pátios.' }, { p: 'É possível fazer segurança em turnos noturnos nas fábricas de Betim?', r: 'Sim, oferecemos cobertura ininterrupta com vigilantes treinados para operação noturna, rondas e comunicação com central de monitoramento.' }] },
  { nome: 'Montes Claros', slug: 'montes-claros', desc: 'Montes Claros é o principal centro urbano do Norte de Minas Gerais, com forte crescimento do setor de serviços, saúde e comércio atacadista. A posição estratégica como polo regional faz da cidade um ponto de convergência de negócios que exigem segurança profissional.', bairros: 'Centro, Ibituruna, Major Prates, Morada do Parque, Cintra, São João, Augusta Mota', faq: [{ p: 'Vocês atendem empresas do comércio atacadista em Montes Claros?', r: 'Sim. Atendemos distribuidoras, depósitos e centros atacadistas com segurança de perímetro, controle de acesso e monitoramento por câmeras.' }, { p: 'A Santo Onofre tem cobertura em toda a área urbana de Montes Claros?', r: 'Sim, atendemos todos os bairros e distritos industriais de Montes Claros.' }] },
  { nome: 'Ribeirão das Neves', slug: 'ribeirao-das-neves', desc: 'Ribeirão das Neves integra a Região Metropolitana de Belo Horizonte e tem registrado crescimento populacional e comercial expressivo. O aumento de condomínios residenciais, comércios e pequenas indústrias cria demanda crescente por serviços de segurança acessíveis e eficientes.', bairros: 'Centro, Justinópolis, Bairro das Neves, Veneza, Areias, Sevilha, Areias II', faq: [{ p: 'Vocês atendem pequenas empresas e comércios em Ribeirão das Neves?', r: 'Sim. Oferecemos planos acessíveis para pequenos e médios estabelecimentos, com vigilante fixo ou rondas programadas.' }, { p: 'Qual a diferença entre vigilância e portaria em condomínios de Ribeirão das Neves?', r: 'O porteiro faz triagem e atendimento, enquanto o vigilante patrimonial tem poder de agir em situações de risco. Oferecemos os dois serviços integrados.' }] },
  { nome: 'Uberaba', slug: 'uberaba', desc: 'Uberaba é polo agropecuário e biotecnológico do Triângulo Mineiro, sede de grandes empresas do setor de genética bovina e agronegócio. A crescente demanda por segurança em fazendas, centros de pesquisa, shoppings e indústrias faz de Uberaba um mercado em expansão.', bairros: 'Centro, Mercês, Abadia, Boa Vista, Fabrício, Lídice, São Benedito', faq: [{ p: 'A Santo Onofre atende empresas do agronegócio em Uberaba?', r: 'Sim. Temos experiência em segurança para centros de pesquisa, unidades agroindustriais e instalações de alto valor.' }, { p: 'Vocês fazem segurança para eventos de exposição agropecuária em Uberaba?', r: 'Sim, oferecemos equipes para grandes eventos como feiras e exposições, com controle de fluxo e segurança de instalações.' }] },
  { nome: 'Governador Valadares', slug: 'governador-valadares', desc: 'Governador Valadares é o principal centro comercial e de serviços do Vale do Rio Doce, concentrando atacadistas, redes de varejo e empresas de logística regional. A dinamicidade comercial da cidade exige vigilância profissional com agilidade de resposta.', bairros: 'Centro, Turmalina, Bom Jardim, Costa Rica, Vila Bretas, Altinópolis, Esperança', faq: [{ p: 'Vocês atendem comércios e distribuidoras no centro de Governador Valadares?', r: 'Sim. Atendemos estabelecimentos comerciais de todos os portes, com vigilantes fixos, rondas e monitoramento por câmeras.' }, { p: 'É possível contratar segurança avulsa para eventos em Governador Valadares?', r: 'Sim, oferecemos segurança avulsa e pontual para eventos sem necessidade de contrato de longa duração.' }] },
  { nome: 'Ipatinga', slug: 'ipatinga', desc: 'Ipatinga integra o Vale do Aço e é sede de grandes usinas siderúrgicas, tornando-se um polo industrial de relevância nacional. A proteção de instalações industriais, controle de acesso de trabalhadores e segurança de perímetro são as principais demandas locais.', bairros: 'Centro, Horto, Cariru, Bom Retiro, Bela Vista, Vila Celeste, Castelo', faq: [{ p: 'A Santo Onofre atende empresas do setor siderúrgico em Ipatinga?', r: 'Sim. Temos profissionais treinados para atuar em ambientes industriais de alta complexidade, com foco em segurança de perímetro.' }, { p: 'Vocês cobrem toda a região do Vale do Aço?', r: 'Sim, além de Ipatinga atendemos também Coronel Fabriciano, Timóteo e municípios vizinhos.' }] },
  { nome: 'Sete Lagoas', slug: 'sete-lagoas', desc: 'Sete Lagoas é um importante polo industrial e comercial da região central de Minas Gerais, com destaque para os setores metalúrgico, alimentício e de logística. A cidade registra crescimento constante de condomínios empresariais e indústrias que demandam segurança profissional.', bairros: 'Centro, Eldorado, São João, Santo Antônio, Fazenda Velha, Várzea, Jardim Arizona', faq: [{ p: 'Vocês atendem condomínios empresariais em Sete Lagoas?', r: 'Sim. Oferecemos vigilância para condomínios empresariais com controle de acesso de veículos, rondas e monitoramento 24 horas.' }, { p: 'A Santo Onofre faz segurança para o setor alimentício em Sete Lagoas?', r: 'Sim, atendemos indústrias alimentícias com protocolos adaptados às normas do setor.' }] },
  { nome: 'Divinópolis', slug: 'divinopolis', desc: 'Divinópolis é o maior polo têxtil e de confecções de Minas Gerais, além de concentrar indústrias metalúrgicas e de alimentos. O grande volume de mercadorias circulando torna a segurança patrimonial essencial para os negócios locais.', bairros: 'Centro, Niterói, Sidil, São José, Interlagos, Belvedere, Danilo Passos', faq: [{ p: 'A Santo Onofre atende empresas do setor têxtil em Divinópolis?', r: 'Sim. Temos experiência em segurança para fábricas de confecções e centros de distribuição, com controle de acesso e monitoramento de estoque.' }, { p: 'Vocês atendem condomínios residenciais em Divinópolis?', r: 'Sim, oferecemos portaria profissional e vigilância para condomínios em todos os bairros de Divinópolis.' }] },
  { nome: 'Santa Luzia', slug: 'santa-luzia', desc: 'Santa Luzia integra a Região Metropolitana de Belo Horizonte e tem crescimento expressivo nos setores de comércio e serviços. A proximidade com a capital e o aumento de condomínios residenciais e empresariais elevam a demanda por segurança profissional.', bairros: 'Centro, Palmital, Salgado Filho, Jardim Alterosas, São Benedito, Nova Pampulha, Floramar', faq: [{ p: 'A Santo Onofre atende condomínios residenciais em Santa Luzia?', r: 'Sim. Oferecemos portaria profissional, vigilância patrimonial e controle de acesso para condomínios em Santa Luzia.' }, { p: 'Qual o tempo de resposta para atendimento em Santa Luzia?', r: 'Como cidade da RMBH, Santa Luzia conta com cobertura rápida e equipes locais para atendimentos urgentes.' }] },
  { nome: 'Ibirité', slug: 'ibirite', desc: 'Ibirité é um dos municípios da RMBH com maior crescimento populacional recente, impulsionado pela expansão de condomínios residenciais e comércios locais. A demanda por segurança em novos empreendimentos cresce junto com a cidade.', bairros: 'Centro, Jardim das Oliveiras, Jardim Leblon, Milionários, São Francisco, Parque Durval', faq: [{ p: 'Vocês atendem novos empreendimentos residenciais em Ibirité?', r: 'Sim. Atendemos condomínios em fase de implantação e consolidados, com equipes treinadas e contratos flexíveis.' }, { p: 'A Santo Onofre faz rondas noturnas em Ibirité?', r: 'Sim, oferecemos rondas ostensivas em horários programados para negócios e condomínios que precisam de cobertura sem vigilante fixo.' }] },
  { nome: 'Poços de Caldas', slug: 'pocos-de-caldas', desc: 'Poços de Caldas é um importante polo turístico e comercial do Sul de Minas Gerais, com forte presença do setor de hotelaria, eventos e comércio. A segurança em hotéis, centros de convenções e shoppings é uma necessidade permanente.', bairros: 'Centro, Jardim Quisisana, Alto da Bela Vista, Cascata, São Sebastião, Jardim Esperança', faq: [{ p: 'Vocês atendem hotéis e resorts em Poços de Caldas?', r: 'Sim. Temos experiência em segurança para meios de hospedagem, com porteiros treinados e vigilantes discretos.' }, { p: 'A Santo Onofre faz segurança para eventos em Poços de Caldas?', r: 'Sim, oferecemos equipes para eventos corporativos, convenções e feiras com controle de acesso e segurança operacional.' }] },
  { nome: 'Patos de Minas', slug: 'patos-de-minas', desc: 'Patos de Minas é polo agroindustrial do Alto Paranaíba, com destaque para o processamento de grãos, frigoríficos e cooperativas agropecuárias. A movimentação de mercadorias de alto valor exige vigilância especializada com controle rigoroso de acesso.', bairros: 'Centro, Alvorada, Nações, Padre Cícero, Santa Terezinha, Jardim Esperança, Industrial', faq: [{ p: 'A Santo Onofre atende cooperativas e agroindústrias em Patos de Minas?', r: 'Sim. Temos experiência em segurança para unidades agroindustriais, silos, frigoríficos e cooperativas.' }, { p: 'Vocês fazem segurança para transporte de cargas em Patos de Minas?', r: 'Oferecemos segurança de instalações, controle de acesso de veículos e monitoramento de pátios para empresas de transporte.' }] },
  { nome: 'Pouso Alegre', slug: 'pouso-alegre', desc: 'Pouso Alegre é um polo industrial e de serviços do Sul de Minas Gerais, com crescimento expressivo no setor de indústrias farmacêuticas, metalúrgicas e de logística. A posição estratégica às margens da Fernão Dias faz da cidade um hub logístico que demanda segurança profissional.', bairros: 'Centro, Miriam, Fátima, Jardim das Nações, Bela Vista, Alto da Boa Vista, Industrial', faq: [{ p: 'Vocês atendem indústrias farmacêuticas em Pouso Alegre?', r: 'Sim. Oferecemos segurança para instalações farmacêuticas com rigoroso controle de acesso e monitoramento 24h.' }, { p: 'A Santo Onofre faz segurança em centros logísticos em Pouso Alegre?', r: 'Sim, atendemos centros de distribuição e galpões logísticos na região, com controle de acesso de caminhões.' }] },
  { nome: 'Teófilo Otoni', slug: 'teofilo-otoni', desc: 'Teófilo Otoni é o principal centro comercial do Vale do Mucuri e referência nacional no comércio de gemas e pedras preciosas. O alto valor das mercadorias comercializadas torna a segurança patrimonial uma exigência do setor.', bairros: 'Centro, Fátima, Minas Brasil, Santa Rita, Palmeiras, Ipiranga, Vila Cel. Oliveira', faq: [{ p: 'A Santo Onofre atende lojas de gemas e joalherias em Teófilo Otoni?', r: 'Sim. Oferecemos segurança para estabelecimentos do comércio gemológico com vigilantes treinados para ambientes de alto valor.' }, { p: 'Vocês fazem segurança em eventos do setor gemológico em Teófilo Otoni?', r: 'Sim, oferecemos segurança de instalações e acompanhamento em eventos e feiras do setor realizados em Teófilo Otoni.' }] },
  { nome: 'Barbacena', slug: 'barbacena', desc: 'Barbacena é conhecida como a cidade das rosas e é polo regional do Campo das Vertentes, com destaque para os setores de saúde, educação e floricultura. A presença de grandes hospitais, faculdades e centros de distribuição de flores cria demandas específicas de segurança.', bairros: 'Centro, São Sebastião, Mangabeiras, Frei Orlando, Industrial, Jardim Marajá, Boa Vista', faq: [{ p: 'Vocês atendem hospitais e instituições de saúde em Barbacena?', r: 'Sim. Temos experiência em segurança hospitalar, com abordagem discreta e controle de acesso de visitantes.' }, { p: 'A Santo Onofre atende empresas do setor de floricultura em Barbacena?', r: 'Sim, oferecemos segurança para galpões de armazenamento e centros de distribuição de flores.' }] },
  { nome: 'Sabará', slug: 'sabara', desc: 'Sabará é um município histórico da RMBH, com patrimônio arquitetônico barroco e crescente desenvolvimento industrial e residencial. A proteção de patrimônio histórico, instalações industriais e condomínios são as principais demandas de segurança local.', bairros: 'Centro Histórico, Carmo do Cajuru, Ravena, Mestre Caetano, Roças Novas', faq: [{ p: 'A Santo Onofre faz segurança para o patrimônio histórico de Sabará?', r: 'Sim. Oferecemos vigilância discreta para museus, igrejas históricas e imóveis tombados.' }, { p: 'Vocês atendem condomínios no distrito de Ravena em Sabará?', r: 'Sim, atendemos todos os distritos e localidades de Sabará, incluindo Ravena, com equipes próprias.' }] },
  { nome: 'Varginha', slug: 'varginha', desc: 'Varginha é a capital do café e polo regional do Sul de Minas Gerais, com forte presença de tradings, torrefadoras e empresas do agronegócio cafeeiro. O alto valor das operações ligadas ao café eleva a demanda por vigilância patrimonial.', bairros: 'Centro, Jardim Andere, São Geraldo, Santa Luzia, Cândido Rodrigues, Industrial, Nova Varginha', faq: [{ p: 'A Santo Onofre atende tradings e empresas do setor cafeeiro em Varginha?', r: 'Sim. Oferecemos segurança para armazéns, torrefadoras e escritórios do setor cafeeiro.' }, { p: 'Vocês atendem o setor industrial de Varginha?', r: 'Sim, atendemos o distrito industrial de Varginha com vigilância de perímetro e controle de acesso de veículos.' }] },
  { nome: 'Conselheiro Lafaiete', slug: 'conselheiro-lafaiete', desc: 'Conselheiro Lafaiete está no coração do Quadrilátero Ferrífero e é polo de mineração e siderurgia. A segurança de instalações de alto valor, equipamentos pesados e acesso de fornecedores é prioridade para as empresas locais.', bairros: 'Centro, Cachoeirinha, Industrial, Jardim Europa, São Joaquim, Belo Vale, Lavapés', faq: [{ p: 'A Santo Onofre atende mineradoras e siderúrgicas em Conselheiro Lafaiete?', r: 'Sim. Oferecemos segurança para instalações do setor mineral, com vigilância de perímetro e controle de acesso de veículos pesados.' }, { p: 'Vocês fazem segurança para escritórios corporativos de mineração na região?', r: 'Sim, atendemos escritórios e instalações de apoio das empresas do setor mineral.' }] },
  { nome: 'Viçosa', slug: 'vicosa', desc: 'Viçosa é um polo universitário da Zona da Mata Mineira, sede da UFV e de dezenas de empresas de agropecuária e tecnologia. O fluxo intenso de estudantes e pesquisadores cria demandas específicas de segurança para o setor educacional e empresarial.', bairros: 'Centro, Silvestre, Nova Viçosa, Ramos, Centro Universitário, Passos, Santo Antônio', faq: [{ p: 'A Santo Onofre faz segurança para empresas de agritech em Viçosa?', r: 'Sim. Atendemos empresas de tecnologia agrícola, laboratórios e centros de pesquisa com controle de acesso e monitoramento.' }, { p: 'Vocês atendem condomínios residenciais em Viçosa?', r: 'Sim, atendemos condomínios residenciais formais em Viçosa com portaria e vigilância.' }] },
  { nome: 'Itabira', slug: 'itabira', desc: 'Itabira é berço da mineração de ferro no Brasil e sede histórica da Vale. A presença de operações mineiras de grande escala, além de comércio e serviços, cria demanda constante por segurança patrimonial.', bairros: 'Centro, Melo Viana, Nova Itabira, Cubas, Bom Jesus, Ventura, Industrial', faq: [{ p: 'A Santo Onofre atende fornecedores da mineração em Itabira?', r: 'Sim. Atendemos empresas do ecossistema minerário com segurança de instalações, controle de acesso e monitoramento eletrônico.' }, { p: 'Vocês fazem segurança para os condomínios residenciais em Itabira?', r: 'Sim, atendemos condomínios horizontais e verticais em Itabira com portaria e vigilância patrimonial.' }] },
  { nome: 'Itaúna', slug: 'itauna', desc: 'Itaúna é um município dinâmico do Centro-Oeste Mineiro, com destaque para o setor têxtil, metalúrgico e de bebidas. A variedade do parque industrial local exige soluções de segurança flexíveis e adaptadas.', bairros: 'Centro, Lagoa dos Patos, Novo Horizonte, São Geraldo, Industrial, Bom Jesus, Esplanada', faq: [{ p: 'Vocês atendem indústrias de bebidas e alimentação em Itaúna?', r: 'Sim. Temos experiência em segurança para indústrias do setor alimentício e de bebidas com protocolos adaptados.' }, { p: 'A Santo Onofre faz monitoramento eletrônico para empresas em Itaúna?', r: 'Sim, oferecemos instalação e monitoramento de sistemas CFTV integrados à vigilância presencial.' }] },
  { nome: 'Coronel Fabriciano', slug: 'coronel-fabriciano', desc: 'Coronel Fabriciano integra o Vale do Aço junto com Ipatinga e Timóteo, formando um dos maiores polos industriais de Minas Gerais. A concentração de siderúrgicas, metalúrgicas e empresas de logística industrial na região cria alta demanda por segurança profissional.', bairros: 'Centro, Caladinho, Amaro Lanari, Olaria, Construção, Industrial, Girassóis', faq: [{ p: 'A Santo Onofre atende empresas metalúrgicas em Coronel Fabriciano?', r: 'Sim. Oferecemos segurança para instalações metalúrgicas com vigilância de perímetro e controle de acesso.' }, { p: 'Vocês cobrem os três municípios do Vale do Aço?', r: 'Sim, atendemos toda a região do Vale do Aço com equipes locais e cobertura integrada nos três municípios.' }] },
  { nome: 'Muriaé', slug: 'muriae', desc: 'Muriaé é polo regional da Zona da Mata Mineira, com destaque para os setores de confecções, comércio atacadista e serviços de saúde. O dinamismo comercial e o crescimento de novos bairros residenciais aumentam a demanda por segurança patrimonial.', bairros: 'Centro, Aeroporto, São Cristóvão, São Judas Tadeu, Industrial, Bom Pastor, Santa Terezinha', faq: [{ p: 'Vocês atendem o setor de confecções em Muriaé?', r: 'Sim. Oferecemos segurança para centros de distribuição e lojas atacadistas com controle de acesso e vigilância de estoque.' }, { p: 'A Santo Onofre faz segurança para clínicas em Muriaé?', r: 'Sim, temos experiência em segurança para estabelecimentos de saúde com abordagem discreta.' }] },
  { nome: 'Araguari', slug: 'araguari', desc: 'Araguari é polo agroindustrial do Triângulo Mineiro, com forte presença de cooperativas, cerealistas e empresas do setor de café e soja. A movimentação de grandes volumes de produtos agrícolas eleva a demanda por vigilância profissional.', bairros: 'Centro, Independência, Tabajaras, Santa Luzia, Dona Amélia, Industrial, Bom Jesus', faq: [{ p: 'A Santo Onofre atende cerealistas e cooperativas em Araguari?', r: 'Sim. Oferecemos segurança para silos, armazéns e cooperativas com vigilância de perímetro e controle de acesso.' }, { p: 'Vocês atendem o setor logístico em Araguari?', r: 'Sim, atendemos centros de distribuição e transportadoras com monitoramento eletrônico e vigilância de pátios.' }] },
  { nome: 'Ubá', slug: 'uba', desc: 'Ubá é a capital moveleira de Minas Gerais e um dos maiores polos do setor de móveis do Brasil. A proteção de ativos industriais, estoques de alto valor e controle de acesso nas fábricas são demandas prioritárias do setor moveleiro.', bairros: 'Centro, São Sebastião, Industrial, Universitário, Boa Vista, Santa Luzia, Aeroporto', faq: [{ p: 'A Santo Onofre atende fábricas de móveis em Ubá?', r: 'Sim. Temos experiência em segurança para o polo moveleiro, com controle de acesso de funcionários e vigilância de estoque.' }, { p: 'Vocês fazem segurança para showrooms do polo moveleiro de Ubá?', r: 'Sim, atendemos showrooms e pontos de venda com vigilantes treinados e sistemas de monitoramento eletrônico.' }] },
  { nome: 'Lavras', slug: 'lavras', desc: 'Lavras é polo universitário e agroindustrial do Sul de Minas, sede da UFLA e de empresas do setor de sementes, agroquímicos e agroindústria. O ambiente universitário e a presença de centros de pesquisa de alto valor criam demandas específicas de segurança.', bairros: 'Centro, Primavera, Jardim Glória, Nossa Senhora de Lourdes, Industrial, São Vicente', faq: [{ p: 'A Santo Onofre atende empresas do setor de sementes e agroquímicos em Lavras?', r: 'Sim. Oferecemos segurança para laboratórios, armazéns e centros de pesquisa do setor agrícola.' }, { p: 'Vocês fazem segurança para empresas que prestam serviço à UFLA em Lavras?', r: 'Sim, atendemos empresas parceiras e prestadoras de serviço do entorno universitário.' }] }
];

// ============================================================
// CIDADES EXTRAS — template automático
// ============================================================
function ct(nome, slug) {
  const variacoes = [
    `${nome} é um município de Minas Gerais com economia ativa e crescente demanda por serviços de segurança patrimonial profissional. A expansão comercial e de condomínios residenciais na cidade eleva constantemente a necessidade de controle de acesso e orientação de público. A Santo Onofre Serviços atende empresas, condomínios e indústrias em ${nome} com equipes treinadas.`,
    `${nome} conta com setor comercial e industrial em crescimento, o que aumenta a demanda por segurança patrimonial profissional. A Santo Onofre Serviços oferece vigilância, controle de acesso e monitoramento eletrônico para empresas e condomínios em ${nome} e toda a região.`,
    `Com desenvolvimento econômico consistente, ${nome} concentra empresas, condomínios e estabelecimentos que necessitam de proteção patrimonial especializada. A Santo Onofre oferece soluções completas de segurança para todos os portes de negócio em ${nome}, MG.`
  ];
  const hash = slug.length % 3;
  return {
    nome, slug,
    desc: variacoes[hash],
    bairros: 'Centro, Bairro Industrial, Área Comercial, Bairros Residenciais',
    faq: [
      { p: `Como contratar segurança patrimonial em ${nome}?`, r: `Entre em contato via WhatsApp ${TEL} ou pelo formulário do site. Nossa equipe prepara proposta personalizada para sua empresa em ${nome} em até 24 horas.` },
      { p: `A Santo Onofre atende ${nome} com equipe treinada?`, r: `Sim. Atendemos ${nome} com profissionais treinados em controle de acesso e orientação de público, com suporte da nossa central de operações em Minas Gerais.` }
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

const cidades = [...cidadesRicas, ...cidadesExtras];

// CSS agora em /seo.css — edite lá para atualizar todas as páginas de uma vez

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
    "description": `${srv.nome} em ${cid.nome}, MG`,
    "url": DOMAIN,
    "telephone": `+${WATEL}`,
    "areaServed": `${cid.nome}, Minas Gerais`,
    "serviceType": srv.nome,
    "address": { "@type": "PostalAddress", "addressLocality": cid.nome, "addressRegion": "MG", "addressCountry": "BR" }
  });

  const cidadesDestaque = cidades.slice(0, 15).filter(c => c.slug !== cid.slug).slice(0, 12);

  return `<!DOCTYPE html>
<html lang="pt-BR">
<head>
<meta charset="UTF-8"/>
<meta name="viewport" content="width=device-width,initial-scale=1.0"/>
<link rel="icon" type="image/svg+xml" href="/favicon.svg"/>
<meta name="description" content="${srv.desc(cid.nome)}"/>
<title>${srv.title(cid.nome)}</title>
<meta name="robots" content="index, follow"/>
<link rel="canonical" href="${url}"/>
<meta property="og:title" content="${srv.title(cid.nome)}"/>
<meta property="og:description" content="${srv.desc(cid.nome)}"/>
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
  <a href="/seguranca-${cid.slug}/">${cid.nome}</a><span>›</span>
  <span style="color:rgba(255,255,255,.5)">${srv.nome}</span>
</div>
<div class="lp-tag">${srv.badge} em ${cid.nome} - MG</div>
<h1>${srv.h1(cid.nome).replace(cid.nome, `<span>${cid.nome}</span>`)}</h1>
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
<h2>${srv.nome} em ${cid.nome}, MG</h2>
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
<div class="srv-card"><div class="srv-icon"><svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#FFCC00" stroke-width="1.8"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg></div><h3>Vigilância Patrimonial</h3><p>Profissionais treinados para proteção de empresas, condomínios e indústrias em ${cid.nome} com cobertura 24 horas.</p></div>
<div class="srv-card"><div class="srv-icon"><svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#FFCC00" stroke-width="1.8"><rect x="3" y="11" width="18" height="11" rx="2"/><path d="M7 11V7a5 5 0 0110 0v4"/></svg></div><h3>Controle de Acesso</h3><p>Gestão eletrônica e presencial de entrada e saída com registros completos para empresas em ${cid.nome}.</p></div>
<div class="srv-card"><div class="srv-icon"><svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#FFCC00" stroke-width="1.8"><rect x="2" y="3" width="20" height="14" rx="2"/><path d="M8 21h8M12 17v4"/></svg></div><h3>Monitoramento Eletrônico</h3><p>Câmeras CFTV e central de monitoramento 24h integrados à vigilância presencial em ${cid.nome}.</p></div>
<div class="srv-card"><div class="srv-icon"><svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#FFCC00" stroke-width="1.8"><circle cx="12" cy="12" r="10"/><path d="M12 8v4l3 3"/></svg></div><h3>Ronda Motorizada</h3><p>Patrulhamento preventivo em horários programados para máxima proteção do seu patrimônio em ${cid.nome}.</p></div>
<div class="srv-card"><div class="srv-icon"><svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#FFCC00" stroke-width="1.8"><rect x="3" y="4" width="18" height="18" rx="2"/><path d="M16 2v4M8 2v4M3 10h18"/></svg></div><h3>Segurança em Eventos</h3><p>Equipes especializadas para eventos corporativos, formaturas e shows em ${cid.nome} e região.</p></div>
<div class="srv-card"><div class="srv-icon"><svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#FFCC00" stroke-width="1.8"><path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z"/><path d="M9 22V12h6v10"/></svg></div><h3>Portaria Profissional</h3><p>Porteiros treinados para triagem, identificação e atendimento em condomínios e empresas de ${cid.nome}.</p></div>
</div>
</div>
</section>

<section style="padding:48px 6%;background:#fff;border-top:1px solid var(--bo);">
<div class="wrap">
<span class="stag">Você procurou e nos encontrou</span>
<h2 style="font-size:18px;font-weight:800;color:#0B1829;margin-bottom:20px;">Você procurou por <strong>${srv.nome}</strong> em <strong>${cid.nome}</strong>? Que bom que nos achou!</h2>
<p style="font-size:13px;color:var(--mu);margin-bottom:16px;">A Santo Onofre Serviços atende as principais buscas relacionadas a segurança e controle de acesso em ${cid.nome} e região de Minas Gerais:</p>
<ul style="display:flex;flex-wrap:wrap;gap:10px;list-style:none;">
${[
  `${srv.nome} em ${cid.nome}`,
  `${srv.nome} em ${cid.nome} MG`,
  `Empresa de ${srv.nome.toLowerCase()} em ${cid.nome}`,
  `${srv.nome} em ${cid.nome} e região`,
  `Controle de acesso em ${cid.nome}`,
  `Orientador de público em ${cid.nome}`,
  `Monitoramento patrimonial em ${cid.nome}`,
  `Observação patrimonial ${cid.nome} MG`,
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
<h2>Referência em Segurança em ${cid.nome} e MG</h2>
<div class="gold-line" style="background:linear-gradient(90deg,#FFCC00,#FFE033);"></div>
<div class="why-grid">
<div class="why-card"><div class="why-num">+10</div><div class="why-label">Anos de experiência em segurança patrimonial em MG</div></div>
<div class="why-card"><div class="why-num">100%</div><div class="why-label">Profissionais treinados em controle de acesso e orientação de público</div></div>
<div class="why-card"><div class="why-num">24/7</div><div class="why-label">Atendimento e cobertura ininterrupta para sua empresa</div></div>
<div class="why-card"><div class="why-num">0</div><div class="why-label">Burocracia — contratos flexíveis e proposta rápida</div></div>
</div>
</div>
</section>

<section class="sec sec-light">
<div class="wrap">
<span class="stag">Abrangência</span>
<h2>Atendemos ${cid.nome} e Toda a Região de MG</h2>
<p class="sec-sub">Além de ${cid.nome}, a Santo Onofre atende nas principais cidades de Minas Gerais.</p>
<div class="gold-line"></div>
<div style="border-radius:14px;overflow:hidden;border:1px solid var(--bo);margin-bottom:28px;">
<iframe src="https://www.google.com/maps?q=${encodeURIComponent(cid.nome + ', MG, Brasil')}&output=embed" width="100%" height="320" style="border:0;display:block;" loading="lazy" referrerpolicy="no-referrer-when-downgrade" title="Mapa de ${cid.nome}, MG"></iframe>
</div>
<div class="cidades-grid">
${cidadesDestaque.map(c => `<a href="/seguranca-${c.slug}/" class="cidade-tag">${c.nome}</a>`).join('\n')}
</div>
</div>
</section>

<section class="cta-sec">
<div class="wrap">
<h2>Precisa de ${srv.nome} em ${cid.nome}?</h2>
<p>Entre em contato agora e receba uma proposta personalizada para sua empresa ou condomínio em ${cid.nome}, MG.</p>
<div class="cta-btns">
<a href="/contato.html" class="btn-gold">Solicitar proposta gratuita <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#0B1829" stroke-width="2.5"><path d="M5 12h14M12 5l7 7-7 7"/></svg></a>
<a href="https://wa.me/${WATEL}" target="_blank" class="btn-outline">Falar no WhatsApp</a>
</div>
</div>
</section>

<footer>
<div class="wrap">
<div class="footer-grid">
<div><span class="ft-name">Santo Onofre Serviços</span><p class="ft-desc" style="margin-top:8px;">${srv.nome} em ${cid.nome} e em toda Minas Gerais.</p></div>
<div><div class="ft-title">Serviços</div><a href="/servicos.html" class="ft-link">Vigilância Patrimonial</a><a href="/servicos.html" class="ft-link">Controle de Acesso</a><a href="/servicos.html" class="ft-link">Monitoramento</a><a href="/servicos.html" class="ft-link">Seg. em Eventos</a></div>
<div><div class="ft-title">Cidades</div>${cidadesDestaque.slice(0,4).map(c=>`<a href="/seguranca-${c.slug}/" class="ft-link">${c.nome}</a>`).join('')}</div>
<div><div class="ft-title">Fale Conosco</div><a href="https://wa.me/${WATEL}" class="ft-link" target="_blank">${TEL}</a><span class="ft-link" style="cursor:default">Minas Gerais</span></div>
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

  const urlsLpsCidades = cidades.map(c =>
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
