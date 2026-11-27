// ==UserScript==
// @name         SIGEO - Robô Terceirizados
// @namespace    http://tampermonkey.net/
// @version      2.5.53
// @description  v2.5.53: PROAD da colagem para o Relatório SLDST — passa a ser lido também do nome da pasta escolhida em "Juntar pasta" (antes só vinha da pasta do PDF aberto direto no navegador), sem confundir o número do contrato com o ano (ex.: "PROAD 35103 10031 2025"), com ano sugerido pela competência quando a pasta não traz o ano; campo PROAD editável na aba "Checklist do relatório" e aviso na cópia quando ele estiver vazio. v2.5.52: Fator Qualidade escrito "IMR NÃO AVALIADO" (com o prefixo IMR, ex.: Nevada 23SR001 10/2026, Lavras) é aceito como os demais textos de não avaliado e não bloqueia mais a importação da SEGEST; comprovante do Bradesco Multipag ("Crédito em Conta Real Time", Favorecido Caixa) passa a ter valor, data, pagador e favorecido lidos (ex.: Suricate 10/2026), só quando nenhum leitor anterior leu a página; "Detalhe da Guia a Ser Emitida" do FGTS Digital (prévia impressa antes de emitir a GFD, sem número da guia, ex.: Village 10/2025) passa a ser lido como o detalhe da guia, com informação de que é a prévia; os totais continuam conferidos com a GFD (GFD3), e a prévia só é ligada à GFD quando empregador, competência, vencimento e total da guia são os mesmos. Ocorrências da SEGEST: CPF formatado seguido de ponto final e do número da linha seguinte (ex.: "CPF 092.878.236-00.\n31/10-Feriado") não é mais lido como CPF inválido "092.878.236-00.31". DARF só de PIS/COFINS/IRPJ/CSLL, sem nº de recibo, com nenhum código entre os débitos da DCTFWeb e esses tributos zerados na declaração (ex.: Village 10/2025, DARF 5856/6912 de PIS/COFINS não cumulativo) não entra mais na soma do DARF 4: vira informação, sem "pagamentos superam o saldo". Liquidação: no XML do Atende.Net (ex.: Suricate, São José/SC), a UF do local da prestação e do município de incidência do ISSQN passa a ser lida quando o código do local da prestação é o mesmo da cidade do tomador e o ISS não é do município do prestador (UF do tomador; o código IBGE de cLocalidadeIncid entra só se for da mesma UF), e o "Cód. IBGE ISSQN" é preenchido nesse caso; centro de custo com diferença só de arredondamento (o ateste do SIGEO aplica o rateio da Área Administrativa sobre o total, como a planilha da SEGEST, e a Liquidação linha a linha) vira alerta explicado em amarelo, não divergência. v2.5.51: comprovante Pix do Sicoob em que a marca é só imagem (cooperativa no lugar do nome, ex.: "CC CREDIBOM", Brigada 10/2026) passa a ter o valor lido (antes: "valor pago não identificado"), com o mesmo layout e as mesmas regras de vínculo já aceitos ("Comprovante de envio Pix", Recebedor, Pagador, Detalhes do pagamento, "Transferido em"); só entra quando nenhum leitor anterior leu a página. Fora da SEGEST: quem está no relatório do INSS em outro serviço/lotação do TRT, diferente do de todos os terceirizados da SEGEST, ganha essa observação (continua "Verificar"). v2.5.50: DCTFWeb com linhas do Relatório de Débitos ilegíveis no OCR (ex.: Plansul 10/2026, código 1162-01 lido como "116207"): quando a diferença para o total do recibo é explicada exatamente pelas linhas do Resumo de Débitos que faltaram, sem saldo a pagar, vira informação e as PER/DCOMP voltam a ser conciliadas; sem essa explicação exata, o aviso continua. v2.5.49: novos layouts da MFC (10/2026): folha "Folha de Pagamento" com Cód/Nome/Função; "Demonstrativo eSocial – Evento S-5001" por trabalhador; GFD escaneada (OCR) reconhecida e ligada ao detalhe da guia só quando empregador, competência, total e número da guia (lido por OCR) conferem. Cada leitor novo só entra quando os anteriores não leram nada. v2.5.48: folha analítica da Interfort com "Adm issão" partido no texto do PDF volta a ser lida (mesma normalização que o layout Senior já fazia); sem a palavra partida, a leitura é a mesma. v2.5.47: Fator Qualidade "Sem resposta" (IMR sem avaliação, ex.: Rio Minas 10/2026, Patos de Minas) é aceito como os demais textos de não avaliado: vira aviso e não bloqueia a importação da SEGEST. v2.5.46: aba de correção de mês anterior com CPF e coluna "Diferença a corrigir" (ex.: "Correção Cesta Setembro" da Trabiserv) passa a ser lida; a diferença do posto igual à do mesmo CPF vai para OUTROS, como as correções já reconhecidas. v2.5.45: Comprovante BB com título, valor, data e ID separados por espaço comum (sem letras espaçadas) passa a ser lido; relatório do INSS sem CPF liga pelo nome também quando só as partículas (de, da, do, das, dos, e) diferem, ou pelo CPF de cobertura citado na SEGEST, apenas quando a regra anterior não liga e a identificação é única. v2.5.44: recupera linhas da Relação de Bases do INSS com taxa deformada pelo OCR e distingue total informado, linhas lidas e vínculos no tomador. v2.5.43: reconhece períodos de TA com início aberto (A partir de dd/mm/aaaa) na SEGEST, preservando a consolidação e as travas existentes. v2.5.42: reconhece o campo real contribuintePrevReceita do SIGEO; consulta complementar pela rota de fornecedores/query/jt, com conferência estrita do CNPJ e sem inferir pelo valor retido. v2.5.41: usa o indicador de contribuinte CPRB do cadastro do fornecedor para a retenção de INSS a 3,5%; cadastro explicitamente desmarcado usa 11%; sem indicador confirmado preserva a regra anterior, sem inferir pela retenção. Mantém as travas da macro e a conferência por serviço. v2.5.40: DCTFWeb reconhece recibos com digitos separados pelo OCR; PER/DCOMP de debito unico recupera valores ilegíveis somente com confirmação pelo total do extrato e recibo; preserva a conferência por código e demais módulos. v2.5.39: novo layout de faturamento com Valor Total a Faturar, TR, reembolsos e diárias; valida composição e IMR global sem inventar rateios. Preserva os layouts anteriores. v2.5.38: confere separadamente a UF do local da prestação e do município de incidência do ISSQN; esperado MG, com alerta de UF diferente ou não identificada, inclusive no DANFSe v2. Preserva a macro e as demais conferências. v2.5.37: versão de teste da atualização automática (sem mudanças no robô). v2.5.36: atualização automática pelo GitHub e aviso de nova versão no SIGEO. v2.5.35: retira apenas o botão Prev./FGTS da barra de ações do SIGEO; módulo previdenciário preservado, com acesso pelo menu do Tampermonkey e pelos PDFs locais. v2.5.34: folha Pessoal+ separa o demonstrativo mensal do adiantamento de férias pelo mesmo CPF e matrícula; resumos do departamento não entram nos valores individuais; soma bases e rubricas mensais repetidas; afastamentos com FGTS zero impresso têm justificativa documental, mantendo bases de INSS ausentes como pendência; observação do DARF distingue compensação de pagamento. v2.5.33: comprovante de DARF em que o banco não escreve "DARF" nem "Receita Federal" (ex.: Banco do Brasil, "Comprovante de pagamento de Inst. Nacional de Seguro Social") passa a ser reconhecido pela linha digitável da Receita Federal (código de barras de arrecadação com 0385) e vinculado ao DARF pelo número do documento que o código de barras contém; "Data de pagamento" lida como data do pagamento. v2.5.32: Relatório da Declaração Completa da DCTFWeb lido por OCR — as linhas "Número do Processo|… Tipo|DComp Valor|…" e "Descrição|…" (barras e letras trocadas pelo OCR) voltam a ser reconhecidas; sem isso a compensação ficava "sem nº da DComp" e a PER/DCOMP era tratada como posterior, comparada com saldo zero. CPRB (códigos 2985 e 2991) passa a contar no grupo CP Patronal, como no total do recibo da DCTFWeb. v2.5.31: comprovante lido por OCR com o "R$" trocado por "RS", "R5", "R§" ou "R $" (ex.: Pix do Sicoob) volta a ter o valor reconhecido — no DARF, o pagamento passa a ser vinculado pelo número do documento no identificador do Pix; na GFD, a observação traz valor, data, pagador e recebedor; data do Pix ("Transferido em") lida no comprovante do DARF; CPF da SEGEST com dígito verificador inválido é apontado, e o CPF provável dos documentos entra na observação do FGTS3. v2.5.30: consolida a base anexada (macro v2.0.2, períodos/aditivos) com a conciliação correta de PER/DCOMP posterior. Inclui pastas e subpastas, botão Juntar pasta e PDFs individuais do INSS identificados pela matrícula/nome do arquivo, validados com a folha; acumula todos os empregados e mantém a origem da identificação, sem associação por valores. v2.5.29: integração com macro v2.0.2 — envia metadados opcionais dos períodos para a conferência de Valor a Pagar, sem mudar as posições dos campos anteriores. v2.5.28: SEGEST com períodos e termos aditivos distintos na mesma aba; reconhece os cabeçalhos mesclados, soma dias e glosas, calcula o valor mensal equivalente ponderado e mantém uma linha por trabalhador. Preserva o Valor Total original, registra a composição nas Observações e mantém as validações para duplicações ambíguas. Base desta atualização: v2.5.26 anexada. v2.5.26: leitura mais robusta para qualquer empresa — antes do OCR, as linhas das tabelas são apagadas da imagem (bordas viravam "|", "/" e embaralhavam colunas); a orientação da página é escolhida pela confiança do OCR, não pelo tamanho do texto; página com texto embaralhado (sem nenhuma palavra de verdade) vai ao OCR; sobras de borda entre valores são ignoradas; o OCR guardado das versões anteriores é refeito uma vez. DARF/DCTFWeb: a compensação que a DCTFWeb não mostra sai numa frase só, com todas as DComp. v2.5.25: o robô não bloqueia a cópia; com a competência da planilha da SEGEST diferente da dos documentos, a confirmação de "Copiar para a planilha" abre com um alerta explicando o efeito na macro (aba do mês errado, ninguém na amostra). v2.5.23: checklist do Relatório SLDST editável na tela (FGTS Digital 1 a 5, DARF 1 a 3, GFD 1 a 4), já preenchido com o resultado do robô e a observação no padrão do relatório; a colagem (formato v5, macro mConferenciaPrev v3.0.0) leva o que estiver na tela, a quantidade da amostragem (20% da SEGEST, editável) e todos os terceirizados; a macro escolhe a amostra começando por quem ainda não foi conferido no ano. v2.5.22: conferência do DARF, da DCTFWeb e da PER/DCOMP (seção "Análise do DARF e da DCTFWeb" do POP_SLDST_002, itens DARF 1 a 6: dados da contratada, competência, número do recibo, saldo a pagar × DARFs pagos, PER/DCOMP juntada e valores compensados), com observação objetiva e o detalhe na aba DCTFWeb da memória; comprovante de DARF com fonte sem texto vai ao OCR; alerta de competência diferente em destaque; detalhe do FGTS Digital sem "Página X de Y": páginas diferentes com o mesmo tamanho de texto não são mais descartadas como cópia. v2.5.21: telas do portal do eSocial também em PDF com texto (letras separadas pelo navegador, ex. "T otalizador"); comprovante Pix do SISBB (Banco do Brasil); comprovante de vale-alimentação não é mais pré-marcado como FGTS. v2.5.20: lê o S-5001 impresso das telas do portal do eSocial ("Consulta Totalizador da Contribuição Previdenciária"); avisos de OCR e de consignado viram informação, não "Atenção". v2.5.19: leitura por OCR não gera mais pendência nem "Verificar" — só a observação de quais documentos foram lidos por OCR; página com texto ilegível (fonte sem mapeamento) vai ao OCR; comprovante do Banco do Brasil com letras espaçadas; vínculo do comprovante sem vencimento pelo pagamento dentro do prazo da guia. v2.5.18: valor lido por OCR que bate exatamente com documento digital (guia do FGTS, S-5001) não deixa o item pendente; fica registrado como lido por OCR e confirmado. Pendência de OCR passa a dizer quem e em que página. v2.5.17: pendências de OCR por fonte utilizada; comprovante Sicoob; rubricas e orientação do OCR; parcelas e totais rescisórios; conflitos de identificação e diagnóstico de leitura. Preserva notas, retenções, SEGEST, CSV, macro e formato PREVFGTS v4.
// @match        https://exe.sigeo.jt.jus.br/*
// @match        https://proad.trt3.jus.br/*
// @match        file:///*
// @run-at       document-start
// @grant        GM_xmlhttpRequest
// @grant        GM_addStyle
// @grant        GM_setValue
// @grant        GM_getValue
// @grant        GM_deleteValue
// @grant        GM_addValueChangeListener
// @grant        GM_removeValueChangeListener
// @grant        GM_openInTab
// @grant        GM_registerMenuCommand
// @grant        GM_setClipboard
// @connect      api.sigeo.jt.jus.br
// @connect      proad.trt3.jus.br
// @connect      servicodados.ibge.gov.br
// @connect      cdn.jsdelivr.net
// @connect      tessdata.projectnaptha.com
// @connect      *
// @connect      raw.githubusercontent.com
// @require      https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.min.js
// @require      https://cdnjs.cloudflare.com/ajax/libs/tesseract.js/5.1.1/tesseract.min.js
// @require      https://cdnjs.cloudflare.com/ajax/libs/xlsx/0.18.5/xlsx.full.min.js
// @require      https://cdnjs.cloudflare.com/ajax/libs/exceljs/4.4.0/exceljs.min.js
// @updateURL    https://raw.githubusercontent.com/thiago-gmartins/scripts-equipe/main/SLDST/robo-terceirizados.user.js
// @downloadURL  https://raw.githubusercontent.com/thiago-gmartins/scripts-equipe/main/SLDST/robo-terceirizados.user.js
// ==/UserScript==

(function () {
    'use strict';

    // v1.6.0 — Na aba do PROAD o robô não monta tela nenhuma: só atende a busca do TRD pedida
    // pelo SIGEO (ver seção 13). Tem de vir antes de tudo; o resto do script não roda lá.
    if (location.hostname.endsWith('proad.trt3.jus.br')) {
        if (window === window.top) iniciarTrabalhadorProad();
        return;
    }

    // ---------- Aviso de nova versão (v2.5.36) ----------
    // Só no SIGEO (o PROAD já saiu acima) e só na janela principal, para não repetir nos quadros internos.
    if (window === window.top) (function verificarAtualizacao() {
        const url = GM_info.script.downloadURL;
        if (!url) return;
        GM_xmlhttpRequest({
            method: 'GET',
            url: url + '?t=' + Date.now(),
            onload: (r) => {
                const m = r.responseText.match(/@version\s+([\d.]+)/);
                if (!m) return;
                const nova = m[1], atual = GM_info.script.version;
                const maior = (a, b) => {
                    const x = a.split('.').map(Number), y = b.split('.').map(Number);
                    for (let i = 0; i < Math.max(x.length, y.length); i++) {
                        if ((x[i] || 0) !== (y[i] || 0)) return (x[i] || 0) > (y[i] || 0);
                    }
                    return false;
                };
                if (!maior(nova, atual)) return;
                const faixa = document.createElement('div');
                faixa.innerHTML = `<b>${GM_info.script.name}</b>: nova versão ${nova} disponível (você está na ${atual}). <u>Clique aqui para atualizar.</u>`;
                faixa.style.cssText = 'position:fixed;top:0;left:0;right:0;background:#d97706;color:#fff;padding:8px 12px;font:14px sans-serif;z-index:999999;cursor:pointer;text-align:center';
                faixa.onclick = () => window.open(url, '_blank');
                const mostrar = () => document.body.appendChild(faixa);
                document.body ? mostrar() : document.addEventListener('DOMContentLoaded', mostrar);
            }
        });
    })();

    // pdf.js exige um worker configurado explicitamente; sem isso, getDocument() sempre
    // falha com "No GlobalWorkerOptions.workerSrc specified" (erro visto em produção).
    // Mesma versão do @require acima, apontando para o worker correspondente no CDN.
    if (typeof pdfjsLib !== 'undefined') {
        pdfjsLib.GlobalWorkerOptions.workerSrc = 'https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.worker.min.js';
    }

    // v2.0.0 — Módulo "Conferência Previdenciária e FGTS". Troque para false para desligá-lo:
    // o botão e o item de menu somem e o restante do robô segue igual.
    const MODULO_PREV_ATIVO = true;
    // v2.1.0 — página de arquivo do computador (file:///). Lá o robô só procura a folha, o S-5001
    // ou a guia do FGTS no PDF aberto; o restante (SIGEO) não roda.
    const EH_ARQUIVO_LOCAL = location.protocol === 'file:';
    if (MODULO_PREV_ATIVO && window === window.top && typeof GM_registerMenuCommand === 'function') {
        try { GM_registerMenuCommand('🧾 Conferência Previdenciária e FGTS', () => abrirModuloPrev()); } catch (e) { console.warn('[SIGEO-Terceirizados] Menu da conferência previdenciária indisponível:', e); }
    }

    /* ====================================================================================
     * 1. CONFIGURAÇÃO — REVISE ESTES PONTOS ANTES DE USAR EM PRODUÇÃO
     * ==================================================================================== */
    const CONFIG = {
        // ---- Critério de identificação de um registro como "Terceirizado" ----
        // Confirmado com o usuário: não existe um tipoCadastro específico para
        // "Terceirizado" no SIGEO. Empresas de terceirização de mão de obra (ex.: limpeza,
        // conservação, portaria) caem no MESMO balde genérico "Serviços" que já funciona em
        // produção no script combinado — ou seja, é tudo que sobra depois de excluir RPA,
        // Credenciado de Saúde PJ, Locador de Imóveis (Aluguel) e Manutenção Predial.
        // Por isso `registroETerceirizado()` (mais abaixo) reaproduz exatamente a lógica já
        // validada do `registroEServico` do script original — não precisa mexer aqui.
        classificacao: {
            manutencaoPredial: {
                tiposDocumentoAceitos: ['NFS', 'NFSe'],
                codigosNaturezaRendimentoPossiveis: [17003, 17004, 17099],
                siglaSetores: ['SEGPRE', 'SENG'],
                expressoesObjeto: ['Contratação continuada', 'Prestação de serviços', 'Manutenção predial'],
            },
        },
        idUnidadeGestora: 80008,
        cnpjOrgao: '01298583000141', // CNPJ do TRT3 — usado para validar o "tomador" da nota
        // ---- Soma da coluna "IRRF + Contrib. Sociais" (vale para XML, PDF nacional e Cuiabá/OCR) ----
        // false = IRRF + CSLL (padrão histórico do módulo de Saúde; ex. nota APPA 2987 = 232,99)
        // true  = IRRF + CSLL + PIS + COFINS (total federal da IN RFB 1.234; ex. = 379,61)
        somaFederalIncluiPisCofins: false,
        // ---- Desempenho (v1.3.6) ----
        // O XML e o PDF são baixados pela API (pelo id da nota), então abrir o menu "⋮" de
        // cada linha só para localizar os botões XML/PDF do DOM é trabalho perdido: custa até
        // 2s de espera de overlay POR NOTA (num lote de 26, mais de 50s jogados fora).
        // Deixe false; ligue apenas se precisar do apoio do DOM para depurar.
        usarBotoesDaLinhaComoApoio: false,
        // Respiro entre notas para não saturar a API do SIGEO (era 600ms fixo até a 1.3.5).
        pausaEntreNotasMs: 150,
        // ---- Layout das colunas de INSS (v1.4.9) ----
        // Quantidade FIXA de grupos "Tipo de Serviço / BC INSS / Retenção INSS" exportados,
        // independentemente do lote. Mantém sempre a mesma posição de colunas na planilha:
        // 7 grupos (21 colunas) + "Total Retenção INSS" = 22 colunas antes de Natureza de Rendimento.
        // Se alguma nota tiver MAIS tipos que isso, nada é descartado: as colunas extras
        // aparecem e um aviso é exibido no console (o layout sai do padrão nesse lote).
        quantidadeFixaRetencoesInss: 7,
        // ---- Planilha da SEGEST (v1.5.0) ----
        segest: {
            // Tipo de serviço do INSS de cada POSTO da SEGEST. Avaliado em ordem: a primeira
            // regra que casar vale. Se surgir um cargo novo, acrescente uma linha aqui.
            regrasCodigoServicoPorPosto: [
                { regex: /vigilante|vigil[aâ]ncia/i, codigo: '100000002' },
                { regex: /servente|limpeza/i, codigo: '100000001' },
                { regex: /copeir|gar[çc]om/i, codigo: '100000012' },
                { regex: /cont[íi]nuo/i, codigo: '100000017' },
                { regex: /impressor/i, codigo: '100000022' },
                { regex: /operador\s+de\s+carga|aux\w*\.?\s+operador/i, codigo: '100000026' },
                { regex: /porteiro|recepcionista|ascensorista/i, codigo: '100000025' },
                { regex: /supervisor|encarregad/i, codigo: '100000028' },
            ],
            // Reconhece o tipo de serviço da retenção do SIGEO quando o código não vier no texto.
            // "triagem/movimentação" vem antes de "portaria/recepção" porque ambos citam recepção.
            regrasCodigoServicoPorDescricao: [
                { regex: /VIGILANCIA|SEGURANCA/, codigo: '100000002' },
                { regex: /PREPARACAO DE DADOS PARA PROCESSAMENTO/, codigo: '100000006' },
                { regex: /LIMPEZA|CONSERVA|ZELADORIA/, codigo: '100000001' },
                { regex: /\bCOPA\b/, codigo: '100000012' },
                { regex: /ENTREGA DE CONTAS|DOCUMENTOS/, codigo: '100000017' },
                { regex: /OPERACAO DE MAQUINAS/, codigo: '100000022' },
                { regex: /TRIAGEM|MOVIMENTACAO DE MATERIA/, codigo: '100000026' },
                { regex: /PORTARIA|ASCENSORISTA/, codigo: '100000025' },
                { regex: /SECRETARIA|EXPEDIENTE/, codigo: '100000028' },
            ],
            // Texto exato da coluna "Código Tipo de Serviço" da Liquidação (inclusive o
            // "conservarção" que já está na planilha, para não quebrar as tabelas dinâmicas).
            textoCodigoServico: {
                '100000002': '100000002 - Vigilância ou segurança',
                '100000001': '100000001 - Limpeza, conservarção ou zeladoria',
                '100000006': '100000006 - Preparação de dados para processamento',
                '100000012': '100000012 - Copa',
                '100000017': '100000017 - Entrega de contas e de documentos',
                '100000022': '100000022 - Operação de máquinas, de equipamento e de veículos',
                '100000025': '100000025 - Portaria, recepção ou ascensorista',
                '100000026': '100000026 - Recepção, triagem ou movimentação de materiais',
                '100000028': '100000028 - Secretaria e expediente',
            },
            // Perfil da contratada identificada por CNPJ; numeração antiga/atual não impede o cruzamento.
            perfisInssPorCnpj: [{
                contratoAtual: '10039/2026', contratoAnterior: '22SR057', cnpj: '78533312000158', codigo: '100000006', aliquota: 0.035,
                posto: /^(?:ASSISTENTE DE OPERACOES AUDIOVISUAIS|EDITOR DE MIDIA AUDIOVISUAL|OPERADOR DE (?:CAMERA|MIDIA AUDIOVISUAL)|TECNICO DE SISTEMAS AUDIOVISUAIS)\b/,
            }],
            aliquotaInss: 0.11,
            aliquotaDivs: 0.0945,            // IRRF + PIS/COFINS/CSLL, nota sem destaque de material
            aliquotaDivsComMaterial: 0.0585, // mesma regra da coluna "Valor DIVs" da Liquidação
            toleranciaDivsCentavos: 100,     // acima de R$ 1,00 de diferença, não ajusta as DIVs
            // Rateio da "Área Administrativa" entre 1ª e 2ª instância. Mesmos percentuais da
            // Liquidação (aba "2- Dados Faturamento", células BC5 e BE5 — Centro de Custos 2026).
            // Atualize aqui quando a Liquidação mudar o percentual.
            rateioAreaAdministrativa: { primeira: 0.8152, segunda: 0.1848 },
        },
        // ---- Busca do TRD no PROAD (v1.6.0) ----
        proad: {
            base: 'https://proad.trt3.jus.br',
            buscarAutomaticamente: true, // busca o TRD enquanto as notas são extraídas
            buscarCertidoes: false,      // v1.8.0: não lê certidões no PROAD (validades ficam em branco na colagem)
            maxProvidencias: 15,         // providências mais recentes do PROAD principal lidas
            esperaAbaMs: 30000,          // tempo para a aba do PROAD aberta pelo robô ficar pronta
            timeoutBuscaMs: 240000,
            timeoutRecebimentoMs: 15000, // confirmação do pedido; não espera 4 min às cegas
            diasAvisoCertidao: 15,       // avisa certidão que vence em até N dias
            validadeCertidaoNaData: 'hoje', // v1.7.9: 'hoje' (data da liquidação) ou 'trd' (data do TRD)
        },
        // ---- Data Ateste NF na colagem (v1.9.3) ----
        // 'sigeo' = data do ateste de CADA nota no SIGEO (padrão). Na competência 07/2026 o
        //           SIGEO tinha 25/08 em 64 notas e 26/08 nas duas reapresentadas (1616 e 1637).
        // 'trd'   = data do TRD para todas as notas (comportamento até a v1.9.1).
        dataAtesteNaColagem: 'sigeo',
        // ---- Situações do SIGEO que tiram a nota do lote (v1.9.3) ----
        // Comparadas sem acento e em maiúsculas. Uma nota devolvida costuma ter sido
        // reapresentada com o MESMO número: se entrasse no lote, seria somada duas vezes.
        situacoesExcluidasDoLote: [/DEVOLVID/, /CANCELAD/, /ESTORNAD/, /EXCLUID/],
        // ---- Tempos limite (v2.3.5) ----
        // Uma consulta ao SIGEO que não responde (nem com erro) travava o lote para sempre
        // ("Processando documento 37…"). Agora a consulta desiste após este tempo.
        timeoutSigeoMs: 90000,        // cada consulta à API do SIGEO, incluindo o download do PDF
        timeoutNotaMs: 420000,        // uma nota inteira (XML + PDF + OCR + ateste); depois, erro e segue
    };

    const CORES = {
        TRANSPARENTE: 'transparent',
        VERDE_CLARO: '#e8f5e9',
        AMARELO_CLARO: '#fff9c4',
        VERMELHO_CLARO: '#ffebee',
    };

    GM_addStyle(`
        #sigeo-ter-modal-progresso, #sigeo-ter-modal-final {
            position: fixed; inset: 0; background: rgba(0,0,0,.7); z-index: 999999;
            display: flex; align-items: center; justify-content: center; padding: 20px;
        }
        #sigeo-ter-modal-final .caixa, #sigeo-ter-modal-progresso .caixa {
            background: #fff; border-radius: 8px; padding: 20px; font-family: Roboto, Arial, sans-serif;
            width: 100%; overflow-y: auto;
        }
        #sigeo-ter-modal-progresso .caixa { max-width: 420px; }
        #sigeo-ter-modal-final .caixa { max-width: 99vw; max-height: 95vh; }
        .sigeo-ter-table td, .sigeo-ter-table th {
            padding: 6px 10px !important; white-space: nowrap !important; font-size: 12px !important;
            border-bottom: 1px solid #e0e0e0 !important;
        }
        .sigeo-ter-table tr { height: 40px; }
        /* v1.6.0 — tela de resultado em etapas */
        #sigeo-ter-modal-final .ter-caixa { padding: 18px 22px; }
        .ter-topo { display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 14px; }
        .ter-topo h2 { margin: 0; font-size: 20px; color: #263238; }
        .ter-sub { font-size: 12px; color: #607d8b; margin-top: 2px; }
        .ter-fechar { font-size: 20px; background: none; border: none; cursor: pointer; color: #546e7a; }
        .ter-etapas { display: grid; grid-template-columns: repeat(3, minmax(240px, 1fr)); gap: 12px; margin-bottom: 12px; }
        .ter-etapa { border: 1px solid #cfd8dc; border-top: 4px solid #b0bec5; border-radius: 8px; padding: 10px 12px; display: flex; flex-direction: column; gap: 8px; background: #fff; }
        .ter-etapa.ter-ok { border-top-color: #2e7d32; background: #f6fbf6; }
        .ter-etapa.ter-atencao { border-top-color: #f9a825; background: #fffdf3; }
        .ter-etapa.ter-erro { border-top-color: #c62828; background: #fff7f7; }
        .ter-etapa-cab { display: flex; align-items: center; gap: 8px; font-weight: 600; color: #37474f; font-size: 14px; }
        .ter-num { width: 22px; height: 22px; border-radius: 50%; background: #455a64; color: #fff; display: inline-flex; align-items: center; justify-content: center; font-size: 12px; }
        .ter-st { margin-left: auto; }
        .ter-etapa-corpo { font-size: 13px; color: #37474f; line-height: 1.45; flex: 1; }
        .ter-mini { font-size: 11px; color: #78909c; margin-top: 3px; }
        .ter-btn { border: none; border-radius: 4px; padding: 7px 14px; font-size: 13px; cursor: pointer; background: #37474f; color: #fff; font-family: inherit; }
        .ter-btn:disabled { opacity: .45; cursor: default; }
        .ter-btn.ter-sec { background: #eceff1; color: #37474f; }
        .ter-btn.ter-princ { background: #4a148c; font-weight: 600; padding: 9px 16px; }
        .ter-faixa { border-radius: 6px; padding: 9px 12px; font-size: 13px; margin-bottom: 12px; }
        .ter-faixa ul { margin: 6px 0 0; padding-left: 20px; }
        .ter-faixa li { margin: 2px 0; }
        .ter-faixa li.a { color: #6d4c00; }
        .ter-faixa-ok { background: #e8f5e9; color: #1b5e20; }
        .ter-faixa-atencao { background: #fff8e1; color: #6d4c00; }
        .ter-faixa-erro { background: #ffebee; color: #b71c1c; }
        .ter-abas { display: flex; gap: 4px; border-bottom: 1px solid #cfd8dc; margin-bottom: 10px; }
        .ter-abas button { border: none; background: none; padding: 8px 14px; cursor: pointer; font-size: 13px; color: #607d8b; border-bottom: 3px solid transparent; font-family: inherit; }
        .ter-abas button.ativa { color: #4a148c; border-bottom-color: #4a148c; font-weight: 600; }
        .ter-exportar { display: flex; gap: 8px; margin-bottom: 10px; }
        .ter-dica { font-size: 12px; color: #607d8b; margin: 8px 0; }
        .ter-sit { white-space: normal !important; max-width: 380px; }
        .sigeo-ter-table td.ter-quebra { white-space: normal !important; }
        .ter-girando { display: inline-block; width: 11px; height: 11px; border: 2px solid #90a4ae; border-top-color: transparent; border-radius: 50%; animation: ter-gira .8s linear infinite; vertical-align: -1px; }
        @keyframes ter-gira { to { transform: rotate(360deg); } }
        @media (max-width: 900px) { .ter-etapas { grid-template-columns: 1fr; } }
        /* v2.0.0 — conferência previdenciária e FGTS (mesmo visual da tela de resultado) */
        #sigeo-prev-modal { position: fixed; inset: 0; background: rgba(0,0,0,.7); z-index: 999999; display: flex; align-items: center; justify-content: center; padding: 20px; }
        #sigeo-prev-modal .caixa { background: #fff; border-radius: 8px; font-family: Roboto, Arial, sans-serif; width: 100%; max-width: 99vw; max-height: 95vh; overflow-y: auto; padding: 18px 22px; }
        #sigeo-prev-local { position: fixed; top: 64px; right: 16px; z-index: 2147483646; background: #fff; color: #263238; font-family: Roboto, Arial, sans-serif; padding: 12px 14px; border-radius: 8px; border-top: 4px solid #00695c; box-shadow: 0 3px 14px rgba(0,0,0,.45); max-width: 360px; }
        #sigeo-prev-modal { z-index: 2147483647 !important; }
        #sigeo-prev-modal .prev-etapas { grid-template-columns: repeat(4, minmax(200px, 1fr)); }
        @media (max-width: 1100px) { #sigeo-prev-modal .prev-etapas { grid-template-columns: repeat(2, minmax(200px, 1fr)); } }
    `);

    /* ====================================================================================
     * 2. FORMATAÇÃO
     * ==================================================================================== */
    const Formatacao = {
        formatarCNPJApenasNumeros: (v) => (!v || typeof v !== 'string') ? '' : v.replace(/\D/g, '').padStart(14, '0'),
        formatarCPFApenasNumeros: (v) => (!v || typeof v !== 'string') ? '' : v.replace(/\D/g, '').padStart(11, '0'),
        formatarCNPJComPontuacao(v) {
            return Formatacao.formatarCNPJApenasNumeros(v).replace(/^(\d{2})(\d{3})(\d{3})(\d{4})(\d{2})/, '$1.$2.$3/$4-$5');
        },
        formatarCPFComPontuacao(v) {
            return Formatacao.formatarCPFApenasNumeros(v).replace(/^(\d{3})(\d{3})(\d{3})(\d{2})/, '$1.$2.$3-$4');
        },
        formatarValorBrasileiro(valorPadraoAmericano) {
            let numero = valorPadraoAmericano;
            if (!numero && numero !== 0) return '';
            if (typeof numero === 'string') numero = parseFloat(numero.replace(/\./g, '').replace(',', '.')) || parseFloat(numero) || 0;
            return Number(numero).toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
        },
        formatarDataBrasileira(dataISO) {
            if (!dataISO) return '';
            let txtISO = dataISO.includes ? dataISO : dataISO.toISOString();
            const partes = txtISO.includes('T') ? txtISO.split('T')[0].split('-') : txtISO.split(' ')[0].split('-');
            if (partes.length !== 3) return dataISO;
            const [ano, mes, dia] = partes;
            return `${dia}/${mes}/${ano}`;
        },
        formatarDataHoraBrasileira(dataISO) {
            if (!dataISO) return '';
            const txtISO = dataISO.includes ? dataISO : String(dataISO);
            const [dataParte, horaParteCompleta] = txtISO.split('T');
            const dataFormatada = Formatacao.formatarDataBrasileira(dataParte);
            if (!horaParteCompleta) return dataFormatada;
            const hora = horaParteCompleta.split('.')[0].slice(0, 5); // HH:MM
            return dataFormatada ? `${dataFormatada} ${hora}` : txtISO;
        },
        // Formata um único assinante { nome, matricula, dataAssinatura } -> "NOME (dd/mm/aaaa hh:mm)"
        formatarAssinante(a) {
            const nome = (a?.nome || '').trim();
            if (!nome) return '';
            const dataHora = Formatacao.formatarDataHoraBrasileira(a?.dataAssinatura);
            return dataHora ? `${nome} (${dataHora})` : nome;
        },
        // Recebe um array [{ nome, matricula, dataAssinatura }] (mesmo formato retornado por capturarAtestes)
        // e devolve um texto pronto para exibição/CSV: "NOME (dd/mm/aaaa hh:mm)".
        // separador: '\n' pro HTML (quebra de linha na célula), '; ' pro CSV/TSV (evita quebrar linha ao colar em planilha).
        formatarAssinantes(assinantes, separador = '\n') {
            if (!Array.isArray(assinantes) || assinantes.length === 0) return '';
            return assinantes
                .map(a => {
                    const nome = (a?.nome || '').trim();
                    if (!nome) return '';
                    const dataHora = Formatacao.formatarDataHoraBrasileira(a?.dataAssinatura);
                    return dataHora ? `${nome} (${dataHora})` : nome;
                })
                .filter(Boolean)
                .join(separador);
        }
    };

    function normalizarString(str) {
        return (str || '').normalize('NFD').replace(/[\u0300-\u036f]/g, '').toUpperCase();
    }

    function copiarClipboard(texto) {
        navigator.clipboard?.writeText(texto).catch(() => {
            const ta = document.createElement('textarea');
            ta.value = texto; document.body.appendChild(ta); ta.select();
            document.execCommand('copy'); ta.remove();
        });
    }

    function mostrarSnackbar(mensagem, cor = '#323232') {
        const el = document.createElement('div');
        el.textContent = mensagem;
        el.style.cssText = `position:fixed;top:20px;left:50%;transform:translateX(-50%);background:${cor};color:#fff;padding:10px 20px;border-radius:6px;z-index:2000000;font-family:Roboto,Arial,sans-serif;font-size:13px;box-shadow:0 2px 6px rgba(0,0,0,.3)`;
        document.body.appendChild(el);
        setTimeout(() => el.remove(), 3500);
    }
    const mostrarErroSnackbar = (msg) => mostrarSnackbar(msg, '#b71c1c');
    const mostrarSucessoSnackbar = (msg) => mostrarSnackbar(msg, '#2e7d32');

    async function buscarMunicipioIBGE(codigoIBGE) {
        return new Promise((resolve, reject) => {
            GM_xmlhttpRequest({
                method: 'GET',
                url: `https://servicodados.ibge.gov.br/api/v1/localidades/municipios/${codigoIBGE}`,
                headers: { 'Accept': 'application/json' },
                onload(res) {
                    try {
                        if (res.status === 200) resolve(JSON.parse(res.responseText));
                        else reject(new Error(`IBGE respondeu ${res.status}`));
                    } catch (e) { reject(e); }
                },
                onerror: (e) => reject(e),
                ontimeout: () => reject(new Error('timeout IBGE')),
                timeout: 10000,
            });
        });
    }

    /* ====================================================================================
     * 3. TOKEN BEARER + CAPTURA DA TABELA DE DOCUMENTOS FISCAIS (interceptação de XHR)
     * ==================================================================================== */
    let BEARER_TOKEN = null;
    const esperasTokenSigeo = new Set();

    function registrarTokenSigeo(token) {
        if (!token) return;
        BEARER_TOKEN = token;
        for (const avisar of [...esperasTokenSigeo]) avisar(token);
    }

    function aguardarNovoTokenSigeo(anterior, timeoutMs = 12000) {
        if (BEARER_TOKEN && BEARER_TOKEN !== anterior) return Promise.resolve(BEARER_TOKEN);
        const status = document.getElementById('ter-status-progresso');
        if (status) status.textContent = 'Aguardando a renovação da sessão do SIGEO (até 12 s)…';
        return new Promise(resolve => {
            let timer;
            const terminar = token => {
                clearTimeout(timer);
                esperasTokenSigeo.delete(avisar);
                resolve(token);
            };
            const avisar = token => { if (token && token !== anterior) terminar(token); };
            esperasTokenSigeo.add(avisar);
            timer = setTimeout(() => terminar(null), timeoutMs);
        });
    }

    function erroSessaoSigeo(status) {
        const erro = new Error(`O SIGEO recusou o acesso (HTTP ${status}). Atualize a consulta ou entre novamente e clique em "Retomar extração"; as notas já extraídas foram preservadas nesta aba.`);
        erro.sessaoSigeo = true;
        return erro;
    }
    let dadosConsultaTabelaDocsFiscais = null;
    const URL_PADRAO_TABELA = '/sidof-service/documentosFiscais/jt';

    // O lote guarda registros da API por ID, sem depender da posição nem do DOM da página.
    const selecaoEntrePaginas = new Map();
    let filtroSelecao = '', requisicaoTabela = 0, erroLoteSigeo = '', processandoLote = false;
    let registrosLoteAtual = [];
    let notasForaDoLote = []; // v1.9.3: devolvidas/canceladas no SIGEO, só para informar na tela

    function chaveConsultaTabela(url) {
        const u = new URL(url, location.href);
        for (const p of ['pageIndex', 'pageSize', 'sortField', 'sortDirection']) u.searchParams.delete(p);
        u.searchParams.sort();
        return u.origin + u.pathname + '?' + u.searchParams.toString();
    }

    function prepararConsultaTabela(url) {
        guardarSelecaoVisivel(false);
        const filtro = chaveConsultaTabela(url);
        if (filtroSelecao && filtro !== filtroSelecao) selecaoEntrePaginas.clear();
        filtroSelecao = filtro;
        return ++requisicaoTabela;
    }

    function guardarSelecaoVisivel(removerDesmarcadas = false) {
        if (!Array.isArray(dadosConsultaTabelaDocsFiscais)) return;
        document.querySelectorAll('mat-row').forEach((row, indice) => {
            const checkbox = row.querySelector("input[type='checkbox']");
            const registro = casarRegistroDaLinha({ row, indice });
            if (!checkbox || !registro || !registroETerceirizado(registro) || registro.id == null) return;
            const chave = String(registro.id);
            if (checkbox.checked) selecaoEntrePaginas.set(chave, { ...registro, linha: null });
            else if (removerDesmarcadas) selecaoEntrePaginas.delete(chave);
        });
    }

    function atualizarContagemSelecao() {
        const botao = document.getElementById('sigeo-ter-botao-processar');
        if (botao) {
            const n = selecaoEntrePaginas.size;
            const texto = `👷 Processar terceirizados${n ? ` (${n} no lote)` : ''} 🤖`;
            if (botao.textContent !== texto) botao.textContent = texto;
            botao.disabled = processandoLote;
        }
    }

    function garantirBotoesSelecao() {
        const principal = document.getElementById('sigeo-ter-botao-processar');
        if (!principal?.parentElement) return;
        const criar = (id, texto, acao) => {
            if (document.getElementById(id)) return;
            const b = document.createElement('button');
            b.id = id; b.type = 'button'; b.className = 'mat-focus-indicator mat-stroked-button mat-button-base';
            b.style.marginLeft = '8px'; b.textContent = texto; b.onclick = acao;
            principal.parentElement.appendChild(b);
        };
        criar('sigeo-ter-guardar-selecao', 'Guardar selecionadas desta página', () => {
            guardarSelecaoVisivel(false); atualizarContagemSelecao();
            mostrarSucessoSnackbar(`${selecaoEntrePaginas.size} nota(s) no lote. Você pode ir à próxima página e marcar outras.`);
        });
        criar('sigeo-ter-rever-selecao', 'Rever / limpar seleção', () => {
            guardarSelecaoVisivel(false);
            document.getElementById('sigeo-ter-selecao')?.remove();
            const painel = document.createElement('div');
            painel.id = 'sigeo-ter-selecao';
            painel.style.cssText = 'position:fixed;inset:8%;background:white;color:#263238;z-index:1000001;padding:24px;overflow:auto;box-shadow:0 0 0 100vw #0009;';
            const titulo = document.createElement('h3'); titulo.textContent = 'Notas selecionadas entre páginas'; painel.appendChild(titulo);
            const dica = document.createElement('p'); dica.textContent = 'Remova uma nota ou limpe o lote. Os dados são guardados enquanto esta aba estiver aberta; mudar os filtros inicia outra seleção.'; painel.appendChild(dica);
            const remover = chave => {
                selecaoEntrePaginas.delete(chave);
                document.querySelectorAll('mat-row').forEach((row, indice) => {
                    const registro = casarRegistroDaLinha({ row, indice });
                    const cb = row.querySelector("input[type='checkbox']");
                    if (String(registro?.id) === chave && cb?.checked) cb.click();
                });
                atualizarContagemSelecao();
            };
            for (const [chave, r] of selecaoEntrePaginas) {
                const linha = document.createElement('div'); linha.style.cssText = 'padding:8px;border-bottom:1px solid #ddd';
                const nome = document.createElement('span'); nome.textContent = `NF ${r.numero} · ${r.fornecedor?.razaoSocial || r.fornecedor?.nome || r.fornecedor?.documento || ''} · ${r.dataEmissao || ''} `;
                const b = document.createElement('button'); b.textContent = 'Remover'; b.onclick = () => { remover(chave); linha.remove(); };
                linha.append(nome, b); painel.appendChild(linha);
            }
            const limpar = document.createElement('button'); limpar.textContent = 'Limpar lote';
            limpar.onclick = () => { for (const chave of [...selecaoEntrePaginas.keys()]) remover(chave); painel.remove(); };
            const fechar = document.createElement('button'); fechar.textContent = 'Fechar'; fechar.onclick = () => painel.remove();
            painel.append(limpar, fechar); document.body.appendChild(painel);
        });
        atualizarContagemSelecao();
    }

    // Só responde à alteração de checkboxes; não varre menus, PDFs nem toda a página.
    if (!EH_ARQUIVO_LOCAL) document.addEventListener('change', event => {
        if (!event.target?.matches?.("input[type='checkbox']") || !event.target.closest?.('mat-table')) return;
        const checkbox = event.target, linha = checkbox.closest?.('mat-row');
        setTimeout(() => {
            if (linha) {
                const indice = [...document.querySelectorAll('mat-row')].indexOf(linha);
                const registro = indice >= 0 ? casarRegistroDaLinha({ row: linha, indice }) : null;
                if (registro && registroETerceirizado(registro) && registro.id != null) {
                    const chave = String(registro.id);
                    if (checkbox.checked) selecaoEntrePaginas.set(chave, { ...registro, linha: null });
                    else selecaoEntrePaginas.delete(chave);
                }
            } else guardarSelecaoVisivel(true); // checkbox do cabeçalho: aplica à página inteira
            atualizarContagemSelecao();
        }, 0);
    });

    async function fetchSigeo(url, opcoes = {}) {
        const enviado = BEARER_TOKEN;
        // v2.3.5: tempo limite. O corpo é lido aqui dentro para que um download que para no
        // meio também seja interrompido; quem chama recebe uma Response já completa.
        const requisitar = async token => {
            const ctrl = new AbortController();
            const limite = CONFIG.timeoutSigeoMs || 90000;
            const timer = setTimeout(() => ctrl.abort(), limite);
            try {
                const r = await fetch(url, { ...opcoes, signal: ctrl.signal, headers: { ...opcoes.headers, Authorization: `Bearer ${token}` } });
                const corpo = await r.arrayBuffer();
                return new Response(corpo.byteLength ? corpo : null, { status: r.status, statusText: r.statusText, headers: r.headers });
            } catch (e) {
                if (e?.name === 'AbortError') {
                    const curto = String(url).replace(/^https:\/\/api\.sigeo\.jt\.jus\.br/, '').split('?')[0];
                    console.warn(`[SIGEO-Terceirizados] O SIGEO não respondeu em ${Math.round(limite / 1000)} s (${curto}).`);
                    throw new TypeError(`Failed to fetch: o SIGEO não respondeu em ${Math.round(limite / 1000)} s`);
                }
                throw e;
            } finally {
                clearTimeout(timer);
            }
        };
        let resposta = await requisitar(enviado);
        // A renovação nativa pode chegar DEPOIS do HTTP 403. Espera por um token
        // diferente e repete somente este GET, uma única vez. Nunca renova credenciais.
        if ([401, 403].includes(resposta.status) && (opcoes.method || 'GET').toUpperCase() === 'GET') {
            const novo = await aguardarNovoTokenSigeo(enviado);
            if (novo) resposta = await requisitar(novo);
        }
        if ([401, 403].includes(resposta.status)) throw erroSessaoSigeo(resposta.status);
        return resposta;
    }


    if (!EH_ARQUIVO_LOCAL) (function interceptarXHR() {
        const originalHeader = XMLHttpRequest.prototype.setRequestHeader;
        if (typeof originalHeader === 'function') XMLHttpRequest.prototype.setRequestHeader = function(nome, valor) {
            if (/^authorization$/i.test(nome) && /^https:\/\/api\.sigeo\.jt\.jus\.br\//i.test(String(this._url || ''))) {
                const m = String(valor || '').match(/^Bearer\s+(.+)$/i);
                if (m) registrarTokenSigeo(m[1]);
            }
            return originalHeader.apply(this, arguments);
        };
        const originalOpen = XMLHttpRequest.prototype.open;
        XMLHttpRequest.prototype.open = function (method, url) {
            this._url = url;
            this._method = method;
            const ehTabela = typeof url === 'string' && new URL(url, location.href).pathname === URL_PADRAO_TABELA;
            const sequencia = ehTabela ? prepararConsultaTabela(url) : 0;

            this.addEventListener('load', function () {
                try {
                    // Captura o token OIDC assim que ele passa pela página
                    if (typeof url === 'string' && url.includes('/protocol/openid-connect/token') && this.status === 200) {
                        const ct = this.getResponseHeader('content-type') || '';
                        if (ct.includes('application/json')) {
                            const jsonResp = JSON.parse(this.responseText);
                            if (jsonResp.access_token) {
                                registrarTokenSigeo(jsonResp.access_token);
                                console.log('[SIGEO-Terceirizados] Token Bearer capturado.');
                            }
                        }
                    }

                    // Captura a tabela de documentos fiscais renderizada na tela
                    if (ehTabela && sequencia === requisicaoTabela && this.status === 200) {
                        let dados = null;
                        if (this.getResponseHeader('content-type')?.includes('application/json')) {
                            dados = JSON.parse(this.responseText);
                        }
                        dadosConsultaTabelaDocsFiscais = dados?.results || [];
                        window._sigeoTerUltimosDadosTabela = dadosConsultaTabelaDocsFiscais;
                        console.log(`[SIGEO-Terceirizados] Tabela capturada: ${dadosConsultaTabelaDocsFiscais.length} registro(s).`);
                        window.dispatchEvent(new CustomEvent('_sigeoTerTabelaAtualizada', { detail: dadosConsultaTabelaDocsFiscais }));
                    }
                } catch (e) {
                    console.error('[SIGEO-Terceirizados] Erro ao interceptar XHR:', e);
                }
            });

            return originalOpen.apply(this, arguments);
        };
    })();

    /* ====================================================================================
     * 4. CLASSIFICAÇÃO — É UM REGISTRO DE "TERCEIRIZADO"?
     * (réplica fiel das funções já validadas em produção no script combinado: exclui RPA,
     * Credenciado de Saúde PJ, Locador de Imóveis e Manutenção Predial — o que sobra é o
     * balde "Serviços", onde caem as terceirizadas de mão de obra como limpeza/conservação)
     * ==================================================================================== */
    function registroECredenciadoSaudePJ(registro) {
        if (!registro) return false;
        const naoEhRPA = String(registro?.tipo || '').toUpperCase() !== 'RPA';
        const cadastroSaude = registro?.tipoCadastro?.id === 1
            || String(registro?.tipoCadastro?.nome || '').toLowerCase().trim() === 'credenciado de plano de saúde';
        return naoEhRPA && cadastroSaude;
    }

    function registroEAluguel(registro) {
        if (!registro) return false;
        const tipoDocFiscalAceito = ['AL'].includes(registro?.tipo);
        const cadastroAluguel = registro?.tipoCadastro?.id === 4
            || String(registro?.tipoCadastro?.nome || '').toLowerCase().trim() === 'locador de imóveis';
        return tipoDocFiscalAceito && cadastroAluguel;
    }

    function registroEManutencaoPredial(registro) {
        if (!registro) return false;
        const M = CONFIG.classificacao.manutencaoPredial;

        const tipoDocFiscal = registro?.tipo;
        const codigosNaturezaRendimento = new Set(registro?.contratacao?.naturezasRendimento?.map(nr => nr.id));
        const setor = registro?.contratacao?.setor?.sigla || '';
        const objeto = registro?.contratacao?.objeto || '';

        const tipoDocFiscalAceito = M.tiposDocumentoAceitos.includes(tipoDocFiscal);
        const codigoNaturezaRendimentoCompativel = codigosNaturezaRendimento.size === 0
            || M.codigosNaturezaRendimentoPossiveis.filter(cod => codigosNaturezaRendimento.has(cod)).length > 0;
        const setorCompativel = M.siglaSetores.includes(setor.toUpperCase());
        const objetoCompativel = M.expressoesObjeto.some(exp => normalizarString(objeto).includes(normalizarString(exp)));

        return tipoDocFiscalAceito && codigoNaturezaRendimentoCompativel && setorCompativel && objetoCompativel;
    }

    function registroETerceirizado(registro) {
        if (!registro) return false;
        const tipo = String(registro?.tipo || '').toUpperCase();

        if (tipo === 'RPA') return false;                          // Exclui RPA
        if (registroECredenciadoSaudePJ(registro)) return false;    // Exclui Credenciado Saúde PJ
        if (registroEManutencaoPredial(registro)) return false;     // Exclui Manutenção Predial
        if (registroEAluguel(registro)) return false;               // Exclui Aluguel

        // Aceita NFSe, NFS, NFe, DDF e, no geral, qualquer coisa que não seja RPA/AL
        return ['NFSE', 'NFS', 'NFE', 'DDF'].includes(tipo) || !['RPA', 'AL'].includes(tipo);
    }

    /* ---- Situação do documento no SIGEO (v1.9.3) ----
     * A exportação CSV do SIGEO mostra a coluna "Situação" (Pago, Devolvido…). O nome do campo
     * na API não está documentado, então a leitura tenta os nomes prováveis e aceita texto ou
     * objeto ({ nome | descricao | sigla }). Se nenhum casar, o console mostra os campos do
     * registro para ajustar CAMPOS_SITUACAO_SIGEO. Mesmo sem a situação, a trava de NF repetida
     * (conferirNotasRepetidas) impede a colagem em dobro. */
    const CAMPOS_SITUACAO_SIGEO = ['situacao', 'situacaoDocumentoFiscal', 'situacaoDocumento', 'status', 'statusDocumentoFiscal', 'estado'];
    let _avisoCampoSituacaoDado = false;

    function situacaoRegistroSigeo(registro) {
        for (const campo of CAMPOS_SITUACAO_SIGEO) {
            const v = registro?.[campo];
            if (v === null || v === undefined || v === '') continue;
            if (typeof v === 'string') return v.trim();
            if (typeof v === 'object') {
                const t = v.nome ?? v.descricao ?? v.sigla ?? v.label ?? v.valor;
                if (t !== null && t !== undefined && String(t).trim()) return String(t).trim();
            }
        }
        return '';
    }

    function registroForaDoLoteSigeo(registro) {
        const sit = normalizarString(situacaoRegistroSigeo(registro));
        return !!sit && CONFIG.situacoesExcluidasDoLote.some(re => re.test(sit));
    }

    function diagnosticarCampoSituacao(registros) {
        if (_avisoCampoSituacaoDado || !registros?.length) return;
        _avisoCampoSituacaoDado = true;
        if (registros.some(r => situacaoRegistroSigeo(r))) return;
        console.warn('[SIGEO-Terceirizados] Situação da nota (Pago/Devolvido) não encontrada nos registros da API. '
            + 'Notas devolvidas não serão tiradas do lote automaticamente (a trava de NF repetida continua valendo). '
            + 'Campos do 1º registro:', Object.keys(registros[0] || {}));
    }

    /* ====================================================================================
     * 6. XML / PDF — CAPTURA E PARSING (sempre prioriza XML; usa PDF só como fallback)
     * ==================================================================================== */
    // Conversão para número de texto em formato BRASILEIRO (ex.: "1.702,49" -> 1702.49).
    // Usar SOMENTE para valores vindos de texto/rótulos em português (regex sobre PDF ou
    // sobre blocos de texto livre dentro do XML) — NUNCA sobre tags XML estruturadas.
    function paraNumeroBR(valorTexto) {
        if (valorTexto === '' || valorTexto === null || valorTexto === undefined) return null;
        if (typeof valorTexto === 'number') return valorTexto;
        const limpo = String(valorTexto).replace(/\./g, '').replace(',', '.');
        const n = parseFloat(limpo);
        return isNaN(n) ? null : n;
    }

    // Conversão para número de texto em formato INTERNACIONAL/XSD (ex.: "1702.49" -> 1702.49).
    // Usar para todo valor extraído de tag XML estruturada (padrão nacional da NFS-e usa ponto
    // decimal, sem separador de milhar). Usar paraNumeroBR() aqui foi a causa dos valores
    // aparecerem multiplicados por 100 (ex.: BC ISSQN virar R$170.249,00 em vez de R$1.702,49).
    function paraNumeroXML(valorTexto) {
        if (valorTexto === '' || valorTexto === null || valorTexto === undefined) return null;
        if (typeof valorTexto === 'number') return valorTexto;
        const n = parseFloat(String(valorTexto).trim());
        return isNaN(n) ? null : n;
    }

    // --- Helpers de navegação no XML (ignora namespace, casa só pelo nome local da tag) ---
    function primeiroFilho(el, tag) {
        if (!el) return null;
        const els = el.getElementsByTagNameNS('*', tag);
        return els.length ? els[0] : null;
    }
    function textoEl(el) { return el ? (el.textContent || '').trim() : ''; }
    function numeroEl(el) { const t = textoEl(el); return t === '' ? null : paraNumeroXML(t); }

    // [v1.3.6] Igual a primeiroFilho, mas olha SÓ os filhos diretos. Necessário no layout
    // ABRASF, onde <Numero> aparece tanto na NFS-e (filho direto de InfNfse) quanto no RPS
    // (bem mais abaixo, dentro da DeclaracaoPrestacaoServico) — pegar o errado trocaria o
    // nº da nota 4021 pelo nº do RPS 3677.
    function primeiroFilhoDireto(el, tag) {
        if (!el) return null;
        for (const filho of Array.from(el.children || [])) {
            if (filho.localName === tag) return filho;
        }
        return null;
    }

    function todosOsFilhos(el, tag) {
        if (!el) return [];
        return Array.from(el.getElementsByTagNameNS('*', tag));
    }

    // Alíquota de ISSQN: parte dos municípios grava fração (0.04) e parte percentual (4.00).
    // O piso constitucional do ISS é 2% (EC 37/2002), então qualquer valor < 1 só pode ser
    // fração — normaliza tudo para percentual, que é o formato exibido na coluna.
    function normalizarAliquota(v) {
        if (v === null || v === undefined) return null;
        const n = Number(v);
        if (!isFinite(n) || n <= 0) return null;
        return n < 1 ? Math.round(n * 10000) / 100 : n;
    }

    // Um mesmo arquivo XML pode trazer mais de uma NFS-e (retorno de lote, consulta por RPS,
    // nota substituída + substituta...). Até a 1.3.5 o parser pegava cegamente a PRIMEIRA,
    // o que faz os dados de uma nota vazarem para a linha de outra. Agora escolhe o bloco
    // cujo número casa com o da nota que estamos conferindo.
    function escolherBlocoPorNumero(blocos, tagNumero, numeroEsperado) {
        if (!blocos || blocos.length === 0) return null;
        const soDigitos = (v) => String(v ?? '').replace(/\D/g, '').replace(/^0+/, '');
        if (numeroEsperado) {
            const alvo = soDigitos(numeroEsperado);
            const achado = blocos.find(b => {
                const n = textoEl(primeiroFilhoDireto(b, tagNumero)) || textoEl(primeiroFilho(b, tagNumero));
                return n && soDigitos(n) === alvo;
            });
            if (achado) return achado;
            if (blocos.length > 1) {
                console.warn(`[SIGEO-Terceirizados] XML com ${blocos.length} NFS-e e nenhuma com nº ${numeroEsperado} — usando a primeira (CONFERIR).`);
            }
        }
        return blocos[0];
    }

    function extrairTextoPorRegex(texto, regex) {
        if (!texto || !regex) return '';
        const m = texto.match(regex);
        return m ? m[1].trim() : '';
    }

    // Extrai um possível "CONTRATO XXXXX" de dentro de um bloco de texto livre (a Rio Minas, por
    // exemplo, embute "CONTRATO 22SR062" dentro da Descrição do Serviço/Informações Complementares).
    // Serve de reforço quando o campo `contratacao.codigoContrato` do próprio SIGEO vier vazio.
    function extrairNumeroContratoDoTexto(texto) {
        // Cobre variações como "CONTRATO: 22SR062.", "CONTRATO 22SR062", "CONTRATO N 10032/2025",
        // "CONTRATO Nº 10032/2025" — pula o "N"/"Nº" solto e exige ao menos um dígito no valor
        // capturado (pra não confundir esse "N" com o próprio número do contrato).
        // [v1.3.6] Passou a pular também até 3 siglas curtas antes do código, porque as notas da
        // Nevada escrevem "CONTRATO TRT MG 23SR001" — com a regex antiga, a coluna Nº Contrato
        // saía VAZIA em todas elas (o SIGEO também não preenche contratacao.codigoContrato).
        const bruto = extrairTextoPorRegex(texto || '', /CONTRATO\s*:?\s*(?:(?:N[ºo°.]*|[A-Z]{2,4})\s+){0,3}([\w.\-\/]*\d[\w.\-\/]*)/i);
        // v2.3.9: palavra colada depois do número ("CONTRATO 10-037-2026BANCO ITAU", Rio Minas) não é contrato.
        return bruto.replace(/[.\s]+$/, '').replace(/(\d)[A-Za-zÀ-ÿ]{4,}$/, '$1');
    }


    // [v1.4.4] Alguns municípios devolvem XML próprio, fora do padrão Nacional e do ABRASF.
    // O Atende.Net de São José/SC, por exemplo, usa <nfse><nf>... e grava números em formato
    // brasileiro ("275.777,17") e datas em DD/MM/AAAA. Estes helpers ficam separados para
    // não alterar a leitura dos layouts já validados.
    function normalizarDataMunicipalISO(valor) {
        const s = String(valor || '').trim();
        let m = s.match(/^(\d{2})\/(\d{2})\/(\d{4})$/);
        if (m) return `${m[3]}-${m[2]}-${m[1]}`;
        m = s.match(/^(\d{4})-(\d{2})-(\d{2})/);
        return m ? `${m[1]}-${m[2]}-${m[3]}` : null;
    }

    // Extrai conta escrita no texto livre da nota sem substituir uma conta já informada
    // pela contratação. Ex.: "BANCO BRASIL AG:3125-9 C/C:5819-X".
    function extrairContaBancariaDoTexto(texto) {
        const s = String(texto || '').replace(/\s+/g, ' ').trim();
        if (!s) return null;

        let banco = '';
        const mapa = [
            [/\bBANCO\s+(?:DO\s+)?BRASIL\b|\bBB\b/i, '001'],
            [/\bCAIXA(?:\s+ECONOMICA)?\b|\bCEF\b/i, '104'],
            [/\bBRADESCO\b/i, '237'],
            [/\bITAU\b/i, '341'],
            [/\bSANTANDER\b/i, '033'],
            [/\bSICOOB\b/i, '756'],
            [/\bSICREDI\b/i, '748'],
        ];
        for (const [reBanco, codigo] of mapa) {
            if (reBanco.test(s)) { banco = codigo; break; }
        }
        if (!banco) {
            const mb = s.match(/\bBANCO\s*(?:N[ºO°.]?\s*)?[:\-]?\s*(\d{1,3})\b/i);
            if (mb) banco = mb[1].padStart(3, '0');
        }

        const ma = s.match(/\b(?:AG(?:ENCIA)?\.?)\s*:?\s*(\d{1,5})(?:\s*[-–]\s*([0-9X]))?/i);
        const mc = s.match(/\b(?:C\s*\/?\s*C|CONTA(?:\s+CORRENTE)?)\s*:?\s*(\d[\d.]*)(?:\s*[-–]\s*([0-9X]))?/i);
        if (!banco && !ma && !mc) return null;

        const agencia = ma ? String(ma[1]).replace(/\D/g, '') : '';
        let numero = '';
        let dv = '';
        if (mc) {
            const partes = String(mc[1]).replace(/\./g, '').match(/^(\d+?)(?:-([0-9X]))?$/i);
            numero = partes ? partes[1] : String(mc[1]).replace(/\D/g, '');
            dv = (mc[2] || (partes && partes[2]) || '').toUpperCase();
        }

        return {
            agencia: {
                codigo: agencia,
                banco: { id: banco }
            },
            numero,
            digitoVerificador: dv,
            origemNota: true
        };
    }

    /* Extrai os campos da NFS-e no LAYOUT NACIONAL (padrão do Ambiente Nacional da NFS-e,
     * xmlns="http://www.sped.fazenda.gov.br/nfse"): infNFSe > DPS > infDPS > serv/valores/trib.
     * Estrutura confirmada com um XML real de exemplo (nota 1544, Rio Minas). */
    function parsearXMLNacional(xmlDoc, xmlText, numeroEsperado) {
        const infNFSe = escolherBlocoPorNumero(todosOsFilhos(xmlDoc, 'infNFSe'), 'nNFSe', numeroEsperado);
        if (!infNFSe) return null;
        const valoresNFSe = primeiroFilho(infNFSe, 'valores');       // vBC, pAliqAplic, vISSQN, vTotalRet, vLiq
        const emit = primeiroFilho(infNFSe, 'emit');
        const dps = primeiroFilho(infNFSe, 'DPS');
        const infDPS = primeiroFilho(dps, 'infDPS');
        const toma = primeiroFilho(infDPS, 'toma');
        const serv = primeiroFilho(infDPS, 'serv');
        const locPrest = primeiroFilho(serv, 'locPrest');
        const cServ = primeiroFilho(serv, 'cServ');
        const infoCompl = primeiroFilho(serv, 'infoCompl');
        const valoresDPS = primeiroFilho(infDPS, 'valores');          // vServPrest, trib
        const vServPrest = primeiroFilho(valoresDPS, 'vServPrest');
        const trib = primeiroFilho(valoresDPS, 'trib');
        const tribMun = primeiroFilho(trib, 'tribMun');
        const tribFed = primeiroFilho(trib, 'tribFed');
        const piscofins = primeiroFilho(tribFed, 'piscofins');

        // tpRetISSQN (padrão nacional): 1 = não retido / 2 = retido pelo tomador / 3 = retido por outros.
        // Quando o ISS é retido (tpRetISSQN != 1), "ISSQN Retido" = ISSQN Apurado (vISSQN); senão, R$0,00.
        const tpRetISSQN = textoEl(primeiroFilho(tribMun, 'tpRetISSQN'));
        const valorIssqnApurado = numeroEl(primeiroFilho(valoresNFSe, 'vISSQN'));
        const issqnRetido = (tpRetISSQN && tpRetISSQN !== '1') ? valorIssqnApurado : 0;

        const codigoTributacaoNacional = textoEl(primeiroFilho(cServ, 'cTribNac')) || null;
        const codigoTributacaoMunicipal = textoEl(primeiroFilho(cServ, 'cTribMun')) || null; // nem toda nota/município tem

        const descricaoServico = textoEl(primeiroFilho(cServ, 'xDescServ'));
        const informacoesComplementares = textoEl(primeiroFilho(infoCompl, 'xInfComp'));

        const irrf = numeroEl(primeiroFilho(tribFed, 'vRetIRRF'));
        const csllRetida = numeroEl(primeiroFilho(tribFed, 'vRetCSLL'));

        const dados = {
            layoutXML: 'nacional',
            localidadesUFNota: {
                prestacao: {
                    texto: textoEl(primeiroFilho(infNFSe, 'xLocPrestacao')),
                    codigoIBGE: textoEl(primeiroFilho(locPrest, 'cLocPrestacao')),
                },
                incidencia: {
                    texto: textoEl(primeiroFilho(infNFSe, 'xLocIncid')),
                    codigoIBGE: textoEl(primeiroFilho(infNFSe, 'cLocIncid')),
                },
            },
            numero: textoEl(primeiroFilho(infNFSe, 'nNFSe')),
            cnpj: textoEl(primeiroFilho(emit, 'CNPJ')),
            razaoSocial: textoEl(primeiroFilho(emit, 'xNome')),
            // v1.9.9: município do prestador = município emissor da NFS-e (xLocEmi);
            // sem ele, o código IBGE do endereço do emitente é resolvido no pipeline.
            municipioPrestador: textoEl(primeiroFilho(infNFSe, 'xLocEmi')),
            ufPrestador: textoEl(primeiroFilho(primeiroFilho(emit, 'enderNac'), 'UF')),
            codigoMunicipioPrestador: (textoEl(primeiroFilho(primeiroFilho(emit, 'enderNac'), 'cMun')) || '').replace(/\D/g, '') || null,

            tomadorCnpj: textoEl(primeiroFilho(toma, 'CNPJ')) || null,
            tomadorNome: textoEl(primeiroFilho(toma, 'xNome')) || null,

            // ---- Campos pedidos para o robô de Terceirizados ----
            localPrestacaoServico: textoEl(primeiroFilho(infNFSe, 'xLocPrestacao')) || textoEl(primeiroFilho(infNFSe, 'xLocIncid')),
            codigoMunicipioIssqn: textoEl(primeiroFilho(infNFSe, 'cLocIncid')) || textoEl(primeiroFilho(locPrest, 'cLocPrestacao')) || null,
            dataEmissao: (textoEl(primeiroFilho(infNFSe, 'dhProc')) || '').split('T')[0] || null,
            valorServico: numeroEl(primeiroFilho(vServPrest, 'vServ')),
            valorLiquido: numeroEl(primeiroFilho(valoresNFSe, 'vLiq')),
            baseCalculoIssqn: numeroEl(primeiroFilho(valoresNFSe, 'vBC')),
            aliquotaIssqn: normalizarAliquota(numeroEl(primeiroFilho(valoresNFSe, 'pAliqAplic'))),
            valorIssqn: valorIssqnApurado,
            issqnRetido,
            codigoTributacaoNacional,
            codigoTributacaoMunicipal,
            descricaoTributacaoNacional: textoEl(primeiroFilho(infNFSe, 'xTribNac')),

            inssRetido: numeroEl(primeiroFilho(tribFed, 'vRetCP')),
            irrf,
            contribuicoesSociaisRetidas: csllRetida, // "Contribuições Sociais - Retidas" no DANFSe = vRetCSLL
            pisRetido: numeroEl(primeiroFilho(piscofins, 'vPis')),
            cofinsRetido: numeroEl(primeiroFilho(piscofins, 'vCofins')),

            descricaoServico,
            informacoesComplementares,

            material: null, // este layout nacional não tem um campo específico de "material";
            // alguns emitentes descrevem isso em texto livre — tenta achar como reforço:

            xmlCompleto: xmlText,
        };

        const blocoTexto = `${descricaoServico} ${informacoesComplementares}`;
        // Aceita tanto "2.696,70" (com separador de milhar) quanto "2696,7" (sem separador,
        // com só 1 casa decimal — erro de digitação visto em notas reais, ex.: nota 1551).
        // [v1.3.7] A APPA escreve "FATURAMENTO REF MATERIAL DE LIMPEZA NO MES DE Maio DE 2026
        // R$ 133,44" — a regex acima exige o valor logo depois da palavra e não alcança esse
        // caso (a coluna Material saía vazia em todas as notas de limpeza da APPA).
        const mMaterial = blocoTexto.match(/material(?:is)?[^:=\d]{0,20}[:=]?\s*r?\$?\s*((?:\d{1,3}(?:\.\d{3})+|\d+),\d{1,2})/i)
            || blocoTexto.match(/MATERIAL[\s\S]{0,60}?R\$\s*((?:\d{1,3}(?:\.\d{3})+|\d+),\d{2})/i);
        if (mMaterial) dados.material = paraNumeroBR(mMaterial[1]);

        // BC INSS: o layout nacional da NFS-e traz o valor retido (vRetCP), mas NÃO tem tag
        // estruturada para a base de cálculo previdenciária. Alguns emitentes (ex.: APPA)
        // informam "BASE DE CALCULO INSS 9.999,99" no texto livre — tenta capturar de lá.
        const mBcInss = blocoTexto.match(/BASE\s+DE\s+CALCULO\s+INSS\s*R?\$?\.?\s*((?:\d{1,3}(?:\.\d{3})+|\d+),\d{2})/i);
        dados.baseCalculoInss = mBcInss ? paraNumeroBR(mBcInss[1]) : null;

        dados.somaIrrfContribSociais = somarRetencoesFederais(irrf, csllRetida, dados.pisRetido, dados.cofinsRetido);

        dados.retFedComPisCofins = somarRetencoesFederaisComPisCofins(irrf, csllRetida, dados.pisRetido, dados.cofinsRetido);

        // Observações: Descrição do Serviço + Informações Complementares numa célula só.
        // Muitos emitentes (como neste caso) repetem o mesmo texto nos dois campos — evita duplicar.
        const desc = descricaoServico.trim();
        const info = informacoesComplementares.trim();
        dados.observacoes = (desc && info && desc === info) ? desc : [desc, info].filter(Boolean).join(' | ');

        dados.numeroContrato = extrairNumeroContratoDoTexto(dados.observacoes);

        return dados;
    }

    /* Extrai os campos da NFS-e no LAYOUT ABRASF — padrão usado pela maioria das prefeituras
     * antes do Ambiente Nacional (ISSNet/Prefeitura de Cuiabá, Ginfes, etc.). É o layout que
     * as notas da APPA passaram a usar a partir de 07/2026, quando deixaram de ser PDF-imagem
     * e viraram XML: Nfse > InfNfse > (ValoresNfse | Servico/Valores).
     *   - ABRASF 1.0: base, alíquota, ISS e líquido ficam todos em Servico/Valores;
     *   - ABRASF 2.x: base, alíquota, ValorIss e ValorLiquidoNfse ficam em ValoresNfse, e as
     *     retenções federais (PIS/COFINS/INSS/IR/CSLL) continuam em Servico/Valores.
     * Os dois casos são cobertos aqui. Validado contra a NFS-e 4021 (APPA/Cuiabá, 24/07/2026).
     * ATENÇÃO: o ABRASF não tem o nome do município da prestação, só o código IBGE — o nome é
     * resolvido de forma assíncrona no pipeline (resolverNomeMunicipio). */
    function parsearXMLAbrasf(xmlDoc, xmlText, numeroEsperado) {
        const infNfse = escolherBlocoPorNumero(todosOsFilhos(xmlDoc, 'InfNfse'), 'Numero', numeroEsperado);
        if (!infNfse) return null;

        const valoresNfse = primeiroFilho(infNfse, 'ValoresNfse');                                  // 2.x
        const prestador   = primeiroFilho(infNfse, 'PrestadorServico') || primeiroFilho(infNfse, 'Prestador');
        const tomador     = primeiroFilho(infNfse, 'TomadorServico') || primeiroFilho(infNfse, 'Tomador');
        const servico     = primeiroFilho(infNfse, 'Servico');
        const valoresServ = primeiroFilho(servico, 'Valores');                                      // retenções (1.0 e 2.x)
        const escopo      = valoresNfse || valoresServ;                                             // base/alíquota/ISS/líquido

        const n = (el, tag) => numeroEl(primeiroFilho(el, tag));
        const t = (el, tag) => textoEl(primeiroFilho(el, tag));

        const valorServico     = n(valoresServ, 'ValorServicos');
        const baseCalculoIssqn = n(escopo, 'BaseCalculo') ?? n(valoresServ, 'BaseCalculo') ?? valorServico;
        const aliquotaIssqn    = normalizarAliquota(n(escopo, 'Aliquota') ?? n(valoresServ, 'Aliquota'));
        const valorIssqn       = n(escopo, 'ValorIss') ?? n(valoresServ, 'ValorIss');

        // IssRetido no ABRASF: 1 = retido pelo tomador | 2 = não retido.
        // Quando a tag não vem, não dá para afirmar que é zero — usa o ISS apurado.
        const issRetidoFlag  = t(servico, 'IssRetido');
        const issqnRetidoTag = n(valoresServ, 'ValorIssRetido');
        const issqnCalculado = (baseCalculoIssqn !== null && baseCalculoIssqn !== undefined && aliquotaIssqn !== null)
            ? Math.round(baseCalculoIssqn * aliquotaIssqn) / 100    // arredonda direto no centavo
            : null;
        const issqnRetido = issRetidoFlag === '2' ? 0 : (issqnRetidoTag ?? valorIssqn ?? issqnCalculado);

        const irrf   = n(valoresServ, 'ValorIr');
        const csll   = n(valoresServ, 'ValorCsll');
        const pis    = n(valoresServ, 'ValorPis');
        const cofins = n(valoresServ, 'ValorCofins');

        const discriminacao = t(servico, 'Discriminacao');
        const outrasInfo    = textoEl(primeiroFilhoDireto(infNfse, 'OutrasInformacoes'));

        const dados = {
            layoutXML: 'abrasf',
            localidadesUFNota: {
                prestacao: { codigoIBGE: textoEl(primeiroFilhoDireto(servico, 'CodigoMunicipio')) },
                incidencia: { codigoIBGE: textoEl(primeiroFilhoDireto(servico, 'MunicipioIncidencia')) },
            },
            numero: textoEl(primeiroFilhoDireto(infNfse, 'Numero')) || t(infNfse, 'Numero'),
            cnpj: (t(prestador, 'Cnpj') || t(prestador, 'Cpf') || '').replace(/\D/g, ''),
            razaoSocial: t(prestador, 'RazaoSocial'),
            // v1.9.9: o ABRASF só traz o código IBGE do endereço do prestador (ou do órgão gerador)
            municipioPrestador: '',
            ufPrestador: t(primeiroFilho(prestador, 'Endereco'), 'Uf') || t(primeiroFilho(infNfse, 'OrgaoGerador'), 'Uf') || '',
            codigoMunicipioPrestador: (t(primeiroFilho(prestador, 'Endereco'), 'CodigoMunicipio') || t(primeiroFilho(infNfse, 'OrgaoGerador'), 'CodigoMunicipio') || '').replace(/\D/g, '') || null,

            tomadorCnpj: (t(tomador, 'Cnpj') || '').replace(/\D/g, '') || null,
            tomadorNome: t(tomador, 'RazaoSocial') || null,

            // Só o código IBGE existe no ABRASF; o nome vem depois, via API do IBGE.
            localPrestacaoServico: '',
            codigoMunicipioPrestacao: (t(servico, 'CodigoMunicipio') || t(servico, 'MunicipioIncidencia') || '').replace(/\D/g, '') || null,
            codigoMunicipioIssqn: (t(servico, 'MunicipioIncidencia') || t(servico, 'CodigoMunicipio') || '').replace(/\D/g, '') || null,

            dataEmissao: (textoEl(primeiroFilhoDireto(infNfse, 'DataEmissao')) || '').split('T')[0] || null,
            valorServico,
            valorLiquido: n(escopo, 'ValorLiquidoNfse') ?? n(valoresServ, 'ValorLiquidoNfse'),
            baseCalculoIssqn,
            aliquotaIssqn,
            valorIssqn,
            issqnRetido,
            // No ABRASF não existe o código de tributação nacional de 6 dígitos (ex.: 170501)
            // do Ambiente Nacional — o equivalente disponível é o item da LC 116/2003 (ex.: 1705).
            codigoTributacaoNacional: (t(servico, 'ItemListaServico') || '').replace(/\D/g, '') || null,
            codigoTributacaoMunicipal: (t(servico, 'CodigoTributacaoMunicipio') || '').trim() || null,
            descricaoTributacaoNacional: '',

            inssRetido: n(valoresServ, 'ValorInss'),
            irrf,
            contribuicoesSociaisRetidas: csll,
            pisRetido: pis,
            cofinsRetido: cofins,

            descricaoServico: discriminacao,
            informacoesComplementares: outrasInfo,
            material: null,
            xmlCompleto: xmlText,
        };

        // Mesma extração por texto livre já usada no layout nacional (a Discriminação do
        // ABRASF é o equivalente da Descrição do Serviço + Informações Complementares).
        const blocoTexto = `${discriminacao} ${outrasInfo}`;
        // [v1.3.7] A APPA escreve "FATURAMENTO REF MATERIAL DE LIMPEZA NO MES DE Maio DE 2026
        // R$ 133,44" — a regex acima exige o valor logo depois da palavra e não alcança esse
        // caso (a coluna Material saía vazia em todas as notas de limpeza da APPA).
        const mMaterial = blocoTexto.match(/material(?:is)?[^:=\d]{0,20}[:=]?\s*r?\$?\s*((?:\d{1,3}(?:\.\d{3})+|\d+),\d{1,2})/i)
            || blocoTexto.match(/MATERIAL[\s\S]{0,60}?R\$\s*((?:\d{1,3}(?:\.\d{3})+|\d+),\d{2})/i);
        if (mMaterial) dados.material = paraNumeroBR(mMaterial[1]);

        const mBcInss = blocoTexto.match(/BASE\s+DE\s+CALCULO\s+INSS\s*R?\$?\.?\s*((?:\d{1,3}(?:\.\d{3})+|\d+),\d{2})/i);
        dados.baseCalculoInss = mBcInss ? paraNumeroBR(mBcInss[1]) : null;

        dados.somaIrrfContribSociais = somarRetencoesFederais(irrf, csll, pis, cofins);

        dados.retFedComPisCofins = somarRetencoesFederaisComPisCofins(irrf, csll, pis, cofins);

        const desc = (discriminacao || '').trim();
        const info = (outrasInfo || '').trim();
        dados.observacoes = (desc && info && desc === info) ? desc : [desc, info].filter(Boolean).join(' | ');

        // Nas notas da APPA o contrato vem como "CT 22SR035" dentro da Discriminação, e não
        // como "CONTRATO ..." — mesmo fallback já usado no parser de PDF do layout Cuiabá.
        dados.numeroContrato = extrairNumeroContratoDoTexto(dados.observacoes)
            || (dados.observacoes.match(/\bCT\s*:?\s*(\d{2}(?:SR|S[8B]R|[8B]R)\d{3})\b/i)?.[1] ?? '');

        return dados;
    }


    // v2.4.0: UF pelos 2 primeiros dígitos do código IBGE do município.
    const UF_POR_CODIGO_IBGE = {
        '11': 'RO', '12': 'AC', '13': 'AM', '14': 'RR', '15': 'PA', '16': 'AP', '17': 'TO',
        '21': 'MA', '22': 'PI', '23': 'CE', '24': 'RN', '25': 'PB', '26': 'PE', '27': 'AL', '28': 'SE', '29': 'BA',
        '31': 'MG', '32': 'ES', '33': 'RJ', '35': 'SP', '41': 'PR', '42': 'SC', '43': 'RS',
        '50': 'MS', '51': 'MT', '52': 'GO', '53': 'DF',
    };

    // v2.5.38: UF da prestação e da incidência do ISSQN são conferidas separadamente.
    // Nunca usar endereço do prestador/tomador, SEGEST ou incidência de IBS/CBS para
    // completar esses campos. Um MG no XML também não apaga um MA impresso no PDF.
    const NOMES_UF_NOTA = {
        AC: 'Acre', AL: 'Alagoas', AP: 'Amapá', AM: 'Amazonas', BA: 'Bahia', CE: 'Ceará',
        DF: 'Distrito Federal', ES: 'Espírito Santo', GO: 'Goiás', MA: 'Maranhão',
        MT: 'Mato Grosso', MS: 'Mato Grosso do Sul', MG: 'Minas Gerais', PA: 'Pará',
        PB: 'Paraíba', PR: 'Paraná', PE: 'Pernambuco', PI: 'Piauí', RJ: 'Rio de Janeiro',
        RN: 'Rio Grande do Norte', RS: 'Rio Grande do Sul', RO: 'Rondônia', RR: 'Roraima',
        SC: 'Santa Catarina', SP: 'São Paulo', SE: 'Sergipe', TO: 'Tocantins',
    };

    function interpretarLocalidadeUFNota(valor = {}) {
        const texto = String(valor.texto || '').replace(/\s+/g, ' ').trim();
        const codigoIBGE = String(valor.codigoIBGE || '').replace(/\D/g, '');
        const ufCodigo = /^\d{7}$/.test(codigoIBGE) ? (UF_POR_CODIGO_IBGE[codigoIBGE.slice(0, 2)] || '') : '';
        const par = texto.match(/\s*[/,\u2013\u2014-]\s*([A-Za-z]{2})\b(?=\s*(?:[/;|]|$))/);
        let uf = String(valor.uf || par?.[1] || '').trim().toUpperCase();
        let municipio = par ? texto.slice(0, par.index).trim() : texto;
        if (!uf) {
            const nome = Object.entries(NOMES_UF_NOTA).find(([, n]) =>
                normalizarBuscaPDF(texto).endsWith('/ ' + normalizarBuscaPDF(n))
                || normalizarBuscaPDF(texto).endsWith('-' + normalizarBuscaPDF(n))
                || normalizarBuscaPDF(texto).endsWith('- ' + normalizarBuscaPDF(n)));
            if (nome) {
                uf = nome[0];
                municipio = texto.slice(0, texto.length - nome[1].length).replace(/\s*[/\u2013\u2014-]\s*$/, '').trim();
            }
        }
        // Um campo contendo só código não deve virar nome de cidade.
        if (/^[\d.\s-]+$/.test(municipio)) municipio = '';
        return { texto, municipio, codigoIBGE, uf, ufCodigo };
    }

    function extrairLocalidadesUFNotaPDF(texto, estrutura = []) {
        const ehPrestacao = s => /\bLOCAL\s+(?:(?:DA|DE)\s+)?PRESTACAO\b|\bLOCAL\s+DOS\s+SERVICOS\b/.test(s);
        const ehIncidencia = s => /\bMUNICIPIO\b.{0,100}\bINCIDENCIA\b|\bLOCAL\s+(?:DE\s+)?INCIDENCIA\s+(?:DO\s+)?ISS(?:QN)?\b/.test(s);
        const ehIBSCBS = s => /\bIBS\b|\bCBS\b/.test(s);
        const ehLimite = s => /^(?:DESCRICAO\s+DO\s+SERVICO|TRIBUTACAO\s+(?:MUNICIPAL|FEDERAL|IBS)|INFORMACOES\s+COMPLEMENTARES|VALOR\s+TOTAL|BENEFICIO\s+MUNICIPAL|BASE\s+DE\s+CALCULO|BC\s+ISSQN)/.test(s);
        const limpar = s => String(s || '').replace(/\s+/g, ' ').trim();
        const resultado = {};
        const foraDoIBSCBS = linhas => {
            let emIBSCBS = false;
            return linhas.map(linha => {
                const n = normalizarBuscaPDF(linha);
                if (/^TRIBUTACAO\b/.test(n)) emIBSCBS = ehIBSCBS(n);
                if (/^(?:VALOR\s+TOTAL|INFORMACOES\s+COMPLEMENTARES)/.test(n)) emIBSCBS = false;
                return !emIBSCBS;
            });
        };
        const permitirEstrutura = foraDoIBSCBS(estrutura.map(linha => linha.texto));

        // Leitura pela posição real do rótulo: o DANFSe v2 mudou a prestação da
        // terceira para a quarta coluna. A incidência do ISSQN tem sua própria célula.
        for (const [campo, ehRotulo] of [['prestacao', ehPrestacao], ['incidencia', ehIncidencia]]) {
            for (let i = 0; i < estrutura.length; i++) {
                const linha = estrutura[i];
                const normal = normalizarBuscaPDF(linha.texto);
                if (!permitirEstrutura[i] || !ehRotulo(normal) || ehIBSCBS(normal)) continue;
                const itens = linha.itens || [];
                let inicio = -1;
                for (let k = 0; k < itens.length; k++) {
                    const primeiro = normalizarBuscaPDF(itens[k].texto);
                    if (campo === 'prestacao' ? !/^LOCAL\b/.test(primeiro)
                        : !/^MUNICIPIO\b|^LOCAL\s+(?:DE\s+)?INCIDENCIA\b/.test(primeiro)) continue;
                    const junto = normalizarBuscaPDF(itens.slice(k, k + 8).map(x => x.texto).join(' '));
                    if (ehRotulo(junto)) { inicio = k; break; }
                }
                if (inicio < 0) continue;
                const item = itens[inicio];
                const mesmoItem = limpar(item.texto).match(/:\s*(.+)$/);
                if (mesmoItem && interpretarLocalidadeUFNota({ texto: mesmoItem[1] }).uf) {
                    resultado[campo] = { texto: mesmoItem[1] };
                    break;
                }
                const direita = itens.slice(inicio + 1).find(x => Number(x.x) > Number(item.x) + 70
                    && !/^(?:SIGLA\s+UF|UF|PAIS|DE\s+INCIDENCIA|DO\s+ISSQN)\b/.test(normalizarBuscaPDF(x.texto)));
                for (let j = i + 1; j < Math.min(i + 5, estrutura.length); j++) {
                    const abaixo = estrutura[j];
                    if (abaixo.pagina !== linha.pagina || Math.abs(linha.y - abaixo.y) > 34 || ehLimite(normalizarBuscaPDF(abaixo.texto))) break;
                    const valor = limpar((abaixo.itens || []).filter(x => Number(x.x) >= Number(item.x) - 7
                        && (!direita || Number(x.x) < Number(direita.x) - 7)).map(x => x.texto).join(' '));
                    if (!valor || /^(?:SIGLA\s+UF|UF\s*\/|PAIS|DE\s+INCIDENCIA|DO\s+ISSQN)/.test(normalizarBuscaPDF(valor))) continue;
                    // Mesmo sem UF, guardar apenas o valor desta célula: ausência não é MG.
                    resultado[campo] = { texto: valor };
                    break;
                }
                if (resultado[campo]) break;
            }
        }

        // OCR/sem coordenadas: só o rótulo próprio e sua linha de valores, antes da
        // próxima seção. Não procurar uma UF solta na descrição ou no quadro IBS/CBS.
        const linhas = String(texto || '').split(/\r?\n/);
        const permitirTexto = foraDoIBSCBS(linhas);
        const pares = valor => Array.from(String(valor).matchAll(/([A-Za-zÀ-ÿ][A-Za-zÀ-ÿ'’. ]{1,90}?)\s*[/\u2013\u2014-]\s*([A-Za-z]{2})\b(?:\s*\/\s*(?:-|BRASIL|BR))?/gi))
            .map(m => limpar(m[0]).replace(/^(?:OPERACAO\s+TRIBUTAVEL|OPERAÇÃO\s+TRIBUTÁVEL)\s+/i, ''));
        for (const [campo, ehRotulo] of [['prestacao', ehPrestacao], ['incidencia', ehIncidencia]]) {
            if (resultado[campo]) continue;
            for (let i = 0; i < linhas.length; i++) {
                const normal = normalizarBuscaPDF(linhas[i]);
                if (!permitirTexto[i] || !ehRotulo(normal) || ehIBSCBS(normal)) continue;
                const inline = linhas[i].match(/:\s*(.+)$/);
                const valores = inline ? pares(inline[1]) : [];
                for (let j = i + 1; !valores.length && j <= Math.min(i + 2, linhas.length - 1); j++) {
                    if (ehLimite(normalizarBuscaPDF(linhas[j]))) break;
                    valores.push(...pares(linhas[j]));
                }
                if (valores.length) {
                    resultado[campo] = { texto: campo === 'prestacao' && ehIncidencia(normal) ? valores[0] : valores[valores.length - 1] };
                    break;
                }
            }
        }
        return resultado;
    }

    function conferirUFsNota(d) {
        const resultado = { erros: [], alertas: [], campos: {} };
        const fontes = [];
        if (d?.xml && !d.xmlNumeroDivergente) fontes.push(['XML', d.xml]);
        const numero = v => String(v || '').replace(/\D/g, '').replace(/^0+/, '');
        const pdfOutraNota = numero(d?.pdf?.numero) && numero(d?.numero || d?.registro?.numero)
            && numero(d.pdf.numero) !== numero(d.numero || d.registro?.numero);
        if (d?.pdf && !pdfOutraNota) fontes.push([d.pdf.extraidoViaOCR ? 'PDF/OCR' : 'PDF', d.pdf]);
        for (const [campo, rotulo] of [['prestacao', 'Local da prestação'], ['incidencia', 'Município de incidência do ISSQN']]) {
            const evidencias = fontes.map(([fonte, dados]) => {
                const valor = dados.localidadesUFNota?.[campo];
                return valor ? { ...interpretarLocalidadeUFNota(valor), fonte } : null;
            }).filter(Boolean);
            const ufs = [...new Set(evidencias.flatMap(e => [e.uf, e.ufCodigo]).filter(Boolean))];
            const fora = ufs.filter(uf => uf !== 'MG');
            let status = 'ok', mensagem;
            if (fora.length) {
                status = 'diverge';
                const detalhes = evidencias.map(e => `${e.fonte}: ${e.texto || e.municipio || 'município sem nome'}${e.codigoIBGE ? ` (IBGE ${e.codigoIBGE}${e.ufCodigo ? ' → ' + e.ufCodigo : ''})` : ''}${e.uf && !e.texto ? ' / ' + e.uf : ''}`).join('; ');
                mensagem = `${rotulo}: UF ${fora.map(uf => NOMES_UF_NOTA[uf] ? `${uf} (${NOMES_UF_NOTA[uf]})` : `${uf} (sigla inválida)`).join(', ')}. Esperado MG (Minas Gerais). ${detalhes}. Confira/corrija a nota fiscal.${ufs.length > 1 ? ' Há divergência de UF entre os dados lidos.' : ''}`;
                resultado.erros.push(mensagem);
            } else if (!ufs.length) {
                status = 'ausente';
                mensagem = `${rotulo}: UF não identificada na nota (XML/PDF). Conferir manualmente se o município está em Minas Gerais; MG não foi presumido.${pdfOutraNota ? ' O PDF com número diferente não foi usado nesta conferência.' : ''}`;
                resultado.alertas.push(mensagem);
            } else {
                mensagem = `${rotulo}: MG (Minas Gerais) confirmado ${evidencias.filter(e => e.uf || e.ufCodigo).map(e => `no ${e.fonte}${e.codigoIBGE && e.ufCodigo ? ' pelo código IBGE ' + e.codigoIBGE : ''}`).join(' e ')}.`;
            }
            resultado.campos[campo] = { rotulo, status, mensagem, evidencias, ufs };
        }
        resultado.status = resultado.erros.length ? 'diverge' : resultado.alertas.length ? 'ausente' : 'ok';
        return resultado;
    }

    function celulaUFNota(d, campo, rowspan = 1) {
        const ver = conferirUFsNota(d).campos[campo];
        const rs = rowspan > 1 ? ` rowspan="${rowspan}"` : '';
        const cor = ver.status === 'ok' ? CORES.VERDE_CLARO : ver.status === 'diverge' ? CORES.VERMELHO_CLARO : CORES.AMARELO_CLARO;
        const icone = ver.status === 'ok' ? '✅' : ver.status === 'diverge' ? '⚠️' : 'ℹ️';
        const valores = [...new Set(ver.evidencias.map(e => e.texto || [e.municipio, e.uf || e.ufCodigo].filter(Boolean).join('/') || (e.codigoIBGE ? `IBGE ${e.codigoIBGE}` : '')).filter(Boolean))];
        return `<td${rs} class="ter-quebra" style="background:${cor};min-width:150px;max-width:240px;" title="${escaparXml(ver.mensagem)}">${valores.length ? valores.map(escaparXml).join('<br>') : 'Não identificado'}<br><small>${icone} ${ver.status === 'ok' ? 'MG confirmado' : ver.status === 'diverge' ? 'UF diferente de MG' : 'UF não confirmada'}</small></td>`;
    }

    // [v1.4.4] XML municipal do Atende.Net (validado com NFS-e 8655/SURICATE, São José/SC).
    // Estrutura observada:
    // <nfse><nf><numero_nfse>...</numero_nfse>...</nf><prestador>...</prestador>
    // <tomador>...</tomador><itens><lista>...</lista></itens>...
    function parsearXMLMunicipalAtende(xmlDoc, xmlText, numeroEsperado) {
        const raiz = xmlDoc.documentElement;
        if (!raiz || String(raiz.localName || raiz.nodeName).toLowerCase() !== 'nfse') return null;

        const nf = primeiroFilhoDireto(raiz, 'nf');
        const prestador = primeiroFilhoDireto(raiz, 'prestador');
        const tomador = primeiroFilhoDireto(raiz, 'tomador');
        const itens = primeiroFilhoDireto(raiz, 'itens');
        const lista = primeiroFilho(itens, 'lista');
        if (!nf || !textoEl(primeiroFilhoDireto(nf, 'numero_nfse')) || !prestador || !tomador || !lista) return null;

        const t = (el, tag) => textoEl(primeiroFilho(el, tag));
        const nBR = (el, tag) => {
            const v = t(el, tag);
            return v === '' ? null : paraNumeroBR(v);
        };

        const numero = t(nf, 'numero_nfse');
        const alvo = String(numeroEsperado || '').replace(/\D/g, '').replace(/^0+/, '');
        const lido = String(numero || '').replace(/\D/g, '').replace(/^0+/, '');
        if (alvo && lido && alvo !== lido) {
            console.warn(`[SIGEO-Terceirizados] XML municipal Atende.Net traz NFS-e ${numero}, diferente da esperada ${numeroEsperado}; a trava de identidade do pipeline decidirá o uso.`);
        }

        const descricao = t(lista, 'descritivo');
        const valorIss = nBR(lista, 'valor_issrf');
        const aliquota = normalizarAliquota(nBR(lista, 'aliquota_item_lista_servico'));
        const baseIss = nBR(lista, 'valor_tributavel');
        const valorServico = nBR(nf, 'valor_total');

        const parcelas = primeiroFilho(raiz, 'parcelas');
        const parcela = primeiroFilho(parcelas, 'parcela');
        const valorLiquido = nBR(parcela, 'valor') ?? nBR(primeiroFilho(nf, 'totCIBS'), 'vTotNF');

        // O XML traz o código IBGE completo da localidade de incidência no bloco IBSCBS.
        // No caso validado (3106200), coincide com Belo Horizonte/MG, local indicado no PDF.
        const codigoMunicipioPrestacao = (t(nf, 'cLocalidadeIncid') || '').replace(/\D/g, '') || null;

        // v2.3.4: retenções SÓ como filhos diretos de <nf>. Dentro de <pis_cofins> há outro
        // valor_pis/valor_cofins com a APURAÇÃO (1,65%/7,60%; NF 8820: 4.551,36 e 20.963,83),
        // que não é retenção. Hoje o certo vinha por estar antes no arquivo; agora não depende disso.
        const nDireto = (el, tag) => {
            const v = textoEl(primeiroFilhoDireto(el, tag));
            return v === '' ? null : paraNumeroBR(v);
        };
        const irrf = nDireto(nf, 'valor_ir');
        const csll = nDireto(nf, 'valor_contribuicao_social');
        const pis = nDireto(nf, 'valor_pis');
        const cofins = nDireto(nf, 'valor_cofins');

        // v2.4.0: no Atende.Net, <prestador><cidade> é o código TOM/SIAFI da Receita (São José/SC = 8327),
        // não é nome nem código IBGE. Antes ele ia como "município" para a Liquidação e a macro acusava
        // divergência com "São José" no cadastro. O IBGE do município emissor vem nos 7 primeiros
        // dígitos da chave de acesso da NFS-e Nacional (NF 8820: 4216602 = São José/SC).
        const cidadePrestXml = t(prestador, 'cidade') || t(prestador, 'municipio') || '';
        const cidadePrestEhCodigo = /^\d+$/.test(cidadePrestXml);
        const chaveNacional = (t(nf, 'chave_acesso_nfse_nacional') || '').replace(/\D/g, '');
        const ibgeDaChave = (chaveNacional.length === 50 && UF_POR_CODIGO_IBGE[chaveNacional.slice(0, 2)]) ? chaveNacional.slice(0, 7) : null;
        const ibgePrestador = (cidadePrestEhCodigo && cidadePrestXml.length === 7 && UF_POR_CODIGO_IBGE[cidadePrestXml.slice(0, 2)])
            ? cidadePrestXml : ibgeDaChave;

        // v2.5.52: UF do local da prestação/incidência. O Atende.Net grava códigos TOM/SIAFI (Belo Horizonte = 4123),
        // não IBGE. Só quando o código do local da prestação é o mesmo da cidade do tomador e o ISS não é do município
        // do prestador, a UF é a do tomador; o IBGE de cLocalidadeIncid entra só se for da mesma UF.
        const localidadesAtende2552 = (() => {
            const codLocal = (t(lista, 'codigo_local_prestacao_servico') || '').replace(/\D/g, '');
            const codCidTom = (t(tomador, 'cidade') || '').replace(/\D/g, '');
            const ufTom = (t(tomador, 'estado') || '').trim().toUpperCase();
            const issForaPrestador = /^N$/i.test((t(lista, 'tributa_municipio_prestador') || '').trim());
            if (!codLocal || codLocal !== codCidTom || !NOMES_UF_NOTA[ufTom] || !issForaPrestador) return null;
            const ibgeOk = codigoMunicipioPrestacao && /^\d{7}$/.test(codigoMunicipioPrestacao) && UF_POR_CODIGO_IBGE[codigoMunicipioPrestacao.slice(0, 2)] === ufTom ? codigoMunicipioPrestacao : '';
            return {
                prestacao: { texto: `município do tomador (código ${codLocal}) / ${ufTom}`, uf: ufTom },
                incidencia: { texto: `município do tomador (código ${codLocal}) / ${ufTom}`, uf: ufTom, codigoIBGE: ibgeOk },
                ibge: ibgeOk,
            };
        })();

        const dados = {
            layoutXML: 'atende-net',
            ...(localidadesAtende2552 ? { localidadesUFNota: { prestacao: localidadesAtende2552.prestacao, incidencia: localidadesAtende2552.incidencia } } : {}),
            ...(localidadesAtende2552?.ibge ? { codigoMunicipioIssqn: localidadesAtende2552.ibge } : {}),
            numero,
            cnpj: (t(prestador, 'cpfcnpj') || '').replace(/\D/g, ''),
            razaoSocial: '',
            municipioPrestador: cidadePrestEhCodigo ? '' : cidadePrestXml,
            ufPrestador: t(prestador, 'estado') || t(prestador, 'uf') || (ibgePrestador ? UF_POR_CODIGO_IBGE[ibgePrestador.slice(0, 2)] : ''),
            codigoMunicipioPrestador: ibgePrestador,

            tomadorCnpj: (t(tomador, 'cpfcnpj') || '').replace(/\D/g, '') || null,
            tomadorNome: t(tomador, 'nome_razao_social') || null,

            localPrestacaoServico: '',
            codigoMunicipioPrestacao,

            // O Atende.Net grava DD/MM/AAAA; o restante do robô trabalha internamente com ISO.
            dataEmissao: normalizarDataMunicipalISO(t(nf, 'data_nfse')),
            valorServico,
            valorLiquido,
            baseCalculoIssqn: baseIss,
            aliquotaIssqn: aliquota,
            valorIssqn: valorIss,
            // Neste layout, valor_issrf é o ISS retido/substituído. Zero continua sendo zero.
            issqnRetido: valorIss,
            codigoTributacaoNacional: (t(lista, 'codigo_item_lista_servico') || '').replace(/\D/g, '') || null,
            codigoTributacaoMunicipal: null,
            descricaoTributacaoNacional: '',

            inssRetido: nDireto(nf, 'valor_inss'),
            irrf,
            contribuicoesSociaisRetidas: csll,
            pisRetido: pis,
            cofinsRetido: cofins,

            descricaoServico: descricao,
            informacoesComplementares: '',
            material: null,
            baseCalculoInss: null,
            xmlCompleto: xmlText,
        };

        dados.somaIrrfContribSociais = somarRetencoesFederais(irrf, csll, pis, cofins);

        dados.retFedComPisCofins = somarRetencoesFederaisComPisCofins(irrf, csll, pis, cofins);
        dados.observacoes = descricao;
        dados.numeroContrato = extrairNumeroContratoDoTexto(descricao);
        dados.contaBancariaNota = extrairContaBancariaDoTexto(descricao);
        return dados;
    }

    // Despachante: identifica o layout do XML e delega. Devolve null quando o arquivo não é
    // uma NFS-e reconhecível — isso é importante, porque um objeto "vazio mas verdadeiro"
    // fazia o robô achar que tinha XML, dispensar o OCR do PDF e devolver a linha em branco
    // (exatamente o que acontecia com as notas da APPA depois que elas viraram XML ABRASF).
    function parsearXMLNotaFiscal(xmlText, numeroEsperado = null) {
        const xmlDoc = new DOMParser().parseFromString(xmlText, 'text/xml');
        if (xmlDoc.getElementsByTagName('parsererror').length) {
            console.warn('[SIGEO-Terceirizados] Conteúdo devolvido não é um XML válido.');
            return null;
        }
        if (todosOsFilhos(xmlDoc, 'infNFSe').length) return parsearXMLNacional(xmlDoc, xmlText, numeroEsperado);
        if (todosOsFilhos(xmlDoc, 'InfNfse').length) return parsearXMLAbrasf(xmlDoc, xmlText, numeroEsperado);
        const atende = parsearXMLMunicipalAtende(xmlDoc, xmlText, numeroEsperado);
        if (atende) return atende;
        console.warn('[SIGEO-Terceirizados] Layout de XML não reconhecido (Nacional, ABRASF ou municipal Atende.Net) — seguirá para o PDF.');
        return null;
    }

    /* ====================================================================================
     * 6.1 OCR (Tesseract.js) + LAYOUTS MUNICIPAIS DE PDF  [v1.2.0]
     *     Usado só quando o PDF não tem camada de texto (ex.: notas da APPA / Cuiabá,
     *     que são uma imagem JPEG dentro do PDF — pdf.js getTextContent() volta vazio).
     * ==================================================================================== */
    const OCR = {
        worker: null,
        async obterWorker() {
            if (OCR.worker) return OCR.worker;
            // 'por' lê melhor rótulos acentuados; regexes abaixo toleram ruído mesmo assim.
            OCR.worker = await Tesseract.createWorker('por');
            return OCR.worker;
        },
    };

    // Renderiza 1 página em canvas e roda OCR. scale 4 ≈ 288 dpi — na nota real da APPA,
    // 150 dpi errou dígito de CNPJ (9→0); em ≥300 dpi a leitura foi 100% correta.
    async function ocrPaginaPDF(page) {
        const viewport = page.getViewport({ scale: 4 });
        const canvas = document.createElement('canvas');
        canvas.width = viewport.width;
        canvas.height = viewport.height;
        await page.render({ canvasContext: canvas.getContext('2d'), viewport }).promise;
        const worker = await OCR.obterWorker();
        const { data } = await worker.recognize(canvas);
        canvas.width = canvas.height = 0; // libera memória
        return data?.text || '';
    }

    function detectarLayoutPDF(texto) {
        const t = texto || '';
        if (/Prefeitura\s+Municipal\s+de\s+Cuiab|issnetonline\.com/i.test(t)) return 'cuiaba';

        // [v1.4.5] Layout municipal Atende.Net / São José-SC.
        // A combinação dos rótulos é mais segura que amarrar só ao nome da prefeitura.
        if (
            /PRESTADOR\s+DE\s+SERVI[ÇC]OS/i.test(t) &&
            /TOMADOR\s+DE\s+SERVI[ÇC]OS/i.test(t) &&
            /DISCRIMINA[ÇC][ÃA]O\s+DOS\s+SERVI[ÇC]OS/i.test(t) &&
            /RETEN[ÇC][ÕO]ES\s+FEDERAIS/i.test(t) &&
            /C[oó]digos?\s+dos\s+servi[çc]os/i.test(t)
        ) return 'atende-net';

        return 'nacional';
    }

    // "Pará de Minas - MG Pará de Minas - MG" -> uma ocorrência (Cuiabá repete
    // Local dos Serviços / Município Incidência lado a lado na mesma linha do OCR).
    function dedupeMetade(s) {
        const t = (s || '').trim();
        if (t.length > 6 && t.length % 2 === 1) {
            const meio = (t.length - 1) / 2;
            if (t.slice(0, meio) === t.slice(meio + 1)) return t.slice(0, meio).trim();
        }
        return t;
    }

    // Soma "IRRF + Contrib. Sociais" — REGRA ÚNICA para XML, PDF nacional e PDF Cuiabá/OCR.
    // CONFIG.somaFederalIncluiPisCofins: false -> IRRF + CSLL (padrão histórico do módulo
    // de Saúde; nota APPA 2987 = 232,99) | true -> + PIS + COFINS (total federal da
    // IN RFB 1.234; nota APPA 2987 = 379,61).
    // v2.3.6: número escrito à mão na observação: "4.451,54", "4451,54", "213.67", "15.979.72" (erro de
    // digitação visto na NF 5523 da APPA). Os dois últimos dígitos depois de ponto ou vírgula são os centavos.
    const RE_NUM_LIVRE = '(\\d{1,3}(?:[.,]\\d{3})*[.,]\\d{2}|\\d+[.,]\\d{2})';
    function valorLivre(txt) {
        const s = String(txt || '').replace(/\s/g, '');
        const m = s.match(/^(.*?)[.,](\d{2})$/);
        if (m) {
            const inteiro = m[1].replace(/[.,]/g, '');
            return /^\d+$/.test(inteiro) ? Number(`${inteiro}.${m[2]}`) : null;
        }
        const so = s.replace(/[.,]/g, '');
        return /^\d+$/.test(so) ? Number(so) : null;
    }

    // v2.3.6: material destacado no texto da nota. Devolve { valor, sem, com, fonte }:
    // valor = número (0 quando a nota diz "SEM MATERIAL"), ou null quando não dá para saber.
    // Formatos vistos na APPA: "MATERIAIS REF JULHO: item 8x3,80=30,40;... TOTAL R$2.231,76" (usa o TOTAL),
    // "MATERIAL DE LIMPEZA REFERENTE A JULHO/26: ... = 7,60 ... = 19,44" (soma os itens) e o antigo
    // "FATURAMENTO REF MATERIAL DE LIMPEZA NO MES DE Maio DE 2026 R$ 133,44". Número seguido de "%" nunca
    // é material: antes, "SEM MATERIAL - IR 4,80%" era lido como R$ 4,80 de material.
    function extrairMaterialDoTexto(texto) {
        const t = String(texto || '');
        const r = {
            valor: null, fonte: null,
            sem: /\bSEM\s+MATERIA(?:L|IS)\b/i.test(t),
            com: /\bCOM\s+(?:FORNECIMENTO\s+DE\s+)?MATERIA(?:L|IS)\b/i.test(t),
        };
        const ini = t.search(/MATERIA(?:L|IS)\s+(?:DE\s+LIMPEZA\s+)?REF(?:ERENTE)?\b[^:]{0,40}:/i);
        if (ini >= 0) {
            let bloco = t.slice(ini);
            const fim = bloco.search(/LOCAL\s+(?:DE\s+)?PRESTA|DADOS\s+BANC|\s-\s*Valor\s+(?:IBS|CBS)/i);
            if (fim > 0) bloco = bloco.slice(0, fim);
            const tot = bloco.match(new RegExp('TOTAL\\s*:?\\s*R?\\$?\\s*' + RE_NUM_LIVRE, 'i'));
            if (tot) { r.valor = valorLivre(tot[1]); r.fonte = 'total'; return r; }
            const itens = [...bloco.matchAll(new RegExp('=\\s*' + RE_NUM_LIVRE, 'g'))].map(m => valorLivre(m[1])).filter(v => v !== null);
            if (itens.length) { r.valor = Math.round(itens.reduce((a, v) => a + v, 0) * 100) / 100; r.fonte = 'itens'; return r; }
        }
        if (!(r.sem && !r.com)) {
            // v2.3.7: abreviado, visto na APPA (NF 5516, 5603): "MAT. LIMP REF. JUL/26 CONF. PLANILHA CUSTOS R$427,62"
            // v2.3.8: também "MAT. JUL/26 R$427,62" (NF 5603), sem a palavra LIMP
            const ab = t.match(new RegExp('\\bMAT(?:\\.|\\s)\\s*(?:DE\\s+)?(?:LIMP(?:EZA)?\\.?)?[^%$]{0,60}?R\\$\\s*' + RE_NUM_LIVRE + '(?!\\s*%)', 'i'));
            if (ab) { r.valor = valorLivre(ab[1]); r.fonte = 'valor'; return r; }
            // singular, como no leitor antigo: "fornecimento de materiais ... R$ <valor da nota>" não é material
            const m = t.match(new RegExp('(?<!FORNECIMENTO\\s+DE\\s+)MATERIAL[^%$]{0,60}?R\\$\\s*' + RE_NUM_LIVRE + '(?!\\s*%)', 'i'));
            if (m) { r.valor = valorLivre(m[1]); r.fonte = 'valor'; }
        }
        // formatos dos leitores antigos, preservados: "MATERIAL: 2.696,70", "Material 2696,7" (nota 1551,
        // uma casa decimal) e "MATERIAL DE LIMPEZA: R$ 120,00" — agora sem aceitar número seguido de "%"
        if (r.valor === null && !(r.sem && !r.com)) {
            const m2 = t.match(/(?<!fornecimento\s+de\s+)materia(?:l|is)(?:\s+de\s+limpeza)?[^:=\d%$]{0,20}[:=]?\s*r?\$?\s*((?:\d{1,3}(?:\.\d{3})+|\d+),\d{1,2})(?!\d|\s*%)/i);
            if (m2) { r.valor = paraNumeroBR(m2[1]); r.fonte = 'valor'; }
        }
        if (r.valor === null && r.sem && !r.com) { r.valor = 0; r.fonte = 'sem'; }
        return r;
    }

    // v2.3.3: total com PIS/COFINS, SEMPRE (independe de CONFIG.somaFederalIncluiPisCofins).
    // Usado só na conferência das DIVs da SEGEST, como segunda opção quando a soma histórica
    // (IRRF + CSLL) não fecha com a alíquota das DIVs. Não altera a coluna "IRRF + Contrib. Sociais".
    function somarRetencoesFederaisComPisCofins(irrf, csll, pis, cofins) {
        const valores = [irrf, csll, pis, cofins];
        if (!valores.some(v => v !== null && v !== undefined && v !== '')) return null;
        return Math.round(valores.reduce((s, v) => s + (Number(v) || 0), 0) * 100) / 100;
    }

    function somarRetencoesFederais(irrf, csll, pis, cofins) {
        const valores = CONFIG.somaFederalIncluiPisCofins ? [irrf, csll, pis, cofins] : [irrf, csll];
        const algumLido = valores.some(v => v !== null && v !== undefined && v !== '');
        if (!algumLido) return null;
        let soma = (irrf || 0) + (csll || 0);
        if (CONFIG.somaFederalIncluiPisCofins) soma += (pis || 0) + (cofins || 0);
        return Math.round(soma * 100) / 100;
    }

    // Nas tabelas do layout Cuiabá, a linha de RÓTULOS vem antes da linha de VALORES.
    // Acha a âncora (fim dos rótulos) e coleta os N próximos tokens monetários
    // ("R$ 9.999,99") ou booleanos ("Sim"/"Não"), na ordem das colunas.
    function extrairTokensAposAncora(texto, ancora, qtd) {
        const m = texto.match(ancora);
        if (!m) return null;
        const resto = texto.slice(m.index + m[0].length, m.index + m[0].length + 500);
        const re = /R\$\s*([\d.\s]*\d,\d{2})|\b(Sim|N[aã]o)\b/gi;
        const tokens = [];
        let t;
        while ((t = re.exec(resto)) && tokens.length < qtd) {
            tokens.push(t[1] !== undefined ? paraNumeroBR(t[1].replace(/\s/g, '')) : /sim/i.test(t[2]));
        }
        return tokens.length ? tokens : null;
    }


    // [v1.4.5] Parser do PDF municipal Atende.Net (validado com SURICATE NFS-e 8307).
    // Necessário para notas antigas em que a rota XML do SIGEO não está disponível:
    // o PDF tem camada de texto, mas não segue o DANFSe nacional.
    function parsearTextoPDFAtende(texto) {
        const dados = { textoCompleto: texto, layoutPDF: 'atende-net' };
        const t = String(texto || '');
        const paraValor = (s) => {
            const m = String(s || '').match(/((?:\d{1,3}(?:\.\d{3})+|\d+),\d{2})/);
            return m ? paraNumeroBR(m[1]) : null;
        };
        const secao = (inicio, fim) => {
            const mi = t.match(inicio);
            if (!mi) return '';
            const a = mi.index + mi[0].length;
            const resto = t.slice(a);
            const mf = fim ? resto.match(fim) : null;
            return mf ? resto.slice(0, mf.index) : resto;
        };
        const compactar = (s) => String(s || '').replace(/\s+/g, ' ').trim();

        const cabecalho = secao(/^/, /PRESTADOR\s+DE\s+SERVI[ÇC]OS/i);
        const prestador = secao(/PRESTADOR\s+DE\s+SERVI[ÇC]OS/i, /TOMADOR\s+DE\s+SERVI[ÇC]OS/i);
        const tomador = secao(/TOMADOR\s+DE\s+SERVI[ÇC]OS/i, /DISCRIMINA[ÇC][ÃA]O\s+DOS\s+SERVI[ÇC]OS/i);
        const servico = secao(/DISCRIMINA[ÇC][ÃA]O\s+DOS\s+SERVI[ÇC]OS/i, /Forma\s+de\s+Pagamento/i);
        const retencoes = secao(/RETEN[ÇC][ÕO]ES\s+FEDERAIS/i, /C[oó]digos?\s+dos\s+servi[çc]os/i);
        const depoisCodigos = secao(/C[oó]digos?\s+dos\s+servi[çc]os/i, /INFORMA[ÇC][ÕO]ES\s+COMPLEMENTARES/i);

        // Nº da nota: o canhoto superior é o ponto mais estável neste layout.
        dados.numero =
            (t.match(/NFS-?e\s+de\s+n[úu]mero\s+(\d{1,15})/i)?.[1]) ||
            (cabecalho.match(/N[úu]mero\s+da\s+Nota[\s\S]{0,100}?\b(\d{1,15})\b/i)?.[1]) ||
            '';

        const data = t.match(/Data\s+da\s+Emiss[aã]o\s+da\s+Nota[\s\S]{0,500}?(\d{2}\/\d{2}\/\d{4})/i)?.[1] || '';
        dados.dataEmissao = data || null;

        const cnpjPrestador = prestador.match(/CPF\s*\/?\s*CNPJ\s*:\s*([\d.\-\/]{11,20})/i)?.[1] || '';
        dados.cnpj = cnpjPrestador.replace(/\D/g, '');

        const cnpjTomador = tomador.match(/CPF\s*\/?\s*CNPJ\s*:\s*([\d.\-\/]{11,20})/i)?.[1] || '';
        dados.tomadorCnpj = cnpjTomador.replace(/\D/g, '') || null;
        dados.tomadorNome =
            (tomador.match(/Nome\s*\/?\s*Raz[aã]o\s+Social\s*:\s*([^\n]+)/i)?.[1] || '').trim() ||
            null;

        // Linha de valores da discriminação: Serviço | Base | Alíquota | ISS.
        const mValores = servico.match(
            /((?:\d{1,3}(?:\.\d{3})+|\d+),\d{2})\s+((?:\d{1,3}(?:\.\d{3})+|\d+),\d{2})\s+(\d{1,2}[.,]\d{1,4})\s*%\s+((?:\d{1,3}(?:\.\d{3})+|\d+),\d{2})/
        );
        if (mValores) {
            dados.valorServico = paraNumeroBR(mValores[1]);
            dados.baseCalculoIssqn = paraNumeroBR(mValores[2]);
            dados.aliquotaIssqn = normalizarAliquota(paraNumeroBR(mValores[3]));
            dados.valorIssqn = paraNumeroBR(mValores[4]);
        } else {
            dados.valorServico = null;
            dados.baseCalculoIssqn = null;
            dados.aliquotaIssqn = null;
            dados.valorIssqn = null;
        }

        // Descrição: remove apenas cabeçalhos e a linha numérica do quadro.
        let descricao = servico
            .replace(/Valor\s+do\s+Servi[çc]o[\s\S]{0,80}?ISS/i, ' ')
            .replace(/((?:\d{1,3}(?:\.\d{3})+|\d+),\d{2})\s+((?:\d{1,3}(?:\.\d{3})+|\d+),\d{2})\s+\d{1,2}[.,]\d{1,4}\s*%\s+((?:\d{1,3}(?:\.\d{3})+|\d+),\d{2})/, ' ');
        dados.descricaoServico = compactar(descricao);

        // Retenções: os seis primeiros valores após o cabeçalho correspondem a
        // PIS, COFINS, INSS, IR, CSLL e Outras Retenções, nessa ordem.
        const valsRet = [...retencoes.matchAll(/R\$\s*((?:\d{1,3}(?:\.\d{3})+|\d+),\d{2})/gi)]
            .map(m => paraNumeroBR(m[1]));
        dados.pisRetido = valsRet.length >= 1 ? valsRet[0] : null;
        dados.cofinsRetido = valsRet.length >= 2 ? valsRet[1] : null;
        dados.inssRetido = valsRet.length >= 3 ? valsRet[2] : null;
        dados.irrf = valsRet.length >= 4 ? valsRet[3] : null;
        dados.contribuicoesSociaisRetidas = valsRet.length >= 5 ? valsRet[4] : null;

        dados.valorLiquido = paraValor(
            t.match(/Valor\s+l[ií]quido\s*=\s*R\$\s*((?:\d{1,3}(?:\.\d{3})+|\d+),\d{2})/i)?.[1]
        );
        if (dados.valorServico === null || dados.valorServico === undefined) {
            dados.valorServico = paraValor(
                t.match(/Valor\s+bruto\s*=\s*R\$\s*((?:\d{1,3}(?:\.\d{3})+|\d+),\d{2})/i)?.[1]
            );
        }

        dados.codigoTributacaoNacional =
            (depoisCodigos.match(/^\s*(\d{4,8})\s*-/m)?.[1] || '').replace(/\D/g, '') || null;
        dados.codigoTributacaoMunicipal = null;

        const mLocal = t.match(/Local\s+de\s+Incid[eê]ncia\s+ISS\s*:\s*([^\n\r]+?)(?:\s*-\s*[A-Z]{2})?(?:\r?\n|$)/i);
        if (mLocal) {
            dados.localPrestacaoServico = compactar(mLocal[1]).replace(/\s*-\s*[A-Z]{2}\s*$/, '');
        } else {
            // fallback: município do tomador, útil neste layout quando o ISS é por substituição.
            dados.localPrestacaoServico =
                (tomador.match(/Munic[ií]pio\s*:\s*([^\n\r]+?)(?:\s+UF\s*:|$)/i)?.[1] || '').trim();
        }

        const situacaoIss = t.match(/Situa[çc][ãa]o\s+Tribut[aá]ria\s+do\s+ISSQN\s*:\s*([^\n\r]+)/i)?.[1] || '';
        const ehRetido = /SUBSTITUI|RETID/i.test(situacaoIss) && !/N[AÃ]O\s+RETID/i.test(situacaoIss);
        dados.issqnRetido = ehRetido ? (dados.valorIssqn ?? null) : 0;

        dados.material = null;
        dados.baseCalculoInss = null;
        dados.informacoesComplementares = '';
        dados.observacoes = dados.descricaoServico;
        dados.numeroContrato = extrairNumeroContratoDoTexto(dados.observacoes);
        dados.contaBancariaNota = extrairContaBancariaDoTexto(dados.observacoes);
        dados.somaIrrfContribSociais = somarRetencoesFederais(
            dados.irrf, dados.contribuicoesSociaisRetidas, dados.pisRetido, dados.cofinsRetido
        );
        dados.retFedComPisCofins = somarRetencoesFederaisComPisCofins(dados.irrf, dados.contribuicoesSociaisRetidas, dados.pisRetido, dados.cofinsRetido);

        return dados;
    }

    // Parser do layout Prefeitura de Cuiabá / ISSNET (ex.: APPA). Regexes tolerantes a
    // ruído de OCR ("Servi¢os", "Geragao", "Emissdo", "CPFICNP"...). Validado contra a
    // nota fiscal real 2987 (APPA, 16/06/2026): todos os campos extraídos corretamente.
    function parsearTextoPDFCuiaba(texto) {
        const dados = { textoCompleto: texto, layoutPDF: 'cuiaba' };
        const rx = (re) => { const m = texto.match(re); return m ? m[1].trim() : ''; };
        const ehValor = (v) => v !== null && v !== undefined && v !== '';
        const arred2 = (v) => ehValor(v) ? Math.round(Number(v) * 100) / 100 : null;
        const valorValido = (v) => ehValor(v) && Number(v) > 0;
        const aliquotaValida = (v) => ehValor(v) && Number(v) > 0 && Number(v) <= 10;
        const valorDepoisDe = (padrao, janela = 220) => {
            const m = texto.match(padrao);
            if (!m) return null;
            const trecho = texto.slice(m.index, m.index + janela);
            const mv = trecho.match(/R\$?\s*([\d.\s]*\d,\d{2})|R\$\s*([\d.\s]*\d,\d{2})/i)
                || trecho.match(/([\d.\s]*\d,\d{2})/i);
            return mv ? paraNumeroBR((mv[1] || mv[2] || mv[0]).replace(/R\$?/i, '').replace(/\s/g, '')) : null;
        };
        const valorPorTexto = (...regexes) => {
            for (const re of regexes) {
                const m = texto.match(re);
                if (m?.[1]) return paraNumeroBR(m[1].replace(/\s/g, ''));
            }
            return null;
        };
        const normalizarContrato = (c) => (c || '')
            .toUpperCase()
            .replace(/^(\d{2})S[8B]R(\d{3})$/, '$1SR$2')
            .replace(/^(\d{2})[8B]R(\d{3})$/, '$1SR$2')
            .replace(/^(\d{2})SRO(\d{2})$/, '$1SR0$2')
            .replace(/[^0-9A-Z/.-]/g, '');

        dados.numero = rx(/N[úu]mero\s+da\s+Nota\s+Fiscal[\s\S]{0,30}?(\d{1,10})/i) || null;
        dados.dataEmissao = rx(/Data\s+de\s+Emiss\S{0,3}\s+do\s+RPS[\s\S]{0,80}?(\d{2}\/\d{2}\/\d{4})/i)
            || rx(/Data\s+de\s+Gera\S{0,3}o\s+da\s+NFS-?\s*e[\s\S]{0,40}?(\d{2}\/\d{2}\/\d{4})/i) || null;

        const mPrest = texto.match(/CPF\s*[\/l1I|]?\s*C?[GC]NP[AJ]?\s*:?\s*([\d.,\/-]{14,22})/i);
        dados.cnpj = mPrest ? mPrest[1].replace(/\D/g, '') : '';

        const mToma = texto.match(/Dados\s+do\s+Tomador[\s\S]{0,180}?CNPJ\s*[\/l1I|]?\s*CPF\s*:?\s*([\d.,\/-]{14,22})/i);
        dados.tomadorCnpj = mToma ? mToma[1].replace(/\D/g, '') : null;
        dados.tomadorNome = rx(/Raz[aã]o\s+Social\s*:?\s*([A-ZÀ-Ú0-9 .,-]{5,80})/i) || null;

        const linhaLocal = texto.match(/Local\s+dos\s+Servi[çc¢g]os[^\n]*\n([^\n]+)/i);
        dados.localPrestacaoServico = linhaLocal ? dedupeMetade(linhaLocal[1]) : '';

        // Layout Cuiabá/ISSNET: a linha da atividade traz o código municipal/CNAE; a tabela ao lado traz alíquota e item da LC 116.
        dados.codigoTributacaoMunicipal = rx(/Atividade\s+do\s+Munic[íi]pio[\s\S]{0,160}?\n\s*(\d{5,9})\b/i)
            || rx(/\b(7820\s*500|7820500)\b/i).replace(/\D/g, '') || null;

        const mAliq1 = texto.match(/Al[íi]quota[\s\S]{0,120}?LC\s*116\/?2003[\s\S]{0,120}?(\d{1,2},\d{2})\s*[|lI]?\s*(\d{3,5})\b/i);
        const mAliq2 = texto.match(/LC\s*116\/?2003[\s\S]{0,180}?(\d{1,2},\d{2})\s*[|lI]?\s*(\d{3,5})\b/i);
        const mAliq = mAliq1 || mAliq2;
        if (mAliq) {
            dados.aliquotaIssqn = paraNumeroBR(mAliq[1]);
            dados.codigoTributacaoNacional = String(mAliq[2] || '').replace(/\D/g, '');
        } else {
            dados.aliquotaIssqn = paraNumeroBR(rx(/\b(\d{1,2},\d{2})\s+1705\b/i));
            dados.codigoTributacaoNacional = /\b1705\b/.test(texto) ? '1705' : null;
        }
        if (!aliquotaValida(dados.aliquotaIssqn)) dados.aliquotaIssqn = null;
        if (!/^\d{3,5}$/.test(String(dados.codigoTributacaoNacional || '')) || ['20500', '7820500'].includes(String(dados.codigoTributacaoNacional))) {
            dados.codigoTributacaoNacional = /\b1705\b/.test(texto) ? '1705' : '';
        }
        if (!dados.codigoTributacaoMunicipal && /7820\s*500|7820500/.test(texto)) dados.codigoTributacaoMunicipal = '7820500';

        const l1 = extrairTokensAposAncora(texto, /Total\s+dos\s+Servi[\s\S]{0,180}?Desconto\s+Condicionado/i, 7)
            || extrairTokensAposAncora(texto, /Vl\.?\s*Total\s+dos\s+Servi[\s\S]{0,220}?Base\s+de\s+C[aá]lculo/i, 5);
        if (l1) {
            dados.valorServico = l1[0] ?? null;
            dados.baseCalculoIssqn = l1[3] ?? null;
        }
        if (!valorValido(dados.valorServico)) {
            dados.valorServico = valorPorTexto(/FATURAMENTO[\s\S]{0,80}?R?\$?\s*([\d.]+,\d{2})/i,
                /MES\s+DE[\s\S]{0,80}?=\s*R\$\s*([\d.]+,\d{2})/i,
                /BASE\s+DE\s+CALCULO\s+INSS\s*([\d.]+,\d{2})/i);
        }
        if (!valorValido(dados.baseCalculoIssqn)) dados.baseCalculoIssqn = dados.valorServico ?? null;

        const l2 = extrairTokensAposAncora(texto, /\bPIS\b[\s\S]{0,240}?(?:L[ií]quido|Nota\s*Fiscal|Fiscal)/i, 8)
            || extrairTokensAposAncora(texto, /\bPIS\b[\s\S]{0,120}?COFINS[\s\S]{0,120}?INSS[\s\S]{0,120}?IRRF[\s\S]{0,120}?CSLL/i, 8);
        if (l2 && l2.length >= 5) {
            dados.pisRetido = l2[0] ?? null;
            dados.cofinsRetido = l2[1] ?? null;
            dados.inssRetido = l2[2] ?? null;
            dados.irrf = l2[3] ?? null;
            dados.contribuicoesSociaisRetidas = l2[4] ?? null;
            dados.issqnRetido = l2[6] ?? null;
            dados.valorLiquido = l2[7] ?? null;
        }

        // Fallbacks para quando o OCR lê bem o texto, mas desmonta a tabela.
        dados.pisRetido = valorValido(dados.pisRetido) ? dados.pisRetido : valorDepoisDe(/\bPIS\b/i);
        dados.cofinsRetido = valorValido(dados.cofinsRetido) ? dados.cofinsRetido : valorDepoisDe(/\bCOFINS\b/i);
        dados.inssRetido = valorValido(dados.inssRetido) ? dados.inssRetido : (valorDepoisDe(/\bINSS\b/i) || valorPorTexto(/BASE\s+DE\s+CALCULO\s+INSS[\s\S]{0,80}?INSS\s*R?\$?\s*([\d.]+,\d{2})/i));
        dados.irrf = valorValido(dados.irrf) ? dados.irrf : valorDepoisDe(/\bIRRF\b/i);
        dados.contribuicoesSociaisRetidas = valorValido(dados.contribuicoesSociaisRetidas) ? dados.contribuicoesSociaisRetidas : valorDepoisDe(/\bCSLL\b/i);
        dados.issqnRetido = valorValido(dados.issqnRetido) ? dados.issqnRetido : valorPorTexto(/(?:Vl\.?|Valor)\s*ISSQN\s*Retido\s*R?\$?\s*([\d.]+,\d{2})/i, /ISSQN\s*Retido[\s\S]{0,80}?R\$\s*([\d.]+,\d{2})/i);
        dados.valorLiquido = valorValido(dados.valorLiquido) ? dados.valorLiquido : valorPorTexto(/VR\s+L[IÍ]QUIDO\s*R?\$?\.?\s*([\d.]+,\d{2})/i, /V[LI]\.?\s*L[ií]quido\s+da\s+Nota\s+Fiscal\s*R?\$?\s*([\d.]+,\d{2})/i, /Valor\s+L[ií]quido\s*R?\$?\s*([\d.]+,\d{2})/i);

        // Fallback matemático específico para notas APPA/Cuiabá 7820500 quando a tabela federal falha no OCR.
        const pareceAppaCuiaba = /APPA\s+SERVICOS|APPA\s+SERVI[ÇC]OS/i.test(texto) || dados.cnpj === '05969071000110';
        if (pareceAppaCuiaba && valorValido(dados.valorServico)) {
            if (!valorValido(dados.pisRetido)) dados.pisRetido = arred2(dados.valorServico * 0.0065);
            if (!valorValido(dados.cofinsRetido)) dados.cofinsRetido = arred2(dados.valorServico * 0.03);
            if (!valorValido(dados.irrf)) dados.irrf = arred2(dados.valorServico * 0.048);
            if (!valorValido(dados.contribuicoesSociaisRetidas)) dados.contribuicoesSociaisRetidas = arred2(dados.valorServico * 0.01);
        }
        if (!valorValido(dados.issqnRetido) && valorValido(dados.baseCalculoIssqn) && aliquotaValida(dados.aliquotaIssqn)) {
            dados.issqnRetido = arred2(dados.baseCalculoIssqn * dados.aliquotaIssqn / 100);
        }
        // Fallback INVERSO da alíquota (novo na 1.3.4): quando o OCR desmonta o "3,00" da
        // tabela de tributos mas leu bem o ISSQN retido e a base, deriva a alíquota pela
        // matemática (retido ÷ base × 100). Ex.: NF 2987 — 120,51 ÷ 4.017,09 = 3,00%.
        if (!aliquotaValida(dados.aliquotaIssqn) && valorValido(dados.issqnRetido) && valorValido(dados.baseCalculoIssqn)) {
            const aliqCalc = arred2(dados.issqnRetido / dados.baseCalculoIssqn * 100);
            if (aliquotaValida(aliqCalc)) {
                dados.aliquotaIssqn = aliqCalc;
                console.log(`[SIGEO-Terceirizados] Alíquota ISSQN não lida no OCR — derivada por ISSQN retido ÷ BC: ${String(aliqCalc).replace('.', ',')}%.`);
            }
        }

        // BC INSS: no layout Cuiabá/APPA vem no texto da descrição ("BASE DE CALCULO INSS 9.999,99").
        dados.baseCalculoInss = valorPorTexto(/BASE\s+DE\s+CALCULO\s+INSS\s*R?\$?\.?\s*([\d.\s]*\d,\d{2})/i);
        if (!valorValido(dados.valorLiquido) && valorValido(dados.valorServico)) {
            const descontos = [dados.inssRetido, dados.issqnRetido, dados.pisRetido, dados.cofinsRetido, dados.irrf, dados.contribuicoesSociaisRetidas];
            if (descontos.some(valorValido)) dados.valorLiquido = arred2(dados.valorServico - descontos.reduce((a, b) => a + (b || 0), 0));
        }

        const mDesc = texto.match(/Descri[çc¢g][aã]o\s+dos\s+Servi[çc¢g]os\s*\n([\s\S]+?)\n\s*Detalhamento\s+dos\s+Tributos/i);
        dados.descricaoServico = mDesc ? mDesc[1].trim() : '';
        dados.informacoesComplementares = '';
        dados.observacoes = dados.descricaoServico.replace(/\s+/g, ' ').trim();
        dados.somaIrrfContribSociais = somarRetencoesFederais(dados.irrf, dados.contribuicoesSociaisRetidas, dados.pisRetido, dados.cofinsRetido);
        dados.retFedComPisCofins = somarRetencoesFederaisComPisCofins(dados.irrf, dados.contribuicoesSociaisRetidas, dados.pisRetido, dados.cofinsRetido);

        const contratoTexto = extrairNumeroContratoDoTexto(dados.observacoes)
            || (dados.observacoes.match(/\bCT\s*:?\s*(22(?:SR|S[8B]R|[8B]R)\d{3})\b/i)?.[1] ?? '');
        dados.numeroContrato = normalizarContrato(contratoTexto);
        dados.material = null;

        return dados;
    }

    // Campos-chave para medir se o parser de PDF realmente extraiu algo útil
    // (0 extraído = layout desconhecido -> falha graciosa, conferência manual).
    const CAMPOS_CHAVE_PDF = ['numero', 'valorServico', 'valorLiquido', 'baseCalculoIssqn', 'inssRetido', 'irrf', 'cnpj'];
    function contarCamposExtraidos(dados) {
        return CAMPOS_CHAVE_PDF.filter(c => dados[c] !== null && dados[c] !== undefined && dados[c] !== '').length;
    }

    // Reconstrói as linhas e as quatro colunas do DANFSe nacional usando as coordenadas
    // fornecidas pelo pdf.js. A v1.3.9 usava apenas `items.map(...).join(' ')`, perdendo
    // completamente a relação rótulo×valor das tabelas. Isso fazia as NFS da Nevada serem
    // lidas só parcialmente quando o XML foi corretamente bloqueado para o tipo NFS.
    function construirEstruturaEspacialPDF(itens, larguraPagina, pagina = 1) {
        const largura = Number(larguraPagina) || 595;
        const itensValidos = (itens || [])
            .map((item, ordem) => ({
                texto: String(item?.str || '').replace(/\s+/g, ' ').trim(),
                x: Number(item?.transform?.[4] || 0),
                y: Number(item?.transform?.[5] || 0),
                largura: Number(item?.width || 0),
                ordem,
            }))
            .filter(item => item.texto);

        itensValidos.sort((a, b) => (b.y - a.y) || (a.x - b.x) || (a.ordem - b.ordem));

        const linhas = [];
        const toleranciaY = 2.5;
        for (const item of itensValidos) {
            let linha = linhas[linhas.length - 1];
            if (!linha || Math.abs(linha.y - item.y) > toleranciaY) {
                linha = { pagina, y: item.y, itens: [] };
                linhas.push(linha);
            }
            linha.itens.push(item);
            // Média progressiva reduz o efeito de pequenas diferenças de baseline.
            linha.y = linha.itens.reduce((s, i) => s + i.y, 0) / linha.itens.length;
        }

        return linhas.map(linha => {
            linha.itens.sort((a, b) => (a.x - b.x) || (a.ordem - b.ordem));
            const colunas = [[], [], [], []];
            for (const item of linha.itens) {
                const proporcaoX = item.x / largura;
                // Os quatro blocos do DANFSe começam aproximadamente em 2%, 26%, 50% e 74%
                // da largura. Os limites abaixo são os pontos médios entre esses inícios; usar
                // 25/50/75% cortava rótulos como "ISSQN Apurado" e "Valor Líquido" ao meio.
                const coluna = proporcaoX < 0.145 ? 0 : proporcaoX < 0.385 ? 1 : proporcaoX < 0.625 ? 2 : 3;
                colunas[coluna].push(item.texto);
            }
            return {
                pagina,
                y: linha.y,
                itens: linha.itens,
                colunas: colunas.map(c => c.join(' ').replace(/\s+/g, ' ').trim()),
                texto: linha.itens.map(i => i.texto).join(' ').replace(/\s+/g, ' ').trim(),
            };
        });
    }

    // [v1.4.3] O pdf.js quebra "NFS-e" em DOIS itens de texto ("NFS-" e "e"), e a junção da
    // linha insere um espaço no meio: "VALOR TOTAL DA NFS- E", "Valor Líquido da NFS- e".
    // Sem colar o hífen ao que vem depois, as âncoras 'EMITENTE DA NFS-e' e
    // 'VALOR TOTAL DA NFS-E' voltavam -1 e o Valor Líquido saía SEMPRE vazio nos DANFSe
    // nacionais (confirmado nas notas 4234/4235 da Nevada). Como a função normaliza os dois
    // lados da comparação, colar o hífen não muda nenhum outro casamento de rótulo.
    function normalizarBuscaPDF(valor) {
        return String(valor || '')
            .normalize('NFD')
            .replace(/[\u0300-\u036f]/g, '')
            .toUpperCase()
            .replace(/\s+/g, ' ')
            .replace(/-\s+/g, '-')
            .trim();
    }

    function localizarLinhaPDF(estrutura, rotulo, { coluna = null, inicio = 0, fim = null } = {}) {
        const alvo = normalizarBuscaPDF(rotulo);
        const limite = fim === null || fim === undefined ? estrutura.length : Math.min(fim, estrutura.length);
        for (let i = Math.max(0, inicio); i < limite; i++) {
            const campos = coluna === null ? [estrutura[i]?.texto || ''] : [estrutura[i]?.colunas?.[coluna] || ''];
            if (campos.some(c => normalizarBuscaPDF(c).includes(alvo))) return i;
        }
        return -1;
    }

    function localizarInicioSecaoPDF(estrutura, rotulo, inicio = 0) {
        const alvo = normalizarBuscaPDF(rotulo);
        for (let i = Math.max(0, inicio); i < estrutura.length; i++) {
            if (normalizarBuscaPDF(estrutura[i]?.texto).startsWith(alvo)) return i;
        }
        return -1;
    }

    function valorAbaixoDoRotuloPDF(estrutura, rotulo, {
        coluna = null, colunaRotulo = undefined, inicio = 0, fim = null, maxLinhas = 3, aceitar = null,
    } = {}) {
        const colunaBusca = colunaRotulo === undefined ? coluna : colunaRotulo;
        const indice = localizarLinhaPDF(estrutura, rotulo, { coluna: colunaBusca, inicio, fim });
        if (indice < 0) return '';

        let colunaAlvo = coluna;
        if (colunaAlvo === null) {
            const alvo = normalizarBuscaPDF(rotulo);
            colunaAlvo = (estrutura[indice]?.colunas || []).findIndex(c => normalizarBuscaPDF(c).includes(alvo));
            if (colunaAlvo < 0) colunaAlvo = 0;
        }

        const limiteGeral = fim === null || fim === undefined ? estrutura.length : Math.min(fim, estrutura.length);
        const limite = Math.min(limiteGeral, indice + 1 + maxLinhas);
        for (let i = indice + 1; i < limite; i++) {
            const valor = String(estrutura[i]?.colunas?.[colunaAlvo] || '').trim();
            if (!valor) continue;
            if (!aceitar || aceitar.test(valor)) return valor;
        }
        return '';
    }


    // [v1.4.2] Busca o valor abaixo de um rótulo pela coordenada X do próprio texto.
    // É mais robusto que depender apenas das quatro colunas artificiais: no cabeçalho do
    // DANFSe, "Data e Hora da emissão da NFS-e" pode ser dividido pelo pdf.js em dois itens
    // ("Data e Hora da emissão" + "da NFS-e"), embora o valor esteja corretamente logo abaixo.
    function valorAbaixoDoRotuloPorCoordenadaPDF(estrutura, rotulos, {
        inicio = 0, fim = null, maxLinhas = 3, aceitar = null, distanciaMaxima = 125,
    } = {}) {
        const alvos = (Array.isArray(rotulos) ? rotulos : [rotulos])
            .map(normalizarBuscaPDF)
            .filter(Boolean);
        const limite = fim === null || fim === undefined ? estrutura.length : Math.min(fim, estrutura.length);

        for (let i = Math.max(0, inicio); i < limite; i++) {
            const itensRotulo = Array.from(estrutura[i]?.itens || []);
            const itemRotulo = itensRotulo.find(item => {
                const textoItem = normalizarBuscaPDF(item?.texto);
                return alvos.some(alvo => textoItem.includes(alvo) || alvo.includes(textoItem));
            });
            if (!itemRotulo) continue;

            const limiteValores = Math.min(limite, i + 1 + maxLinhas);
            for (let j = i + 1; j < limiteValores; j++) {
                const candidatos = Array.from(estrutura[j]?.itens || [])
                    .map(item => ({
                        texto: String(item?.texto || '').trim(),
                        distancia: Math.abs(Number(item?.x || 0) - Number(itemRotulo?.x || 0)),
                    }))
                    .filter(item => item.texto && (!aceitar || aceitar.test(item.texto)))
                    .sort((a, b) => a.distancia - b.distancia);

                if (candidatos[0] && candidatos[0].distancia <= distanciaMaxima) {
                    return candidatos[0].texto;
                }
            }
        }
        return '';
    }

    // Fallback independente das coordenadas: como textoCompleto preserva uma linha por faixa
    // horizontal do PDF, lê os valores da linha imediatamente posterior ao rótulo. No cabeçalho
    // da Nevada, essa linha é: "4219 17/07/2026 17/07/2026 10:07:48".
    function valorNaLinhaSeguintePDF(texto, rotulo, regex, { maxLinhas = 1, ultimo = false } = {}) {
        const linhas = String(texto || '').split(/\r?\n/);
        const alvo = normalizarBuscaPDF(rotulo);
        const indice = linhas.findIndex(linha => normalizarBuscaPDF(linha).includes(alvo));
        if (indice < 0) return '';

        for (let i = indice + 1; i <= Math.min(indice + maxLinhas, linhas.length - 1); i++) {
            const flags = regex.flags.includes('g') ? regex.flags : regex.flags + 'g';
            const re = new RegExp(regex.source, flags);
            const encontrados = Array.from(linhas[i].matchAll(re))
                .map(m => String(m[1] ?? m[0] ?? '').trim())
                .filter(Boolean);
            if (encontrados.length) return ultimo ? encontrados[encontrados.length - 1] : encontrados[0];
        }
        return '';
    }

    function coletarAposRotuloPDF(estrutura, rotulo, {
        coluna = null, inicio = 0, fim = null, maxLinhas = 20,
    } = {}) {
        const indice = localizarLinhaPDF(estrutura, rotulo, { coluna, inicio, fim });
        if (indice < 0) return '';
        const limiteGeral = fim === null || fim === undefined ? estrutura.length : Math.min(fim, estrutura.length);
        const limite = Math.min(limiteGeral, indice + 1 + maxLinhas);
        const partes = [];
        for (let i = indice + 1; i < limite; i++) {
            const valor = coluna === null
                ? String(estrutura[i]?.texto || '').trim()
                : String(estrutura[i]?.colunas?.[coluna] || '').trim();
            if (valor) partes.push(valor);
        }
        return partes.join(' ').replace(/\s+/g, ' ').trim();
    }

    // Parsing do texto extraído do PDF (pdf.js) — usado quando o XML não está disponível.
    // Na v1.4.0, documentos DANFSe com camada de texto usam primeiro a estrutura espacial;
    // os regexes históricos continuam como fallback para OCR e outros layouts.
    function parsearTextoPDF(texto, estrutura = []) {
        const dados = { textoCompleto: texto };
        const rx = (padrao) => extrairTextoPorRegex(texto, padrao);
        const rxValor = (rotulo) => paraNumeroBR(rx(new RegExp(rotulo + String.raw`[:\s]*R?\$?\s*(\d{1,3}(?:[\.\s]\d{3})*[.,]\d{2})`, 'i')));
        const valorBR = (v) => {
            const m = String(v || '').match(/(?:R\$\s*)?((?:\d{1,3}(?:\.\d{3})+|\d+),\d{2})/);
            return m ? paraNumeroBR(m[1]) : null;
        };
        const limparCodigo = (v) => {
            const s = String(v || '').trim();
            if (!s || /^[-–—]$/.test(s)) return null;
            const m = s.match(/\b\d[\d.\-]*\b/);
            return m ? m[0].replace(/\D/g, '') : null;
        };
        const primeiroValor = (...valores) => valores.find(v => v !== null && v !== undefined && v !== '') ?? null;
        const primeiraString = (...valores) => valores.find(v => String(v || '').trim()) || '';

        const iEmitente = localizarInicioSecaoPDF(estrutura, 'EMITENTE DA NFS-e');
        const iTomador = localizarInicioSecaoPDF(estrutura, 'TOMADOR DO SERVIÇO');
        const iServico = localizarInicioSecaoPDF(estrutura, 'SERVIÇO PRESTADO');
        const iTribMun = localizarInicioSecaoPDF(estrutura, 'TRIBUTAÇÃO MUNICIPAL');
        const iTribFed = localizarInicioSecaoPDF(estrutura, 'TRIBUTAÇÃO FEDERAL');
        const iValorTotal = localizarInicioSecaoPDF(estrutura, 'VALOR TOTAL DA NFS-E');
        const iInfo = localizarInicioSecaoPDF(estrutura, 'INFORMAÇÕES COMPLEMENTARES');

        if (estrutura.length) {
            // [v1.4.2] Número e data são dados da própria nota e devem ser comparados com o
            // SIGEO. Primeiro usa a posição X do rótulo/valor; mantém as estratégias anteriores
            // apenas como fallback para variações de prefeitura/pdf.js.
            const numeroCabecalho = valorAbaixoDoRotuloPorCoordenadaPDF(
                estrutura,
                ['Número da NFS-e', 'Número da Nota Fiscal'],
                { inicio: 0, fim: iEmitente > 0 ? iEmitente : null, aceitar: /^\d{1,15}$/ }
            ) || valorAbaixoDoRotuloPDF(estrutura, 'Número da NFS-e', {
                coluna: 0, inicio: 0, fim: iEmitente > 0 ? iEmitente : null, aceitar: /\d/,
            }) || valorNaLinhaSeguintePDF(texto, 'Número da NFS-e', /\b(\d{1,15})\b/);
            dados.numero = (String(numeroCabecalho).match(/\d+/) || [])[0] || '';

            const dataHora = valorAbaixoDoRotuloPorCoordenadaPDF(
                estrutura,
                ['Data e Hora da emissão da NFS-e', 'Data e Hora da emissão', 'Data de Emissão'],
                { inicio: 0, fim: iEmitente > 0 ? iEmitente : null, aceitar: /\d{2}\/\d{2}\/\d{4}/ }
            ) || valorAbaixoDoRotuloPDF(estrutura, 'Data e Hora da emissão', {
                coluna: 2, inicio: 0, fim: iEmitente > 0 ? iEmitente : null, aceitar: /\d{2}\/\d{2}\/\d{4}/,
            }) || valorNaLinhaSeguintePDF(
                texto,
                'Data e Hora da emissão da NFS-e',
                /\b(\d{2}\/\d{2}\/\d{4})(?:\s+\d{2}:\d{2}(?::\d{2})?)?\b/,
                { ultimo: true }
            );
            dados.dataEmissao = (String(dataHora).match(/\d{2}\/\d{2}\/\d{4}/) || [])[0] || null;

            const cnpjPrestador = valorAbaixoDoRotuloPDF(estrutura, 'CNPJ / CPF / NIF', {
                coluna: 1,
                inicio: iEmitente >= 0 ? iEmitente : 0,
                fim: iTomador > 0 ? iTomador : null,
                maxLinhas: 4,
                aceitar: /\d{2}\.?\d{3}\.?\d{3}/,
            });
            dados.cnpj = cnpjPrestador.replace(/\D/g, '');

            // v1.9.9: município do emitente (ex.: "Belo Horizonte - MG"), só dentro do bloco EMITENTE
            const iMunEmit = iEmitente >= 0 ? localizarLinhaPDF(estrutura, 'Município', { inicio: iEmitente, fim: iTomador > 0 ? iTomador : null }) : -1;
            if (iMunEmit >= 0) {
                const munEmit = valorAbaixoDoRotuloPorCoordenadaPDF(estrutura, ['Município'], {
                    inicio: iMunEmit, fim: iTomador > 0 ? iTomador : null, maxLinhas: 2, aceitar: /[A-Za-zÀ-ú]{3,}/,
                });
                const mMun = String(munEmit || '').match(/^\s*(.+?)\s*[-–\/]\s*([A-Z]{2})\s*$/);
                dados.municipioPrestador = mMun ? mMun[1] : String(munEmit || '').trim();
                if (mMun) dados.ufPrestador = mMun[2];
            }

            const cnpjTomador = valorAbaixoDoRotuloPDF(estrutura, 'CNPJ / CPF / NIF', {
                coluna: 1,
                inicio: iTomador >= 0 ? iTomador : 0,
                fim: iServico > 0 ? iServico : null,
                maxLinhas: 4,
                aceitar: /\d{2}\.?\d{3}\.?\d{3}/,
            });
            dados.tomadorCnpj = cnpjTomador.replace(/\D/g, '') || null;
            const iNomeTomador = localizarLinhaPDF(estrutura, 'Nome / Nome Empresarial', {
                coluna: 0,
                inicio: iTomador >= 0 ? iTomador : 0,
                fim: iServico > 0 ? iServico : null,
            });
            dados.tomadorNome = iNomeTomador >= 0
                ? String(estrutura[iNomeTomador + 1]?.texto || '').replace(/\s+-\s*$/, '').trim() || null
                : null;

            dados.localPrestacaoServico = valorAbaixoDoRotuloPDF(estrutura, 'Local da Prestação', {
                coluna: 2,
                inicio: iServico >= 0 ? iServico : 0,
                fim: iTribMun > 0 ? iTribMun : null,
                maxLinhas: 4,
            }).replace(/^[-–—]\s*$/, '');

            dados.codigoTributacaoNacional = limparCodigo(valorAbaixoDoRotuloPDF(estrutura, 'Código de Tributação Nacional', {
                coluna: 0,
                inicio: iServico >= 0 ? iServico : 0,
                fim: iTribMun > 0 ? iTribMun : null,
                maxLinhas: 3,
            }));
            dados.codigoTributacaoMunicipal = limparCodigo(valorAbaixoDoRotuloPDF(estrutura, 'Código de Tributação Municipal', {
                coluna: 1,
                inicio: iServico >= 0 ? iServico : 0,
                fim: iTribMun > 0 ? iTribMun : null,
                maxLinhas: 3,
            }));

            dados.descricaoServico = coletarAposRotuloPDF(estrutura, 'Descrição do Serviço', {
                coluna: null,
                inicio: iServico >= 0 ? iServico : 0,
                fim: iTribMun > 0 ? iTribMun : null,
                maxLinhas: 8,
            });

            dados.valorServico = valorBR(valorAbaixoDoRotuloPDF(estrutura, 'Valor do Serviço', {
                coluna: 0,
                inicio: iTribMun >= 0 ? iTribMun : 0,
                fim: iTribFed > 0 ? iTribFed : null,
                maxLinhas: 3,
            }));
            dados.baseCalculoIssqn = valorBR(
                valorAbaixoDoRotuloPDF(estrutura, 'BC ISSQN', {
                    coluna: 0,
                    inicio: iTribMun >= 0 ? iTribMun : 0,
                    fim: iTribFed > 0 ? iTribFed : null,
                    maxLinhas: 3,
                }) || valorAbaixoDoRotuloPDF(estrutura, 'BC INSS', {
                    coluna: 0,
                    inicio: iTribMun >= 0 ? iTribMun : 0,
                    fim: iTribFed > 0 ? iTribFed : null,
                    maxLinhas: 3,
                })
            );
            dados.aliquotaIssqn = paraNumeroBR((valorAbaixoDoRotuloPDF(estrutura, 'Alíquota Aplicada', {
                coluna: 1,
                inicio: iTribMun >= 0 ? iTribMun : 0,
                fim: iTribFed > 0 ? iTribFed : null,
                maxLinhas: 3,
                aceitar: /\d+[.,]\d+\s*%?/,
            }).match(/\d+[.,]\d+/) || [])[0]);

            const situacaoRetencao = valorAbaixoDoRotuloPDF(estrutura, 'Retenção do ISSQN', {
                coluna: 2,
                inicio: iTribMun >= 0 ? iTribMun : 0,
                fim: iTribFed > 0 ? iTribFed : null,
                maxLinhas: 3,
            });
            const issApurado = valorBR(valorAbaixoDoRotuloPDF(estrutura, 'ISSQN Apurado', {
                coluna: 3,
                inicio: iTribMun >= 0 ? iTribMun : 0,
                fim: iTribFed > 0 ? iTribFed : null,
                maxLinhas: 3,
            }));
            // [v1.4.3] O campo "Retenção do ISSQN" do DANFSe traz "Não Retido" ou
            // "Retido pelo Tomador"/"Retido pelo Intermediário". O teste anterior era só
            // /RETID/, que dá true também em "NAO RETIDO" — ou seja, toda nota com ISS NÃO
            // retido recebia o ISSQN apurado na coluna de retido. Testa a negativa primeiro.
            const retencaoNormalizada = normalizarBuscaPDF(situacaoRetencao);
            const issNaoRetido = /\bNAO\s*RETID/.test(retencaoNormalizada);
            dados.issqnRetido = (!issNaoRetido && /RETID/.test(retencaoNormalizada)) ? issApurado : 0;

            dados.irrf = valorBR(valorAbaixoDoRotuloPDF(estrutura, 'IRRF', {
                coluna: 0, inicio: iTribFed >= 0 ? iTribFed : 0, fim: iValorTotal > 0 ? iValorTotal : null, maxLinhas: 3,
            }));
            dados.inssRetido = valorBR(valorAbaixoDoRotuloPDF(estrutura, 'Contribuição Previdenciária - Retida', {
                coluna: 1, colunaRotulo: null, inicio: iTribFed >= 0 ? iTribFed : 0, fim: iValorTotal > 0 ? iValorTotal : null, maxLinhas: 3,
            }));
            dados.contribuicoesSociaisRetidas = valorBR(valorAbaixoDoRotuloPDF(estrutura, 'Contribuições Sociais - Retidas', {
                coluna: 2, colunaRotulo: null, inicio: iTribFed >= 0 ? iTribFed : 0, fim: iValorTotal > 0 ? iValorTotal : null, maxLinhas: 3,
            }));
            dados.pisRetido = valorBR(valorAbaixoDoRotuloPDF(estrutura, 'PIS - Débito Apuração Própria', {
                coluna: 0, colunaRotulo: null, inicio: iTribFed >= 0 ? iTribFed : 0, fim: iValorTotal > 0 ? iValorTotal : null, maxLinhas: 3,
            }));
            dados.cofinsRetido = valorBR(valorAbaixoDoRotuloPDF(estrutura, 'COFINS - Débito Apuração Própria', {
                coluna: 1, colunaRotulo: null, inicio: iTribFed >= 0 ? iTribFed : 0, fim: iValorTotal > 0 ? iValorTotal : null, maxLinhas: 3,
            }));
            dados.valorLiquido = valorBR(valorAbaixoDoRotuloPDF(estrutura, 'Valor Líquido da NFS-e', {
                coluna: 3,
                inicio: iValorTotal >= 0 ? iValorTotal : 0,
                fim: iInfo > 0 ? iInfo : null,
                maxLinhas: 4,
            }));

            if (iInfo >= 0) {
                dados.informacoesComplementares = estrutura
                    .slice(iInfo + 1)
                    .map(l => l.texto)
                    .filter(Boolean)
                    .join(' ')
                    .replace(/\s+/g, ' ')
                    .trim();
            }
        }

        // -------- Fallbacks históricos para OCR/outros PDFs --------
        dados.numero = primeiraString(dados.numero, rx(/N[úu]mero\s+da\s+NFS-?\s*e[:\s]*(\d+)/i));
        dados.dataEmissao = primeiraString(dados.dataEmissao,
            rx(/Data\s*e\s*Hora\s*da\s*emiss[ãa]o\s*da\s*NFS-?\s*e[\s\S]{0,80}?(\d{2}\/\d{2}\/\d{4})/i)) || null;
        if (!dados.cnpj) {
            const mCnpj = texto.match(/CNPJ\s*\/?\s*CPF\s*\/?\s*NIF[\s:]*([\d.\/\-]{14,22})/i);
            dados.cnpj = mCnpj ? mCnpj[1].replace(/\D/g, '') : '';
        }

        dados.localPrestacaoServico = primeiraString(dados.localPrestacaoServico, (() => {
            const v = rx(/Local\s*d[ae]\s*Presta[çc][ãa]o[\s\S]{0,160}?(?:\n|\s{2,})([A-ZÀ-Ú][A-Za-zÀ-ú\s]+\s*-\s*[A-Z]{2})/i);
            return v && v.toLowerCase() !== 'null' ? v : '';
        })());

        dados.codigoTributacaoNacional = primeiraString(dados.codigoTributacaoNacional, (() => {
            const cod = rx(/C[oó]digo\s*(?:de\s*)?Tributa[çc][ãa]o\s*Nacional[\s\S]{0,180}?(\d{2}(?:\.\d{2}){1,2})/i);
            return cod ? cod.replace(/\D/g, '') : '';
        })()) || null;
        if (!estrutura.length) {
            dados.codigoTributacaoMunicipal = primeiraString(dados.codigoTributacaoMunicipal, (() => {
                const cod = rx(/C[oó]digo\s*(?:de\s*)?Tributa[çc][ãa]o\s*Municipal[\s\S]{0,100}?\b(\d{1,12})\b/i);
                return cod || '';
            })()) || null;
        }

        dados.baseCalculoIssqn = primeiroValor(dados.baseCalculoIssqn, rxValor(String.raw`BC\s*ISSQN`));
        dados.aliquotaIssqn = primeiroValor(dados.aliquotaIssqn,
            paraNumeroBR(rx(/Al[íi]quota\s*Aplicada\s*%?[\s\S]{0,40}?([\d.,]+)\s*%/i)));
        dados.issqnRetido = primeiroValor(dados.issqnRetido, rxValor(String.raw`ISSQN\s*Retido`));
        dados.valorLiquido = primeiroValor(dados.valorLiquido, rxValor(String.raw`Valor\s*L[ií]quido\s*d[ae]\s*NFS-?\s*e`));
        dados.valorServico = primeiroValor(dados.valorServico, rxValor(String.raw`Valor\s*d[oe]\s*Servi[çc]o`));
        dados.irrf = primeiroValor(dados.irrf, rxValor(String.raw`\bIRRF\b`));
        dados.contribuicoesSociaisRetidas = primeiroValor(dados.contribuicoesSociaisRetidas,
            rxValor(String.raw`Contribui[çc][õo]es\s*Sociais\s*-?\s*Retidas`));
        dados.inssRetido = primeiroValor(dados.inssRetido,
            rxValor(String.raw`Contribui[çc][ãa]o\s*Previdenci[áa]ria\s*-?\s*Retida`));
        dados.baseCalculoInss = primeiroValor(dados.baseCalculoInss,
            rxValor(String.raw`BC\s*(?:da\s*)?Contribui[çc][ãa]o\s*Previdenci[áa]ria`),
            rxValor(String.raw`BASE\s+DE\s+CALCULO\s+INSS`));
        dados.pisRetido = primeiroValor(dados.pisRetido, rxValor(String.raw`\bPIS\b`));
        dados.cofinsRetido = primeiroValor(dados.cofinsRetido, rxValor(String.raw`\bCOFINS\b`));

        dados.descricaoServico = primeiraString(dados.descricaoServico,
            rx(/Descri[çc][ãa]o\s*do\s*Servi[çc]o[\s\S]*?\n([\s\S]+?)(?:\n\s*TRIBUTA[ÇC][ÃA]O|\n\s*\n|$)/i));
        dados.informacoesComplementares = primeiraString(dados.informacoesComplementares,
            rx(/INFORMA[ÇC][ÕO]ES\s*COMPLEMENTARES[\s\S]*?\n([\s\S]+?)$/i));

        // As informações complementares da Nevada trazem contrato, local e material de modo
        // consistente. Estes fallbacks também ajudam quando o valor espacial estiver ausente.
        const infoNormalizada = String(dados.informacoesComplementares || '').replace(/\s+/g, ' ').trim();
        if (!dados.localPrestacaoServico && infoNormalizada) {
            const mLocal = infoNormalizada.match(/LOCAL\s+DE\s+(?:ATEND(?:IMENTO)?\.?|PRESTA[ÇC][ÃA]O(?:\s+DE\s+SERVI[ÇC]OS)?)\s*:?\s*(?:TRT\s*)?(.+?)(?=\s*-\s*MATERIAL|\s+MATERIAL\s+DE|$)/i);
            if (mLocal) dados.localPrestacaoServico = mLocal[1].replace(/\s+/g, ' ').trim();
        }

        const desc = (dados.descricaoServico || '').trim();
        const info = infoNormalizada;
        dados.observacoes = (desc && info && desc === info) ? desc : [desc, info].filter(Boolean).join(' | ');
        dados.numeroContrato = extrairNumeroContratoDoTexto(dados.observacoes);

        const mMaterial = dados.observacoes.match(/MATERIAL(?:\s+DE\s+LIMPEZA)?\s*:?\s*R?\$?\s*((?:\d{1,3}(?:\.\d{3})+|\d+),\d{2})/i)
            || dados.observacoes.match(/MATERIAL[\s\S]{0,80}?R\$\s*((?:\d{1,3}(?:\.\d{3})+|\d+),\d{2})/i);
        dados.material = mMaterial ? paraNumeroBR(mMaterial[1]) : null;

        dados.somaIrrfContribSociais = somarRetencoesFederais(
            dados.irrf, dados.contribuicoesSociaisRetidas, dados.pisRetido, dados.cofinsRetido
        );

        dados.retFedComPisCofins = somarRetencoesFederaisComPisCofins(dados.irrf, dados.contribuicoesSociaisRetidas, dados.pisRetido, dados.cofinsRetido);

        return dados;
    }

    async function extrairDadosPDF(blob, { permitirOCR = true } = {}) {
        try {
            if (typeof pdfjsLib === 'undefined') { console.error('[SIGEO-Terceirizados] pdf.js não carregado.'); return null; }
            const arrayBuffer = await blob.arrayBuffer();
            const pdf = await pdfjsLib.getDocument({ data: new Uint8Array(arrayBuffer) }).promise;

            let textoCompleto = '';
            let estruturaPDF = [];
            for (let p = 1; p <= pdf.numPages; p++) {
                const page = await pdf.getPage(p);
                const content = await page.getTextContent();
                const viewport = page.getViewport({ scale: 1 });
                const estruturaPagina = construirEstruturaEspacialPDF(content.items, viewport.width, p);
                estruturaPDF.push(...estruturaPagina);
                textoCompleto += estruturaPagina.map(l => l.texto).join('\n') + '\n';
            }

            // -------- PDF-imagem (sem camada de texto) -> OCR --------
            let extraidoViaOCR = false;
            if (textoCompleto.replace(/\s/g, '').length < 50) {
                console.warn('[SIGEO-Terceirizados] PDF sem camada de texto (imagem escaneada).');
                if (!permitirOCR) {
                    console.log('[SIGEO-Terceirizados] XML já disponível — OCR dispensado para esta nota.');
                    return { textoCompleto: '', semTexto: true, ocrDispensado: true, blob, camposExtraidos: 0 };
                }
                if (typeof Tesseract === 'undefined') {
                    console.error('[SIGEO-Terceirizados] Tesseract.js não carregado (CSP/@require?) — nota exige CONFERÊNCIA MANUAL.');
                    return { textoCompleto: '', semTexto: true, blob, camposExtraidos: 0 };
                }
                console.log(`[SIGEO-Terceirizados] OCR iniciado (${pdf.numPages} página(s))...`);
                textoCompleto = '';
                estruturaPDF = [];
                try {
                    for (let p = 1; p <= pdf.numPages; p++) {
                        const page = await pdf.getPage(p);
                        textoCompleto += await ocrPaginaPDF(page) + '\n';
                    }
                } catch (eOCR) {
                    console.error('[SIGEO-Terceirizados] OCR falhou (provável bloqueio de CSP ao baixar worker/idioma do Tesseract) — nota exige CONFERÊNCIA MANUAL.', eOCR);
                    return { textoCompleto: '', semTexto: true, blob, camposExtraidos: 0 };
                }
                extraidoViaOCR = true;
                console.log('[SIGEO-Terceirizados] OCR concluído.');
            }

            // -------- Parser conforme o layout detectado --------
            const layout = detectarLayoutPDF(textoCompleto);
            console.log(`[SIGEO-Terceirizados] Layout do PDF: ${layout}${extraidoViaOCR ? ' (via OCR)' : ''}.`);
            const dados = layout === 'cuiaba'
                ? parsearTextoPDFCuiaba(textoCompleto)
                : layout === 'atende-net'
                    ? parsearTextoPDFAtende(textoCompleto)
                    : parsearTextoPDF(textoCompleto, estruturaPDF);
            dados.localidadesUFNota = extrairLocalidadesUFNotaPDF(textoCompleto, estruturaPDF);
            // O local do DANFSe v2 pode estar na quarta coluna, sem alterar os
            // demais campos e cálculos já lidos pelos parsers de cada prefeitura.
            const localLido = dados.localidadesUFNota.prestacao;
            if (localLido) {
                const local = interpretarLocalidadeUFNota(localLido);
                if (local.municipio && (local.uf || local.ufCodigo)) dados.localPrestacaoServico = local.municipio;
            }
            dados.extraidoViaOCR = extraidoViaOCR;
            dados.layoutPDF = layout;
            dados.camposExtraidos = contarCamposExtraidos(dados);
            if (dados.camposExtraidos === 0) {
                console.warn('[SIGEO-Terceirizados] Nenhum campo-chave extraído do PDF — layout possivelmente desconhecido (outra prefeitura?). Nota exige CONFERÊNCIA MANUAL.');
            } else {
                console.log(`[SIGEO-Terceirizados] ${dados.camposExtraidos}/${CAMPOS_CHAVE_PDF.length} campos-chave extraídos do PDF.`);
            }
            dados.blob = blob;
            return dados;
        } catch (e) {
            console.error('[SIGEO-Terceirizados] Erro ao extrair PDF:', e);
            return null;
        }
    }

    async function capturarXMLNotaFiscal(idNotaFiscalServico, tokenBearer, numeroEsperado = null, jaRetentou = false) {
        const url = `https://api.sigeo.jt.jus.br/sidof-service/notasFiscaisServico/xml/${encodeURIComponent(idNotaFiscalServico)}/jt`;
        const enviado = BEARER_TOKEN || tokenBearer;
        return new Promise((resolve, reject) => {
            GM_xmlhttpRequest({
                method: 'GET', url,
                headers: { 'Authorization': 'Bearer ' + enviado, 'Accept': 'application/xml, text/xml, */*' },
                withCredentials: true,
                responseType: 'blob',
                onload: async (res) => {
                    try {
                        if ([401, 403].includes(res.status)) {
                            const novo = jaRetentou ? null : await aguardarNovoTokenSigeo(enviado);
                            if (novo) resolve(await capturarXMLNotaFiscal(idNotaFiscalServico, novo, numeroEsperado, true));
                            else reject(erroSessaoSigeo(res.status));
                            return;
                        }
                        if (res.status !== 200) {
                            console.warn(`[SIGEO-Terceirizados] XML indisponível (HTTP ${res.status}) para id=${idNotaFiscalServico} — seguirá para o PDF.`);
                            resolve(null); return;
                        }
                        const texto = await res.response.text();
                        const dados = parsearXMLNotaFiscal(texto, numeroEsperado);
                        // Sem número E sem valor de serviço = não conseguimos ler nada de útil:
                        // trata como "não tem XML" para o PDF (com OCR) assumir a conferência.
                        if (!dados || (!dados.numero && dados.valorServico === null)) {
                            console.warn(`[SIGEO-Terceirizados] XML do id=${idNotaFiscalServico} não pôde ser interpretado — seguirá para o PDF.`);
                            resolve(null); return;
                        }
                        resolve(dados);
                    } catch (e) { if (e.sessaoSigeo) { reject(e); return; } console.error('[SIGEO-Terceirizados] Erro ao processar XML:', e); resolve(null); }
                },
                onerror: () => resolve(null),
                // v2.3.5: sem resposta, segue para o PDF em vez de esperar para sempre
                timeout: CONFIG.timeoutSigeoMs || 90000,
                ontimeout: () => {
                    console.warn(`[SIGEO-Terceirizados] XML do id=${idNotaFiscalServico}: o SIGEO não respondeu em ${Math.round((CONFIG.timeoutSigeoMs || 90000) / 1000)} s — seguirá para o PDF.`);
                    resolve(null);
                },
                onabort: () => resolve(null),
            });
        });
    }

    // Cache por nota: evita repetir download + OCR (pesado) ao reprocessar o mesmo lote
    // na mesma sessão. Não cacheia erro de rede (para permitir nova tentativa).
    const _cachePDFPorNota = {};
    // v2.3.2: motivo da última falha de download do PDF por nota (vira alerta da nota na colagem)
    const _falhaPDFPorNota = {};

    async function capturarPDFNotaFiscal(idNotaFiscalServico, tokenBearer, { permitirOCR = true } = {}) {
        const emCache = _cachePDFPorNota[idNotaFiscalServico];
        // Reaproveita o cache, exceto se antes o OCR foi dispensado (havia XML) e agora ele é necessário
        if (emCache !== undefined && !(emCache?.ocrDispensado && permitirOCR)) {
            console.log(`[SIGEO-Terceirizados] PDF id=${idNotaFiscalServico}: usando cache (sem novo download/OCR).`);
            return emCache;
        }
        const url = `https://api.sigeo.jt.jus.br/sidof-service/notasFiscaisServico/pdf/${encodeURIComponent(idNotaFiscalServico)}/jt`;
        try {
            // v2.3.2: queda de conexão (ERR_CONNECTION_RESET, "Failed to fetch") ou erro 5xx/429 do
            // SIGEO: tenta de novo até 3 vezes antes de desistir. Erro 4xx (nota sem PDF) não repete.
            const TENTATIVAS_PDF = 3;
            let response = null;
            for (let tentativa = 1; tentativa <= TENTATIVAS_PDF; tentativa++) {
                try {
                    response = await fetchSigeo(url, {
                        method: 'GET',
                        headers: { 'Authorization': 'Bearer ' + (BEARER_TOKEN || tokenBearer), 'Accept': 'application/json, text/plain, */*' }
                    });
                    if (response.ok || !(response.status >= 500 || response.status === 429) || tentativa === TENTATIVAS_PDF) break;
                    console.warn(`[SIGEO-Terceirizados] PDF id=${idNotaFiscalServico}: HTTP ${response.status}; nova tentativa (${tentativa + 1}/${TENTATIVAS_PDF})…`);
                } catch (erroRede) {
                    if (erroRede.sessaoSigeo || tentativa === TENTATIVAS_PDF) throw erroRede;
                    console.warn(`[SIGEO-Terceirizados] PDF id=${idNotaFiscalServico}: falha de conexão (${erroRede.message}); nova tentativa (${tentativa + 1}/${TENTATIVAS_PDF})…`);
                }
                await new Promise(r => setTimeout(r, 1500 * tentativa));
            }
            if (!response.ok) throw new Error(`Erro na requisição: ${response.status}`);
            const blob = await response.blob();
            console.log(`[SIGEO-Terceirizados] PDF encontrado para id=${idNotaFiscalServico} (${Math.round(blob.size / 1024)} KB).`);
            const dados = await extrairDadosPDF(blob, { permitirOCR });
            if (dados) _cachePDFPorNota[idNotaFiscalServico] = dados;
            delete _falhaPDFPorNota[idNotaFiscalServico];
            return dados;
        } catch (e) {
            if (e.sessaoSigeo) throw e;
            _falhaPDFPorNota[idNotaFiscalServico] = /failed to fetch/i.test(String(e?.message)) ? 'falha de conexão com o SIGEO' : String(e?.message || e);
            console.error('[SIGEO-Terceirizados] Erro ao capturar PDF (não cacheado, tentará de novo no próximo processamento):', e);
            return null;
        }
    }

    async function capturarAtestes(idDocumentoFiscal, tokenBearer) {
        const url = `https://api.sigeo.jt.jus.br/sidof-service/atestesDocumentosFiscais/jt?idDocumentoFiscal=${encodeURIComponent(idDocumentoFiscal)}&idUnidadeGestora=${CONFIG.idUnidadeGestora}&apenasSemRegistroLiquidacao=false&sortField=data&sortDirection=desc&pageSize=20&pageIndex=0`;
        try {
            const response = await fetchSigeo(url, { method: 'GET', headers: { 'Authorization': 'Bearer ' + (BEARER_TOKEN || tokenBearer), 'Accept': 'application/json' } });
            if (!response.ok) throw new Error(`Erro na requisição: ${response.status}`);
            const data = await response.json();
            if (!Array.isArray(data.results)) return [];
            return data.results.map(r => {
                const valor = r.valor || 0;
                const valorPrimeiroGrau = r.valorPrimeiroGrau || 0;
                const assinantes = Array.isArray(r.assinantes)
                    ? r.assinantes.map(a => ({
                        nome: (a?.assinante?.nome || '').trim(),
                        matricula: a?.assinante?.id || null,
                        dataAssinatura: a?.dataAssinatura || null,
                    }))
                    : [];
                return { id: r.id, valor, valorGlosa: r.valorGlosa || 0, valorPrimeiroGrau, valorSegundoGrau: valor - valorPrimeiroGrau, dataAteste: r.data, assinantes };
            });
        } catch (e) {
            if (e.sessaoSigeo) throw e;
            console.error('[SIGEO-Terceirizados] Erro ao capturar atestes:', e);
            return [];
        }
    }

    // Cache de município por código IBGE: no ABRASF cada nota pede uma resolução de nome e,
    // num lote, o mesmo município se repete muito — não faz sentido rebater na API do IBGE.
    const _cacheMunicipioIBGE = {};
    async function resolverNomeMunicipio(codigoIBGE) {
        if (!codigoIBGE) return '';
        if (_cacheMunicipioIBGE[codigoIBGE] !== undefined) return _cacheMunicipioIBGE[codigoIBGE];
        try {
            const municipio = await buscarMunicipioIBGE(codigoIBGE);
            const nome = municipio?.nome || '';
            _cacheMunicipioIBGE[codigoIBGE] = nome;
            return nome;
        } catch (e) {
            // v2.4.0: sem resposta do IBGE, usa o nome dos municípios de prestadores já conhecidos.
            const conhecido = { '4216602': 'São José', '3106200': 'Belo Horizonte', '3550308': 'São Paulo' }[String(codigoIBGE)] || '';
            console.warn(`[SIGEO-Terceirizados] Não foi possível resolver o município IBGE ${codigoIBGE}${conhecido ? ` (usado "${conhecido}")` : ''}:`, e.message);
            _cacheMunicipioIBGE[codigoIBGE] = conhecido;
            return conhecido;
        }
    }

    async function buscarDadosBancarios(idFornecedor, tokenBearer) {
        try {
            const resp = await fetchSigeo(`https://api.sigeo.jt.jus.br/sidof-service/fornecedores/${idFornecedor}/contasBancarias/jt`, {
                headers: { 'Authorization': `Bearer ${tokenBearer}` }
            });
            return await resp.json();
        } catch (e) {
            if (e.sessaoSigeo) throw e;
            console.error(`[SIGEO-Terceirizados] Erro ao buscar dados bancários do fornecedor id=${idFornecedor}`, e);
            return null;
        }
    }

    // v2.5.41: leitura somente do cadastro do próprio fornecedor. Não deduz CPRB pelo
    // valor retido, nem altera o cadastro. Sem confirmação, preserva a regra anterior.
    const cacheCprbFornecedor = new Map();
    function lerIndicadorCprb(obj) {
        if (!obj || typeof obj !== 'object' || Array.isArray(obj)) return null;
        // v2.5.42: nome e tipo booleano confirmados na resposta real do cadastro do SIGEO.
        if (typeof obj.contribuintePrevReceita === 'boolean') return obj.contribuintePrevReceita;
        const norm = v => normalizarString(String(v ?? '')).replace(/[^A-Z0-9]/g, '');
        const campos = new Set(['CPRB', 'CONTRIBUINTECPRB', 'INDICADORCPRB', 'INDCPRB', 'OPTANTECPRB',
            'CONTRIBUINTEPREVIDENCIARIOSOBRERECEITABRUTA', 'CONTRIBUINTECONTRIBUICAOPREVIDENCIARIASOBRERECEITABRUTA',
            'CONTRIBUINTEDACONTRIBUICAOPREVIDENCIARIASOBREARECEITABRUTA', 'CONTRIBUICAOPREVIDENCIARIASOBRERECEITABRUTA',
            'CONTRIBUICAOPREVIDENCIARIASOBREARECEITABRUTA', 'CONTRIBUINTERECEITABRUTA',
            'CONTRIBUINTECONTRIBUICAOPREVIDENCIARIASOBREARECEITABRUTA', 'CONTRIBUINTECONTRIBUICAOPREVIDENCIARIARECEITABRUTA']);
        const flags = [];
        for (const [k, v] of Object.entries(obj)) {
            const chave = norm(k);
            if (!campos.has(chave) && !(/^(?:IS|FL|ST|IN|IND|INDICADOR|FLAG)?CONTRIBUINTE/.test(chave) && chave.includes('PREVIDENCIARIA') && chave.includes('RECEITABRUTA'))) continue;
            const valor = typeof v === 'object' && v !== null ? (v.valor ?? v.value ?? v.checked ?? v.sigla ?? v.nome ?? v.descricao) : v;
            const t = norm(valor);
            if (valor === true || valor === 1 || ['TRUE','SIM','S','1','YES','Y'].includes(t)) flags.push(true);
            else if (valor === false || valor === 0 || ['FALSE','NAO','N','0','NO'].includes(t)) flags.push(false);
        }
        return flags.length && flags.every(v => v === flags[0]) ? flags[0] : null;
    }
    function indicadorCprbRegistro(registro) {
        const f = registro?.fornecedor;
        const outro = registro?.contratacao?.contaBancaria?.fornecedor;
        const a = lerIndicadorCprb(f);
        if (a !== null) return a;
        const dig = v => String(v ?? '').replace(/\D/g, '');
        if (f && outro && ((f.id != null && outro.id != null && String(f.id) === String(outro.id)) ||
            (dig(f.documento).length === 14 && dig(f.documento) === dig(outro.documento)))) return lerIndicadorCprb(outro);
        return null;
    }
    async function consultarCprbFornecedor(registro) {
        const direto = indicadorCprbRegistro(registro);
        if (direto !== null) return direto;
        const f = registro?.fornecedor;
        if (!f || f.id == null || !/^\d+$/.test(String(f.id))) return null;
        const chave = String(f.id) + '|' + String(f.documento ?? '').replace(/\D/g, '');
        if (cacheCprbFornecedor.has(chave)) return cacheCprbFornecedor.get(chave);
        // Rota de detalhe a confirmar no SIGEO: não interrompe o lote se não estiver disponível.
        // Um único GET por fornecedor no lote, com tempo curto, sem renovar sessão nem repetir.
        let flag = null;
        const ctrl = new AbortController();
        const timer = setTimeout(() => ctrl.abort(), 5000);
        try {
            const resposta = await fetch(`https://api.sigeo.jt.jus.br/sidof-service/fornecedores/${encodeURIComponent(f.id)}/jt`, {
                method: 'GET', headers: { Authorization: `Bearer ${BEARER_TOKEN}`, Accept: 'application/json' }, signal: ctrl.signal
            });
            if (resposta.ok) {
                const json = await resposta.json();
                const cadastro = json?.fornecedor ?? json?.data?.fornecedor ?? json?.data ?? json;
                const dig = v => String(v ?? '').replace(/\D/g, '');
                const idOk = cadastro?.id != null && String(cadastro.id) === String(f.id);
                const cnpj = dig(f.documento), cnpjCadastro = dig(cadastro?.documento ?? cadastro?.cnpj);
                const cnpjOk = cnpj.length === 14 && cnpj === cnpjCadastro;
                const idDiverge = cadastro?.id != null && String(cadastro.id) !== String(f.id);
                const cnpjDiverge = cnpj.length === 14 && cnpjCadastro.length === 14 && cnpj !== cnpjCadastro;
                if ((idOk || cnpjOk) && !idDiverge && !cnpjDiverge) flag = lerIndicadorCprb(cadastro);
            }
        } catch (e) { /* consulta complementar não pode interromper a extração */ }
        finally { clearTimeout(timer); }
        // v2.5.42: rota de consulta confirmada no Network do SIGEO. O nome do filtro
        // documento ainda precisa ser validado em produção. Se não for aceito, jamais
        // aproveitar dados de outra empresa nem percorrer a lista geral de fornecedores.
        const cnpj = String(f.documento ?? '').replace(/\D/g, '');
        if (flag === null && cnpj.length === 14) {
            const consulta = new URL('https://api.sigeo.jt.jus.br/sidof-service/fornecedores/query/jt');
            consulta.search = new URLSearchParams({ pageSize: '5', pageIndex: '0', sortField: 'nomeRazaoSocial',
                sortDirection: 'asc', idUnidadeGestora: String(CONFIG.idUnidadeGestora), cadastroEstaCompleto: 'true',
                somenteVinculados: 'true', apenasContratacoesFiscal: 'false', documento: cnpj }).toString();
            const ctrlLista = new AbortController();
            const timerLista = setTimeout(() => ctrlLista.abort(), 5000);
            try {
                const resposta = await fetch(consulta.toString(), { method: 'GET',
                    headers: { Authorization: `Bearer ${BEARER_TOKEN}`, Accept: 'application/json' }, signal: ctrlLista.signal });
                if (resposta.ok) {
                    const json = await resposta.json();
                    const lista = Array.isArray(json?.results) ? json.results : [];
                    const mesmos = lista.filter(c => String(c?.documento ?? '').replace(/\D/g, '') === cnpj
                        && (c.id == null || String(c.id) === String(f.id)));
                    const flags = mesmos.map(lerIndicadorCprb);
                    if (flags.length && flags[0] !== null && flags.every(v => v === flags[0])) flag = flags[0];
                }
            } catch (e) { /* consulta complementar não pode interromper a extração */ }
            finally { clearTimeout(timerLista); }
        }
        cacheCprbFornecedor.set(chave, flag);
        if (flag === null) console.warn('[SIGEO-Terceirizados] CPRB: indicador do cadastro não identificado; mantida a regra anterior.');
        return flag;
    }
    function taxaInssDaNota(d, cod, perfil, cfg) {
        const flag = d.cprbFornecedor ?? indicadorCprbRegistro(d.registro);
        if (flag === true) return 0.035;
        if (flag === false) return cfg.aliquotaInss;
        return perfil?.codigo === cod ? perfil.aliquota : cfg.aliquotaInss;
    }

    /* ====================================================================================
     * 7. RETENÇÃO PREVIDENCIÁRIA (INSS) — já vem no próprio registro do SIGEO,
     *    igual ao robô de Manutenção Predial, mas aqui também trazemos o "Tipo de Serviço".
     *    Mantém a ordem do array do SIGEO; o primeiro item continua nas colunas originais.
     * ==================================================================================== */
    /* ====================================================================================
     * 7.1 NATUREZA DE RENDIMENTO — já vem no próprio registro do SIGEO
     *     (registro.naturezasRendimento[0].naturezaRendimento), igual ao módulo original.
     * ==================================================================================== */
    function obterPrimeiraNaturezaRendimento(registro) {
        const naturezasRendimento = registro?.naturezasRendimento;
        if (naturezasRendimento) {
            if (Array.isArray(naturezasRendimento) && naturezasRendimento.length > 0) return naturezasRendimento[0];
            if (typeof naturezasRendimento === 'object') {
                const valores = Object.values(naturezasRendimento);
                if (valores.length > 0) return valores[0];
            }
        }
        return null;
    }

    function obterNaturezaRendimento(registro) {
        const item = obterPrimeiraNaturezaRendimento(registro);
        if (!item) return '';
        return `${item.naturezaRendimento?.id ?? ''}`.trim();
    }

    function obterValorBrutoNaturezaRendimento(registro) {
        const item = obterPrimeiraNaturezaRendimento(registro);
        if (!item) return null;
        return item.baseCalculo ?? null;
    }

    function obterRetencoesPrevidenciarias(registro) {
        const lista = registro?.retencoesPrevidenciarias;
        if (!Array.isArray(lista)) return [];
        return lista.map(r => {
            const tipoServico = r?.tipoServico?.descricao ||
                r?.descricaoTipoServico ||
                (typeof r?.tipoServico === 'string' ? r.tipoServico : '') ||
                [r?.tipoServico?.codigo, r?.tipoServico?.nome].filter(Boolean).join(' - ') || '';
            // [v1.5.0] Código do tipo de serviço (ex.: 100000001), usado para casar com os postos da SEGEST.
            const codigoBruto = [r?.tipoServico?.codigo, r?.tipoServico?.codigoTipoServico, r?.codigoTipoServico, r?.tipoServico?.id]
                .filter(v => v !== null && v !== undefined).join(' ');
            return {
                baseCalculo: r?.valorBaseCalculo ?? null,
                valorRetencao: r?.valorRetencao ?? null,
                tipoServico,
                codigoServico: extrairCodigoServicoInss(`${codigoBruto} ${tipoServico}`),
            };
        });
    }

    function totalRetencaoPrevidenciaria(retencoes) {
        const valores = (retencoes || []).map(r => r.valorRetencao)
            .filter(v => v !== null && v !== undefined && v !== '' && Number.isFinite(Number(v)));
        return valores.length ? valores.reduce((centavos, v) => centavos + Math.round(Number(v) * 100), 0) / 100 : null;
    }

    /* ====================================================================================
     * 8. VALIDAÇÃO CRUZADA SIGEO × XML × PDF (mesmo esquema de cores do módulo de Saúde)
     * ==================================================================================== */
    function compararTresFontes(nomeCampo, valorSIGEO, valorXML, valorPDF, { neutroSemFonte = false } = {}) {
        const r = { icone: '', mensagem: '', corStatus: '' };
        const ausente = (v) => v === undefined || v === null || v === '';
        const semSIGEO = ausente(valorSIGEO);
        const semXML = ausente(valorXML);
        const semPDF = ausente(valorPDF);

        // [v1.4.1] Ausência de Número/Data no XML ou PDF NÃO é divergência. Em NFS, o arquivo
        // pode não entregar esses metadados ao pdf.js, embora o documento tenha sido obtido pelo
        // próprio id da linha do SIGEO. Nesses campos, mantém a célula neutra e só alerta quando
        // existir efetivamente um valor externo diferente.
        if (semXML && semPDF) {
            if (neutroSemFonte) {
                r.mensagem = `Campo ${nomeCampo}: sem valor externo disponível para conferência; mantido o valor do SIGEO.`;
                return r;
            }
            r.icone = 'ℹ️'; r.corStatus = CORES.AMARELO_CLARO;
            r.mensagem = `Campo ${nomeCampo}: só disponível no SIGEO (XML/PDF não trouxeram o dado).`;
            return r;
        }
        const referencia = !semXML ? valorXML : valorPDF; // XML tem prioridade quando existe
        const fonteReferencia = !semXML ? 'XML' : 'PDF';
        if (semSIGEO) {
            r.icone = 'ℹ️'; r.corStatus = CORES.AMARELO_CLARO;
            r.mensagem = `Campo ${nomeCampo}: não existe no SIGEO. ${fonteReferencia}: ${referencia}`;
            return r;
        }
        if (String(referencia) === String(valorSIGEO)) {
            r.icone = '✅'; r.corStatus = CORES.VERDE_CLARO;
            r.mensagem = `Campo ${nomeCampo} confere entre SIGEO e ${fonteReferencia}.`;
        } else {
            r.icone = '⚠️'; r.corStatus = CORES.VERMELHO_CLARO;
            r.mensagem = `Campo ${nomeCampo} DIVERGENTE:
SIGEO: ${valorSIGEO}
${fonteReferencia}: ${referencia}`;
        }
        return r;
    }

    // Variante para VALORES MONETÁRIOS: arredonda a 2 casas antes de comparar (evita
    // falso-positivo de ponto flutuante, ex.: 441.57000000001 ≠ 441.57) e formata os
    // valores do tooltip em padrão brasileiro ("441,57"). Usada nas colunas de INSS.
    function compararTresFontesNumerico(nomeCampo, valorSIGEO, valorXML, valorPDF) {
        const norm = (v) => (v === null || v === undefined || v === '' || isNaN(Number(v)))
            ? null
            : Formatacao.formatarValorBrasileiro(Math.round(Number(v) * 100) / 100);
        return compararTresFontes(nomeCampo, norm(valorSIGEO), norm(valorXML), norm(valorPDF));
    }

    /* ====================================================================================
     * 9. PIPELINE — PROCESSAR UMA LINHA / O LOTE INTEIRO
     * ==================================================================================== */
    const documentosProcessados = [];
    window._sigeoTerDocumentosProcessados = documentosProcessados; // ajuda a depurar: dá pra inspecionar no console

    function aguardarOverlay() {
        return new Promise((resolve) => {
            const timeoutId = setTimeout(() => resolve(null), 2000);
            const existente = document.querySelector('.cdk-overlay-pane .mat-menu-content');
            if (existente) { clearTimeout(timeoutId); resolve(existente); return; }
            const observer = new MutationObserver(() => {
                const overlay = document.querySelector('.cdk-overlay-pane .mat-menu-content');
                if (overlay) { clearTimeout(timeoutId); observer.disconnect(); resolve(overlay); }
            });
            observer.observe(document.body, { childList: true, subtree: true });
        });
    }

    function buscarBotoesXmlPdfDaLinha(row) {
        let botoes = {};
        const pdfIcon = Array.from(row.querySelectorAll('button mat-icon')).find(i => i.textContent.trim() === 'picture_as_pdf');
        if (pdfIcon) botoes.pdf = pdfIcon.closest('button');
        const menuIcon = Array.from(row.querySelectorAll('button mat-icon')).find(i => i.textContent.trim() === 'description');
        if (menuIcon) botoes.menu = menuIcon.closest('button');
        const xmlIcon = Array.from(row.querySelectorAll('button mat-icon')).find(i => i.classList.contains('icon_xml'));
        if (xmlIcon) botoes.xml = xmlIcon.closest('button');
        return botoes;
    }

    async function processarLinhaTerceirizado(linhaInfo, registroSelecionado) {
        const documento = { xml: null, pdf: null, fontes: [], status: 'processando' };

        try {
            if (CONFIG.usarBotoesDaLinhaComoApoio && linhaInfo?.botoes?.menu) {
                linhaInfo.botoes.menu.click();
                const overlay = await aguardarOverlay();
                if (overlay) {
                    const pdfIconOverlay = Array.from(overlay.querySelectorAll('button mat-icon')).find(i => i.textContent.trim() === 'picture_as_pdf');
                    const xmlIconOverlay = Array.from(overlay.querySelectorAll('button mat-icon')).find(i => i.classList.contains('icon_xml'));
                    if (pdfIconOverlay) linhaInfo.botoes.pdf = pdfIconOverlay.closest('button');
                    if (xmlIconOverlay) linhaInfo.botoes.xml = xmlIconOverlay.closest('button');
                }
            }

            const idNF = registroSelecionado?.notaFiscalServico?.id;
            // [v1.3.9] O SIGEO usa o mesmo objeto `notaFiscalServico` tanto para NFS quanto
            // para NFSe. Porém, somente NFSe possui XML. Consultar a rota de XML para uma NFS
            // pode devolver conteúdo residual/de outro documento, gerando falso alerta de
            // "XML de outra nota". Normaliza NFSe/NFS-e para NFSE e bloqueia XML nos demais tipos.
            const tipoDocumentoNormalizado = String(registroSelecionado?.tipo || '')
                .normalize('NFD')
                .replace(/[\u0300-\u036f]/g, '')
                .toUpperCase()
                .replace(/[^A-Z0-9]/g, '');
            const documentoPermiteXML = tipoDocumentoNormalizado === 'NFSE';

            const soDigitos = (v) => String(v ?? '').replace(/\D/g, '').replace(/^0+/, '');

            // -------- NFSe: prioriza XML. NFS e demais tipos: segue direto para o PDF --------
            if (idNF && documentoPermiteXML) {
                documento.xml = await capturarXMLNotaFiscal(idNF, BEARER_TOKEN, registroSelecionado?.numero);
                if (documento.xml) {
                    documento.fontes.push('xml');

                    // TRAVA DE IDENTIDADE (v1.3.6): se o nº que veio dentro do XML não é o nº da
                    // nota que estamos conferindo, o arquivo não pertence a esta linha (foi o que
                    // aconteceu na 4219, que exibiu o local de prestação e o ISSQN da 4218).
                    // O XML fica disponível no botão 📄XML para conferência, mas NÃO alimenta as
                    // colunas — dado errado silencioso é pior que campo vazio.
                    const numXml = soDigitos(documento.xml.numero);
                    const numSigeo = soDigitos(registroSelecionado?.numero);
                    if (numXml && numSigeo && numXml !== numSigeo) {
                        documento.xmlNumeroDivergente = true;
                        console.error(`[SIGEO-Terceirizados] ⛔ XML do id=${idNF} traz a nota nº ${documento.xml.numero}, mas o SIGEO registrou nº ${registroSelecionado?.numero}. Campos do XML descartados — CONFERIR MANUALMENTE.`);
                    }

                    // Layout ABRASF traz só o código IBGE do município da prestação.
                    if (!documento.xmlNumeroDivergente && !documento.xml.localPrestacaoServico && documento.xml.codigoMunicipioPrestacao) {
                        documento.xml.localPrestacaoServico = await resolverNomeMunicipio(documento.xml.codigoMunicipioPrestacao);
                    }
                    // v1.9.9: idem para o município do prestador
                    if (!documento.xmlNumeroDivergente && !documento.xml.municipioPrestador && documento.xml.codigoMunicipioPrestador) {
                        documento.xml.municipioPrestador = await resolverNomeMunicipio(documento.xml.codigoMunicipioPrestador);
                    }
                } else {
                    console.warn('[SIGEO-Terceirizados] XML não disponível/ilegível para id=' + idNF);
                }
            } else if (idNF && tipoDocumentoNormalizado && tipoDocumentoNormalizado !== 'NFS') {
                console.log(`[SIGEO-Terceirizados] Tipo ${registroSelecionado?.tipo}: consulta XML não aplicável; processamento pelo PDF.`);
            }

            // XML só serve de fonte se realmente for o XML DESTA nota.
            const xmlUtilizavel = !!documento.xml && !documento.xmlNumeroDivergente;

            if (idNF) {
                // O PDF é sempre buscado também (fallback campo a campo + validação cruzada),
                // mas os CAMPOS só usam o PDF quando o XML não trouxe o dado. O OCR (pesado)
                // só roda quando NÃO há XML utilizável — com XML válido, um PDF-imagem é dispensado.
                documento.pdf = await capturarPDFNotaFiscal(idNF, BEARER_TOKEN, { permitirOCR: !xmlUtilizavel });
                if (documento.pdf) documento.fontes.push('pdf');
                documento.falhaPdf = documento.pdf ? '' : (_falhaPDFPorNota[idNF] || '');
                const numPdf = soDigitos(documento.pdf?.numero);
                if (numPdf && soDigitos(registroSelecionado?.numero) && numPdf !== soDigitos(registroSelecionado?.numero)) {
                    console.warn(`[SIGEO-Terceirizados] ⚠️ PDF do id=${idNF} traz a nota nº ${documento.pdf.numero} ≠ nº ${registroSelecionado?.numero} do SIGEO (pode ser ruído de OCR) — conferir.`);
                }
            }

            // -------- Dados bancários --------
            if (registroSelecionado.fornecedor) {
                documento.dadosBancarios = await buscarDadosBancarios(registroSelecionado.fornecedor.id, BEARER_TOKEN);
            }

            // -------- Atestes --------
            documento.registrosAtestes = await capturarAtestes(registroSelecionado.id, BEARER_TOKEN);
            if (documento.registrosAtestes.length > 0) {
                documento.ateste = documento.registrosAtestes[0];
            }

            // -------- Município/UF do prestador (via IBGE) --------
            const codigoIBGE = registroSelecionado?.contratacao?.contaBancaria?.fornecedor?.endereco?.codigoMunicipioIBGE;
            if (codigoIBGE) {
                try {
                    const ibge = await buscarMunicipioIBGE(codigoIBGE);
                    documento.municipioEstadoPrestador = `${ibge.nome}/${registroSelecionado?.contratacao?.contaBancaria?.fornecedor?.endereco?.uf || ''}`;
                } catch (e) {
                    console.warn('[SIGEO-Terceirizados] Falha ao resolver município IBGE:', e.message);
                }
            }

            // -------- Retenção previdenciária (INSS) + Tipo de Serviço --------
            documento.cprbFornecedor = await consultarCprbFornecedor(registroSelecionado);
            documento.retencoesPrevidenciarias = obterRetencoesPrevidenciarias(registroSelecionado);
            documento.retencaoPrevidenciaria = documento.retencoesPrevidenciarias[0]
                || { baseCalculo: null, valorRetencao: null, tipoServico: '' };
            documento.naturezaRendimento = obterNaturezaRendimento(registroSelecionado);
            documento.naturezaRendimentoValorBruto = obterValorBrutoNaturezaRendimento(registroSelecionado);

            // -------- Campos XML-primeiro / PDF-fallback --------
            const xml = xmlUtilizavel ? documento.xml : {};
            const pdf = documento.pdf || {};
            // v2.3.6: o material vem do texto da nota, com a leitura nova (os leitores antigos pegavam
            // o "1,20" ou o "4,80" da alíquota do IR). Sem texto, fica o que o leitor do layout achou.
            documento.material = xml.material ?? pdf.material ?? null;
            {
                const textoMat = [xml.observacoes, pdf.observacoes].filter(Boolean).join(' ');
                documento.materialTexto = extrairMaterialDoTexto(textoMat);
                if (textoMat.trim()) documento.material = documento.materialTexto.valor;
            }
            documento.localPrestacaoServico = xml.localPrestacaoServico || pdf.localPrestacaoServico || '';
            documento.valorLiquido = xml.valorLiquido ?? pdf.valorLiquido ?? null;
            documento.codigoTributacaoNacional = xml.codigoTributacaoNacional || pdf.codigoTributacaoNacional || '';
            documento.codigoTributacaoMunicipal = xml.codigoTributacaoMunicipal || pdf.codigoTributacaoMunicipal || '';
            documento.baseCalculoIssqn = xml.baseCalculoIssqn ?? pdf.baseCalculoIssqn ?? null;
            documento.aliquotaIssqn = xml.aliquotaIssqn ?? pdf.aliquotaIssqn ?? null;
            documento.codigoMunicipioIssqn = xml.codigoMunicipioIssqn || pdf.codigoMunicipioIssqn || '';
            documento.issqnRetido = xml.issqnRetido ?? pdf.issqnRetido ?? null;
            documento.somaIrrfContribSociais = xml.somaIrrfContribSociais ?? pdf.somaIrrfContribSociais ?? null;
            // v2.3.3: total com PIS/COFINS da MESMA fonte (XML ou PDF) da soma acima
            documento.retFedComPisCofins = ((xml.somaIrrfContribSociais ?? null) !== null ? xml.retFedComPisCofins : pdf.retFedComPisCofins) ?? null;
            {   // v2.3.4: de onde vieram as retenções federais (XML tem prioridade; PDF só na falta)
                const fonteRet = (xml.somaIrrfContribSociais ?? null) !== null ? xml : ((pdf.somaIrrfContribSociais ?? null) !== null ? pdf : null);
                const fmtR = v => (v === null || v === undefined) ? '—' : Formatacao.formatarValorBrasileiro(v);
                if (fonteRet) console.log(`[SIGEO-Terceirizados] Retenções federais da NF ${registroSelecionado?.numero ?? ''} lidas do ${fonteRet === xml ? 'XML' : 'PDF'}: PIS ${fmtR(fonteRet.pisRetido)}, COFINS ${fmtR(fonteRet.cofinsRetido)}, IR ${fmtR(fonteRet.irrf)}, CSLL ${fmtR(fonteRet.contribuicoesSociaisRetidas)}, INSS ${fmtR(fonteRet.inssRetido)}.`);
            }
            documento.observacoes = xml.observacoes || pdf.observacoes || '';
            documento.contaBancariaNota = xml.contaBancariaNota || pdf.contaBancariaNota
                || extrairContaBancariaDoTexto(documento.observacoes);
            documento.valorServico = xml.valorServico ?? pdf.valorServico ?? null;

            // Nº do contrato: prioriza o campo do próprio SIGEO; se vier vazio, tenta achar
            // "CONTRATO XXXXX" dentro do texto da nota (padrão observado nas notas da Rio Minas)
            documento.numeroContratoOrigem = registroSelecionado?.contratacao?.codigoContrato
                || xml.numeroContrato || pdf.numeroContrato || '';
            documento.numeroContrato = contratoAtualDoFornecedor(registroSelecionado?.fornecedor?.documento || xml.cnpj || pdf.cnpj, documento.numeroContratoOrigem);

            documento.tomadorCnpj = xml.tomadorCnpj || pdf.tomadorCnpj || null;
            documento.tomadorNome = xml.tomadorNome || pdf.tomadorNome || null;

            // v1.9.9: CNPJ e município do PRESTADOR desta nota (emitente). A nota pode ser de uma
            // filial diferente do CNPJ cadastrado no SIGEO; por isso a fonte é a própria nota.
            documento.cnpjPrestadorNota = String(xml.cnpj || pdf.cnpj || '').replace(/\D/g, '');
            // v2.4.0: "município" só com dígitos é código (TOM/SIAFI ou IBGE), nunca nome; não vai para a Liquidação.
            const nomeMun = v => (/^\s*\d+\s*$/.test(String(v || '')) ? '' : String(v || '').trim());
            const munNota = nomeMun(xml.municipioPrestador) || nomeMun(pdf.municipioPrestador) || '';
            const ufNota = xml.ufPrestador || pdf.ufPrestador || '';
            documento.municipioPrestador = munNota ? (ufNota ? `${munNota}/${ufNota}` : munNota) : '';
            documento.municipioPrestadorFonte = munNota ? 'nota' : (documento.municipioEstadoPrestador ? 'cadastro' : '');
            documento.extraidoViaOCR = !!pdf.extraidoViaOCR;
            const rotuloXML = documento.xml?.layoutXML === 'abrasf'
                ? 'XML (ABRASF)'
                : documento.xml?.layoutXML === 'atende-net'
                    ? 'XML (Atende.Net)'
                    : 'XML';
            documento.fonteLeitura = documento.xmlNumeroDivergente
                ? `⛔ ${rotuloXML} é de outra nota (nº ${documento.xml?.numero}) — CONFERIR MANUALMENTE`
                : xmlUtilizavel ? rotuloXML
                : pdf.semTexto ? '⛔ PDF imagem — OCR indisponível (CONFERIR MANUALMENTE)'
                : (documento.pdf && pdf.camposExtraidos === 0) ? '⚠️ PDF — layout não reconhecido (CONFERIR MANUALMENTE)'
                : pdf.extraidoViaOCR ? '🔍 PDF via OCR'
                : documento.pdf
                    ? (pdf.layoutPDF === 'atende-net' ? 'PDF (Atende.Net)' : 'PDF')
                    : '⛔ sem XML e sem PDF (CONFERIR MANUALMENTE)';
            documento.tomadorOk = documento.tomadorCnpj === CONFIG.cnpjOrgao;

            documento.numero = registroSelecionado.numero;
            documento.dataEmissao = registroSelecionado.dataEmissao;
            documento.valor = registroSelecionado.valor;
            documento.status = documento.fontes.length > 0 ? 'sucesso' : 'parcial';
            documento.conferenciaUFNota = conferirUFsNota(documento);
        } catch (erro) {
            console.error('[SIGEO-Terceirizados] Erro ao processar linha:', erro);
            documento.numero = registroSelecionado?.numero;
            documento.dataEmissao = registroSelecionado?.dataEmissao;
            documento.valor = registroSelecionado?.valor;
            documento.status = 'erro';
            documento.erro = erro.message;
            documento.sessaoSigeo = !!erro.sessaoSigeo;
        }

        const overlayAberto = document.querySelector('.cdk-overlay-backdrop');
        if (overlayAberto) overlayAberto.click();

        return documento;
    }

    // [v1.3.6] comBotoes = false por padrão. Varrer os botões XML/PDF de cada linha custa 3
    // querySelectorAll POR LINHA e só é necessário na hora de PROCESSAR — nunca na hora de
    // contar a seleção ou pintar o badge. Fazer isso a cada evento de checkbox era o que
    // travava a página (e atrasava o aparecimento do botão) ao "marcar todos".
    function coletarLinhasSelecionadas({ comBotoes = false } = {}) {
        const rows = document.querySelectorAll('mat-row');
        const resultado = [];
        rows.forEach((row, index) => {
            const checkbox = row.querySelector("input[type='checkbox']");
            if (checkbox && checkbox.checked) {
                resultado.push({ row, botoes: comBotoes ? buscarBotoesXmlPdfDaLinha(row) : null, indice: index });
            }
        });
        return resultado;
    }

    // Nº do documento fiscal como está exibido NA PRÓPRIA LINHA (coluna "Núm").
    function numeroDaLinhaDOM(row) {
        const celula = row.querySelector('mat-cell[class*="column-numero"], mat-cell[class*="column-num"]');
        const texto = (celula?.textContent || '').replace(/\D/g, '');
        return texto || null;
    }

    // Até a 1.3.5 o registro da API era pego pela POSIÇÃO da linha no DOM
    // (dadosConsultaTabelaDocsFiscais[indice]). Se a tabela é reordenada, repaginada ou
    // sofre um refresh parcial, a posição desalinha e os dados de uma nota vazam para a
    // linha de outra. Agora o índice é só o palpite inicial: ele é CONFERIDO contra o nº
    // exibido na linha e, se não casar, o registro é buscado pelo número.
    function casarRegistroDaLinha(ls) {
        const lista = dadosConsultaTabelaDocsFiscais;
        if (!Array.isArray(lista) || lista.length === 0) return null;
        const porIndice = lista[ls.indice] || null;
        const numeroDOM = numeroDaLinhaDOM(ls.row);
        if (!numeroDOM) return porIndice;

        const soDigitos = (v) => String(v ?? '').replace(/\D/g, '');
        if (porIndice && soDigitos(porIndice.numero) === numeroDOM) return porIndice;

        const candidatas = lista.filter(r => soDigitos(r?.numero) === numeroDOM);
        const porNumero = candidatas.length === 1 ? candidatas[0] : null;
        if (porNumero) {
            console.warn(`[SIGEO-Terceirizados] Linha ${ls.indice} desalinhada do array da API (DOM nº ${numeroDOM} × API nº ${porIndice?.numero}) — registro casado pelo número da nota.`);
            return porNumero;
        }
        console.warn(`[SIGEO-Terceirizados] Linha ${ls.indice} (nº ${numeroDOM}) não casou com a resposta atual da API — seleção ignorada até a tabela terminar de carregar.`);
        return null;
    }

    function obterRegistrosSelecionadosTerceirizados() {
        guardarSelecaoVisivel(false);
        return [...selecaoEntrePaginas.values()];
    }

    // onclick envia um MouseEvent: wrappers impedem que ele seja confundido com "retomar".
    function processarLoteTerceirizados() { return executarLoteTerceirizados(false); }
    function retomarLoteTerceirizados() { return executarLoteTerceirizados(true); }

    async function executarLoteTerceirizados(retomar) {
        if (processandoLote) return;
        const selecionados = retomar ? registrosLoteAtual : obterRegistrosSelecionadosTerceirizados();
        if (!selecionados.length) {
            mostrarErroSnackbar('Nenhuma linha de Terceirizado selecionada! Marque as checkboxes das notas fiscais que deseja processar.');
            return;
        }
        // Retomar usa a seleção original do lote, mesmo que o usuário tenha mudado
        // de página ou filtro. Notas concluídas e o TRD não são baixados novamente.
        const concluidos = new Set(documentosProcessados.filter(d => d.status !== 'erro').map(d => String(d.registro?.id)));
        let pendentes = retomar ? selecionados.filter(r => !concluidos.has(String(r.id))) : selecionados;
        if (!pendentes.length) return;

        // v1.9.3: nota devolvida/cancelada no SIGEO não entra no lote. Na competência 07/2026
        // as NF 1616 e 1637 tinham um registro "Devolvido" (XML de outra nota anexado) e outro
        // "Pago" com o mesmo número: o lote somava 68 notas e R$ 15.166,50 a mais que o TRD.
        let selecionadosValidos = selecionados;
        if (!retomar) {
            diagnosticarCampoSituacao(selecionados);
            const fora = selecionados.filter(registroForaDoLoteSigeo);
            selecionadosValidos = selecionados.filter(r => !registroForaDoLoteSigeo(r));
            notasForaDoLote = fora.map(r => ({ numero: r.numero, valor: r.valor, situacao: situacaoRegistroSigeo(r), id: r.id }));
            if (fora.length) {
                console.warn('[SIGEO-Terceirizados] Fora do lote pela situação no SIGEO:', notasForaDoLote);
                if (!selecionadosValidos.length) {
                    mostrarErroSnackbar(`Todas as ${fora.length} nota(s) selecionadas estão como ${[...new Set(notasForaDoLote.map(n => n.situacao))].join('/')} no SIGEO. Nada a processar.`);
                    return;
                }
                mostrarSnackbar(`${fora.length} nota(s) devolvida(s)/cancelada(s) no SIGEO ficaram fora do lote: NF ${notasForaDoLote.map(n => n.numero).join(', ')}.`, '#e65100');
            }
            pendentes = selecionadosValidos;
        }

        processandoLote = true; erroLoteSigeo = ''; atualizarContagemSelecao();
        try {
            document.getElementById('sigeo-ter-modal-final')?.remove();
            if (!retomar) {
                registrosLoteAtual = selecionadosValidos.map(r => Object.freeze({ ...r, linha: null }));
                documentosProcessados.length = 0;
                cacheCprbFornecedor.clear();
                reiniciarBuscaProad();
            }
            exibirModalProgresso(pendentes.length);
            if (!retomar) {
                const alvosProad = registrosLoteAtual.map(r => ({ numero: r.numero, registro: r, status: 'pendente' }));
                if (CONFIG.proad.buscarAutomaticamente) void buscarTRDNoProad(alvosProad);
            } else atualizarStatusBuscaProad();

            for (let i = 0; i < pendentes.length; i++) {
                const registro = pendentes[i];
                atualizarProgresso(i + 1, pendentes.length);
                // v2.3.5: vigia por nota. Se algo travar sem erro, a nota sai com erro e o lote segue;
                // "Retomar extração" tenta só as que faltaram.
                let vigia;
                const doc = await Promise.race([
                    processarLinhaTerceirizado(registro.linha, registro),
                    new Promise(r => { vigia = setTimeout(() => r({
                        status: 'erro', xml: null, pdf: null, fontes: [],
                        numero: registro.numero, dataEmissao: registro.dataEmissao, valor: registro.valor,
                        erro: `A NF ${registro.numero} não terminou em ${Math.round((CONFIG.timeoutNotaMs || 420000) / 60000)} min (o SIGEO não respondeu). Use "Retomar extração" para tentar de novo.`,
                    }), CONFIG.timeoutNotaMs || 420000); }),
                ]).finally(() => clearTimeout(vigia));
                if (doc.status === 'erro' && /não terminou em/.test(doc.erro || '')) console.warn('[SIGEO-Terceirizados]', doc.erro);
                const indice = documentosProcessados.findIndex(d => String(d.registro?.id) === String(registro.id));
                doc.uuid = indice >= 0 ? documentosProcessados[indice].uuid : crypto.randomUUID();
                doc.registro = registro;
                if (indice >= 0) documentosProcessados[indice] = doc;
                else documentosProcessados.push(doc);
                if (doc.sessaoSigeo) {
                    erroLoteSigeo = `Extração interrompida na NF ${registro.numero}: ${doc.erro}`;
                    break;
                }
                atualizarProgresso(i + 1, pendentes.length, doc.status);
                await new Promise(r => setTimeout(r, CONFIG.pausaEntreNotasMs));
            }
            // Uma nota recuperada no começo deve manter a ordem original do lote.
            const ordem = new Map(registrosLoteAtual.map((r, i) => [String(r.id), i]));
            documentosProcessados.sort((a, b) => ordem.get(String(a.registro?.id)) - ordem.get(String(b.registro?.id)));
            if (retomar && !erroLoteSigeo && registrosLoteAtual.some(r => !documentosProcessados.some(d => String(d.registro?.id) === String(r.id) && d.status !== 'erro'))) {
                erroLoteSigeo = 'Ainda há notas pendentes. Clique em "Retomar extração" para tentar apenas essas notas novamente.';
            }
        } catch (e) {
            erroLoteSigeo = `Não foi possível concluir a extração: ${e.message}. Clique em "Retomar extração"; as notas já extraídas foram preservadas nesta aba.`;
            console.error('[SIGEO-Terceirizados]', erroLoteSigeo);
        } finally {
            processandoLote = false; atualizarContagemSelecao();
            setTimeout(() => { if (!processandoLote) exibirModalFinal(); }, 500);
        }
    }

    /* ====================================================================================
     * 10. UI — PROGRESSO, BADGE NA TABELA, BOTÃO E MODAL DE RESULTADO
     * ==================================================================================== */
    function exibirModalProgresso(total) {
        document.getElementById('sigeo-ter-modal-progresso')?.remove();
        const modal = document.createElement('div');
        modal.id = 'sigeo-ter-modal-progresso';
        modal.innerHTML = `
            <div class="caixa">
                <h2 style="margin:0 0 16px;font-size:18px;">👷 Processando Terceirizados</h2>
                <div style="font-size:13px;color:rgba(0,0,0,.7);">
                    <span id="ter-progresso-atual">0</span> de <span id="ter-progresso-total">${total}</span>
                </div>
                <div style="background:rgba(0,0,0,.12);height:4px;border-radius:4px;margin-top:10px;overflow:hidden;">
                    <div id="ter-barra-progresso" style="background:#e65100;height:100%;width:0%;transition:width .3s;"></div>
                </div>
                <div id="ter-status-progresso" style="margin-top:12px;font-size:13px;color:rgba(0,0,0,.6);min-height:18px;">Iniciando...</div>
                <div id="ter-proad-progresso" style="margin-top:12px;font-size:13px;white-space:pre-line;">TRD: preparando a busca em segundo plano…</div>
            </div>`;
        document.body.appendChild(modal);
    }

    function atualizarProgresso(atual, total, status = 'processando') {
        const atualEl = document.getElementById('ter-progresso-atual');
        const barraEl = document.getElementById('ter-barra-progresso');
        const statusEl = document.getElementById('ter-status-progresso');
        if (atualEl) atualEl.textContent = atual;
        if (barraEl) barraEl.style.width = `${(atual / total) * 100}%`;
        if (statusEl) statusEl.textContent = status === 'sucesso' ? `Documento ${atual} processado ✓` : status === 'erro' ? `Erro no documento ${atual}` : `Processando documento ${atual}...`;
    }

    function badgeTerceirizado(celulaRazaoSocial, presente) {
        const ID_BADGE = 'sigeo-ter-badge-tipo';
        const anterior = celulaRazaoSocial.querySelector(`[data-id="${ID_BADGE}"]`);
        if (presente) {
            if (!anterior) {
                const span = document.createElement('span');
                span.setAttribute('data-id', ID_BADGE);
                span.textContent = '👷';
                span.title = 'Identificado como Terceirizado (mão de obra)';
                span.style.marginLeft = '3px';
                span.style.verticalAlign = 'middle';
                celulaRazaoSocial.prepend(span);
            }
        } else if (anterior) {
            anterior.remove();
        }
    }

    function criarBotaoProcessarTerceirizados() {
        const botao = document.createElement('button');
        botao.id = 'sigeo-ter-botao-processar';
        botao.className = 'mat-focus-indicator mat-button mat-button-base';
        botao.style.cssText = 'background-color:#e65100;color:#fff;margin-left:4px;';
        botao.onclick = processarLoteTerceirizados;
        botao.innerHTML = `<span class="mat-button-wrapper">👷 Processar terceirizados 🤖</span>`;
        return botao;
    }

    function inserirBotaoAoLadoDoCSV(botao) {
        const componenteCSV = document.querySelector('app-exportacao-csv');
        const pai = componenteCSV?.parentElement;
        if (!componenteCSV || !pai) return false;
        if (componenteCSV.nextSibling) pai.insertBefore(botao, componenteCSV.nextSibling);
        else pai.appendChild(botao);
        return botao.isConnected;
    }

    // Escrever o badge altera o DOM da tabela e acordaria o MutationObserver, que chamaria
    // esta função outra vez: sem essa trava, marcar todos vira um vaivém de reentrâncias.
    let _atualizandoBadges = false;

    // [v1.3.7] MUDANÇA DE ESTRATÉGIA: nem o badge nem o botão dependem mais de QUAIS linhas
    // estão marcadas — eles dependem apenas do CONTEÚDO da tabela, que só muda quando a
    // consulta é refeita. Resultado: marcar/desmarcar checkbox (inclusive "marcar todas")
    // não dispara nenhum trabalho do robô. O botão fica visível sempre que houver ao menos
    // um terceirizado na página; se ninguém estiver marcado na hora do clique, o próprio
    // processarLoteTerceirizados() já avisa com o snackbar de sempre.
    // Bônus: agora dá para ver o 👷 nas linhas ANTES de marcar qualquer coisa.
    function controlarExibicaoBotaoLote() {
        if (!Array.isArray(dadosConsultaTabelaDocsFiscais)) {
            return { pronto: false, motivo: 'dados-ainda-indisponiveis' };
        }
        if (dadosConsultaTabelaDocsFiscais.length === 0 && !selecaoEntrePaginas.size) {
            document.getElementById('sigeo-ter-guardar-selecao')?.remove();
            document.getElementById('sigeo-ter-rever-selecao')?.remove();
            document.getElementById('sigeo-ter-botao-processar')?.remove();
            document.getElementById('sigeo-ter-botao-segest')?.remove();
            document.querySelectorAll('[data-id="sigeo-ter-badge-tipo"]').forEach(el => el.remove());
            return { pronto: true, motivo: 'consulta-sem-registros' };
        }

        const inicio = performance.now();
        const tabela = document.querySelector('mat-table');
        const linhas = tabela?.querySelectorAll('mat-row') || [];
        if (linhas.length === 0) return { pronto: false, motivo: 'linhas-ainda-nao-renderizadas' };

        let temTerceirizadoNaTabela = false;
        let celulasEncontradas = 0;

        _atualizandoBadges = true;
        try {
            linhas.forEach((row, indice) => {
                const registro = casarRegistroDaLinha({ row, indice });
                const ehTerceirizado = registroETerceirizado(registro);
                if (ehTerceirizado) temTerceirizadoNaTabela = true;

                // Prefere a classe semântica da coluna; nth-child fica apenas como fallback
                // para manter compatibilidade caso o SIGEO use outro nome de coluna.
                const celula = row.querySelector(
                    'mat-cell.mat-column-razaoSocial, mat-cell[class*="column-razao"], mat-cell[class*="column-fornecedor"], mat-cell:nth-child(3)'
                );
                if (celula) {
                    celulasEncontradas++;
                    badgeTerceirizado(celula, ehTerceirizado);
                }
            });
        } finally {
            _atualizandoBadges = false;
        }

        let botaoPronto = true;
        const botaoExistente = document.getElementById('sigeo-ter-botao-processar');
        if (temTerceirizadoNaTabela) {
            botaoPronto = !!botaoExistente || inserirBotaoAoLadoDoCSV(criarBotaoProcessarTerceirizados());
            garantirBotaoImportarSegest();
            document.getElementById('sigeo-prev-botao')?.remove(); // v2.5.35: sem atalho Prev./FGTS na liquidação; acesso pelo menu do Tampermonkey.
            garantirBotoesSelecao();
        } else if (botaoExistente && !selecaoEntrePaginas.size) {
            botaoExistente.remove();
            document.getElementById('sigeo-ter-botao-segest')?.remove();
            document.getElementById('sigeo-prev-botao')?.remove();
        }

        if (selecaoEntrePaginas.size) {
            if (!document.getElementById('sigeo-ter-botao-processar')) inserirBotaoAoLadoDoCSV(criarBotaoProcessarTerceirizados());
            garantirBotoesSelecao();
        }

        // Termômetro: se o robô estiver mesmo pesando, isto aparece no console. Se a página
        // travar SEM esta mensagem, a lentidão é da própria tabela do SIGEO, não do robô.
        const ms = performance.now() - inicio;
        if (ms > 50) console.warn(`[SIGEO-Terceirizados] Varredura de ${linhas.length} linha(s) levou ${Math.round(ms)}ms.`);

        return {
            pronto: celulasEncontradas > 0 && (!temTerceirizadoNaTabela || botaoPronto),
            motivo: !celulasEncontradas ? 'celulas-ainda-nao-renderizadas' : (!botaoPronto ? 'barra-de-acoes-ainda-nao-renderizada' : 'ok'),
        };
    }

    // Agenda UMA atualização por rajada de eventos. Além do debounce, a v1.3.8 repete a
    // tentativa quando a resposta da API chega antes de a tabela/barra de ações terminar de
    // renderizar. Antes, uma única tentativa prematura fazia o badge e o botão sumirem até
    // uma nova consulta completa.
    let _timerAtualizacaoUI = null;
    let _tentativasAtualizacaoUI = 0;
    const MAX_TENTATIVAS_UI = 30;

    function agendarAtualizacaoUI(atrasoMs = 120, repetirSeIncompleto = true) {
        if (_timerAtualizacaoUI) clearTimeout(_timerAtualizacaoUI);
        _timerAtualizacaoUI = setTimeout(() => {
            _timerAtualizacaoUI = null;
            try {
                const resultado = controlarExibicaoBotaoLote();
                if (repetirSeIncompleto && !resultado?.pronto && _tentativasAtualizacaoUI < MAX_TENTATIVAS_UI) {
                    _tentativasAtualizacaoUI++;
                    const proximoAtraso = Math.min(150 + (_tentativasAtualizacaoUI * 50), 800);
                    agendarAtualizacaoUI(proximoAtraso, true);
                } else {
                    if (!resultado?.pronto && repetirSeIncompleto) {
                        console.warn(`[SIGEO-Terceirizados] UI não ficou pronta após ${MAX_TENTATIVAS_UI} tentativas (${resultado?.motivo || 'motivo desconhecido'}).`);
                    }
                    _tentativasAtualizacaoUI = 0;
                }
            } catch (e) {
                _tentativasAtualizacaoUI = 0;
                console.error('[SIGEO-Terceirizados] Erro ao atualizar a UI:', e);
            }
        }, atrasoMs);
    }

    // [v1.3.7] O listener de 'change' nas checkboxes foi REMOVIDO de propósito: como o botão
    // e os badges não dependem mais da seleção, marcar caixas não precisa acordar o robô.
    // Isso também evita que cada clique passe pelo zone.js do Angular por nossa causa.

    // Vazio em vez de "0,00" quando o campo NÃO foi lido (0,00 falso induz erro na planilha)
    function fmtOuVazio(v) { return (v === null || v === undefined) ? '' : Formatacao.formatarValorBrasileiro(v); }

    // [v1.4.3] Banco e agência saíam sem os zeros à esquerda ("1" em vez de "001", "224" em
    // vez de "0224", "97" em vez de "0097"), divergindo do que está escrito na própria nota e
    // do formato usado pelos demais robôs. Fonte única para a tabela do modal e para a
    // exportação, para os dois não voltarem a divergir.
    function formatarContaBancaria(contaBancaria) {
        if (!contaBancaria) return { banco: '', agencia: '', conta: '' };

        const idBanco = contaBancaria?.agencia?.banco?.id ?? contaBancaria?.agencia?.banco?.codigo;
        const banco = (idBanco === null || idBanco === undefined || idBanco === '')
            ? ''
            : String(idBanco).replace(/\D/g, '').padStart(3, '0');

        const codigoAgencia = contaBancaria?.agencia?.codigo;
        const agencia = (codigoAgencia === null || codigoAgencia === undefined || codigoAgencia === '')
            ? ''
            : String(codigoAgencia).replace(/\D/g, '').padStart(4, '0');

        // != null preserva DV "0" (zero é falsy) e DVs alfanuméricos como o "X" do BB.
        const numero = (contaBancaria?.numero === null || contaBancaria?.numero === undefined) ? '' : String(contaBancaria.numero);
        let dv = (contaBancaria?.digitoVerificador !== null && contaBancaria?.digitoVerificador !== undefined && contaBancaria?.digitoVerificador !== '')
            ? String(contaBancaria.digitoVerificador).replace(/[^0-9A-Za-z]/g, '').toUpperCase()
            : '';

        const numeroLimpo = String(numero || '').replace(/[^0-9A-Za-z]/g, '').toUpperCase();

        // [v1.4.6] Banco do Brasil usa um único DV na conta. Em algumas respostas do SIGEO
        // o mesmo DV vem duplicado no próprio campo ("XX", "77" etc.). Só normalizamos
        // esse caso para o BB (001), sem mexer em bancos que possam trabalhar com DVs maiores.
        if (banco === '001' && dv.length > 1 && /^([0-9A-Z])\1+$/.test(dv)) {
            dv = dv[0];
        }

        // Algumas respostas da API já trazem o DV dentro de `numero` e repetem o mesmo valor
        // em `digitoVerificador` (ex.: 5819X + X). Nesse caso não anexamos de novo.
        const conta = dv && numeroLimpo.endsWith(dv)
            ? numeroLimpo
            : `${numeroLimpo}${dv}`;

        return { banco, agencia, conta };
    }


    // [v1.4.6] Mantém a conta da contratação como fonte principal, mas permite que a nota
    // corrija SOMENTE o DV quando banco, agência e número-base são os mesmos. Isso resolve o
    // caso real do BB em que o SIGEO devolveu 5819XX e a NFS-e traz 5819-X, sem substituir
    // uma conta bancária efetivamente diferente.
    function obterContaBancariaParaSaida(documento) {
        const contaContratacao = documento?.registro?.contratacao?.contaBancaria || null;
        const contaNota = documento?.contaBancariaNota || null;
        const fmtContratacao = formatarContaBancaria(contaContratacao);
        const fmtNota = formatarContaBancaria(contaNota);

        if (contaContratacao && contaNota) {
            const bancoOk = !fmtContratacao.banco || !fmtNota.banco || fmtContratacao.banco === fmtNota.banco;
            const agenciaOk = !fmtContratacao.agencia || !fmtNota.agencia || fmtContratacao.agencia === fmtNota.agencia;
            const baseContratacao = String(fmtContratacao.conta || '').replace(/[^0-9]/g, '');
            const baseNota = String(fmtNota.conta || '').replace(/[^0-9]/g, '');
            const numeroOk = baseContratacao && baseNota && baseContratacao === baseNota;
            if (bancoOk && agenciaOk && numeroOk && fmtNota.conta && fmtContratacao.conta !== fmtNota.conta) {
                return contaNota;
            }
        }

        if (fmtContratacao.banco || fmtContratacao.agencia || fmtContratacao.conta) return contaContratacao;

        const retorno = documento?.dadosBancarios;
        const contasApi = Array.isArray(retorno)
            ? retorno
            : Array.isArray(retorno?.results)
                ? retorno.results
                : Array.isArray(retorno?.content)
                    ? retorno.content
                    : (retorno?.agencia ? [retorno] : []);

        if (contaNota && contasApi.length) {
            const alvo = formatarContaBancaria(contaNota);
            const casada = contasApi.find(c => {
                const f = formatarContaBancaria(c);
                const bancoOk = !alvo.banco || !f.banco || alvo.banco === f.banco;
                const agenciaOk = !alvo.agencia || !f.agencia || alvo.agencia === f.agencia;
                const contaOk = !alvo.conta || !f.conta || alvo.conta === f.conta;
                return bancoOk && agenciaOk && contaOk;
            });
            if (casada) return casada;
        }

        if (contasApi.length === 1) return contasApi[0];
        return contaNota;
    }

    // [v1.4.3] A alíquota saía com casas decimais inconsistentes ("3%", "3,5%", "4%") porque
    // usava String(numero).replace('.', ','). A nota imprime sempre duas casas ("3,00%",
    // "3,50%", "4,00%") — alinhar evita ruído na conferência visual contra o DANFSe.
    function formatarAliquota(v) {
        if (v === null || v === undefined || v === '') return '';
        const n = Number(v);
        if (!isFinite(n)) return '';
        return `${Formatacao.formatarValorBrasileiro(n)}%`;
    }

    // Cabeçalhos das colunas exportadas — mesma ordem de gerarMatrizDados e da tabela do modal
    // (sem a coluna "Ações", que é só de interface).
    const CABECALHOS_EXPORTACAO = [
        'Tomador', 'PROAD', 'CNPJ/CPF', 'Setor', 'Banco', 'Agência', 'Conta',
        'Nº Contrato', 'Tipo de Serviço', 'BC INSS', 'Retenção INSS', 'Natureza de Rendimento',
        'Valor Bruto Nat. Rendimento', 'Material', 'Valor Bruto NF', 'Nº NF', 'Data Emissão',
        'Local da Prestação', 'Cód. Trib. Nacional', 'Cód. Trib. Municipal', 'BC ISSQN',
        'Alíquota ISSQN', 'ISSQN Retido', 'Valor Líquido XML', 'IRRF + Contrib. Sociais',
        'Data Ateste', 'Assinante 1', 'Assinante 2', 'Valor 1º Grau', 'Valor 2º Grau',
        'Glosa', 'Observações', 'Fonte',
    ];

    // Nomes de tag XML correspondentes, 1-para-1 com CABECALHOS_EXPORTACAO
    // (tags XML não podem ter espaço, acento, "º", "+" etc.).
    const TAGS_XML_EXPORTACAO = [
        'tomador', 'proad', 'cnpjCpf', 'setor', 'banco', 'agencia', 'conta',
        'numeroContrato', 'tipoServico', 'bcInss', 'retencaoInss', 'naturezaRendimento',
        'valorBrutoNaturezaRendimento', 'material', 'valorBrutoNF', 'numeroNF', 'dataEmissao',
        'localPrestacao', 'codTributacaoNacional', 'codTributacaoMunicipal', 'bcIssqn',
        'aliquotaIssqn', 'issqnRetido', 'valorLiquidoXml', 'irrfContribSociais',
        'dataAteste', 'assinante1', 'assinante2', 'valorPrimeiroGrau', 'valorSegundoGrau',
        'glosa', 'observacoes', 'fonte',
    ];

    // A primeira retenção permanece nas colunas 9 a 11. As demais entram logo após,
    // antes de Natureza de Rendimento. Desde a v1.4.9 a quantidade de grupos é FIXA
    // (CONFIG.quantidadeFixaRetencoesInss), para a planilha ter sempre o mesmo layout.
    // Documentos com menos retenções recebem células vazias nos grupos excedentes.
    function maximoRetencoes(docs) {
        const fixo = Math.max(1, CONFIG.quantidadeFixaRetencoesInss || 1);
        const maiorDoLote = Math.max(1, ...docs.map(d => (d.retencoesPrevidenciarias || []).length));
        if (maiorDoLote > fixo && !maximoRetencoes._avisado) {
            maximoRetencoes._avisado = true;
            console.warn(`[SIGEO-Terceirizados] ⚠️ Há nota com ${maiorDoLote} tipos de serviço no INSS, acima do padrão de ${fixo}. `
                + 'Colunas extras foram incluídas — o layout deste lote NÃO segue o padrão da planilha.');
        }
        return Math.max(fixo, maiorDoLote);
    }

    function cabecalhosExportacao(docs) {
        const adicionais = [];
        for (let n = 2; n <= maximoRetencoes(docs); n++) {
            adicionais.push(`Tipo de Serviço ${n}`, `BC INSS ${n}`, `Retenção INSS ${n}`);
        }
        if (maximoRetencoes(docs) > 1) adicionais.push('Total Retenção INSS');
        return [...CABECALHOS_EXPORTACAO.slice(0, 11), ...adicionais, ...CABECALHOS_EXPORTACAO.slice(11)];
    }

    function tagsXmlExportacao(docs) {
        const adicionais = [];
        for (let n = 2; n <= maximoRetencoes(docs); n++) {
            adicionais.push(`tipoServico${n}`, `bcInss${n}`, `retencaoInss${n}`);
        }
        if (maximoRetencoes(docs) > 1) adicionais.push('totalRetencaoInss');
        return [...TAGS_XML_EXPORTACAO.slice(0, 11), ...adicionais, ...TAGS_XML_EXPORTACAO.slice(11)];
    }

    function gerarMatrizDados(docs) {
        const maximo = maximoRetencoes(docs);
        return docs.map(d => {
            const reg = d.registro || {};
            const contratacao = reg?.contratacao || {};
            const banco = obterContaBancariaParaSaida(d);
            const rp = d.retencaoPrevidenciaria || {};
            const cb = formatarContaBancaria(banco);
            const linha = [
                !d.tomadorCnpj ? '?' : (d.tomadorOk ? 'OK' : 'DIVERGENTE'),
                (contratacao.processoAdministrativo || '').replace('PROAD', '').trim(),
                reg?.fornecedor?.tipoPessoa === 'FISICA' ? Formatacao.formatarCPFApenasNumeros(reg.fornecedor.documento) : Formatacao.formatarCNPJApenasNumeros(reg?.fornecedor?.documento),
                contratacao?.setor?.sigla || '',
                cb.banco,
                cb.agencia,
                cb.conta,
                // v1.7.8: como na v1.4.9, o CSV leva o contrato da contratação no SIGEO (sem conversão)
                (d.numeroContratoOrigem ?? d.numeroContrato) || '',
                rp.tipoServico || '',
                Formatacao.formatarValorBrasileiro(rp.baseCalculo || 0),
                Formatacao.formatarValorBrasileiro(rp.valorRetencao || 0),
                d.naturezaRendimento || '',
                Formatacao.formatarValorBrasileiro(d.naturezaRendimentoValorBruto || 0),
                fmtOuVazio(d.material),
                Formatacao.formatarValorBrasileiro(d.valor || 0),
                d.numero || '',
                Formatacao.formatarDataBrasileira(d.dataEmissao || ''),
                d.localPrestacaoServico || '',
                d.codigoTributacaoNacional || '',
                d.codigoTributacaoMunicipal || '',
                fmtOuVazio(d.baseCalculoIssqn),
                formatarAliquota(d.aliquotaIssqn),
                fmtOuVazio(d.issqnRetido),
                fmtOuVazio(d.valorLiquido),
                fmtOuVazio(d.somaIrrfContribSociais),
                Formatacao.formatarDataBrasileira(d.ateste?.dataAteste || ''),
                Formatacao.formatarAssinante(d.ateste?.assinantes?.[0]),
                Formatacao.formatarAssinante(d.ateste?.assinantes?.[1]),
                Formatacao.formatarValorBrasileiro(d.ateste?.valorPrimeiroGrau || 0),
                Formatacao.formatarValorBrasileiro(d.ateste?.valorSegundoGrau || 0),
                Formatacao.formatarValorBrasileiro(d.ateste?.valorGlosa || 0),
                (d.observacoes || '').replace(/\s+/g, ' ').trim(),
                d.fonteLeitura || '',
            ];
            const adicionais = [];
            for (let n = 1; n < maximo; n++) {
                const adicional = d.retencoesPrevidenciarias?.[n];
                adicionais.push(adicional?.tipoServico || '', fmtOuVazio(adicional?.baseCalculo), fmtOuVazio(adicional?.valorRetencao));
            }
            if (maximo > 1) adicionais.push(fmtOuVazio(totalRetencaoPrevidenciaria(d.retencoesPrevidenciarias)));
            linha.splice(11, 0, ...adicionais);
            return linha;
        });
    }

    // Mantém o comportamento original do "Copiar todas as colunas": TSV sem cabeçalho,
    // pronto para colar direto na planilha em uso.
    function gerarLinhasCopia(docs) {
        return gerarMatrizDados(docs).map(l => l.join('\t')).join('\n');
    }

    /* ---- Exportação em arquivo (CSV e XML) — novo na 1.3.5 ---- */

    // Escapa um campo para CSV (RFC 4180): aspas duplas dobradas e campo entre aspas
    // quando contiver separador, aspas ou quebra de linha.
    function escaparCampoCsv(valor, separador) {
        const txt = String(valor ?? '');
        if (txt.includes(separador) || txt.includes('"') || txt.includes('\n') || txt.includes('\r')) {
            return `"${txt.replace(/"/g, '""')}"`;
        }
        return txt;
    }

    // CSV com separador ";" (padrão do Excel pt-BR, já que os valores usam vírgula decimal)
    // e BOM UTF-8 para o Excel reconhecer acentuação ao abrir com duplo clique.
    function gerarCsv(docs) {
        const SEP = ';';
        const linhas = [cabecalhosExportacao(docs), ...gerarMatrizDados(docs)];
        const corpo = linhas
            .map(linha => linha.map(campo => escaparCampoCsv(campo, SEP)).join(SEP))
            .join('\r\n');
        return '\uFEFF' + corpo;
    }

    function escaparXml(valor) {
        return String(valor ?? '')
            .replace(/&/g, '&amp;')
            .replace(/</g, '&lt;')
            .replace(/>/g, '&gt;')
            .replace(/"/g, '&quot;')
            .replace(/'/g, '&apos;');
    }

    function gerarXmlExportacao(docs) {
        const matriz = gerarMatrizDados(docs);
        const tags = tagsXmlExportacao(docs);
        const documentos = matriz.map(linha => {
            const campos = linha
                .map((valor, i) => `        <${tags[i]}>${escaparXml(valor)}</${tags[i]}>`)
                .join('\n');
            return `    <documento>\n${campos}\n    </documento>`;
        }).join('\n');
        const geradoEm = new Date().toISOString();
        return `<?xml version="1.0" encoding="UTF-8"?>\n<terceirizados geradoEm="${geradoEm}" total="${matriz.length}" versaoRobo="1.5.0">\n${documentos}\n</terceirizados>`;
    }

    function baixarArquivo(conteudo, nomeArquivo, mimeType) {
        const blob = new Blob([conteudo], { type: mimeType });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = nomeArquivo;
        document.body.appendChild(a);
        a.click();
        a.remove();
        // Revogação adiada: revogar imediatamente cancela o download em alguns navegadores.
        setTimeout(() => URL.revokeObjectURL(url), 10000);
    }

    // terceirizados_2026-07-20_1435.csv / .xml
    function nomeArquivoExportacao(extensao) {
        const agora = new Date();
        const p2 = n => String(n).padStart(2, '0');
        const data = `${agora.getFullYear()}-${p2(agora.getMonth() + 1)}-${p2(agora.getDate())}`;
        const hora = `${p2(agora.getHours())}${p2(agora.getMinutes())}`;
        return `terceirizados_${data}_${hora}.${extensao}`;
    }

    /* ====================================================================================
     * 10.1 SEGEST — IMPORTAÇÃO DA PLANILHA DE FATURAMENTO E CONCILIAÇÃO COM AS NOTAS [v1.5.0]
     *
     *  A referência é o faturamento apurado pela SEGEST (uma linha por posto/empregado).
     *  As notas só confirmam esse faturamento. O fluxo:
     *    1. Importar a planilha (lida no próprio navegador; nada é enviado para fora).
     *    2. Associar cada nota às linhas do MUNICÍPIO e dos SERVIÇOS de INSS dela.
     *       Um município pode ter várias notas; uma nota pode reunir vários serviços.
     *       Cada linha da SEGEST entra uma única vez. Associações ambíguas não são usadas.
     *    3. Conferir: valor da NF × soma da SEGEST; base de INSS de cada tipo de serviço
     *       (SIGEO) × soma da SEGEST daquele serviço; ISSQN e DIVs lidos da nota.
     *    4. Gerar uma linha por posto para a aba "2- Dados Faturamento". Os totais que têm de
     *       fechar (INSS por serviço = SIGEO; ISSQN e DIVs = nota) seguem junto, e a macro do
     *       Excel lança a diferença de centavos nas colunas de ajuste.
     * ==================================================================================== */
    const SEGEST = { nomeArquivo: '', linhas: [], competencia: '', abas: [], avisos: [], correcoes: [], devolucoesImr: [], correcoesDiferenca: [], avisosColagem: [], cnpj: '', empresa: '', contrato: '' };

    function normalizarTextoSegest(v) {
        return String(v ?? '').normalize('NFD').replace(/[\u0300-\u036f]/g, '')
            .toUpperCase().replace(/\s+/g, ' ').trim();
    }

    // Centavos inteiros, para somar sem erro de ponto flutuante.
    function centavos(v) {
        const n = Number(v);
        if (v === null || v === undefined || v === '' || !Number.isFinite(n)) return null;
        return Math.round(n * 100);
    }

    // Mesmo arredondamento do ROUND(x;2) do Excel (meio para longe do zero), em centavos.
    function centavosExcel(x) {
        const n = Number(x) || 0;
        return Math.sign(n) * Math.round(Math.abs(n) * 100 + 1e-7);
    }

    // v2.4.4: glosa com mais de 2 casas na SEGEST (ex.: cesta 217,065 da Nevada) vai para a Liquidação com
    // 2 casas, arredondada de forma que o posto feche: ROUND(valor/30*dias; 2) - glosas = Valor Total.
    // Só mexe na linha que tem glosa com mais de 2 casas; as demais saem exatamente como antes.
    const CAMPOS_GLOSA_COLAGEM = ['fatorRedutor', 'vt', 'va', 'cesta', 'outros'];
    function glosasComDuasCasas(l) {
        const out = {};
        let temFracao = false;
        for (const k of CAMPOS_GLOSA_COLAGEM) {
            const v = l[k];
            out[k] = v;
            if (v !== null && v !== undefined && v !== '' && Number.isFinite(Number(v))
                && Math.abs(Number(v) * 100 - Math.round(Number(v) * 100)) > 1e-6) temFracao = true;
        }
        if (!temFracao) return out;
        let soma = 0, primeiraFracao = null;
        for (const k of CAMPOS_GLOSA_COLAGEM) {
            const v = out[k];
            if (v === null || v === undefined || v === '' || !Number.isFinite(Number(v))) continue;
            if (primeiraFracao === null && Math.abs(Number(v) * 100 - Math.round(Number(v) * 100)) > 1e-6) primeiraFracao = k;
            const c = centavosExcel(v);
            out[k] = c / 100;
            soma += c;
        }
        const total = centavos(l.valorTotal);
        if (total !== null && Number.isFinite(Number(l.valorEmpregado)) && Number.isFinite(Number(l.qtdDias))) {
            const alvo = centavosExcel(Number(l.valorEmpregado) / 30 * Number(l.qtdDias)) - total;
            const dif = alvo - soma;
            if (dif !== 0 && Math.abs(dif) <= 2 && primeiraFracao) out[primeiraFracao] = (centavosExcel(out[primeiraFracao]) + dif) / 100;
        }
        return out;
    }

    const reaisDeCentavos = (c) => (c === null || c === undefined) ? null : c / 100;

    function numeroSegest(v) {
        if (v === null || v === undefined || v === '') return null;
        if (typeof v === 'number') return Number.isFinite(v) ? v : null;
        const t = String(v).trim();
        if (!t) return null;
        const n = /,\d{1,2}$/.test(t) ? Number(t.replace(/\./g, '').replace(',', '.')) : Number(t);
        return Number.isFinite(n) ? n : null;
    }

    // Cabeçalhos aceitos para cada campo (sem acento, maiúsculas, espaços compactados).
    // exato = a célula tem de ser igual ao nome; senão, basta começar com ele.
    const CAMPOS_SEGEST = [
        { campo: 'cpf', nomes: ['CPF'], exato: true, obrigatorio: true },
        { campo: 'nome', nomes: ['TERCEIRIZADO', 'NOME DO TERCEIRIZADO', 'EMPREGADO'], exato: true, obrigatorio: true },
        { campo: 'posto', nomes: ['POSTO DE TRABALHO'], obrigatorio: true },
        { campo: 'localidade', nomes: ['LOCALIDADE'], exato: true, obrigatorio: true },
        { campo: 'sublocalidade', nomes: ['SUB-LOCALIDADE', 'SUBLOCALIDADE', 'SUB LOCALIDADE'] },
        { campo: 'alocacao', nomes: ['ALOCACAO SETORIAL'] },
        { campo: 'centroCusto', nomes: ['CENTRO DE CUSTO'] },
        { campo: 'tipoServico', nomes: ['TIPO DE SERVICO'] },
        { campo: 'qtdDias', nomes: ['QNT DIAS A FATURAR', 'QTD DIAS A FATURAR', 'QUANTIDADE DE DIAS'] },
        { campo: 'valorEmpregado', nomes: ['VALOR POR EMPREGADO'] },
        { campo: 'fatorQualidade', nomes: ['FATOR QUALIDADE'] },
        { campo: 'fatorRedutor', nomes: ['FATOR REDUTOR'] },
        { campo: 'vt', nomes: ['VT'], exato: true },
        { campo: 'va', nomes: ['VA'], exato: true },
        { campo: 'cesta', nomes: ['CESTA BASICA'] },
        { campo: 'outros', nomes: ['OUTROS', 'OUTRAS GLOSAS'], exato: true },
        { campo: 'valorTotal', nomes: ['VALOR TOTAL'], exato: true, obrigatorio: true },
        { campo: 'ocorrencias', nomes: ['OCORRENCIAS', 'OCORRENCIA'], exato: true }, // v2.3.9: Nevada usa "Ocorrência"
    ];
    // v2.3.9: campos da SEGEST que vão para colunas da Liquidação (para avisar quando a coluna não existe na planilha)
    // glosa: true = desconto que alguns contratos não têm (ex.: Brigada sem VA e cesta); avisa no painel,
    // mas não pede confirmação a cada cópia.
    const DESTINO_LIQUIDACAO_SEGEST = {
        ocorrencias: { destino: 'a coluna Observações' },
        centroCusto: { destino: 'a coluna Centro de Custo' },
        qtdDias: { destino: 'a coluna Qtd Dias' },
        tipoServico: { destino: 'a classificação (o robô usa "Apoio Operacional")' },
        fatorRedutor: { destino: 'a coluna IMR', glosa: true },
        vt: { destino: 'a coluna VT', glosa: true },
        va: { destino: 'a coluna VA', glosa: true },
        cesta: { destino: 'a coluna Cesta Básica', glosa: true },
    };
    const CAMPOS_NUMERICOS_SEGEST = ['qtdDias', 'valorEmpregado', 'fatorQualidade', 'fatorRedutor', 'vt', 'va', 'cesta', 'outros', 'valorTotal'];
    // v1.9.3: campos numéricos que aceitam texto como "Não avaliado". O Fator Qualidade é só
    // informativo no robô (o IMR da colagem vem do Fator Redutor), então o texto vira aviso.
    const TEXTOS_ACEITOS_SEGEST = { fatorQualidade: /^(?:IMR\s*[-:]?\s*)?(NAO AVALIAD[OA]|SEM AVALIACAO|SEM RESPOSTA|N\/?A|NAO SE APLICA)$/ }; // v2.5.47: SEM RESPOSTA; v2.5.52: prefixo IMR

    // v1.9.3: CPF digitado como número perde o zero à esquerda (8233910600 → 082.339.106-00).
    function normalizarCpfSegest(v) {
        // v2.4.0: CPF com pontuação e espaço digitado no meio ("876.645.426- 34", Suricate 08/2026) sai no
        // formato padrão. Só quando o texto tem apenas dígitos, pontos, traços e espaços, e 11 dígitos.
        const soPontuacao = typeof v === 'string' && /^[\d.\-\s]+$/.test(v.trim()) && v.replace(/\D/g, '').length === 11;
        const digitos = typeof v === 'number' && Number.isFinite(v) && v > 0 ? String(Math.round(v))
            : (typeof v === 'string' && /^\d{9,11}$/.test(v.trim()) ? v.trim()
                : (soPontuacao ? v.replace(/\D/g, '') : null));
        if (!digitos || digitos.length > 11) return { cpf: typeof v === 'string' ? v.trim() : v, corrigido: false };
        return { cpf: Formatacao.formatarCPFComPontuacao(digitos.padStart(11, '0')), corrigido: true };
    }

    // Linha de cabeçalho = a que tem "CPF", "Posto de Trabalho" e "Valor Total".
    function localizarCabecalhoSegest(matriz) {
        for (let i = 0; i < Math.min(matriz.length, 40); i++) {
            const linha = (matriz[i] || []).map(normalizarTextoSegest);
            if (linha.includes('CPF') && linha.some(t => t.startsWith('POSTO DE TRABALHO')) && linha.includes('VALOR TOTAL')) return i;
        }
        return -1;
    }

    // Procura os campos em todas as linhas de cabeçalho até o primeiro posto.
    // O número de subcabeçalhos varia: no modelo audiovisual o IMR fica três linhas abaixo.
    function mapearColunasSegest(matriz, iCab, mesclagens = []) {
        const mapa = {};
        const principal = (matriz[iCab] || []).map(normalizarTextoSegest);
        const cPosto = principal.findIndex(t => t.startsWith('POSTO DE TRABALHO'));
        const cValor = principal.indexOf('VALOR TOTAL');
        let fimCab = iCab + 1;
        while (fimCab < matriz.length) {
            const r = matriz[fimCab] || [];
            if (String(r[cPosto] ?? '').trim() && numeroSegest(r[cValor]) !== null) break;
            fimCab++;
        }
        const linhasCab = matriz.slice(iCab, fimCab).map(r => (r || []).map(normalizarTextoSegest));
        const porCampo = {};
        for (const def of CAMPOS_SEGEST) {
            // Cabeçalhos de grupo (ex.: Cesta Básica sobre Falta Injustificada)
            // não são o campo numérico. Prefere o rótulo exato do último subcabeçalho.
            const candidatos = [];
            for (let i = 0; i < linhasCab.length; i++) {
                for (let j = 0; j < linhasCab[i].length; j++) {
                    const t = linhasCab[i][j];
                    if (!t) continue;
                    const exato = def.nomes.includes(t);
                    if (exato || (!def.exato && def.nomes.some(n => t.startsWith(n)))) {
                        candidatos.push({ coluna: j, nivel: i, exato });
                    }
                }
            }
            candidatos.sort((a, b) => Number(b.exato) - Number(a.exato) || b.nivel - a.nivel);
            if (candidatos.length) {
                const melhores = candidatos.filter(c => c.exato === candidatos[0].exato && c.nivel === candidatos[0].nivel);
                porCampo[def.campo] = melhores;
                mapa[def.campo] = candidatos[0].coluna;
            }
        }

        // v2.5.28: duplicações só são aceitas quando há blocos identificados por
        // período/TA. As mesclagens do Excel ligam cada coluna ao título correto:
        // na Brigada, H:I e L:Q são do 6º TA; J:K e R:W são do 7º TA.
        const duplicados = CAMPOS_SEGEST.filter(d => porCampo[d.campo]?.length > 1);
        if (!duplicados.length) return mapa;
        const erroDuplicado = (campo) => {
            const def = CAMPOS_SEGEST.find(d => d.campo === campo);
            throw new Error(`Cabeçalho duplicado na SEGEST: ${def.nomes[0]}. Não foi possível associar cada coluna a um período/termo aditivo distinto.`);
        };
        const contexto = (coluna, nivel) => {
            for (let i = iCab + nivel - 1; i >= Math.max(0, iCab - 4); i--) {
                const m = mesclagens.find(m => m.s.r <= i && m.e.r >= i && m.s.c <= coluna && m.e.c >= coluna);
                const bruto = m ? matriz[m.s.r]?.[m.s.c] : matriz[i]?.[coluna];
                const t = normalizarTextoSegest(bruto);
                if (/\b(?:TA|TERMO ADITIVO)\b/.test(t) && (
                    /\d{1,2}\s*(?:A|ATE|[-–—])\s*\d{1,2}\/\d{2}\/\d{4}/.test(t)
                    || /\bA PARTIR DE\s+\d{1,2}\/\d{2}\/\d{4}\b/.test(t))) return t;
            }
            return '';
        };
        if ((porCampo.qtdDias?.length || 0) < 2 || porCampo.qtdDias.length !== porCampo.valorEmpregado?.length) erroDuplicado(duplicados[0].campo);
        const periodos = [], grupos = new Map();
        for (const c of porCampo.qtdDias) {
            const rotulo = contexto(c.coluna, c.nivel);
            if (!rotulo || grupos.has(rotulo)) erroDuplicado('qtdDias');
            const p = { rotulo, colunas: {} };
            periodos.push(p);
            grupos.set(rotulo, p);
        }
        const permitidos = new Set(['qtdDias', 'valorEmpregado', 'fatorQualidade', 'fatorRedutor', 'vt', 'va', 'cesta', 'outros']);
        for (const def of CAMPOS_SEGEST) {
            const candidatos = porCampo[def.campo] || [];
            if (!permitidos.has(def.campo)) {
                if (candidatos.length > 1) erroDuplicado(def.campo);
                continue;
            }
            for (const c of candidatos) {
                const p = grupos.get(contexto(c.coluna, c.nivel));
                if (!p) {
                    if (candidatos.length > 1 || ['qtdDias', 'valorEmpregado'].includes(def.campo)) erroDuplicado(def.campo);
                    continue; // campo único fora dos blocos: usa uma vez, como antes
                }
                if (p.colunas[def.campo] !== undefined) erroDuplicado(def.campo);
                p.colunas[def.campo] = c.coluna;
            }
        }
        if (periodos.some(p => p.colunas.valorEmpregado === undefined)) erroDuplicado('valorEmpregado');
        mapa._periodos = periodos;
        mapa._camposPorPeriodo = [...new Set(periodos.flatMap(p => Object.keys(p.colunas)))];
        return mapa;
    }

    // Uma linha por trabalhador, sem duplicar a amostragem previdenciária.
    // O valor mensal equivalente mantém valor/30*dias = soma dos dois períodos;
    // os valores de origem ficam registrados, sem criar glosas para forçar fechamento.
    function consolidarPeriodosSegest(item, r, col, erros, avisos, letraColuna) {
        if (!col._periodos) return;
        const detalhes = [];
        for (const p of col._periodos) {
            const d = { periodo: p.rotulo };
            for (const [campo, j] of Object.entries(p.colunas)) {
                const bruto = r[j] ?? null;
                d[campo] = numeroSegest(bruto);
                if (d[campo] === null && bruto !== null && String(bruto).trim() && !/^[-–—]$/.test(String(bruto).trim())) {
                    const onde = `linha ${item.linhaPlanilha}, coluna ${letraColuna(j)} (${p.rotulo})`;
                    if (TEXTOS_ACEITOS_SEGEST[campo]?.test(normalizarTextoSegest(bruto))) {
                        d[campo + 'Texto'] = String(bruto).trim();
                        avisos.push(`${campo} = "${bruto}" na ${onde}. O robô não usa esse campo no cálculo; confirme com a SEGEST.`);
                    } else erros.push(`${campo} com valor "${bruto}" na ${onde}`);
                }
            }
            const dias = d.qtdDias, valor = d.valorEmpregado;
            const vazio = dias === null && valor === null;
            if (!vazio && (dias === null || dias < 0 || (dias > 0 && (valor === null || valor < 0)) || (valor !== null && valor < 0))) {
                erros.push(`dias/valor por empregado incompletos ou negativos na linha ${item.linhaPlanilha} (${p.rotulo})`);
            }
            detalhes.push(d);
        }
        const soma = campo => detalhes.reduce((s, d) => s + (d[campo] || 0), 0);
        item.qtdDias = soma('qtdDias');
        const proporcional = detalhes.reduce((s, d) => s + (d.valorEmpregado || 0) / 30 * (d.qtdDias || 0), 0);
        item.valorEmpregado = item.qtdDias ? proporcional * 30 / item.qtdDias : 0;
        for (const campo of CAMPOS_GLOSA_COLAGEM) {
            if (col._camposPorPeriodo.includes(campo)) item[campo] = soma(campo);
        }
        if (col._camposPorPeriodo.includes('fatorQualidade')) {
            item.fatorQualidade = item.qtdDias && detalhes.every(d => !d.qtdDias || d.fatorQualidade !== null && d.fatorQualidade !== undefined)
                ? detalhes.reduce((s, d) => s + (d.fatorQualidade || 0) * (d.qtdDias || 0), 0) / item.qtdDias : null;
        }
        item.periodosFaturamento = detalhes;
        const fmt = v => v === null || v === undefined ? '—' : String(Math.round(v * 1e6) / 1e6).replace('.', ',');
        const resumo = detalhes.map(d => `${d.periodo}: ${fmt(d.qtdDias)} dias, valor mensal R$ ${fmt(d.valorEmpregado)}`
            + CAMPOS_GLOSA_COLAGEM.filter(k => d[k] !== null && d[k] !== undefined).map(k => `, ${k === 'fatorRedutor' ? 'IMR' : k.toUpperCase()} R$ ${fmt(d[k])}`).join('')).join('; ');
        item.ocorrencias = [item.ocorrencias, `SEGEST por período: ${resumo}. Valor mensal equivalente ponderado: R$ ${fmt(item.valorEmpregado)}.`].filter(Boolean).join('\n');
    }

    function lerCompetenciaSegest(matriz) {
        for (let i = 0; i < Math.min(matriz.length, 15); i++) {
            const linha = matriz[i] || [];
            if (!linha.some(c => normalizarTextoSegest(c).startsWith('PERIODO'))) continue;
            for (const c of linha) {
                const m = String(c ?? '').match(/(\d{2})\/(\d{2})\/(\d{4})/);
                if (m) return `${m[3]}-${m[2]}`;
                // v1.9.3: período gravado como DATA do Excel (ex.: aba "Correção Maio" de 07/2026,
                // célula B5 = 01/05/2026) chega como número serial e não casava com o texto acima;
                // a aba ficava sem competência e entrava no faturamento do mês.
                if (c instanceof Date && !isNaN(c)) return `${c.getFullYear()}-${String(c.getMonth() + 1).padStart(2, '0')}`;
                if (typeof c === 'number' && c > 36526 && c < 73051 && typeof XLSX !== 'undefined') { // 2000 a 2099
                    const d = XLSX.SSF.parse_date_code(c);
                    if (d?.y) return `${d.y}-${String(d.m).padStart(2, '0')}`;
                }
            }
        }
        return '';
    }

    // v2.5.39: layout de faturamento com subtotal dos postos, reembolsos, diárias e total final.
    // Só ativa com assinatura estrutural completa; não confunde Valor Total dos Postos com a NF.
    function lerAbaSegestTotalAFaturar(matriz, nomeAba, mesclagens = []) {
        const norm = r => (r || []).map(normalizarTextoSegest);
        const iCab = matriz.slice(0, 40).findIndex(r => {
            const h = norm(r);
            return ['CPF', 'TERCEIRIZADO', 'LOCALIDADE', 'VALOR TOTAL DOS POSTOS DE TRABALHO',
                'VALOR TOTAL A FATURAR', 'REEMBOLSO', 'DIARIAS', 'GLOSA DE BENEFICIOS'].every(t => h.includes(t))
                && h.some(t => t.startsWith('POSTO DE TRABALHO'));
        });
        if (iCab < 0) return null;
        const h = norm(matriz[iCab]);
        const erros = [], avisos = [];
        const falha = msg => ({ aba: nomeAba, linhas: [], erros: [msg] });
        const cFinal = h.indexOf('VALOR TOTAL A FATURAR'), cPostos = h.indexOf('VALOR TOTAL DOS POSTOS DE TRABALHO');
        const cPosto = h.findIndex(t => t.startsWith('POSTO DE TRABALHO'));
        const inicio = matriz.findIndex((r, i) => i > iCab && String(r?.[cPosto] ?? '').trim() && numeroSegest(r?.[cFinal]) !== null);
        if (inicio < 0) return falha('layout Valor Total a Faturar sem postos com valor numérico');
        const acharUnico = (rotulo, a, b) => {
            const hits = [];
            for (let i = iCab + 1; i < inicio; i++) for (let j = a; j < b; j++) {
                if (norm(matriz[i])[j] === rotulo) hits.push({ i, j });
            }
            if (hits.length !== 1) throw new Error(`layout Valor Total a Faturar: cabeçalho ${rotulo} ausente ou ambíguo na aba "${nomeAba}"`);
            return hits[0];
        };
        const cGlosa = h.indexOf('GLOSA DE BENEFICIOS'), cReemb = h.indexOf('REEMBOLSO'), cDiarias = h.indexOf('DIARIAS');
        if (!(cGlosa < cPostos && cPostos < cReemb && cReemb < cDiarias && cDiarias < cFinal)) return falha('grupos de glosas, reembolso e diárias em ordem não reconhecida');
        const tr = acharUnico('TR', cGlosa, cPostos);
        const vt = acharUnico('VT', cGlosa, cPostos);
        const cesta = acharUnico('CESTA BASICA', cGlosa, cPostos);
        const filhos = acharUnico('ASSISTENCIA AOS FILHOS', cReemb, cDiarias);
        const dependente = acharUnico('AUXILIO AO DEPENDENTE DEFICIENTE', cReemb, cDiarias);
        const diarias = acharUnico('VALOR DAS DIARIAS', cDiarias, cFinal);
        // Adaptação dos rótulos em memória apenas; reutiliza a validação padrão.
        const adaptada = matriz.slice();
        for (const i of new Set([iCab, tr.i])) adaptada[i] = (matriz[i] || []).slice();
        adaptada[iCab][cFinal] = 'Valor Total';
        adaptada[tr.i][tr.j] = 'VA';
        const aba = lerAbaSegest(adaptada, nomeAba, mesclagens);
        if (!aba || aba.erros?.length) return aba || falha('não foi possível interpretar o layout adaptado');
        if (aba.colunas.vt !== vt.j || aba.colunas.va !== tr.j || aba.colunas.cesta !== cesta.j || aba.colunas.valorTotal !== cFinal) return falha('mapeamento ambíguo das glosas ou do total final');
        const moeda = (r, j, linha, obrigatorio = false) => {
            const bruto = r[j];
            if (bruto === null || bruto === undefined || String(bruto).trim() === '' || /^[-–—]$/.test(String(bruto).trim())) {
                if (obrigatorio) erros.push(`valor monetário ausente na linha ${linha}, coluna ${XLSX.utils.encode_col(j)}`);
                return 0;
            }
            const n = numeroSegest(bruto);
            if (n === null || n < 0) { erros.push(`valor monetário inválido na linha ${linha}, coluna ${XLSX.utils.encode_col(j)}`); return 0; }
            return centavosExcel(n);
        };
        for (const l of aba.linhas) {
            const r = matriz[l.linhaPlanilha - 1];
            const posto = moeda(r, cPostos, l.linhaPlanilha, true);
            const a = moeda(r, filhos.j, l.linhaPlanilha), b = moeda(r, dependente.j, l.linhaPlanilha), d = moeda(r, diarias.j, l.linhaPlanilha);
            if (l.valorEmpregado == null || l.qtdDias == null) { erros.push(`valor por empregado/dias ausentes na linha ${l.linhaPlanilha}`); continue; }
            const bruto = Number(l.valorEmpregado) / 30 * Number(l.qtdDias);
            const glosas = [l.vt, l.va, l.cesta].reduce((s, v) => s + (Number(v) || 0), 0);
            if (posto !== centavosExcel(bruto - glosas) && posto !== centavosExcel(bruto) - centavosExcel(glosas)) erros.push(`subtotal dos postos não fecha com dias e benefícios na linha ${l.linhaPlanilha}`);
            const final = centavos(l.valorTotal);
            // Somente acresce o que consta discriminado e efetivamente compõe o total.
            if (final !== posto + a + b + d) {
                erros.push(`total a faturar não fecha com subtotal, reembolsos e diárias na linha ${l.linhaPlanilha}; confira se há valor não incluído na fórmula da planilha`);
                continue;
            }
            if (a || b || d) {
                l.outros = -(a + b + d) / 100;
                l.ocorrencias = [l.ocorrencias, `Acréscimos discriminados na SEGEST (OUTROS negativo): assistência aos filhos R$ ${(a / 100).toFixed(2)}, auxílio ao dependente R$ ${(b / 100).toFixed(2)}, diárias R$ ${(d / 100).toFixed(2)}.`].filter(Boolean).join('\n');
            }
            l.composicaoTotalAFaturar = { valorPostos: posto / 100, assistenciaFilhos: a / 100, auxilioDependente: b / 100, diarias: d / 100 };
        }
        // IMR global não pode ser transformado em glosa individual sem uma regra de rateio validada.
        const soma = aba.linhas.reduce((s, l) => s + (centavos(l.valorTotal) || 0), 0);
        const resumos = [];
        for (let i = inicio; i < matriz.length; i++) {
            const r = matriz[i] || [], labels = norm(r);
            if (labels.some(t => /^VALOR A FATURAR POS FR\s*\/\s*VALOR DA NOTA FISCAL/.test(t))) {
                const n = numeroSegest(r[cFinal]);
                if (n === null) erros.push('valor final da nota após FR ausente');
                else resumos.push(centavos(n));
            }
            if (labels.some(t => /^VALOR DESCONTADO\s*[–—-]\s*GLOSA DE IMR/.test(t))) {
                const n = numeroSegest(r[cFinal]);
                if (n === null || centavos(n) !== 0) erros.push('IMR global não zerado ou não informado; necessário validar a distribuição por posto antes da importação');
            }
        }
        if (resumos.length !== 1 || resumos[0] !== soma) erros.push('soma dos valores individuais não confere com o valor final da nota após FR (ou resumo ausente/ambíguo)');
        if (erros.length) return { aba: nomeAba, erros, linhas: [] };
        avisos.push('layout Valor Total a Faturar reconhecido: TR mapeado para VA; subtotal dos postos, acréscimos e valor final da nota conferidos. IMR global sem desconto.');
        aba.avisos.push(...avisos);
        return aba;
    }

    function lerAbaSegest(matriz, nomeAba, mesclagens = []) {
        const iCab = localizarCabecalhoSegest(matriz);
        if (iCab < 0) return lerAbaSegestTotalAFaturar(matriz, nomeAba, mesclagens);
        const col = mapearColunasSegest(matriz, iCab, mesclagens);
        const faltando = CAMPOS_SEGEST.filter(d => d.obrigatorio && col[d.campo] === undefined).map(d => d.nomes[0]);
        if (faltando.length) return { aba: nomeAba, erros: [`colunas não encontradas: ${faltando.join(', ')}`], linhas: [] };

        const linhas = [], erros = [], avisos = [];
        const letraColuna = (j) => (typeof XLSX !== 'undefined' ? XLSX.utils.encode_col(j) : String(j + 1));
        for (let i = iCab + 1; i < matriz.length; i++) {
            const r = matriz[i] || [];
            const posto = String(r[col.posto] ?? '').trim();
            const valorTotal = numeroSegest(r[col.valorTotal]);
            if (!posto || valorTotal === null) continue; // subcabeçalhos, linhas vazias e totais
            const item = { aba: nomeAba, linhaPlanilha: i + 1 };
            const local = String(r[col.localidade] ?? '').trim();
            for (const def of CAMPOS_SEGEST) {
                if (col._camposPorPeriodo?.includes(def.campo)) { item[def.campo] = null; continue; }
                const bruto = col[def.campo] === undefined ? null : (r[col[def.campo]] ?? null);
                const numerico = CAMPOS_NUMERICOS_SEGEST.includes(def.campo);
                item[def.campo] = numerico ? numeroSegest(bruto)
                    : (typeof bruto === 'string' ? bruto.trim() : bruto);
                if (numerico && item[def.campo] === null && bruto !== null && String(bruto).trim() !== ''
                    && !/^[-–—]$/.test(String(bruto).trim())) {
                    const texto = String(bruto).trim();
                    const onde = `linha ${i + 1}${local ? ` (${local})` : ''}, coluna ${letraColuna(col[def.campo])}`;
                    if (TEXTOS_ACEITOS_SEGEST[def.campo]?.test(normalizarTextoSegest(texto))) {
                        item[def.campo + 'Texto'] = texto;
                        avisos.push(`${def.nomes[0]} = "${texto}" na ${onde}. O robô não usa esse campo no cálculo; confirme com a SEGEST.`);
                    } else {
                        erros.push(`${def.nomes[0]} com valor "${texto}" na ${onde}`);
                    }
                }
            }
            consolidarPeriodosSegest(item, r, col, erros, avisos, letraColuna);
            const cpf = normalizarCpfSegest(item.cpf);
            // v1.9.6: CPF gravado como número é corrigido em silêncio (sem alerta na tela)
            item.cpf = cpf.cpf;
            item.posto = posto;
            linhas.push(item);
        }
        if (erros.length) return { aba: nomeAba, erros, linhas: [] };
        if (col._periodos && linhas.length) avisos.push(`faturamento em ${col._periodos.length} períodos/termos aditivos consolidado em uma linha por trabalhador; dias e glosas somados, valor mensal ponderado e composição registrada nas Observações. O Valor Total original da SEGEST foi preservado.`);
        // v2.3.9: coluna da SEGEST que alimenta a Liquidação e não foi achada: avisa qual coluna da
        // Liquidação vai vazia (antes a Observações da Nevada ia em branco sem nenhum aviso).
        const avisosColagem = [];
        if (linhas.length) {
            for (const [campo, cfg] of Object.entries(DESTINO_LIQUIDACAO_SEGEST)) {
                if (col[campo] !== undefined) continue;
                const def = CAMPOS_SEGEST.find(d => d.campo === campo);
                const texto = `coluna "${def.nomes.join('" ou "')}" não encontrada na aba "${nomeAba}": ${cfg.destino} vai vazia na colagem para os ${linhas.length} posto(s) dessa aba`;
                if (cfg.glosa) avisos.push(`${texto} (sem desconto). Se o contrato tem esse desconto, confira a planilha.`);
                else avisosColagem.push(`${texto}.`);
            }
        }
        avisos.push(...avisosColagem);
        return { aba: nomeAba, linhas, avisos, avisosColagem, colunas: col, competencia: lerCompetenciaSegest(matriz) };
    }

    // Recebe um workbook do SheetJS e devolve todas as linhas de faturamento das abas
    // que tiverem o cabeçalho esperado (no modelo atual: "Faturamento Capital" e "interior").
    // v1.9.8: identificação da contratada no cabeçalho das abas ("Empresa:", "CNPJ:", "Contrato:").
    function lerIdentificacaoSegest(matriz) {
        const id = { cnpj: '', empresa: '', contrato: '' };
        for (let i = 0; i < Math.min(matriz.length, 12); i++) {
            const linha = matriz[i] || [];
            for (let j = 0; j < linha.length; j++) {
                const rotulo = normalizarTextoSegest(linha[j]).replace(/:$/, '');
                if (!['CNPJ', 'EMPRESA', 'CONTRATO'].includes(rotulo)) continue;
                const valor = linha.slice(j + 1).find(c => c !== null && c !== undefined && String(c).trim() !== '');
                if (valor === undefined) continue;
                if (rotulo === 'CNPJ' && !id.cnpj) {
                    const dig = String(valor).replace(/\D/g, '');
                    if (dig.length >= 12 && dig.length <= 14) id.cnpj = dig.padStart(14, '0');
                } else if (rotulo === 'EMPRESA' && !id.empresa) id.empresa = String(valor).trim();
                else if (rotulo === 'CONTRATO' && !id.contrato) id.contrato = String(valor).trim();
            }
        }
        return id;
    }

    // v1.9.8: CNPJ(s) das notas do lote (mesma fonte usada na colagem).
    function cnpjsDoLote() {
        const set = new Set();
        for (const d of documentosProcessados || []) {
            if (d.status === 'erro') continue;
            const c = String(d.registro?.fornecedor?.documento || d.xml?.cnpj || d.pdf?.cnpj || '').replace(/\D/g, '');
            if (c) set.add(c.padStart(14, '0'));
        }
        return set;
    }

    function formatarCnpj(c) {
        const d = String(c || '').replace(/\D/g, '').padStart(14, '0');
        return d.length === 14 ? `${d.slice(0, 2)}.${d.slice(2, 5)}.${d.slice(5, 8)}/${d.slice(8, 12)}-${d.slice(12)}` : String(c || '');
    }

    // v1.9.8: texto do erro quando a planilha é de outra contratada; '' quando confere ou não dá para saber.
    function erroPlanilhaDeOutraEmpresa(segest = SEGEST) {
        const lote = cnpjsDoLote();
        if (!segest?.cnpj || !lote.size || lote.has(segest.cnpj)) return '';
        const quem = [segest.empresa, `CNPJ ${formatarCnpj(segest.cnpj)}`, segest.contrato ? `contrato ${segest.contrato}` : ''].filter(Boolean).join(', ');
        const notas = [...lote].map(formatarCnpj).join(', ');
        return `A planilha da SEGEST "${segest.nomeArquivo || ''}" é de ${quem}, mas as notas do lote são do CNPJ ${notas}. Troque pela planilha do contrato certo.`;
    }

    // v2.3.9: aba com lista de terceirizados por posto que o robô não reconhece (para avisar em vez de pular calado).
    function abaTemListaDePessoas(matriz) {
        for (let i = 0; i < Math.min(matriz.length, 40); i++) {
            const linha = (matriz[i] || []).map(normalizarTextoSegest);
            // Só lista de faturamento (com valores ou dias); listas de frequência/contato não avisam.
            if (linha.some(t => ['TERCEIRIZADO', 'NOME DO TERCEIRIZADO', 'EMPREGADO'].includes(t)) && linha.some(t => t.startsWith('POSTO DE TRABALHO'))
                && linha.some(t => /^(VALOR|IMR|QNT DIAS|QTD DIAS|QUANTIDADE DE DIAS)\b/.test(t))) return true;
        }
        return false;
    }

    // v2.3.9: aba de devolução de IMR descontado indevidamente (ex.: "IMR- Correção" da Rio Minas,
    // agosto/2026: Terceirizado, Posto, Localidade ... e o valor devolvido na coluna "Fator Redutor").
    // Não tem CPF nem Valor Total; o casamento com o posto é pelo nome e pela localidade.
    function lerAbaDevolucaoImr(matriz, nomeAba) {
        let iCab = -1;
        for (let i = 0; i < Math.min(matriz.length, 40); i++) {
            const linha = (matriz[i] || []).map(normalizarTextoSegest);
            if (linha.includes('TERCEIRIZADO') && linha.some(t => t.startsWith('POSTO DE TRABALHO'))
                && !linha.includes('CPF') && !linha.includes('VALOR TOTAL') && linha.some(t => /^IMR\b/.test(t))) { iCab = i; break; }
        }
        if (iCab < 0) return null;
        const principal = (matriz[iCab] || []).map(normalizarTextoSegest);
        const cNome = principal.indexOf('TERCEIRIZADO');
        const cPosto = principal.findIndex(t => t.startsWith('POSTO DE TRABALHO'));
        const cLocal = principal.indexOf('LOCALIDADE');
        let cValor = -1, iDados = iCab + 1;
        for (let i = iCab; i <= Math.min(iCab + 3, matriz.length - 1); i++) {
            const j = (matriz[i] || []).map(normalizarTextoSegest).findIndex(t => t.startsWith('FATOR REDUTOR'));
            if (j >= 0) { cValor = j; iDados = i + 1; break; }
        }
        if (cValor < 0) return null;
        let periodo = '';
        for (let i = 0; i < iCab; i++) {
            const r = matriz[i] || [];
            const k = r.findIndex(c => /^PERIODO REFERENCIA/.test(normalizarTextoSegest(c)));
            if (k >= 0) { periodo = String(r.slice(k + 1).find(c => c !== null && String(c).trim() !== '') ?? '').trim(); break; }
        }
        const linhas = [];
        for (let i = iDados; i < matriz.length; i++) {
            const r = matriz[i] || [];
            const nome = String(r[cNome] ?? '').trim();
            const valor = numeroSegest(r[cValor]);
            if (!nome || !String(r[cPosto] ?? '').trim() || valor === null || valor <= 0) continue;
            linhas.push({ aba: nomeAba, periodo, nome, posto: String(r[cPosto]).trim(), localidade: cLocal >= 0 ? String(r[cLocal] ?? '').trim() : '', centavos: Math.round(valor * 100), usada: false });
        }
        return linhas.length ? { aba: nomeAba, periodo, linhas } : null;
    }

    // v2.5.46: aba de correção de mês anterior que traz, por CPF, a diferença já calculada
    // (ex.: "Correção Cesta Setembro" da Trabiserv, 10/2026: CPF, Terceirizado, Posto ... e
    // "Diferença a corrigir em out/26"). Não tem o layout do faturamento; só serve para explicar
    // a diferença do posto no mês, como as abas de correção já reconhecidas.
    function lerAbaCorrecaoDiferenca(matriz, nomeAba) {
        let iCab = -1, cCpf = -1, cDif = -1;
        for (let i = 0; i < Math.min(matriz.length, 40); i++) {
            const linha = (matriz[i] || []).map(normalizarTextoSegest);
            const a = linha.indexOf('CPF'), b = linha.findIndex(t => /^(?:DIFERENCA|VALOR) A CORRIGIR\b/.test(t));
            if (a >= 0 && b >= 0) { iCab = i; cCpf = a; cDif = b; break; }
        }
        if (iCab < 0) return null;
        const principal = (matriz[iCab] || []).map(normalizarTextoSegest);
        const cNome = principal.findIndex(t => ['TERCEIRIZADO', 'NOME DO TERCEIRIZADO', 'EMPREGADO'].includes(t));
        let periodo = '';
        for (let i = 0; i < iCab; i++) {
            const r = matriz[i] || [];
            const k = r.findIndex(c => /^PERIODO REFERENCIA/.test(normalizarTextoSegest(c)));
            if (k >= 0) { periodo = String(r.slice(k + 1).find(c => c !== null && String(c).trim() !== '') ?? '').trim(); break; }
        }
        const linhas = [];
        for (let i = iCab + 1; i < matriz.length; i++) {
            const r = matriz[i] || [];
            const cpf = String(r[cCpf] ?? '').replace(/\D/g, '').replace(/^0+/, '');
            const valor = numeroSegest(r[cDif]);
            if (!cpf || cpf.length < 9 || valor === null || valor === 0) continue;
            linhas.push({ aba: nomeAba, periodo, cpf, nome: cNome >= 0 ? String(r[cNome] ?? '').trim() : '', centavos: Math.round(valor * 100), usada: false });
        }
        return linhas.length ? { aba: nomeAba, periodo, linhas } : null;
    }
    // v2.5.46: diferença do posto igual à diferença informada para o mesmo CPF (mesmo sinal).
    function correcaoDiferencaQueExplica(l, diferenca, correcoes) {
        const cpf = String(l.cpf ?? '').replace(/\D/g, '').replace(/^0+/, '');
        if (!cpf || !diferenca || !correcoes?.length) return null;
        return correcoes.find(c => !c.usada && c.cpf === cpf && c.centavos === diferenca) || null;
    }

    // v2.3.9: diferença do posto igual ao IMR devolvido para o mesmo terceirizado (nome + localidade).
    function devolucaoImrQueExplica(l, diferenca, devolucoes) {
        if (!diferenca || !devolucoes?.length) return null;
        const nome = normalizarTextoSegest(l.nome), local = normalizarTextoSegest(l.localidade);
        return devolucoes.find(d => !d.usada && d.centavos === diferenca && normalizarTextoSegest(d.nome) === nome
            && (!d.localidade || normalizarTextoSegest(d.localidade) === local)) || null;
    }

    function lerPlanilhaSegest(workbook, nomeArquivo = '') {
        const resultado = { nomeArquivo, linhas: [], competencia: '', abas: [], avisos: [], abasIgnoradas: [], correcoes: [], devolucoesImr: [], correcoesDiferenca: [], avisosColagem: [], cnpj: '', empresa: '', contrato: '' };
        const lidas = [], errosAbas = [];
        for (const nomeAba of workbook.SheetNames) {
            const ws = workbook.Sheets[nomeAba];
            if (!ws || !ws['!ref']) continue;
            const matriz = XLSX.utils.sheet_to_json(ws, { header: 1, raw: true, defval: null, blankrows: true });
            const aba = lerAbaSegest(matriz, nomeAba, ws['!merges'] || []);
            let correcaoDif = null;
            if (!aba) {
                // v2.3.9: aba de devolução de IMR (ex.: "IMR- Correção" da Rio Minas, sem CPF e sem Valor Total)
                const dev = lerAbaDevolucaoImr(matriz, nomeAba);
                if (dev) {
                    resultado.devolucoesImr.push(...dev.linhas);
                    console.log(`[SIGEO-Terceirizados] SEGEST: aba "${nomeAba}" lida como devolução de IMR (${dev.linhas.length} posto(s)${dev.periodo ? ', ' + dev.periodo : ''}).`);
                } else if ((correcaoDif = lerAbaCorrecaoDiferenca(matriz, nomeAba))) {
                    resultado.correcoesDiferenca.push(...correcaoDif.linhas);
                    console.log(`[SIGEO-Terceirizados] SEGEST: aba "${nomeAba}" lida como correção de mês anterior (${correcaoDif.linhas.length} CPF(s)${correcaoDif.periodo ? ', ' + correcaoDif.periodo : ''}); usada só para explicar diferenças de posto.`);
                } else if (abaTemListaDePessoas(matriz)) {
                    resultado.avisos.push(`aba "${nomeAba}" tem postos com terceirizados, mas não tem o cabeçalho de faturamento (CPF, Posto de Trabalho, Valor Total) e não foi lida.`);
                }
                continue;
            }
            if (!resultado.cnpj) {
                const id = lerIdentificacaoSegest(matriz);
                if (id.cnpj) Object.assign(resultado, id);
            }
            // v1.9.3: junta os erros de TODAS as abas antes de recusar a planilha
            if (aba.erros?.length) { errosAbas.push(...aba.erros.map(e => `Aba "${nomeAba}": ${e}`)); continue; }
            lidas.push(aba);
        }
        if (errosAbas.length) {
            errosAbas.forEach(e => console.error('[SIGEO-Terceirizados] SEGEST:', e));
            const mostrar = errosAbas.slice(0, 5).join('; ') + (errosAbas.length > 5 ? `; e mais ${errosAbas.length - 5} (lista completa no console)` : '');
            throw new Error(`${errosAbas.length} problema(s): ${mostrar}. Nenhum dado dessa importação foi aplicado.`);
        }
        // v1.8.4: a competência do faturamento é a da 1ª aba com postos. Abas de outro período
        // (ex.: "Correção fat maio", período 01/05 a 31/05) são demonstrativos de correção:
        // não entram na nota do mês e ficam fora da conciliação.
        resultado.competencia = (lidas.find(a => a.linhas.length && a.competencia) || {}).competencia || '';
        for (const aba of lidas) {
            if (resultado.competencia && aba.competencia && aba.competencia !== resultado.competencia) {
                resultado.abasIgnoradas.push({ nome: aba.aba, competencia: aba.competencia, linhas: aba.linhas.length });
                // v1.9.3: guardada só para explicar acréscimos/descontos de meses anteriores (OUTROS)
                resultado.correcoes.push({ aba: aba.aba, competencia: aba.competencia, linhas: aba.linhas });
                console.log(`[SIGEO-Terceirizados] SEGEST: aba "${aba.aba}" ignorada (período ${aba.competencia}, faturamento ${resultado.competencia}).`);
                continue;
            }
            resultado.abas.push({ nome: aba.aba, linhas: aba.linhas.length });
            resultado.linhas.push(...aba.linhas);
            resultado.avisos.push(...(aba.avisos || []).map(a => `aba "${aba.aba}": ${a}`));
            resultado.avisosColagem.push(...(aba.avisosColagem || []));
        }
        // CPF repetido (fora "posto vago", que vem com CPF 0)
        const vistos = new Map();
        for (const l of resultado.linhas) {
            const cpf = String(l.cpf ?? '').replace(/\D/g, '').replace(/^0+/, '');
            if (!cpf) continue;
            if (vistos.has(cpf)) resultado.avisos.push(`CPF ${l.cpf} aparece mais de uma vez (${vistos.get(cpf)} e ${l.nome}).`);
            else vistos.set(cpf, l.nome);
        }
        return resultado;
    }

    /* ---- Tipos de serviço do INSS ---- */
    function extrairCodigoServicoInss(texto) {
        const m = String(texto ?? '').match(/\b(1\d{8})\b/);
        return m ? m[1] : '';
    }

    function contratoAtualDoFornecedor(cnpj, numeroOrigem) {
        const chave = String(cnpj || '').replace(/\D/g, '');
        const perfil = CONFIG.segest.perfisInssPorCnpj.find(p => p.cnpj === chave);
        const origem = String(numeroOrigem || '').trim();
        // Preserva a numeração atual oferecida pelo SIGEO; converte apenas o formato antigo SR.
        if (perfil && (!origem || /^\d{2}SR\d+$/i.test(origem.replace(/\s/g, '')))) return perfil.contratoAtual;
        return origem;
    }

    function perfilInssDoLote(docs) {
        const validos = docs.filter(d => d.status !== 'erro');
        if (!validos.length) return null;
        return CONFIG.segest.perfisInssPorCnpj.find(p => validos.every(d => {
            const cnpj = String(d.registro?.fornecedor?.documento || d.xml?.cnpj || d.pdf?.cnpj || '').replace(/\D/g, '');
            return cnpj === p.cnpj;
        })) || null;
    }

    function codigoServicoDoPosto(posto, perfil = null) {
        if (perfil?.posto.test(normalizarTextoSegest(posto))) return perfil.codigo;
        const regra = CONFIG.segest.regrasCodigoServicoPorPosto.find(r => r.regex.test(String(posto || '')));
        return regra ? regra.codigo : '';
    }

    // v1.8.3: se TODAS as notas do lote têm um único tipo de serviço do INSS no SIGEO, e é o
    // mesmo, todos os postos da SEGEST são desse serviço (ex.: Trabiserv, 100000006 para
    // auxiliar administrativo e supervisor). Lote com serviços diferentes (limpeza + portaria)
    // continua usando as regras por cargo.
    function codigoInssUnicoDoLote(docs) {
        const validos = docs.filter(d => d.status !== 'erro');
        if (!validos.length) return '';
        let unico = '';
        for (const d of validos) {
            const cods = [...new Set((d.retencoesPrevidenciarias || []).map(codigoServicoDaRetencao).filter(Boolean))];
            if (cods.length !== 1) return '';
            if (unico && unico !== cods[0]) return '';
            unico = cods[0];
        }
        return unico;
    }

    function codigoServicoDaRetencao(ret) {
        if (ret?.codigoServico) return ret.codigoServico;
        const doTexto = extrairCodigoServicoInss(ret?.tipoServico);
        if (doTexto) return doTexto;
        const t = normalizarTextoSegest(ret?.tipoServico);
        const regra = CONFIG.segest.regrasCodigoServicoPorDescricao.find(r => r.regex.test(t));
        return regra ? regra.codigo : '';
    }

    function textoCodigoServico(codigo) {
        return CONFIG.segest.textoCodigoServico[codigo] || codigo || '';
    }

    function normalizarMunicipio(v) {
        return normalizarTextoSegest(v)
            .replace(/\s*[\/-]\s*MG\b.*$/, '')
            .replace(/\s*\/.*$/, '')
            .replace(/^MUNICIPIO DE\s+/, '')
            .trim();
    }

    // v1.9.6: a macro procura o posto no cadastro dentro da classificação; copeiro e garçom
    // estão em "05 - Copeiragem", então não podem sair como "Apoio Operacional".
    function classificacaoLiquidacao(tipoServicoSegest) {
        const t = normalizarTextoSegest(tipoServicoSegest);
        if (/LIMPEZA/.test(t)) return 'Limpeza e Conservação';
        if (/COPEIR|GARC/.test(t)) return 'Copeiragem';
        return 'Apoio Operacional';
    }

    // Distribuição: os valores por linha seguem a mesma fórmula da Liquidação, e a diferença
    // para o total que tem de fechar vai inteira para UMA linha (a de maior valor do grupo),
    // como já é feito hoje na coluna de ajuste. Tolerância: meio centavo por linha + 1.
    function fecharGrupo(linhas, alvoCentavos, formulaPorLinha) {
        const formula = linhas.reduce((s, l) => s + formulaPorLinha(l), 0);
        if (alvoCentavos === null || alvoCentavos === undefined) return { formula, alvo: null, ajuste: null, status: 'sem-alvo' };
        const ajuste = alvoCentavos - formula;
        const limite = Math.ceil(linhas.length * 0.5) + 1;
        const status = ajuste === 0 ? 'ok' : (Math.abs(ajuste) <= limite ? 'ajuste' : 'divergente');
        let linhaAjuste = null;
        if (status === 'ajuste') linhaAjuste = linhas.reduce((m, l) => (l.valorTotal > (m?.valorTotal ?? -Infinity) ? l : m), null);
        return { formula, alvo: alvoCentavos, ajuste, status, linhaAjuste };
    }

    // Resolve o lote antes de calcular impostos. Não reserva o município inteiro para a
    // primeira NF nem escolhe uma NF pela ordem de processamento. Trabalha com grupos
    // completos de serviço; se duas notas disputarem os mesmos postos, exige conferência.
    // v1.9.3: diferença do posto explicada por uma aba de correção de outro período (ex.: "Correção
    // Maio" com o mesmo CPF faturado errado e certo). Devolve { aba, competencia, centavos } ou null.
    function correcaoQueExplica(l, diferenca, correcoes) {
        const cpf = String(l.cpf ?? '').replace(/\D/g, '').replace(/^0+/, '');
        if (!cpf || !diferenca) return null;
        for (const c of correcoes || []) {
            const doCpf = c.linhas.filter(x => String(x.cpf ?? '').replace(/\D/g, '').replace(/^0+/, '') === cpf);
            for (let i = 0; i < doCpf.length; i++) for (let j = i + 1; j < doCpf.length; j++) {
                const d = (centavos(doCpf[j].valorTotal) || 0) - (centavos(doCpf[i].valorTotal) || 0);
                if (d === diferenca) return { aba: c.aba, competencia: c.competencia, centavos: d };
            }
        }
        return null;
    }

    function conferirGlosasPostoSegest(l) {
        if (l.valorEmpregado === null || l.valorEmpregado === undefined || l.qtdDias === null || l.qtdDias === undefined) return null;
        const antes = centavosExcel(Number(l.valorEmpregado) / 30 * Number(l.qtdDias));
        const glosas = ['fatorRedutor', 'vt', 'va', 'cesta', 'outros'].reduce((s, k) => s + (centavos(l[k]) || 0), 0);
        const dif = (centavos(l.valorTotal) || 0) - (antes - glosas);
        if (dif === 0) return 0;
        // v2.3.9: planilhas que arredondam só o total, com glosas de 3 casas (ex.: Nevada 08/2026, cesta
        // 217,065): ROUND(valor/30*dias - glosas) fecha. Antes isso virava erro de R$ 0,01 no posto.
        const bruto = Number(l.valorEmpregado) / 30 * Number(l.qtdDias)
            - ['fatorRedutor', 'vt', 'va', 'cesta', 'outros'].reduce((s, k) => s + (Number(l[k]) || 0), 0);
        return (centavos(l.valorTotal) || 0) === centavosExcel(bruto) ? 0 : dif;
    }

    function associarNotasSegest(docs, porMunicipio) {
        const somaCent = ls => ls.reduce((s, l) => s + (centavos(l.valorTotal) || 0), 0);
        const notas = docs.map(d => {
            const uf = d.status === 'erro' ? { erros: [], alertas: [] } : conferirUFsNota(d);
            return { doc: d, numero: String(d.numero ?? '').trim(), municipio: '', linhas: [], grupos: [], alertas: [...uf.alertas], erros: [...uf.erros] };
        });
        const candidatas = new Map();
        const selecionadosPorMunicipio = new Map();
        for (const n of notas) {
            if (n.doc.status === 'erro') continue;
            const k = normalizarMunicipio(n.doc.localPrestacaoServico);
            selecionadosPorMunicipio.set(k, (selecionadosPorMunicipio.get(k) || 0) + 1);
        }
        for (const nota of notas) {
            const d = nota.doc;
            if (d.status === 'erro') { nota.erros.push(`Nota não processada: ${d.erro || 'erro'}.`); continue; }
            const codigos = new Set((d.retencoesPrevidenciarias || []).map(codigoServicoDaRetencao).filter(Boolean));
            const doMunicipio = ls => {
                if (!codigos.size) return ls;
                // Todos os serviços da nota precisam existir no município candidato.
                if ([...codigos].some(cod => !ls.some(l => l._codigo === cod))) return [];
                return ls.filter(l => codigos.has(l._codigo));
            };
            const chave = normalizarMunicipio(d.localPrestacaoServico);
            let linhas = [];
            if (porMunicipio.has(chave)) {
                // Sem serviço identificado, só é possível usar o município inteiro quando
                // existe uma única nota dele no lote. A validação de INSS continua abaixo.
                if (!codigos.size && selecionadosPorMunicipio.get(chave) > 1) {
                    nota.erros.push('Mais de uma nota para este município e nenhum serviço de INSS identificado. Associação ambígua; nota não usada na colagem.');
                    continue;
                }
                linhas = doMunicipio(porMunicipio.get(chave));
                if (!linhas.length) {
                    nota.erros.push(`Os serviços de INSS desta nota (${[...codigos].join(', ') || 'não identificados'}) não correspondem aos postos de ${porMunicipio.get(chave)[0].localidade} na SEGEST. Nota não usada na colagem.`);
                    continue;
                }
            } else {
                // Apoio por valor continua permitido apenas para um único município
                // candidato, considerando os serviços da nota, nunca só o total municipal.
                const alvo = centavos(d.valor);
                const possiveis = [...porMunicipio.values()].map(doMunicipio).filter(ls => ls.length && alvo !== null && somaCent(ls) === alvo);
                if (possiveis.length !== 1) {
                    nota.erros.push(`Local da prestação "${d.localPrestacaoServico || '—'}" não encontrado na SEGEST e associação por serviços/valor ${possiveis.length ? 'ambígua' : 'não encontrada'}. Nota não usada na colagem.`);
                    continue;
                }
                linhas = possiveis[0];
                nota.alertas.push(`Local da prestação "${d.localPrestacaoServico || '—'}" não encontrado na SEGEST; associada a ${linhas[0].localidade} pelos serviços e pelo valor.`);
            }
            candidatas.set(nota, linhas);
        }

        // Detecta sobreposição em todo o lote, inclusive entre notas com um serviço e
        // notas com vários. Não tenta dividir arbitrariamente postos do mesmo serviço.
        const pretendentes = new Map();
        for (const [nota, linhas] of candidatas) {
            for (const l of linhas) {
                if (!pretendentes.has(l)) pretendentes.set(l, new Set());
                pretendentes.get(l).add(nota);
            }
        }
        for (const [nota, linhas] of candidatas) {
            const conflitos = new Set();
            for (const l of linhas) for (const outra of pretendentes.get(l)) if (outra !== nota) conflitos.add(outra.numero);
            if (conflitos.size) {
                nota.erros.push(`Associação ambígua: os mesmos postos/serviços de ${linhas[0].localidade} também correspondem à(s) NF ${[...conflitos].join(', ')}. Nota não usada na colagem; confira a divisão do faturamento.`);
                continue;
            }
            nota.linhas = linhas;
            nota.municipio = linhas[0].localidade;
        }
        return notas;
    }

    // v2.3.7: "FATURAMENTO DE MAO DE OBRA ... = R$ X" (ou "FAT. MAO DE OBRA JUL/2026 =R$X") igual ao valor da
    // nota menos o material deduzido no SIGEO confirma o material, mesmo sem o valor dele escrito (NF 5511).
    // v2.3.8: com ou sem "=": "FAT. M.OBRA JUL/2026 R$12.442,54" (NF 5603)
    const RE_FATURAMENTO = '(?:FATURAMENTO|\\bFAT\\.)[^=$]{0,90}?=?\\s*R\\$\\s*';
    function faturamentoConfirmaMaterial(d, vsCent, matCent) {
        const m = String(d.observacoes || '').match(new RegExp(RE_FATURAMENTO + RE_NUM_LIVRE, 'i'));
        const fat = m ? centavos(valorLivre(m[1])) : null;
        return fat !== null && Math.abs((vsCent - matCent) - fat) <= 1;
    }

    // v2.3.6: confere o que a empresa escreveu na observação da nota com o XML, o SIGEO e a SEGEST.
    // Cada item: { item, estado: 'ok' | 'diverge' | 'ausente', detalhe }. Item que não aparece no texto
    // fica 'ausente' (não é erro: cada empresa escreve de um jeito). Só 'diverge' vira alerta.
    function conferirObservacaoNota(nota, d, segest) {
        const t = String(d.observacoes || '').replace(/\s+/g, ' ');
        const itens = [];
        if (!t.trim()) return itens;
        const add = (item, estado, detalhe = '') => itens.push({ item, estado, detalhe });
        const fmt = v => Formatacao.formatarValorBrasileiro(v);
        const perto = (a, b) => a !== null && b !== null && a !== undefined && b !== undefined && Math.abs(Math.round(a * 100) - Math.round(b * 100)) <= 1;
        const N = RE_NUM_LIVRE;
        const ler = (re) => { const m = t.match(re); return m ? valorLivre(m[1]) : null; };
        const xml = d.xmlNumeroDivergente ? {} : (d.xml || {});
        const pdf = d.pdf || {};
        const pega = k => xml[k] ?? pdf[k] ?? null;
        const vs = Number(d.valorServico ?? d.valor) || null;
        const material = (nota.materialSigeo || 0) / 100;

        // 1. valor do faturamento citado (na APPA, nas notas com material, é o valor sem o material)
        const fat = ler(new RegExp(RE_FATURAMENTO + N, 'i'));
        if (fat === null) add('Faturamento', 'ausente');
        else if (perto(fat, vs) || (material && perto(fat, vs - material))) add('Faturamento', 'ok');
        else add('Faturamento', 'diverge', `a observação cita R$ ${fmt(fat)}, mas a nota é de R$ ${fmt(vs)}${material ? ` (R$ ${fmt(vs - material)} sem o material)` : ''}.`);

        // 2. retenções e valor líquido citados × XML
        const rot = (re) => ler(new RegExp(re + '[^\\d$]{0,15}\\$\\s*' + N, 'i'));
        const conf = (item, citado, real) => {
            if (citado === null) return add(item, 'ausente');
            if (real === null || real === undefined) return add(item, 'ausente', 'sem valor no XML para comparar');
            if (perto(citado, real)) return add(item, 'ok');
            add(item, 'diverge', `a observação cita R$ ${fmt(citado)}, mas o XML tem R$ ${fmt(real)}.`);
        };
        conf('IRRF', rot('IRRF'), pega('irrf'));
        conf('INSS', rot('INSS'), pega('inssRetido'));
        conf('ISSQN', rot('\\bISS(?:QN)?'), pega('issqnRetido'));
        {
            const pis = rot('\\bPIS'), cof = rot('\\bCOF(?:INS)?'), csll = rot('\\bCSLL');
            const citado = [pis, cof, csll].some(v => v !== null) ? Math.round(((pis || 0) + (cof || 0) + (csll || 0)) * 100) / 100 : null;
            const real = [pega('pisRetido'), pega('cofinsRetido'), pega('contribuicoesSociaisRetidas')].some(v => v !== null)
                ? Math.round(((Number(pega('pisRetido')) || 0) + (Number(pega('cofinsRetido')) || 0) + (Number(pega('contribuicoesSociaisRetidas')) || 0)) * 100) / 100 : null;
            conf('PIS + COFINS + CSLL', citado, real);
        }
        conf('Valor líquido', ler(new RegExp('VALOR\\s+L[IÍ]QUIDO[^\\d$]{0,10}\\$\\s*' + N, 'i')), pega('valorLiquido'));

        // 3. base de cálculo do INSS citada × SIGEO
        {
            const citada = ler(new RegExp('BASE\\s+DE\\s+C[AÁ]LCULO\\s+(?:DO\\s+)?INSS[^\\d]{0,10}' + N, 'i'));
            const base = (d.retencoesPrevidenciarias || []).reduce((a, r) => a + (centavos(r.baseCalculo) || 0), 0) / 100;
            if (citada === null) add('Base do INSS', 'ausente');
            else if (!(d.retencoesPrevidenciarias || []).length) add('Base do INSS', 'ausente', 'sem base no SIGEO para comparar');
            else if (perto(citada, base)) add('Base do INSS', 'ok');
            else add('Base do INSS', 'diverge', `a observação cita R$ ${fmt(citada)}, mas a base no SIGEO é R$ ${fmt(base)}.`);
        }

        // 4. com/sem material e alíquota do IR citada
        {
            const mt = nota.materialTextoInfo || {};
            if (mt.sem && !mt.com && nota.materialSigeo > 0) add('Com/sem material', 'diverge', `a observação diz "SEM MATERIAL", mas o SIGEO deduziu R$ ${fmt(material)} da base do INSS.`);
            else if (mt.sem || mt.com) add('Com/sem material', 'ok');
            else add('Com/sem material', 'ausente');
            const ir = t.match(/\bIR\s*(?:DE\s*)?(\d{1,2}[.,]\d{1,2})\s*%/i);
            const irrf = pega('irrf');
            if (!ir) add('Alíquota do IR', 'ausente');
            else if (irrf === null || !vs) add('Alíquota do IR', 'ausente', 'sem IRRF no XML para comparar');
            else {
                const citada = Number(ir[1].replace(',', '.')) / 100;
                if (Math.abs(Math.round(vs * citada * 100) - Math.round(irrf * 100)) <= 1) add('Alíquota do IR', 'ok');
                else add('Alíquota do IR', 'diverge', `a observação cita IR de ${ir[1]}%, mas o IRRF retido (R$ ${fmt(irrf)}) é ${(irrf / vs * 100).toFixed(2).replace('.', ',')}% do valor.`);
            }
        }

        // 5. contrato citado × SEGEST
        {
            // "CT 22SR035LOCAL PRESTACAO..." (APPA, sem espaço depois do número)
            const doTexto = extrairNumeroContratoDoTexto(t)
                || (t.match(/\bCT\.?\s*(?:N[º°o.]?\s*)?([0-9]{2}[A-Z]{1,3}[0-9]{3}|[0-9]{2,5}\/[0-9]{2,4})/i) || [])[1] || '';
            const norm = c => String(c || '').toUpperCase().replace(/[^0-9A-Z]/g, '');
            const ref = norm(segest?.contrato);
            if (!doTexto) add('Contrato', 'ausente');
            else if (!ref) add('Contrato', 'ausente', 'a planilha da SEGEST não informa o contrato');
            else if (norm(doTexto).includes(ref) || ref.includes(norm(doTexto))) add('Contrato', 'ok');
            else add('Contrato', 'diverge', `a observação cita o contrato ${doTexto}, mas a SEGEST é do contrato ${segest.contrato}.`);
        }

        // 6. mês citado × competência da SEGEST
        {
            const nomes = ['JANEIRO', 'FEVEREIRO', 'MARCO', 'ABRIL', 'MAIO', 'JUNHO', 'JULHO', 'AGOSTO', 'SETEMBRO', 'OUTUBRO', 'NOVEMBRO', 'DEZEMBRO'];
            const semAcento = t.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toUpperCase();
            const citados = [...new Set([...semAcento.matchAll(/\b(JANEIRO|FEVEREIRO|MARCO|ABRIL|MAIO|JUNHO|JULHO|AGOSTO|SETEMBRO|OUTUBRO|NOVEMBRO|DEZEMBRO)\b/g)].map(m => m[1]))];
            const mesComp = Number(String(segest?.competencia || '').split('-')[1]) || null;
            if (!citados.length) add('Mês de referência', 'ausente');
            else if (!mesComp) add('Mês de referência', 'ausente', 'competência da SEGEST não lida');
            else {
                const outros = citados.filter(n => nomes.indexOf(n) + 1 !== mesComp);
                if (!outros.length) add('Mês de referência', 'ok');
                else add('Mês de referência', 'diverge', `a observação cita ${outros.map(n => n.charAt(0) + n.slice(1).toLowerCase()).join(' e ')}, mas a competência é ${String(segest.competencia).split('-').reverse().join('/')}.`);
            }
        }

        // 7. local de prestação citado × local da prestação da nota
        {
            // v2.4.4: aceita "LOCAL DE PRESTAÇÃO DE/DO SERVIÇO: ..." (Nevada); antes lia só "DE" como município
            const m = t.match(/LOCAL\s+(?:D[EA]\s+)?PRESTA[CÇ][AÃ]O(?:\s+D[EO]S?\s+SERVI[CÇ]OS?)?\s*:?\s*([A-Za-zÀ-ú' ]+?)(?=\s+(?:LIMPEZA|APOIO|PORTARIA|SERVI|-|\(|DADOS)|\s*[-(]|$)/i);
            const normM = x => normalizarMunicipio(x);
            if (!m || String(m[1]).replace(/[^A-Za-zÀ-ú]/g, '').length < 3) add('Local de prestação', 'ausente');
            else if (!d.localPrestacaoServico) add('Local de prestação', 'ausente', 'a nota não informa o local da prestação');
            // v2.4.5: o texto citado pode trazer prefixo ("TRT SANTA RITA DO SAPUCAI", Nevada): basta conter o município
            else if (normM(m[1]) === normM(d.localPrestacaoServico) || normM(d.localPrestacaoServico).startsWith(normM(m[1])) || normM(m[1]).startsWith(normM(d.localPrestacaoServico))
                || (normM(d.localPrestacaoServico).length >= 3 && normM(m[1]).includes(normM(d.localPrestacaoServico)))) add('Local de prestação', 'ok');
            else add('Local de prestação', 'diverge', `a observação cita ${m[1].trim()}, mas o local da prestação da nota é ${d.localPrestacaoServico}.`);
        }

        // 8. conta bancária citada × conta da contratação no SIGEO
        {
            const temTexto = /\b(?:C\/C|CONTA(?:\s+CORRENTE)?|CC)\b/i.test(t);
            const notaCb = formatarContaBancaria(extrairContaBancariaDoTexto(t));
            const cad = formatarContaBancaria(d.registro?.contratacao?.contaBancaria || null);
            const dig = x => String(x || '').replace(/\D/g, '');
            // com ou sem o dígito verificador: "9900-7" = "9900" + DV; "9" não é a mesma conta
            const mesmaConta = (a, b) => a === b || (a.length - b.length === 1 && a.startsWith(b)) || (b.length - a.length === 1 && b.startsWith(a));
            if (!temTexto) add('Conta bancária', 'ausente');
            else if (!dig(cad.conta)) add('Conta bancária', 'ausente', 'conta da contratação não informada no SIGEO');
            else if (!dig(notaCb.conta)) add('Conta bancária', 'diverge', `a observação não traz o número da conta (cadastro: ${cad.conta}).`);
            else if (!mesmaConta(dig(notaCb.conta), dig(cad.conta))) add('Conta bancária', 'diverge', `a observação traz a conta ${notaCb.conta}, mas a conta da contratação no SIGEO é ${cad.conta}.`);
            else add('Conta bancária', 'ok');
        }
        nota.observacaoConferida = itens;
        d.observacaoConferida = itens;   // v2.3.7: mostrado na aba "Dados das notas"
        return itens;
    }

    // v2.3.7: célula "Observações" da aba "Dados das notas". Antes o texto longo (APPA, ~1.300 caracteres)
    // não quebrava linha e passava por cima das colunas vizinhas. Agora fica numa caixa com rolagem e, no
    // topo, o resultado da conferência da observação (divergências em amarelo).
    function celulaObservacao(d) {
        const texto = escaparXml(String(d.observacoes || '').replace(/\s+/g, ' ').trim());
        const itens = d.observacaoConferida || null;
        let topo = '', fundo = '';
        if (itens && itens.length) {
            const div = itens.filter(i => i.estado === 'diverge');
            const ok = itens.filter(i => i.estado === 'ok').length;
            if (div.length) {
                fundo = `background:${CORES.AMARELO_CLARO};`;
                topo = `<div style="font-weight:600;color:#6d4c00;margin-bottom:4px;">⚠️ ${div.length} divergência(s) na observação:</div>`
                    + div.map(i => `<div style="color:#6d4c00;margin-bottom:2px;">• <b>${escaparXml(i.item)}</b>: ${escaparXml(i.detalhe)}</div>`).join('');
            } else if (ok) {
                topo = `<div style="font-weight:600;color:#1b5e20;margin-bottom:4px;">✅ Observação confere (${ok} item(ns) conferido(s))</div>`;
            }
        }
        return `<td id="ter-obs-${escaparXml(d.uuid || '')}" class="ter-quebra" style="min-width:360px;max-width:440px;vertical-align:top;${fundo}">${topo}`
            + `<div style="max-height:70px;overflow-y:auto;font-size:11px;color:#455a64;white-space:normal;overflow-wrap:anywhere;" title="Texto completo da observação">${texto}</div></td>`;
    }

    // v2.3.9: chave de ordenação da colagem como na classificação do Excel (sem diferenciar
    // maiúsculas e acentos; hífen e apóstrofo não contam). Empate mantém a ordem da SEGEST.
    function textoOrdemColagem(v) {
        return String(v ?? '').normalize('NFD').replace(/[\u0300-\u036f]/g, '')
            .replace(/[-'’]/g, '').replace(/\s+/g, ' ').trim().toLowerCase();
    }
    function chaveOrdemColagem(l, segest) {
        const abas = (segest?.abas || []).map(a => a.nome);
        const iAba = abas.indexOf(l.aba);
        return [iAba < 0 ? abas.length : iAba, textoOrdemColagem(l.tipoServico), textoOrdemColagem(l.localidade),
            textoOrdemColagem(l.posto), textoOrdemColagem(l.nome)];
    }
    function compararOrdemColagem(a, b) {
        const x = a._ordem || [], y = b._ordem || [];
        if ((x[0] ?? 0) !== (y[0] ?? 0)) return (x[0] ?? 0) - (y[0] ?? 0);
        for (let k = 1; k < 5; k++) {
            if ((x[k] ?? '') < (y[k] ?? '')) return -1;
            if ((x[k] ?? '') > (y[k] ?? '')) return 1;
        }
        return 0;
    }

    function conciliarSegest(docs, segest) {
        for (const d of segest?.devolucoesImr || []) d.usada = false; // v2.3.9
        for (const c of segest?.correcoesDiferenca || []) c.usada = false; // v2.5.46
        const res = { notas: [], linhasSemNota: [], alertas: [], linhasSaida: [], competencia: segest?.competencia || '' };
        if (!segest?.linhas?.length) return res;
        const cfg = CONFIG.segest;
        const perfilInss = perfilInssDoLote(docs);
        const codigoUnico = codigoInssUnicoDoLote(docs);
        const codigoDoPosto = (posto) => codigoUnico || codigoServicoDoPosto(posto, perfilInss);

        const porMunicipio = new Map();
        for (const original of segest.linhas) {
            // Cada reconciliação começa limpa: não reaproveita alvos da nota anterior
            // após troca de lote, planilha ou nova renderização da tela.
            const l = { ...original, _codigo: codigoDoPosto(original.posto), _alvoInss: null, _planoInss: null, _alvoIss: null, _alvoDivs: null };
            const k = normalizarMunicipio(l.localidade);
            if (!porMunicipio.has(k)) porMunicipio.set(k, []);
            porMunicipio.get(k).push(l);
        }
        const somaCent = (ls) => ls.reduce((s, l) => s + (centavos(l.valorTotal) || 0), 0);
        const usados = new Set();

        const docsOrdenados = [...docs].sort((a, b) => (Number(String(a.numero).replace(/\D/g, '')) || 0) - (Number(String(b.numero).replace(/\D/g, '')) || 0));
        res.notas = associarNotasSegest(docsOrdenados, porMunicipio);
        for (const nota of res.notas) {
            const d = nota.doc;
            if (!nota.linhas.length) continue;
            for (const l of nota.linhas) usados.add(l);

            // ---- Valor da NF × SEGEST ----
            nota.valorNF = centavos(d.valor);
            nota.somaSegest = somaCent(nota.linhas);
            if (nota.valorNF !== nota.somaSegest) {
                nota.erros.push(`Valor da NF (${Formatacao.formatarValorBrasileiro(d.valor)}) diferente da soma da SEGEST (${Formatacao.formatarValorBrasileiro(nota.somaSegest / 100)}).`);
            }
            for (const l of nota.linhas) {
                let diferencaGlosas = conferirGlosasPostoSegest(l);
                // v1.9.3: acréscimo/desconto de mês anterior demonstrado em aba de correção vai para
                // OUTROS com o sinal invertido (acréscimo = OUTROS negativo), como na Liquidação manual
                // de 07/2026 (Itabira, R$ 247,36 da "Correção Maio"). A conferência do posto fecha.
                const corr = diferencaGlosas ? correcaoQueExplica(l, diferencaGlosas, segest.correcoes) : null;
                if (corr) {
                    l.outros = Math.round(((Number(l.outros) || 0) - corr.centavos / 100) * 100) / 100;
                    nota.alertas.push(`${l.nome || l.posto}: ${corr.centavos > 0 ? 'acréscimo' : 'desconto'} de R$ ${Formatacao.formatarValorBrasileiro(Math.abs(corr.centavos) / 100)} da aba "${corr.aba}" (${corr.competencia}) lançado em OUTROS (${Formatacao.formatarValorBrasileiro(l.outros)}).`);
                    diferencaGlosas = conferirGlosasPostoSegest(l);
                }
                // v2.3.9: IMR de mês anterior devolvido (aba de devolução de IMR) vai para OUTROS negativo,
                // como no lançamento manual da Rio Minas de 08/2026 (Coronel Fabriciano, R$ 518,32 etc.).
                const dev = diferencaGlosas ? devolucaoImrQueExplica(l, diferencaGlosas, segest.devolucoesImr) : null;
                if (dev) {
                    dev.usada = true;
                    l.outros = Math.round(((Number(l.outros) || 0) - dev.centavos / 100) * 100) / 100;
                    nota.alertas.push(`${l.nome || l.posto}: IMR devolvido de R$ ${Formatacao.formatarValorBrasileiro(dev.centavos / 100)} da aba "${dev.aba}"${dev.periodo ? ` (${dev.periodo})` : ''} lançado em OUTROS (negativo).`);
                    diferencaGlosas = conferirGlosasPostoSegest(l);
                }
                // v2.5.46: correção de mês anterior com a diferença por CPF (ex.: cesta básica de setembro
                // descontada em outubro). Mesmo lançamento das correções acima: OUTROS com o sinal invertido.
                const cd = diferencaGlosas ? correcaoDiferencaQueExplica(l, diferencaGlosas, segest.correcoesDiferenca) : null;
                if (cd) {
                    cd.usada = true;
                    l.outros = Math.round(((Number(l.outros) || 0) - cd.centavos / 100) * 100) / 100;
                    nota.alertas.push(`${l.nome || l.posto}: ${cd.centavos > 0 ? 'acréscimo' : 'desconto'} de R$ ${Formatacao.formatarValorBrasileiro(Math.abs(cd.centavos) / 100)} da aba "${cd.aba}"${cd.periodo ? ` (${cd.periodo})` : ''} lançado em OUTROS${cd.centavos > 0 ? ' (negativo)' : ''}.`);
                    diferencaGlosas = conferirGlosasPostoSegest(l);
                }
                if (diferencaGlosas !== null && diferencaGlosas !== 0) {
                    nota.erros.push(`Glosas do posto ${l.nome || l.posto}, linha ${l.linhaPlanilha || '?'} da SEGEST: valor total difere em ${Formatacao.formatarValorBrasileiro(diferencaGlosas / 100)} do valor por empregado/dias menos IMR, VT, VA, cesta básica e outros.`);
                }
            }
            // v2.3.6: a nota tem material quando o texto destaca um valor (ou diz "COM MATERIAL").
            // A dedução na base do INSS é conferida com o SIGEO mais abaixo.
            const mt = d.materialTexto || extrairMaterialDoTexto(d.observacoes);
            nota.materialNota = mt.valor;                 // null = não achou no texto; 0 = "SEM MATERIAL"
            // valor "de material" igual ou maior que a nota é leitura errada do texto: descarta
            if (nota.materialNota !== null && nota.materialNota >= (Number(d.valorServico ?? d.valor) || Infinity)) nota.materialNota = null;
            nota.materialTextoInfo = mt;
            nota.temMaterial = Number(nota.materialNota) > 0 || (mt.com && !mt.sem);
            nota.materialSigeo = 0;                       // centavos deduzidos da base do INSS no SIGEO
            nota.materialComprovado = false;
            // v1.9.7: algumas notas (ex.: Rio Minas, limpeza) não trazem o valor do material em campo
            // legível, mas retêm IRRF + contribuições a 5,85%. Nesse caso a nota é tratada como
            // "com destaque de material": a Liquidação usa 5,85% nas DIVs e o ajuste fecha com a nota.
            if (!nota.temMaterial && !mt.sem) {
                const vsMat = Number(d.valorServico ?? d.valor) || 0;
                let fedMat = centavos(d.somaIrrfContribSociais);
                if (vsMat > 0 && fedMat !== null && fedMat > 0) {
                    const a945 = centavosExcel(vsMat * cfg.aliquotaDivs), a585 = centavosExcel(vsMat * cfg.aliquotaDivsComMaterial);
                    // v2.3.3: se IRRF + CSLL não casa com nenhuma das alíquotas, tenta o total com PIS/COFINS
                    const perto = v => Math.abs(v - a585) <= cfg.toleranciaDivsCentavos || Math.abs(v - a945) <= cfg.toleranciaDivsCentavos;
                    const fedTotal = centavos(d.retFedComPisCofins ?? null);
                    if (!perto(fedMat) && fedTotal !== null && fedTotal > 0 && perto(fedTotal)) fedMat = fedTotal;
                    if (Math.abs(fedMat - a585) <= cfg.toleranciaDivsCentavos && Math.abs(fedMat - a945) > cfg.toleranciaDivsCentavos) {
                        nota.temMaterial = true;
                        nota.alertas.push('Retenções federais da nota a 5,85%: tratada como nota com destaque de material (DIVs a 5,85%).');
                    }
                }
            }

            // ---- INSS por tipo de serviço ----
            const sigeoPorCodigo = new Map();
            for (const r of (d.retencoesPrevidenciarias || [])) {
                const cod = codigoServicoDaRetencao(r);
                if (!cod) { nota.erros.push(`Tipo de serviço do SIGEO não reconhecido: "${r.tipoServico || '—'}".`); continue; }
                const g = sigeoPorCodigo.get(cod) || { base: 0, ret: 0 };
                g.base += centavos(r.baseCalculo) || 0;
                g.ret += centavos(r.valorRetencao) || 0;
                sigeoPorCodigo.set(cod, g);
            }
            const segestPorCodigo = new Map();
            for (const l of nota.linhas) {
                l._codigo = codigoDoPosto(l.posto);
                if (!l._codigo) { nota.erros.push(`Posto "${l.posto}" (${l.nome}) sem tipo de serviço do INSS. Ajuste CONFIG.segest.regrasCodigoServicoPorPosto.`); continue; }
                if (!segestPorCodigo.has(l._codigo)) segestPorCodigo.set(l._codigo, []);
                segestPorCodigo.get(l._codigo).push(l);
            }
            const codigos = [...new Set([...segestPorCodigo.keys(), ...sigeoPorCodigo.keys()])].sort();
            for (const cod of codigos) {
                const ls = segestPorCodigo.get(cod) || [];
                const sg = sigeoPorCodigo.get(cod) || null;
                const baseSegest = somaCent(ls);
                const grupo = { codigo: cod, texto: textoCodigoServico(cod), linhas: ls, baseSegest, baseSigeo: sg?.base ?? null, retSigeo: sg?.ret ?? null };
                // v2.3.6: nota com material: a diferença entre a SEGEST e a base do SIGEO é o material deduzido.
                // Ele é distribuído pelos postos na proporção do valor (coluna "Valor destacado" da Liquidação).
                let matGrupo = 0;
                for (const l of ls) l._material = 0;
                if (sg && ls.length && nota.temMaterial && sg.base < baseSegest) {
                    matGrupo = baseSegest - sg.base;
                    const pesos = ls.map(l => Math.max(0, centavos(l.valorTotal) || 0));
                    const totalPeso = pesos.reduce((a, v) => a + v, 0);
                    if (totalPeso > 0) {
                        let distribuido = 0, maior = 0;
                        ls.forEach((l, i) => {
                            l._material = Math.floor(matGrupo * pesos[i] / totalPeso);
                            distribuido += l._material;
                            if (pesos[i] > pesos[maior]) maior = i;
                        });
                        ls[maior]._material += matGrupo - distribuido;
                    }
                    nota.materialSigeo += matGrupo;
                }
                grupo.material = matGrupo;
                if (!sg) nota.erros.push(`${grupo.texto}: há ${ls.length} posto(s) na SEGEST, mas a nota não tem retenção desse serviço no SIGEO.`);
                else if (!ls.length) nota.erros.push(`${grupo.texto}: há retenção no SIGEO (base ${Formatacao.formatarValorBrasileiro(sg.base / 100)}), mas nenhum posto desse serviço na SEGEST.`);
                else if (sg.base !== baseSegest - matGrupo) nota.erros.push(`${grupo.texto}: base de INSS do SIGEO (${Formatacao.formatarValorBrasileiro(sg.base / 100)}) diferente da soma da SEGEST (${Formatacao.formatarValorBrasileiro(baseSegest / 100)}).`);
                if (sg && ls.length) {
                    const taxaInss = taxaInssDaNota(d, cod, perfilInss, cfg);
                    grupo.aliquota = taxaInss;
                    const esperada = centavosExcel(((baseSegest - matGrupo) / 100) * taxaInss);
                    if (Math.abs(esperada - sg.ret) > 1) {
                        nota.alertas.push(`${grupo.texto}: retenção do SIGEO (${Formatacao.formatarValorBrasileiro(sg.ret / 100)}) diferente de ${Formatacao.formatarValorBrasileiro(taxaInss * 100)}% da base (${Formatacao.formatarValorBrasileiro(esperada / 100)}).`);
                        if ((d.cprbFornecedor ?? indicadorCprbRegistro(d.registro)) === null && taxaInss === cfg.aliquotaInss)
                            nota.alertas.push('Indicador CPRB não confirmado no cadastro do fornecedor. Confira a opção de contribuinte da receita bruta no SIGEO.');
                    }
                    Object.assign(grupo, fecharGrupo(ls, sg.ret, l => centavosExcel((((centavos(l.valorTotal) || 0) - (l._material || 0)) / 100) * taxaInss)));
                    if (grupo.status === 'divergente') nota.erros.push(`${grupo.texto}: diferença de ${Formatacao.formatarValorBrasileiro(grupo.ajuste / 100)} entre o INSS do SIGEO e o calculado por posto. Grande demais para ser arredondamento.`);
                    const planoValido = taxaInss !== cfg.aliquotaInss && sg.base === baseSegest
                        && Math.abs(esperada - sg.ret) <= 1 && ['ok', 'ajuste'].includes(grupo.status) && !nota.temMaterial
                        && nota.valorNF === nota.somaSegest;
                    for (const l of ls) {
                        l._alvoInss = sg.ret;
                        if (planoValido) l._planoInss = { aliquota: taxaInss, base: sg.base / 100, calculado: centavosExcel(l.valorTotal * taxaInss) / 100 };
                    }
                    if (taxaInss !== cfg.aliquotaInss && !planoValido) nota.erros.push(`${grupo.texto}: plano de INSS a ${taxaInss * 100}% não confirmado por base/retencão do SIGEO. Não aplicar a alíquota na macro.`);
                }
                nota.grupos.push(grupo);
            }
            const totalSigeo = (d.retencoesPrevidenciarias || []).reduce((s, r) => s + (centavos(r.valorRetencao) || 0), 0);
            const inssNota = centavos(d.xmlNumeroDivergente ? null : (d.xml?.inssRetido ?? d.pdf?.inssRetido));
            // v2.4.1: o aviso sai depois das DIVs, porque a diferença de centavos vai para elas.
            const difInssNotaSigeo = (inssNota !== null && inssNota !== totalSigeo) ? inssNota - totalSigeo : 0;

            // ---- v2.3.6: material destacado × dedução na base do INSS (SIGEO) ----
            {
                const vsNota = centavos(d.valorServico ?? d.valor) || 0;
                const matNotaC = nota.materialNota === null ? null : centavos(nota.materialNota);
                const fmtC = c => Formatacao.formatarValorBrasileiro(c / 100);
                if (matNotaC !== null && matNotaC > 0) {
                    if (!nota.materialSigeo) nota.alertas.push(`Material destacado na nota (R$ ${fmtC(matNotaC)}) não foi deduzido da base do INSS no SIGEO. O INSS segue o SIGEO.`);
                    else if (Math.abs(nota.materialSigeo - matNotaC) > 1) nota.alertas.push(`Material destacado na nota (R$ ${fmtC(matNotaC)}) diferente do deduzido da base do INSS no SIGEO (R$ ${fmtC(nota.materialSigeo)}). A colagem usa o valor do SIGEO.`);
                } else if (nota.materialSigeo > 0 && matNotaC === null && !faturamentoConfirmaMaterial(d, vsNota, nota.materialSigeo)) {
                    nota.alertas.push(`O SIGEO deduziu R$ ${fmtC(nota.materialSigeo)} da base do INSS como material, mas o valor do material não foi encontrado na observação da nota para conferir.`);
                } else if (matNotaC === 0 && nota.grupos.some(g => g.baseSigeo !== null && g.baseSigeo < g.baseSegest)) {
                    nota.alertas.push('A nota diz "SEM MATERIAL", mas a base do INSS no SIGEO é menor que o valor dos postos.');
                }
                if (nota.materialSigeo > 0 && vsNota > 0) {
                    const pct = nota.materialSigeo / vsNota;
                    if (pct > 0.20) {
                        nota.materialComprovado = true;
                        nota.alertas.push(`Material de ${(pct * 100).toFixed(2).replace('.', ',')}% do valor (acima de 20%), aceito na base do INSS do SIGEO: marcado como "material comprovado". Confira.`);
                    }
                }
            }
            for (const it of conferirObservacaoNota(nota, d, segest)) {
                if (it.estado === 'diverge') nota.alertas.push(`Observação da nota — ${it.item}: ${it.detalhe}`);
            }

            // v2.3.2: o PDF não veio; campos que só existem no PDF (ex.: retenções federais) ficam vazios
            if (d.falhaPdf) nota.alertas.push(`O PDF da nota não pôde ser baixado (${d.falhaPdf}). Os dados que só existem no PDF podem ter ficado vazios: processe a nota de novo antes de colar.`);

            // ---- ISSQN: fecha com a nota ----
            const valorServico = Number(d.valorServico ?? d.valor) || 0;
            const bcIss = Number(d.baseCalculoIssqn) || 0;
            const fatorBase = (bcIss > 0 && valorServico > 0 && bcIss < valorServico - 0.005) ? Math.round((bcIss / valorServico) * 10000) / 10000 : 1;
            const aliqIss = Number(d.aliquotaIssqn) > 0 ? Number(d.aliquotaIssqn) / 100 : null;
            let alvoIss = centavos(d.issqnRetido);
            if (alvoIss === null) nota.alertas.push('ISSQN retido não foi lido da nota (XML/PDF). A coluna de ajuste do ISSQN não será calculada.');
            else if (alvoIss === 0) { nota.alertas.push('A nota não tem ISSQN retido pelo tomador. A coluna de ajuste do ISSQN não será calculada.'); alvoIss = null; }
            nota.iss = aliqIss
                ? fecharGrupo(nota.linhas, alvoIss, l => centavosExcel((centavosExcel(l.valorTotal * fatorBase) / 100) * aliqIss))
                : { formula: null, alvo: alvoIss, ajuste: null, status: alvoIss === null ? 'sem-alvo' : 'sem-aliquota' };
            nota.iss.fatorBase = fatorBase;
            nota.iss.aliquota = aliqIss;
            if (nota.iss.status === 'divergente') nota.alertas.push(`ISSQN: diferença de ${Formatacao.formatarValorBrasileiro(nota.iss.ajuste / 100)} entre a nota e o cálculo por posto. Confira a alíquota no cadastro da Liquidação.`);
            for (const l of nota.linhas) l._alvoIss = alvoIss;

            // ---- DIVs (IRRF + PIS/COFINS/CSLL): fecha com a nota ----
            const taxaDivs = nota.temMaterial ? cfg.aliquotaDivsComMaterial : cfg.aliquotaDivs;
            let alvoDivs = centavos(d.somaIrrfContribSociais);
            const esperadoDivs = centavosExcel(valorServico * taxaDivs);
            // v2.3.3: o PDF Atende.Net traz PIS, COFINS, IR e CSLL separados; a soma histórica (IRRF + CSLL)
            // fica abaixo dos 9,45%. Se ela não fecha e o total com PIS/COFINS fecha, usa o total.
            const totalComPisCofins = centavos(d.retFedComPisCofins ?? null);
            if (alvoDivs !== null && Math.abs(alvoDivs - esperadoDivs) > cfg.toleranciaDivsCentavos
                && totalComPisCofins !== null && Math.abs(totalComPisCofins - esperadoDivs) <= cfg.toleranciaDivsCentavos) {
                alvoDivs = totalComPisCofins;
            }
            if (alvoDivs === null) nota.alertas.push('Retenções federais (IRRF + contribuições) não lidas da nota. A coluna de ajuste das DIVs não será calculada.');
            else if (Math.abs(alvoDivs - esperadoDivs) > cfg.toleranciaDivsCentavos) {
                // v2.4.2: preenche e avisa: a colagem fecha com as retenções da nota mesmo assim
                nota.alertas.push(`Retenções federais da nota (${Formatacao.formatarValorBrasileiro(alvoDivs / 100)}${totalComPisCofins !== null && totalComPisCofins !== alvoDivs ? `; com PIS/COFINS ${Formatacao.formatarValorBrasileiro(totalComPisCofins / 100)}` : ''}) longe de ${Formatacao.formatarValorBrasileiro(taxaDivs * 100)}% do valor (${Formatacao.formatarValorBrasileiro(esperadoDivs / 100)}). As DIVs foram ajustadas para fechar com a nota; confira.`);
            }
            // v2.4.3: DIVs são as retenções federais da nota (IR, CSLL, PIS, COFINS) e não absorvem a
            // diferença do INSS. O INSS fecha com o SIGEO; o líquido da Liquidação fica com a diferença.
            if (difInssNotaSigeo) {
                const fmt = c => Formatacao.formatarValorBrasileiro(c / 100);
                nota.alertas.push(`INSS da nota (${fmt(inssNota)}) diferente do total do SIGEO (${fmt(totalSigeo)}). A colagem usa o INSS do SIGEO e as DIVs da nota; o líquido da Liquidação fica ${fmt(Math.abs(difInssNotaSigeo))} ${difInssNotaSigeo > 0 ? 'acima' : 'abaixo'} do líquido da nota.`);
            }
            nota.divs = fecharGrupo(nota.linhas, alvoDivs, l => centavosExcel(l.valorTotal * taxaDivs));
            for (const l of nota.linhas) l._alvoDivs = alvoDivs;

            // v1.9.3: a Data Ateste NF da colagem vem do SIGEO; sem ateste a coluna iria vazia.
            if (CONFIG.dataAtesteNaColagem !== 'trd' && !d.ateste?.dataAteste) {
                nota.erros.push('Sem ateste no SIGEO: a coluna Data Ateste NF iria vazia.');
            }

            // ---- Centro de custo: rateio da Liquidação × ateste do SIGEO (v1.6.0) ----
            nota.cc = conferirCentroCustoNota(nota.linhas, d.ateste);
            if (nota.cc.status === 'divergente') nota.alertas.push(`Centro de custo: pelo rateio da Liquidação, 1ª instância ${fmtCent(nota.cc.p1)} e 2ª ${fmtCent(nota.cc.p2)}; no ateste do SIGEO, ${fmtCent(nota.cc.sigeo1)} e ${fmtCent(nota.cc.sigeo2)}.`);
            else if (nota.cc.status === 'arredondamento') nota.alertas.push(`Centro de custo: diferença só de arredondamento. O ateste do SIGEO (1ª ${fmtCent(nota.cc.sigeo1)}; 2ª ${fmtCent(nota.cc.sigeo2)}) aplica o rateio da Área Administrativa sobre o total, como a planilha da SEGEST; a Liquidação arredonda linha a linha (1ª ${fmtCent(nota.cc.p1)}; 2ª ${fmtCent(nota.cc.p2)}). Se precisar bater com o SIGEO, ajuste o centavo na Liquidação.`);
            else if (nota.cc.status === 'glosa') nota.alertas.push('Centro de custo: o ateste tem glosa; confira o rateio manualmente.');

            // ---- Linhas de saída ----
            for (const l of nota.linhas) {
                res.linhasSaida.push({
                    _ordem: chaveOrdemColagem(l, segest),
                    competencia: segest.competencia || '',
                    contrato: contratoAtualDoFornecedor(d.registro?.fornecedor?.documento || d.xml?.cnpj || d.pdf?.cnpj, d.numeroContrato || d.registro?.contratacao?.codigoContrato),
                    contratoOrigem: d.numeroContratoOrigem || d.numeroContrato || d.registro?.contratacao?.codigoContrato || '',
                    cnpjFornecedor: String(d.registro?.fornecedor?.documento || d.xml?.cnpj || d.pdf?.cnpj || '').replace(/\D/g, ''),
                    nf: nota.numero.replace(/\D/g, ''),
                    dataNF: String(d.dataEmissao || '').slice(0, 10),
                    dataAteste: String(d.ateste?.dataAteste || '').slice(0, 10),
                    valor: l.valorTotal,
                    material: nota.temMaterial ? 'Sim' : 'Não',
                    // v2.3.6: material deduzido da base do INSS, por posto, e "comprovado" acima de 20%
                    valorDestacado: l._material ? reaisDeCentavos(l._material) : '',
                    materialComprovado: nota.materialComprovado ? 'Sim' : '',
                    municipioPrestador: d.municipioPrestador || '',
                    ibgePrestador: (d.xmlNumeroDivergente ? null : d.xml?.codigoMunicipioPrestador) || d.pdf?.codigoMunicipioPrestador || '',
                    posto: l.posto,
                    localidade: l.localidade,
                    sublocalidade: l.sublocalidade ?? '',
                    codigoTexto: textoCodigoServico(l._codigo),
                    centroCusto: l.centroCusto ?? '',
                    qtdDias: l.qtdDias,
                    // v2.4.4: glosas com 2 casas, fechando o posto (só muda linha com glosa de 3+ casas)
                    ...(g => ({ imr: g.fatorRedutor, vt: g.vt, va: g.va, cesta: g.cesta ?? null, outros: g.outros ?? null }))(glosasComDuasCasas(l)),
                    aliquotaIss: aliqIss,
                    ibgeIss: String(d.codigoMunicipioIssqn || (!d.xmlNumeroDivergente && d.xml?.codigoMunicipioIssqn) || '').replace(/\D/g, ''),
                    baseIss: d.baseCalculoIssqn ?? null,
                    valorNF: d.valorServico ?? d.valor ?? null,
                    cpf: l.cpf,
                    nome: l.nome,
                    obs: l.ocorrencias ?? '',
                    municipio: l.localidade,
                    classificacao: classificacaoLiquidacao(l.tipoServico),
                    valorEmpregado: l.valorEmpregado,
                    qtdPeriodosSegest: l.periodosFaturamento?.length > 1 ? l.periodosFaturamento.length : null,
                    valorAntesGlosasSegest: l.periodosFaturamento?.length > 1
                        ? l.periodosFaturamento.reduce((s, p) => s + (p.valorEmpregado || 0) / 30 * (p.qtdDias || 0), 0) : null,
                    codigo: l._codigo || '',
                    alvoInss: reaisDeCentavos(l._alvoInss ?? null),
                    aliquotaInss: l._planoInss?.aliquota ?? null,
                    baseInssSigeo: l._planoInss?.base ?? null,
                    inssCalculadoPosto: l._planoInss?.calculado ?? null,
                    situacaoInss: l._planoInss ? 'OK' : '', 
                    alvoIss: reaisDeCentavos(l._alvoIss ?? null),
                    alvoDivs: reaisDeCentavos(l._alvoDivs ?? null),
                    situacao: nota.erros.length ? 'CONFERIR' : 'OK',
                    // v2.3.2: o que o painel mostra em amarelo/vermelho segue na colagem para a macro exibir
                    alertasNF: [...nota.erros.map(e => 'ERRO: ' + e), ...nota.alertas].join(' | '),
                    cc1: d.ateste ? d.ateste.valorPrimeiroGrau : null,
                    cc2: d.ateste ? d.ateste.valorSegundoGrau : null,
                });
            }
        }

        for (const [k, ls] of porMunicipio.entries()) {
            const restantes = ls.filter(l => !usados.has(l));
            if (restantes.length) res.linhasSemNota.push({ localidade: ls[0].localidade, quantidade: restantes.length, valor: somaCent(restantes) / 100 });
        }
        res.totalErros = res.notas.reduce((s, n) => s + n.erros.length, 0);
        // v2.3.9: ordem do procedimento da Seção, aba por aba da SEGEST (na ordem do arquivo):
        // 1º Tipo de serviço, 2º Localidade, 3º Posto de Trabalho, 4º Terceirizado.
        res.linhasSaida.sort(compararOrdemColagem);
        return res;
    }

    /* ---- Colagem na Liquidação ("2- Dados Faturamento") ----
     * TSV COM cabeçalho. A macro encaixa cada informação pelo NOME do campo, nunca pela posição.
     * Campos sem "@" têm o mesmo nome do cabeçalho da Liquidação e vão direto para a coluna.
     * Campos com "@" são de apoio: a macro usa para achar códigos e calcular os ajustes. */
    // v6: cesta básica independente de outros e identificação fiscal do ISSQN.
    const MARCADOR_COLAGEM_LIQUIDACAO = 'ROBO_SEGEST_LIQ_v6';
    const CAMPOS_COLAGEM_LIQUIDACAO = [
        ['Ano/Mês', l => l.competencia],
        ['Nota Fiscal', l => l.nf],
        ['Data NF', l => l.dataNF],
        ['Data Ateste NF', l => l.dataAteste],
        ['Valor Bruto NF', l => l.valor],
        ['Destaque material na NF?', l => l.material],
        ['Cargo Confere', l => l.posto],
        ['Localidade Confere', l => l.localidade],
        ['Sublocalidade', l => l.sublocalidade],
        ['Código Tipo de Serviço', l => l.codigoTexto],
        ['Centro de Custo', l => l.centroCusto],
        // v1.9.4: "Centro de Custo 1ª" e "Centro de Custo 2ª" (102/202) NÃO vão na colagem:
        // essas colunas ficam em branco e são preenchidas fora do robô.
        ['Qtd Dias', l => l.qtdDias],
        ['IMR', l => l.imr],
        ['VT', l => l.vt],
        ['VA', l => l.va],
        ['Cesta Básica', l => l.cesta],
        ['OUTROS', l => l.outros],
        ['CPF Funcionário CV', l => l.cpf],
        ['Funcionário CV', l => l.nome],
        ['Observações', l => l.obs],
        ['@Município', l => l.municipio],
        ['@Classificação', l => l.classificacao],
        ['@Valor por Empregado', l => l.valorEmpregado],
        ['@Cód. Serviço INSS', l => l.codigo],
        ['@INSS SIGEO do serviço na NF', l => l.alvoInss],
        ['@ISSQN da NF', l => l.alvoIss],
        ['@DIVs da NF', l => l.alvoDivs],
        ['@Situação', l => l.situacao],
        // v2: TRD (a macro já abre a tela "estão corretas?" com competência e PROAD preenchidos)
        ['@Competência', l => l.compTRD],
        ['@PROAD Pgto', l => l.proadTRD],
        ['@TRD', l => l.trdResumo],
        ['@TRD Valor Global', l => l.trdValor],
        ['@Situação TRD', l => l.sitTRD],
        ['@SEGEST', l => l.situacao],     // não declarar OK quando a conciliação tem divergência
        ['@CC 1ª SIGEO da NF', l => l.cc1],
        ['@CC 2ª SIGEO da NF', l => l.cc2],
        // Plano de alíquota específica; macro v1.7.3 valida antes de escrever.
        ['@Alíquota INSS', l => l.aliquotaInss],
        ['@BC INSS SIGEO do serviço na NF', l => l.baseInssSigeo],
        ['@INSS calculado do posto', l => l.inssCalculadoPosto],
        ['@Situação INSS', l => l.situacaoInss],
        ['@Contrato', l => l.contrato],
        ['@Contrato de origem', l => l.contratoOrigem],
        ['@CNPJ Fornecedor', l => l.cnpjFornecedor],
        ['@Alíquota ISSQN', l => l.aliquotaIss], // fração: 0.04 = 4%
        ['@Cód. IBGE ISSQN', l => l.ibgeIss],
        ['@BC ISSQN da NF', l => l.baseIss],
        ['@Valor total da NF', l => l.valorNF],
        // v2.3.2: alertas da nota (separados por " | "); macro v1.9.3 mostra antes de colar e grava no log
        ['@Alertas da NF', l => l.alertasNF],
        // v2.3.6: a macro v1.9.8 confere com a aba "0- Cadastro Tributação"
        ['@Município do prestador', l => l.municipioPrestador],
        ['@Cód. IBGE do prestador', l => l.ibgePrestador],
        // v2.3.6: no fim da lista para não mudar a posição das colunas antigas no CSV (a macro usa os nomes)
        ['Valor destacado', l => l.valorDestacado],
        ['Valor do material foi comprovado?', l => l.materialComprovado],
        // v2.5.29: opcionais, no fim para preservar a posição de todos os campos anteriores.
        // Macro v2.0.2 usa a soma antes das glosas para complementar a fórmula do cadastro.
        ['@Qtd períodos SEGEST', l => l.qtdPeriodosSegest],
        ['@Valor antes das glosas SEGEST', l => l.valorAntesGlosasSegest],
    ];

    // Números com ponto decimal e sem milhar (a macro lê com Val, que independe do idioma do
    // Windows). Quebras de linha viram "\n" literal; tabulação vira espaço.
    function campoTsvLiquidacao(v) {
        if (v === null || v === undefined) return '';
        if (typeof v === 'number') return Number.isFinite(v) ? String(Math.round(v * 1e6) / 1e6) : '';
        // v1.8.1: a planilha da SEGEST traz alguns textos com o acento separado da letra
        // ("operac¸o~es"); o Excel grava assim e a comparação com os cadastros falha.
        return String(v).normalize('NFC').replace(/\t/g, ' ').replace(/\r\n|\r|\n/g, '\\n');
    }

    function gerarCsvLiquidacao(conciliacao) {
        const SEP = ';';
        const cabecalhos = ['Ordem', ...CAMPOS_COLAGEM_LIQUIDACAO.map(c => c[0])];
        // v1.9.5: texto com o mesmo NFC da colagem; quebras de linha ficam dentro do campo (entre aspas)
        const campo = v => typeof v === 'number' ? (Number.isFinite(v) ? String(Math.round(v * 1e6) / 1e6).replace('.', ',') : '')
            : String(v ?? '').normalize('NFC');
        const linhas = conciliacao.linhasSaida.map((l, i) => [String(i + 1), ...CAMPOS_COLAGEM_LIQUIDACAO.map(c => campo(c[1](l)))]);
        return '\uFEFF' + [cabecalhos, ...linhas]
            .map(l => l.map(v => escaparCampoCsv(v, SEP)).join(SEP)).join('\r\n');
    }

    function gerarTsvLiquidacao(conciliacao) {
        const cab = [MARCADOR_COLAGEM_LIQUIDACAO, ...CAMPOS_COLAGEM_LIQUIDACAO.map(c => c[0])];
        const linhas = conciliacao.linhasSaida.map((l, i) => [String(i + 1), ...CAMPOS_COLAGEM_LIQUIDACAO.map(c => campoTsvLiquidacao(c[1](l)))]);
        return [cab, ...linhas].map(l => l.join('\t')).join('\r\n');
    }

    /* ---- Interface: importar, conferir e copiar ---- */
    function escolherArquivoSegest() {
        if (typeof XLSX === 'undefined') {
            mostrarErroSnackbar('A biblioteca de planilhas não carregou. Confira a linha @require do xlsx no cabeçalho do robô e recarregue a página.');
            return;
        }
        const input = document.createElement('input');
        input.type = 'file';
        input.accept = '.xlsx,.xlsm,.xls';
        input.style.display = 'none';
        input.onchange = async () => {
            const arquivo = input.files?.[0];
            input.remove();
            if (arquivo) await importarArquivoSegest(arquivo);
        };
        document.body.appendChild(input);
        input.click();
    }

    async function importarArquivoSegest(arquivo) {
        try {
            const buffer = await arquivo.arrayBuffer();
            const workbook = XLSX.read(buffer, { type: 'array' });
            const lido = lerPlanilhaSegest(workbook, arquivo.name);
            if (!lido.linhas.length) {
                mostrarErroSnackbar(`Nenhuma aba de faturamento encontrada em "${arquivo.name}". O robô procura CPF, Posto de Trabalho e Valor Total (ou o layout completo Valor Total a Faturar).`);
                lido.avisos.forEach(a => console.warn('[SIGEO-Terceirizados] SEGEST:', a));
                return;
            }
            const outraEmpresa = erroPlanilhaDeOutraEmpresa(lido);
            if (outraEmpresa) {
                console.warn('[SIGEO-Terceirizados] SEGEST recusada:', outraEmpresa);
                mostrarErroSnackbar(`${outraEmpresa} Nada foi importado.`);
                return;
            }
            Object.assign(SEGEST, lido);
            const total = lido.linhas.reduce((s, l) => s + (centavos(l.valorTotal) || 0), 0) / 100;
            console.log(`[SIGEO-Terceirizados] SEGEST importada: ${lido.linhas.length} posto(s), R$ ${Formatacao.formatarValorBrasileiro(total)}, competência ${lido.competencia || '?'}.`, lido.abas);
            lido.avisos.forEach(a => console.warn('[SIGEO-Terceirizados] SEGEST:', a));
            mostrarSucessoSnackbar(`SEGEST importada: ${lido.linhas.length} postos (R$ ${Formatacao.formatarValorBrasileiro(total)}).`);
            atualizarBotaoSegest();
            atualizarTelaFinal();
        } catch (e) {
            console.error('[SIGEO-Terceirizados] Erro ao ler a planilha da SEGEST:', e);
            mostrarErroSnackbar(`Não foi possível ler a planilha: ${e.message}`);
        }
    }

    function rotuloBotaoSegest() {
        return SEGEST.linhas.length ? `📥 SEGEST ✓ (${SEGEST.linhas.length})` : '📥 Importar SEGEST';
    }

    function atualizarBotaoSegest() {
        const wrapper = document.querySelector('#sigeo-ter-botao-segest .mat-button-wrapper');
        if (wrapper) wrapper.textContent = rotuloBotaoSegest();
        const doModal = document.getElementById('ter-importar-segest');
        if (doModal) doModal.textContent = SEGEST.linhas.length ? '📥 Trocar planilha SEGEST' : '📥 Importar SEGEST';
    }

    function garantirBotaoImportarSegest() {
        if (document.getElementById('sigeo-ter-botao-segest')) return;
        const processar = document.getElementById('sigeo-ter-botao-processar');
        if (!processar?.parentElement) return;
        const botao = document.createElement('button');
        botao.id = 'sigeo-ter-botao-segest';
        botao.className = 'mat-focus-indicator mat-button mat-button-base';
        botao.style.cssText = 'background-color:#4a148c;color:#fff;margin-left:4px;';
        botao.title = 'Importar a planilha de faturamento da SEGEST para conferir as notas e montar a colagem da Liquidação';
        botao.onclick = escolherArquivoSegest;
        botao.innerHTML = `<span class="mat-button-wrapper">${rotuloBotaoSegest()}</span>`;
        processar.parentElement.insertBefore(botao, processar.nextSibling);
    }

    const fmtCent = (c) => (c === null || c === undefined) ? '' : Formatacao.formatarValorBrasileiro(c / 100);
    const fmtAjuste = (g) => {
        if (!g || g.status === 'sem-alvo' || g.status === 'sem-aliquota') return '<span style="color:#888;">—</span>';
        if (g.status === 'ok') return '✅ 0,00';
        const cor = g.status === 'ajuste' ? '#e65100' : '#b71c1c';
        return `<span style="color:${cor};font-weight:600;">${g.status === 'ajuste' ? '' : '⚠️ '}${g.ajuste > 0 ? '+' : ''}${fmtCent(g.ajuste)}</span>`;
    };
    const celulaConfere = (a, b) => (a === null || b === null || a === undefined || b === undefined)
        ? `<td style="background:${CORES.AMARELO_CLARO}">${fmtCent(a ?? b)} ℹ️</td>`
        : `<td style="background:${a === b ? CORES.VERDE_CLARO : CORES.VERMELHO_CLARO}">${fmtCent(a)} ${a === b ? '✅' : '⚠️'}</td>`;

    /* ====================================================================================
     * 10.2 TELA DE RESULTADO [v1.6.0]
     *  Três etapas na ordem do trabalho (TRD → SEGEST → copiar), uma faixa única de avisos
     *  e duas abas: a conferência por nota (o que importa para liquidar) e os dados brutos
     *  das notas (SIGEO/XML/PDF), onde ficam também as exportações.
     * ==================================================================================== */
    let _ultimaConciliacao = null;
    let _ultimaAnaliseTRD = null;

    // Centro de custo: rateio da Liquidação (mesma fórmula das colunas "Valor 1ª/2ª instância")
    // × valores de 1º e 2º grau do ateste no SIGEO.
    function conferirCentroCustoNota(linhas, ateste) {
        const r = CONFIG.segest.rateioAreaAdministrativa;
        let p1 = 0, p2 = 0;
        const desconhecidos = new Set();
        for (const l of linhas) {
            const v = Number(l.valorTotal) || 0;
            const cc = normalizarTextoSegest(l.centroCusto);
            if (/ADMINISTRATIV/.test(cc)) { p1 += centavosExcel(v * r.primeira); p2 += centavosExcel(v * r.segunda); }
            else if (/^1/.test(cc)) p1 += centavosExcel(v);
            else if (/^2/.test(cc)) p2 += centavosExcel(v);
            else desconhecidos.add(l.centroCusto || '(vazio)');
        }
        const res = { p1, p2, sigeo1: null, sigeo2: null, status: 'ok' };
        if (desconhecidos.size) return { ...res, status: 'sem-cc', erro: `Centro de custo da SEGEST não reconhecido: ${[...desconhecidos].join(', ')}.` };
        if (!ateste) return { ...res, status: 'sem-ateste' };
        res.sigeo1 = centavos(ateste.valorPrimeiroGrau);
        res.sigeo2 = centavos(ateste.valorSegundoGrau);
        if (Number(ateste.valorGlosa) > 0) return { ...res, status: 'glosa' };
        res.d1 = res.sigeo1 - p1;
        res.d2 = res.sigeo2 - p2;
        if (res.d1 !== 0 || res.d2 !== 0) res.status = 'divergente';
        // v2.5.52: o ateste pode aplicar o rateio da Área Administrativa sobre o total (como a planilha da
        // SEGEST), e a Liquidação, linha a linha. Se o SIGEO bate exatamente com o rateio sobre o total, é
        // arredondamento: continua alerta, explicado.
        if (res.status === 'divergente') {
            let adm = 0, n1 = 0, n2 = 0, qtdAdm = 0;
            for (const l of linhas) {
                const v = Number(l.valorTotal) || 0, cc = normalizarTextoSegest(l.centroCusto);
                if (/ADMINISTRATIV/.test(cc)) { adm += centavosExcel(v); qtdAdm++; }
                else if (/^1/.test(cc)) n1 += centavosExcel(v);
                else if (/^2/.test(cc)) n2 += centavosExcel(v);
            }
            const q1 = n1 + centavosExcel((adm / 100) * r.primeira), q2 = n2 + centavosExcel((adm / 100) * r.segunda);
            if (qtdAdm > 1 && q1 === res.sigeo1 && q2 === res.sigeo2 && Math.abs(res.d1) <= qtdAdm && Math.abs(res.d2) <= qtdAdm) {
                res.status = 'arredondamento'; res.q1 = q1; res.q2 = q2;
            }
        }
        return res;
    }

    // Leva o TRD para as linhas da colagem (competência, PROAD, data do ateste e situação)
    function completarLinhasComTRD(conc, info) {
        const p = info?.principal || null;
        for (const l of conc.linhasSaida) {
            const nf = Number(l.nf) || null;
            const v = info?.porNota.get(nf);
            l.compTRD = p?.competencia || '';
            l.proadTRD = p ? (p.proadProvidencia || p.processo || '') : '';
            l.trdResumo = resumoTRD(p);
            l.trdValor = p?.valorGlobal ?? null;
            l.sitTRD = TRD.estado === 'ok' ? (v?.situacao || 'SEM TRD') : '';
            // v1.9.3: por padrão fica a data do ateste da própria nota no SIGEO
            if (CONFIG.dataAtesteNaColagem === 'trd' && v?.trd?.dataTRD) l.dataAteste = v.trd.dataTRD;
        }
    }

    function exibirModalFinal() {
        document.getElementById('sigeo-ter-modal-progresso')?.remove();
        document.getElementById('sigeo-ter-modal-final')?.remove();

        // O lote foi inicializado antes da extração. Preserva a busca em segundo plano,
        // inclusive quando ela já terminou antes de abrir esta tela.

        const copiaTudo = gerarLinhasCopia(documentosProcessados);
        const total = documentosProcessados.length;
        const comErro = documentosProcessados.filter(d => d.status === 'erro').length;

        const modal = document.createElement('div');
        modal.id = 'sigeo-ter-modal-final';
        modal.innerHTML = `
            <div class="caixa ter-caixa">
                <header class="ter-topo">
                    <div>
                        <h2>👷 Liquidação de terceirizados</h2>
                        <div class="ter-sub">${total} nota(s) processada(s)${comErro ? ` · <span style="color:#b71c1c;">${comErro} com erro</span>` : ''}</div>
                    </div>
                    <button id="ter-fechar-modal" class="ter-fechar" title="Fechar">✕</button>
                </header>
                <div id="ter-etapas" class="ter-etapas"></div>
                <div id="ter-alertas"></div>
                <nav class="ter-abas">
                    <button data-aba="conferencia" class="ativa">Conferência por nota</button>
                    <button data-aba="dados">Dados das notas (SIGEO, XML e PDF)</button>
                </nav>
                <section id="ter-aba-conferencia"></section>
                <section id="ter-aba-dados" hidden>
                    <div class="ter-exportar">
                        <button id="ter-copiar-tudo" class="ter-btn ter-sec">📋 Copiar todas as colunas</button>
                        <button id="ter-baixar-csv" class="ter-btn ter-sec">⬇️ CSV das notas</button>
                        <button id="ter-baixar-xml" class="ter-btn ter-sec">⬇️ XML</button>
                    </div>
                    ${htmlTabelaDadosNotas()}
                </section>
            </div>`;
        document.body.appendChild(modal);

        document.getElementById('ter-fechar-modal').onclick = () => modal.remove();
        modal.querySelectorAll('.ter-abas button').forEach(b => b.addEventListener('click', () => {
            modal.querySelectorAll('.ter-abas button').forEach(x => x.classList.toggle('ativa', x === b));
            document.getElementById('ter-aba-conferencia').hidden = b.dataset.aba !== 'conferencia';
            document.getElementById('ter-aba-dados').hidden = b.dataset.aba !== 'dados';
        }));
        document.getElementById('ter-copiar-tudo').onclick = () => { if (erroLoteSigeo) { mostrarErroSnackbar(erroLoteSigeo); return; } copiarClipboard(copiaTudo); mostrarSucessoSnackbar('Copiado!'); };
        document.getElementById('ter-baixar-csv').onclick = () => baixarCsvNotas();
        document.getElementById('ter-baixar-xml').onclick = () => {
            if (erroLoteSigeo) { mostrarErroSnackbar(erroLoteSigeo); return; }
            baixarArquivo(gerarXmlExportacao(documentosProcessados), nomeArquivoExportacao('xml'), 'application/xml;charset=utf-8');
            mostrarSucessoSnackbar('XML baixado!');
        };
        modal.querySelectorAll('.ter-btn-xml').forEach(btn => btn.addEventListener('click', () => {
            const doc = documentosProcessados.find(d => d.uuid === btn.dataset.uuid);
            if (doc?.xml?.xmlCompleto) { const w = window.open('', '_blank'); w.document.write(`<pre>${doc.xml.xmlCompleto.replace(/</g, '&lt;')}</pre>`); }
        }));
        modal.querySelectorAll('.ter-btn-pdf').forEach(btn => btn.addEventListener('click', () => {
            const doc = documentosProcessados.find(d => d.uuid === btn.dataset.uuid);
            if (doc?.pdf?.blob) { const url = URL.createObjectURL(doc.pdf.blob); window.open(url, '_blank'); }
        }));
        // Um clique em qualquer botão das etapas (eles são recriados a cada atualização)
        modal.addEventListener('click', (ev) => {
            const acao = ev.target.closest('[data-acao]')?.dataset.acao;
            if (acao === 'trd') buscarTRDNoProad();
            else if (acao === 'segest') escolherArquivoSegest();
            else if (acao === 'copiar') copiarParaLiquidacao();
            else if (acao === 'csv-liquidacao') baixarCsvLiquidacao();
            else if (acao === 'csv-notas') baixarCsvNotas();
            else if (acao === 'retomar') void retomarLoteTerceirizados();
        });

        atualizarTelaFinal();
        if (CONFIG.proad.buscarAutomaticamente && TRD.estado === 'inicial' && documentosProcessados.some(d => d.status !== 'erro')) void buscarTRDNoProad();
    }

    function atualizarStatusBuscaProad() {
        const el = document.getElementById('ter-proad-progresso');
        if (el) el.textContent = TRD.estado === 'buscando'
            ? `TRD em segundo plano: ${TRD.andamento || 'Buscando…'}`
            : TRD.estado === 'erro' ? `TRD: ${TRD.erro}`
            : TRD.estado === 'ok' ? `Busca concluída: ${TRD.trds.length} TRD(s)${CONFIG.proad.buscarCertidoes ? ` e ${TRD.certidoesDocumentos.filter(s => s.confirmado).length} documento(s) de certidões lido(s)` : ''}. A conferência usa todas as notas do lote.`
            : 'TRD: ainda não buscado.';
        atualizarTelaFinal();
    }

    function atualizarTelaFinal() {
        if (!document.getElementById('sigeo-ter-modal-final')) return;
        const conc = SEGEST.linhas.length ? conciliarSegest(documentosProcessados, SEGEST) : null;
        const info = analisarTRD();
        if (conc) completarLinhasComTRD(conc, info);
        _ultimaConciliacao = conc;
        // v2.3.7: a aba "Dados das notas" é montada antes da conciliação; atualiza só as células de observação
        for (const d of documentosProcessados) {
            const celula = d.uuid ? document.getElementById(`ter-obs-${d.uuid}`) : null;
            if (celula) celula.outerHTML = celulaObservacao(d);
        }
        _ultimaAnaliseTRD = info;
        const avisos = coletarAvisos(conc, info);
        document.getElementById('ter-etapas').innerHTML = htmlEtapas(conc, info, avisos);
        document.getElementById('ter-alertas').innerHTML = htmlAvisos(avisos);
        document.getElementById('ter-aba-conferencia').innerHTML = conc ? htmlConferenciaSegest(conc, info) : htmlConferenciaSemSegest(info);
    }

    // v1.9.3: duas notas com o mesmo número do mesmo fornecedor no lote = soma em dobro.
    function conferirNotasRepetidas() {
        const grupos = new Map();
        for (const d of documentosProcessados.filter(x => x.status !== 'erro')) {
            const nf = numeroNF(d);
            if (!nf) continue;
            const cnpj = String(d.registro?.fornecedor?.documento || '').replace(/\D/g, '');
            const k = `${cnpj}|${nf}`;
            if (!grupos.has(k)) grupos.set(k, []);
            grupos.get(k).push(d);
        }
        const msgs = [];
        for (const docs of grupos.values()) {
            if (docs.length < 2) continue;
            const desc = docs.map(d => {
                const sit = situacaoRegistroSigeo(d.registro);
                const at = d.ateste?.dataAteste ? `ateste ${Formatacao.formatarDataBrasileira(String(d.ateste.dataAteste).slice(0, 10))}` : 'sem ateste';
                return [sit, at, d.xmlNumeroDivergente ? 'XML de outra nota' : ''].filter(Boolean).join(', ');
            });
            msgs.push(`NF ${docs[0].numero} aparece ${docs.length} vezes no lote (${desc.join(' | ')}). Desmarque o registro devolvido/substituído e processe de novo; senão o valor entra em dobro.`);
        }
        return msgs;
    }

    function coletarAvisos(conc, info) {
        const erros = [], alertas = [];
        if (erroLoteSigeo) erros.push(erroLoteSigeo);
        erros.push(...conferirNotasRepetidas());
        // Visível desde a primeira nota, mesmo antes da importação da SEGEST/TRD.
        for (const d of documentosProcessados.filter(x => x.status !== 'erro')) {
            const uf = conferirUFsNota(d);
            erros.push(...uf.erros.map(msg => `NF ${d.numero || '?'}: ${msg}`));
            alertas.push(...uf.alertas.map(msg => `NF ${d.numero || '?'}: ${msg}`));
        }
        if (notasForaDoLote.length) alertas.push(`Fora do lote por estarem devolvidas/canceladas no SIGEO: ${notasForaDoLote.map(n => `NF ${n.numero} (${n.situacao}, R$ ${Formatacao.formatarValorBrasileiro(n.valor)})`).join('; ')}.`);
        for (const d of documentosProcessados.filter(x => x.status === 'erro')) erros.push(`NF ${d.numero || '?'}: não processada (${d.erro || 'erro'}).`);
        if (TRD.estado === 'erro') erros.push(`TRD: ${TRD.erro}`);
        erros.push(...info.erros);
        alertas.push(...info.alertas);
        if (TRD.estado === 'ok' && TRD.falhas.length) alertas.push(`PROAD: ${TRD.falhas.length} documento(s) não puderam ser lidos (detalhes no console).`);
        const outraEmpresa = conc ? erroPlanilhaDeOutraEmpresa() : '';
        if (outraEmpresa) erros.push(outraEmpresa);
        if (conc && !outraEmpresa) {
            for (const n of conc.notas) {
                if (n.doc?.status === 'erro') continue;
                if (!n.linhas.length) erros.push(`NF ${n.numero}: não foi cruzada com a planilha da SEGEST e NÃO entra na colagem. ${n.erros.join(' ')}`);
                else if (n.erros.length) erros.push(`NF ${n.numero}: ${n.erros.length} divergência(s) na conferência (veja a linha da nota na tabela).`);
                if (n.cc?.status === 'divergente') {
                    const partes = [];
                    if (n.cc.d1) partes.push(`1ª instância ${n.cc.d1 > 0 ? '+' : ''}${fmtCent(n.cc.d1)}`);
                    if (n.cc.d2) partes.push(`2ª instância ${n.cc.d2 > 0 ? '+' : ''}${fmtCent(n.cc.d2)}`);
                    alertas.push(`NF ${n.numero}: o rateio do centro de custo pela Liquidação difere do ateste do SIGEO (${partes.join(', ')}). Confira o rateio manualmente; a macro preserva as fórmulas.`);
                }
                if (n.cc?.status === 'arredondamento') alertas.push(`NF ${n.numero}: centro de custo com diferença só de arredondamento (1ª ${n.cc.d1 > 0 ? '+' : ''}${fmtCent(n.cc.d1)}, 2ª ${n.cc.d2 > 0 ? '+' : ''}${fmtCent(n.cc.d2)}): o SIGEO rateia a Área Administrativa sobre o total; a Liquidação, linha a linha.`);
                if (n.cc?.erro) alertas.push(`NF ${n.numero}: ${n.cc.erro}`);
            }
            if (conc.linhasSemNota.length) erros.push(`Postos da SEGEST sem nota neste lote (não entram na colagem): ${conc.linhasSemNota.map(s => `${s.localidade} (${s.quantidade} posto(s), R$ ${Formatacao.formatarValorBrasileiro(s.valor)})`).join('; ')}.`);
            for (const a of SEGEST.avisos) alertas.push(`Planilha da SEGEST: ${a}`);
        }
        return { erros, alertas };
    }

    function htmlEtapas(conc, info, avisos) {
        // 1. TRD
        let c1, s1, b1;
        if (TRD.estado === 'buscando') { s1 = 'pendente'; c1 = `<span class="ter-girando"></span> ${escaparXml(TRD.andamento || 'Buscando…')}`; b1 = '<button class="ter-btn ter-sec" disabled>Buscando…</button>'; }
        else if (TRD.estado === 'erro') { s1 = 'erro'; c1 = escaparXml(TRD.erro); b1 = '<button class="ter-btn" data-acao="trd">🔎 Buscar de novo</button>'; }
        else if (TRD.estado === 'ok' && info.principal) {
            const p = info.principal;
            s1 = info.erros.length ? 'erro' : (info.alertas.length ? 'atencao' : 'ok');
            c1 = `<b>${escaparXml(p.proadProvidencia || p.processo)}</b> · ${escaparXml(resumoTRD(p).split(' · ').slice(1).join(' · '))}`
                + (p.dataTRD ? `<div class="ter-mini">Data do TRD ${Formatacao.formatarDataBrasileira(p.dataTRD)} · PROAD principal ${escaparXml(TRD.principal)}</div>` : '')
                + (CONFIG.proad.buscarCertidoes ? `<div class="ter-mini">${info.certidoes ? escaparXml(resumoCertidoes(info.certidoes)) : 'Validades das certidões não lidas'}</div>` : '')
                + (TRD.certidoesDocumentos.length ? `<div class="ter-mini">Documentos verificados: ${escaparXml(resumoDocumentosCertidoes(p.processo))}</div>` : '');
            b1 = '<button class="ter-btn ter-sec" data-acao="trd">Buscar de novo</button>';
        } else if (TRD.estado === 'ok') { s1 = 'erro'; c1 = escaparXml(info.erros.join(' ') || 'Nenhum TRD encontrado para estas notas.') + '<div class="ter-mini">' + escaparXml(TRD.falhas.join(' · ')) + '</div>'; b1 = '<button class="ter-btn" data-acao="trd">🔎 Buscar de novo</button>'; }
        else { s1 = 'pendente'; c1 = 'Ainda não buscado.'; b1 = '<button class="ter-btn" data-acao="trd">🔎 Buscar TRD no PROAD</button>'; }

        // 2. SEGEST
        let c2, s2, b2;
        const outraEmpresa2 = conc ? erroPlanilhaDeOutraEmpresa() : '';
        if (!conc) { s2 = 'pendente'; c2 = 'Junte a planilha de faturamento do mês.'; b2 = '<button class="ter-btn" data-acao="segest">📥 Juntar planilha da SEGEST</button>'; }
        else if (outraEmpresa2) {
            s2 = 'erro';
            c2 = `<b>Planilha de outra empresa</b><div class="ter-mini">${escaparXml(outraEmpresa2)}</div>`;
            b2 = '<button class="ter-btn" data-acao="segest">📥 Trocar planilha</button>';
        }
        else {
            const notasOk = conc.notas.filter(n => n.linhas.length && !n.erros.length).length;
            const totalSegest = SEGEST.linhas.reduce((s, l) => s + (centavos(l.valorTotal) || 0), 0);
            s2 = notasOk === conc.notas.length && !conc.linhasSemNota.length ? 'ok' : 'erro';
            c2 = `<b>${notasOk} de ${conc.notas.length}</b> nota(s) conferem · competência ${escaparXml(SEGEST.competencia || '?')}`
                + `<div class="ter-mini">${escaparXml(SEGEST.nomeArquivo)} · ${SEGEST.linhas.length} postos · R$ ${fmtCent(totalSegest)}</div>`
                + ((SEGEST.abasIgnoradas || []).length ? `<div class="ter-mini">Aba(s) de outro período ignorada(s): ${escaparXml(SEGEST.abasIgnoradas.map(a => `${a.nome} (${a.competencia})`).join(', '))}</div>` : '');
            b2 = '<button class="ter-btn ter-sec" data-acao="segest">Trocar planilha</button>';
        }

        // 3. Copiar
        let c3, s3, b3;
        if (erroLoteSigeo) { s3 = 'erro'; c3 = escaparXml(erroLoteSigeo); b3 = '<button class="ter-btn ter-princ" data-acao="retomar">Retomar extração</button>';  }
        else if (TRD.estado === 'buscando' && conc?.linhasSaida.length) { s3 = 'pendente'; c3 = `<b>${conc.linhasSaida.length} linhas</b> · aguardando a conclusão do TRD para incluir o PROAD.`; b3 = '<button class="ter-btn ter-princ" disabled>📋 Aguardando TRD…</button>'; }
        else if (!conc?.linhasSaida.length) { s3 = 'pendente'; c3 = conc ? 'Nenhuma nota cruzada com a SEGEST.' : 'Liberado depois da planilha da SEGEST.'; b3 = '<button class="ter-btn ter-princ" disabled>📋 Copiar para Liquidação</button>'; }
        else {
            const p = info.principal;
            s3 = avisos.erros.length ? 'erro' : (avisos.alertas.length || TRD.estado !== 'ok' ? 'atencao' : 'ok');
            c3 = `<b>${conc.linhasSaida.length} linhas</b> · competência ${escaparXml(p?.competencia || SEGEST.competencia || '?')} · PROAD ${escaparXml(p ? (p.proadProvidencia || p.processo) : '(a macro pergunta)')}`
                + `<div class="ter-mini">No Excel: clique na primeira linha de destino e no botão <b>Colar robô</b>.</div>`;
            b3 = `<button class="ter-btn ter-princ" data-acao="copiar">📋 Copiar para Liquidação</button>`;
        }

        // v1.9.5: CSV com exatamente as linhas e colunas da colagem (mesmas travas do botão Copiar)
        const podeCsvLiquidacao = !erroLoteSigeo && TRD.estado !== 'buscando' && !!conc?.linhasSaida.length;
        b3 += `<button class="ter-btn ter-sec" data-acao="csv-liquidacao"${podeCsvLiquidacao ? '' : ' disabled'} title="As mesmas linhas e colunas que o botão Copiar para Liquidação leva para o Excel">⬇️ CSV da Liquidação</button>`;
        // v1.7.8: o CSV é o mesmo da v1.4.9 (uma linha por nota, mesmas colunas); não depende de TRD nem da SEGEST
        b3 += `<button class="ter-btn ter-sec" data-acao="csv-notas"${documentosProcessados.length && !erroLoteSigeo ? '' : ' disabled'} title="Uma linha por nota, com os dados do SIGEO, XML e PDF">⬇️ CSV das notas</button>`;

        const cartao = (n, titulo, st, corpo, botao) => `
            <div class="ter-etapa ter-${st}">
                <div class="ter-etapa-cab"><span class="ter-num">${n}</span><span>${titulo}</span><span class="ter-st">${{ ok: '✅', atencao: '⚠️', erro: '⛔', pendente: '' }[st]}</span></div>
                <div class="ter-etapa-corpo">${corpo}</div>
                <div class="ter-etapa-acao">${botao}</div>
            </div>`;
        return cartao(1, CONFIG.proad.buscarCertidoes ? 'TRD e validades das certidões no PROAD' : 'TRD no PROAD', s1, c1, b1) + cartao(2, 'Planilha da SEGEST', s2, c2, b2) + cartao(3, 'Copiar para a Liquidação', s3, c3, b3);
    }

    function htmlAvisos({ erros, alertas }) {
        if (!erros.length && !alertas.length) {
            const completo = TRD.estado === 'ok' && SEGEST.linhas.length;
            return completo ? '<div class="ter-faixa ter-faixa-ok">✅ Tudo confere: TRD, planilha da SEGEST, impostos e centro de custo.</div>' : '';
        }
        const li = (t, cls) => `<li class="${cls}">${escaparXml(t)}</li>`;
        return `<div class="ter-faixa ${erros.length ? 'ter-faixa-erro' : 'ter-faixa-atencao'}">
            <b>${erros.length ? `⛔ ${erros.length} ponto(s) a resolver antes de copiar` : '⚠️ Pontos de atenção'}</b>
            <ul>${erros.map(t => li(t, 'e')).join('')}${alertas.map(t => li(t, 'a')).join('')}</ul></div>`;
    }

    function celulaTRD(nf, info) {
        if (TRD.estado === 'buscando') return '<td style="color:#888;">⏳</td>';
        if (TRD.estado !== 'ok') return '<td style="color:#888;">—</td>';
        const v = info.porNota.get(nf);
        if (!v) return '<td style="color:#888;">—</td>';
        if (v.situacao === 'OK') return `<td style="background:${CORES.VERDE_CLARO}">✅ ${escaparXml(v.trd.proadProvidencia || v.trd.processo)}</td>`;
        const txt = v.situacao === 'OUTRO TRD' ? `outro TRD (${escaparXml(v.trd.proadProvidencia || v.trd.processo)})` : v.situacao === 'TRD ILEGÍVEL' ? 'TRD ilegível' : 'não está no TRD';
        return `<td style="background:${CORES.VERMELHO_CLARO}">⚠️ ${txt}</td>`;
    }

    // v1.9.9: CNPJ do prestador da nota, comparado com o fornecedor do SIGEO
    function celulaCnpjPrestador(d, rowspan = 1) {
        const rs = rowspan > 1 ? ` rowspan="${rowspan}"` : '';
        const sigeo = String(d?.registro?.fornecedor?.documento || '').replace(/\D/g, '');
        const nota = String(d?.cnpjPrestadorNota || '').replace(/\D/g, '');
        const fmt = (c) => c.length > 11 ? Formatacao.formatarCNPJComPontuacao(c) : Formatacao.formatarCPFComPontuacao(c);
        if (!nota) {
            if (!sigeo) return `<td${rs} style="color:#888;">—</td>`;
            return `<td${rs} style="background:${CORES.AMARELO_CLARO}" title="CNPJ não lido no XML/PDF da nota; exibido o do fornecedor no SIGEO">${fmt(sigeo)} ℹ️</td>`;
        }
        if (!sigeo || nota.padStart(14, '0') === sigeo.padStart(14, '0')) return `<td${rs}>${fmt(nota)}</td>`;
        if (nota.padStart(14, '0').slice(0, 8) === sigeo.padStart(14, '0').slice(0, 8)) {
            return `<td${rs} title="Filial: o fornecedor no SIGEO é ${fmt(sigeo)}">${fmt(nota)} <small style="color:#555;">filial</small></td>`;
        }
        return `<td${rs} style="background:${CORES.VERMELHO_CLARO}" title="Empresa diferente do fornecedor no SIGEO (${fmt(sigeo)})">${fmt(nota)} ⚠️</td>`;
    }

    // v1.9.9: município do prestador (emitente da NFS-e); sem dado na nota, usa o cadastro do SIGEO
    function celulaMunicipioPrestador(d, rowspan = 1) {
        const rs = rowspan > 1 ? ` rowspan="${rowspan}"` : '';
        if (d?.municipioPrestador) return `<td${rs}>${escaparXml(d.municipioPrestador)}</td>`;
        if (d?.municipioEstadoPrestador) return `<td${rs} style="background:${CORES.AMARELO_CLARO}" title="Município não lido na nota; exibido o do cadastro do fornecedor no SIGEO">${escaparXml(d.municipioEstadoPrestador)} ℹ️</td>`;
        return `<td${rs} style="color:#888;">—</td>`;
    }

    function celulaCC(cc) {
        if (!cc || cc.status === 'sem-cc') return '<td style="color:#888;">—</td>';
        if (cc.status === 'sem-ateste') return `<td style="background:${CORES.AMARELO_CLARO}" title="Nota sem ateste no SIGEO">1ª ${fmtCent(cc.p1)} · 2ª ${fmtCent(cc.p2)} ℹ️</td>`;
        if (cc.status === 'glosa') return `<td style="background:${CORES.AMARELO_CLARO}" title="Ateste com glosa: confira manualmente">1ª ${fmtCent(cc.p1)} · 2ª ${fmtCent(cc.p2)} ℹ️</td>`;
        if (cc.status === 'arredondamento') return `<td style="background:${CORES.AMARELO_CLARO}" title="${escaparXml(`Só arredondamento: o SIGEO (1ª ${fmtCent(cc.sigeo1)} · 2ª ${fmtCent(cc.sigeo2)}) rateia a Área Administrativa sobre o total; a Liquidação, linha a linha`)}">1ª ${fmtCent(cc.p1)} · 2ª ${fmtCent(cc.p2)} ℹ️</td>`;
        const ok = cc.status === 'ok';
        const tit = ok ? 'Rateio da Liquidação igual ao ateste do SIGEO' : `Ateste do SIGEO: 1ª ${fmtCent(cc.sigeo1)} · 2ª ${fmtCent(cc.sigeo2)}`;
        return `<td style="background:${ok ? CORES.VERDE_CLARO : CORES.VERMELHO_CLARO}" title="${escaparXml(tit)}">1ª ${fmtCent(cc.p1)} · 2ª ${fmtCent(cc.p2)} ${ok ? '✅' : '⚠️'}</td>`;
    }

    function htmlConferenciaSemSegest(info) {
        const linhas = documentosProcessados.map(d => `<tr>
                <td><b>${escaparXml(d.numero || '')}</b></td>
                ${celulaCnpjPrestador(d)}
                ${celulaMunicipioPrestador(d)}
                ${celulaUFNota(d, 'prestacao')}
                ${celulaUFNota(d, 'incidencia')}
                <td>${fmtOuVazio(d.valor)}</td>
                ${celulaTRD(numeroNF(d), info)}
                <td>${Formatacao.formatarDataBrasileira(d.ateste?.dataAteste || '')}</td>
                <td>${fmtOuVazio(d.ateste?.valorPrimeiroGrau)} · ${fmtOuVazio(d.ateste?.valorSegundoGrau)}</td>
                <td>${d.status === 'erro' ? `⚠️ ${escaparXml(d.erro || 'erro')}` : ''}</td>
            </tr>`).join('');
        return `<div class="ter-dica">Junte a planilha da SEGEST (etapa 2) para conferir postos, INSS, ISSQN, DIVs e centro de custo e liberar a colagem.</div>
            <div style="overflow-x:auto;"><table class="sigeo-ter-table mat-table" style="width:max-content;border-collapse:collapse;">
                <thead><tr><th>NF</th><th>CNPJ do prestador</th><th>Município do prestador</th><th>Local da prestação · UF</th><th>Incidência ISSQN · UF</th><th>Valor</th><th>TRD</th><th>Ateste SIGEO</th><th>1º grau · 2º grau</th><th></th></tr></thead>
                <tbody>${linhas}</tbody></table></div>`;
    }

    function htmlConferenciaSegest(conc, info) {
        let corpo = '';
        for (const n of conc.notas) {
            const grupos = n.grupos.length ? n.grupos : [null];
            const span = grupos.length;
            const situacao = n.erros.length
                ? `<td rowspan="${span}" class="ter-sit" style="background:${CORES.VERMELHO_CLARO};">⚠️ ${n.erros.map(escaparXml).join('<br>⚠️ ')}${n.alertas.length ? '<br>ℹ️ ' + n.alertas.map(escaparXml).join('<br>ℹ️ ') : ''}</td>`
                : `<td rowspan="${span}" class="ter-sit" style="background:${n.alertas.length ? CORES.AMARELO_CLARO : CORES.VERDE_CLARO};">${n.alertas.length ? 'ℹ️ ' + n.alertas.map(escaparXml).join('<br>ℹ️ ') : '✅ Confere'}</td>`;
            grupos.forEach((g, i) => {
                const notaCols = i === 0 ? `
                    <td rowspan="${span}"><b>${escaparXml(n.numero)}</b></td>
                    ${celulaTRD(Number(n.numero.replace(/\D/g, '')) || null, info).replace('<td', `<td rowspan="${span}"`)}
                    ${celulaCnpjPrestador(n.doc, span)}
                    ${celulaMunicipioPrestador(n.doc, span)}
                    <td rowspan="${span}">${escaparXml(n.municipio || n.doc?.localPrestacaoServico || '')}</td>
                    ${celulaUFNota(n.doc, 'prestacao', span)}
                    ${celulaUFNota(n.doc, 'incidencia', span)}
                    <td rowspan="${span}">${n.linhas.length}</td>
                    ${n.linhas.length ? celulaConfere(n.valorNF, n.somaSegest).replace('<td', `<td rowspan="${span}"`) : `<td rowspan="${span}">${fmtCent(centavos(n.doc?.valor))}</td>`}` : '';
                const grupoCols = g ? `
                    <td class="ter-quebra" style="max-width:220px;min-width:180px;">${escaparXml(g.texto)}${g.aliquota ? `<br><small>INSS ${Formatacao.formatarValorBrasileiro(g.aliquota * 100)}%</small>` : ''}</td>
                    <td>${g.linhas.length}</td>
                    ${celulaConfere(g.baseSigeo, g.linhas.length ? g.baseSegest : null)}
                    <td>${fmtCent(g.retSigeo)}</td>
                    <td>${fmtAjuste(g)}</td>` : '<td colspan="5" style="color:#888;">—</td>';
                const notaFim = i === 0 ? `
                    <td rowspan="${span}">${fmtCent(n.iss?.alvo)}</td>
                    <td rowspan="${span}">${fmtAjuste(n.iss)}</td>
                    <td rowspan="${span}">${fmtCent(n.divs?.alvo)}</td>
                    <td rowspan="${span}">${fmtAjuste(n.divs)}</td>
                    ${celulaCC(n.cc).replace('<td', `<td rowspan="${span}"`)}
                    ${situacao}` : '';
                corpo += `<tr>${notaCols}${grupoCols}${notaFim}</tr>`;
            });
        }
        return `<div style="overflow-x:auto;">
                <table class="sigeo-ter-table mat-table" style="width:max-content;border-collapse:collapse;">
                    <thead><tr>
                        <th>NF</th><th>TRD</th><th>CNPJ do prestador</th><th>Município do prestador</th><th>Localidade SEGEST</th><th>Local da prestação · UF</th><th>Incidência ISSQN · UF</th><th>Postos</th><th>Valor NF × SEGEST</th>
                        <th>Serviço (INSS)</th><th>Postos</th><th>Base INSS SIGEO × SEGEST</th><th>Retenção SIGEO</th><th>Ajuste INSS</th>
                        <th>ISSQN nota</th><th>Ajuste ISSQN</th><th>DIVs nota</th><th>Ajuste DIVs</th><th>Centro de custo × ateste</th><th>Situação</th>
                    </tr></thead>
                    <tbody>${corpo}</tbody>
                </table>
            </div>
            <div class="ter-dica">Ajuste = centavos entre o total que tem de fechar (INSS: SIGEO por serviço; ISSQN e DIVs: nota) e o cálculo por posto. A macro lança esse valor numa linha só, nas colunas de ajuste. Centro de custo = rateio da Liquidação (Área Administrativa ${Formatacao.formatarValorBrasileiro(CONFIG.segest.rateioAreaAdministrativa.primeira * 100)}% / ${Formatacao.formatarValorBrasileiro(CONFIG.segest.rateioAreaAdministrativa.segunda * 100)}%) comparado ao 1º e 2º grau do ateste.</div>`;
    }

    function exportarLiquidacao(formato = 'tsv') {
        if (erroLoteSigeo) { mostrarErroSnackbar(erroLoteSigeo); return; }
        const conc = _ultimaConciliacao;
        const info = _ultimaAnaliseTRD || analisarTRD();
        if (!conc?.linhasSaida.length) return;
        const pend = [];
        if (TRD.estado === 'buscando') { mostrarErroSnackbar('Aguarde a conclusão da busca de TRD antes de exportar os dados da Liquidação.'); return; }
        const repetidas = conferirNotasRepetidas();
        if (repetidas.length) { mostrarErroSnackbar(repetidas.join(' ')); return; } // v1.9.3: bloqueia, não só pergunta
        if (TRD.estado !== 'ok' || !info.principal) pend.push('Sem TRD: a macro vai pedir a competência e o PROAD.');
        pend.push(...info.erros);
        const naoCruzadas = conc.notas.filter(n => n.doc?.status !== 'erro' && !n.linhas.length).map(n => n.numero);
        if (naoCruzadas.length) pend.push(`NF ${naoCruzadas.join(', ')} não cruzada(s) com a SEGEST: fica(m) fora da colagem.`);
        if (conc.linhasSemNota.length) pend.push(`${conc.linhasSemNota.reduce((s, l) => s + l.quantidade, 0)} posto(s) da SEGEST sem nota: ficam fora da colagem. Veja os municípios na conferência.`);
        // v2.3.9: o que da SEGEST não vai para a Liquidação aparece também na hora de copiar
        for (const a of SEGEST.avisosColagem || []) pend.push(`Planilha da SEGEST: ${a}`);
        for (const n of conc.notas.filter(n => n.linhas.length)) {
            const uf = conferirUFsNota(n.doc);
            pend.push(...[...uf.erros, ...uf.alertas].map(msg => `NF ${n.numero}: ${msg}`));
        }
        if (conc.totalErros > 0) pend.push(`${conc.totalErros} divergência(s) na conferência: as linhas dessas notas vão marcadas como CONFERIR.`);
        if (pend.length && !confirm(`Antes de ${formato === 'csv' ? 'baixar o CSV' : 'copiar'}:\n\n• ${pend.join('\n• ')}\n\n${formato === 'csv' ? 'Baixar CSV' : 'Copiar'} mesmo assim?`)) return;
        completarLinhasComTRD(conc, info);
        if (formato === 'csv') {
            const comp = String(info.principal?.competencia || SEGEST.competencia || 'sem_competencia').replace(/[^0-9A-Za-z_-]/g, '_');
            const nome = nomeArquivoExportacao('csv').replace(/^terceirizados_/, `liquidacao_${comp}_`);
            baixarArquivo(gerarCsvLiquidacao(conc), nome, 'text/csv;charset=utf-8');
            mostrarSucessoSnackbar(`CSV da Liquidação baixado: ${conc.linhasSaida.length} linhas.`);
        } else {
            copiarClipboard(gerarTsvLiquidacao(conc));
            mostrarSucessoSnackbar(`${conc.linhasSaida.length} linhas copiadas. No Excel, clique na primeira linha de destino e no botão "Colar robô".`);
        }
    }

    function copiarParaLiquidacao() { exportarLiquidacao('tsv'); }
    function baixarCsvLiquidacao() { exportarLiquidacao('csv'); }
    // v1.7.8: o mesmo CSV da v1.4.9 (gerarCsv/gerarMatrizDados), com o mesmo nome de arquivo
    function baixarCsvNotas() {
        if (erroLoteSigeo) { mostrarErroSnackbar(erroLoteSigeo); return; }
        baixarArquivo(gerarCsv(documentosProcessados), nomeArquivoExportacao('csv'), 'text/csv;charset=utf-8');
        mostrarSucessoSnackbar('CSV baixado!');
    }

    // Tabela com os dados brutos das notas (o conteúdo da tela antiga, sem alteração)
    function htmlTabelaDadosNotas() {
        const maximo = maximoRetencoes(documentosProcessados);
        const cabecalhosAdicionais = cabecalhosExportacao(documentosProcessados)
            .slice(11, 11 + (maximo - 1) * 3 + (maximo > 1 ? 1 : 0))
            .map(c => `<th>${escaparXml(c)}</th>`).join('');
        const linhasHtml = documentosProcessados.map(d => {
            const reg = d.registro || {};
            const contratacao = reg?.contratacao || {};
            const banco = obterContaBancariaParaSaida(d);
            const rp = d.retencaoPrevidenciaria || {};
            const cb = formatarContaBancaria(banco);

            const tomadorIcone = !d.tomadorCnpj
                ? '<span title="Tomador não identificado" style="color:gray;">❓</span>'
                : d.tomadorOk
                    ? `<span title="Tomador OK: ${d.tomadorNome || ''}" style="color:green;">✅</span>`
                    : `<span title="Tomador divergente: ${d.tomadorCnpj}" style="color:red;">⚠️</span>`;

            const valorValidacao = compararTresFontes('Valor', d.valor, d.xml?.valorServico, d.pdf?.valorServico);
            const numeroValidacao = compararTresFontes('Número', d.numero, d.xml?.numero, d.pdf?.numero, { neutroSemFonte: true });
            // Novo na 1.3.4: validação tripla também para o INSS (base de cálculo e retenção).
            // O valor exibido continua sendo o do SIGEO; XML/PDF servem de conferência.
            const bcInssValidacao = (d.retencoesPrevidenciarias || []).length > 1
                ? { corStatus: '', icone: '', mensagem: 'Base individual. XML/PDF podem trazer a base agregada da nota.' }
                : compararTresFontesNumerico('BC INSS', rp.baseCalculo, d.xml?.baseCalculoInss, d.pdf?.baseCalculoInss);
            // XML e PDF trazem a retenção TOTAL, não a parcela de um tipo de serviço.
            // Com vários itens, a conferência do total fica na última coluna adicional.
            const inssValidacao = (d.retencoesPrevidenciarias || []).length > 1
                ? { corStatus: '', icone: '', mensagem: 'Parcela individual. Confira a soma na coluna Total Retenção INSS.' }
                : compararTresFontesNumerico('Retenção INSS', rp.valorRetencao, d.xml?.inssRetido, d.pdf?.inssRetido);
            const dataEmissaoValidacao = compararTresFontes(
                'Data Emissão',
                Formatacao.formatarDataBrasileira(d.dataEmissao || ''),
                d.xml?.dataEmissao ? Formatacao.formatarDataBrasileira(d.xml.dataEmissao) : null,
                d.pdf?.dataEmissao || null, // já vem em dd/mm/aaaa direto do texto do PDF
                { neutroSemFonte: true }
            );

            let colunasAdicionais = '';
            for (let n = 1; n < maximo; n++) {
                const adicional = d.retencoesPrevidenciarias?.[n];
                colunasAdicionais += `<td>${escaparXml(adicional?.tipoServico || '')}</td>`
                    + `<td>${fmtOuVazio(adicional?.baseCalculo)}</td>`
                    + `<td>${fmtOuVazio(adicional?.valorRetencao)}</td>`;
            }
            if (maximo > 1) {
                const totalInss = totalRetencaoPrevidenciaria(d.retencoesPrevidenciarias);
                const validacaoTotal = compararTresFontesNumerico(
                    'Retenção INSS total', totalInss,
                    d.xmlNumeroDivergente ? null : d.xml?.inssRetido, d.pdf?.inssRetido
                );
                colunasAdicionais += `<td style="background:${validacaoTotal.corStatus}" title="${escaparXml(validacaoTotal.mensagem)}">${fmtOuVazio(totalInss)} ${validacaoTotal.icone}</td>`;
            }

            return `<tr>
                <td>${tomadorIcone}</td>
                <td>${(contratacao.processoAdministrativo || '').replace('PROAD', '').trim()}</td>
                <td>${reg?.fornecedor?.tipoPessoa === 'FISICA' ? Formatacao.formatarCPFApenasNumeros(reg.fornecedor.documento) : Formatacao.formatarCNPJApenasNumeros(reg?.fornecedor?.documento)}</td>
                <td>${contratacao?.setor?.sigla || ''}</td>
                <td>${cb.banco}</td>
                <td>${cb.agencia}</td>
                <td>${cb.conta}</td>
                <td>${d.numeroContrato || ''}</td>
                <td>${rp.tipoServico || ''}</td>
                <td style="background:${bcInssValidacao.corStatus}" title="${bcInssValidacao.mensagem}">${Formatacao.formatarValorBrasileiro(rp.baseCalculo || 0)} ${bcInssValidacao.icone}</td>
                <td style="background:${inssValidacao.corStatus}" title="${inssValidacao.mensagem}">${Formatacao.formatarValorBrasileiro(rp.valorRetencao || 0)} ${inssValidacao.icone}</td>
                ${colunasAdicionais}
                <td>${d.naturezaRendimento || ''}</td>
                <td>${Formatacao.formatarValorBrasileiro(d.naturezaRendimentoValorBruto || 0)}</td>
                <td>${fmtOuVazio(d.material)}</td>
                <td style="background:${valorValidacao.corStatus}" title="${valorValidacao.mensagem}">${Formatacao.formatarValorBrasileiro(d.valor || 0)} ${valorValidacao.icone}</td>
                <td style="background:${numeroValidacao.corStatus}" title="${numeroValidacao.mensagem}">${d.numero || ''} ${numeroValidacao.icone}</td>
                <td style="background:${dataEmissaoValidacao.corStatus}" title="${dataEmissaoValidacao.mensagem}">${Formatacao.formatarDataBrasileira(d.dataEmissao || '')} ${dataEmissaoValidacao.icone}</td>
                ${celulaUFNota(d, 'prestacao')}
                ${celulaUFNota(d, 'incidencia')}
                <td>${d.codigoTributacaoNacional || ''}</td>
                <td>${d.codigoTributacaoMunicipal || ''}</td>
                <td>${fmtOuVazio(d.baseCalculoIssqn)}</td>
                <td>${formatarAliquota(d.aliquotaIssqn)}</td>
                <td>${fmtOuVazio(d.issqnRetido)}</td>
                <td>${fmtOuVazio(d.valorLiquido)}</td>
                <td>${fmtOuVazio(d.somaIrrfContribSociais)}</td>
                <td>${Formatacao.formatarDataBrasileira(d.ateste?.dataAteste || '')}</td>
                <td class="ter-quebra" style="min-width:140px;max-width:180px;">${Formatacao.formatarAssinante(d.ateste?.assinantes?.[0])}</td>
                <td class="ter-quebra" style="min-width:140px;max-width:180px;">${Formatacao.formatarAssinante(d.ateste?.assinantes?.[1])}</td>
                <td>${Formatacao.formatarValorBrasileiro(d.ateste?.valorPrimeiroGrau || 0)}</td>
                <td>${Formatacao.formatarValorBrasileiro(d.ateste?.valorSegundoGrau || 0)}</td>
                <td>${Formatacao.formatarValorBrasileiro(d.ateste?.valorGlosa || 0)}</td>
                ${celulaObservacao(d)}
                <td class="ter-quebra" style="min-width:90px;max-width:160px;">${d.fonteLeitura || ''}</td>
                <td>
                    ${d.xml ? `<button data-uuid="${d.uuid}" class="ter-btn-xml" title="Ver XML">📄XML</button>` : ''}
                    ${d.pdf ? `<button data-uuid="${d.uuid}" class="ter-btn-pdf" title="Ver PDF">📄PDF</button>` : ''}
                </td>
            </tr>`;
        }).join('');
        return `<div style="overflow-x:auto;">
                    <table class="sigeo-ter-table mat-table" style="width:max-content;border-collapse:collapse;">
                        <thead>
                            <tr>
                                <th>Tomador</th><th>PROAD</th><th>CNPJ/CPF</th><th>Setor</th><th>Banco</th><th>Agência</th><th>Conta</th>
                                <th>Nº Contrato</th><th>Tipo de Serviço</th><th>BC INSS</th><th>Retenção INSS</th>${cabecalhosAdicionais}<th>Natureza de Rendimento</th><th>Valor Bruto Nat. Rendimento</th><th>Material</th>
                                <th>Valor Bruto NF</th><th>Nº NF</th><th>Data Emissão</th>
                                <th>Local da Prestação · UF</th><th>Incidência ISSQN · UF</th><th>Cód. Trib. Nacional</th><th>Cód. Trib. Municipal</th><th>BC ISSQN</th><th>Alíquota ISSQN</th><th>ISSQN Retido</th><th>Valor Líquido XML</th>
                                <th>IRRF + Contrib. Sociais</th><th>Data Ateste</th><th>Assinante 1</th><th>Assinante 2</th><th>Valor 1º Grau</th><th>Valor 2º Grau</th>
                                <th>Glosa</th><th>Observações</th><th>Fonte</th><th>Ações</th>
                            </tr>
                        </thead>
                        <tbody>${linhasHtml}</tbody>
                    </table>
                </div>`;
    }

    /* ====================================================================================
     * 12. TRD — LEITURA DO TERMO DE RECEBIMENTO DEFINITIVO [v1.6.0]
     *  Funções declaradas (hoisted) e sem dependência de outras constantes do robô: são
     *  usadas tanto aqui no SIGEO quanto pelo trabalhador que roda na aba do PROAD.
     *  Tolerante ao texto do pdf.js e ao do OCR (que troca ê por é, ç por g etc.).
     * ==================================================================================== */
    function _trdMeses() {
        return { JANEIRO: 1, FEVEREIRO: 2, MARCO: 3, ABRIL: 4, MAIO: 5, JUNHO: 6, JULHO: 7, AGOSTO: 8, SETEMBRO: 9, OUTUBRO: 10, NOVEMBRO: 11, DEZEMBRO: 12 };
    }

    function trdTextoNormalizado(texto) {
        return String(texto || '').replace(/\u00a0/g, ' ').replace(/[\u0000-\u0008\u000b-\u001f]/g, ' ')
            .replace(/[ \t]+/g, ' ');
    }

    // true = o texto é de um TRD (título ou frase de ateste)
    function trdConfirmaConteudo(texto) {
        const t = trdTextoNormalizado(texto);
        return /TERMO\s+DE\s+RECEBIMENTO\s+DEFINITIVO|Atesto\s+o\s+recebimento\s+definitivo/i.test(t);
    }

    function _trdMesPorNome(nome) {
        const n = String(nome || '').normalize('NFD').replace(/[\u0300-\u036f]/g, '').toUpperCase()
            .replace(/[^A-Z]/g, '').replace(/^MARGO$/, 'MARCO');
        const meses = _trdMeses();
        if (meses[n]) return meses[n];
        // OCR: aceita as 3 primeiras letras (JUL, AGO, SET...)
        const k = Object.keys(meses).find(m => n.length >= 3 && m.startsWith(n.slice(0, 3)));
        return k ? meses[k] : null;
    }

    function _trdAno(a) {
        const n = Number(String(a).replace(/\D/g, ''));
        if (!n) return null;
        return n < 100 ? 2000 + n : n;
    }

    // "1603/2026 a 1610/2026", "1603 a 1610", "1603/2026, 1605/2026 e 1607/2026" -> [1603, ...]
    function trdNotasDoTrecho(trecho) {
        const s = String(trecho || '')
            .replace(/\bNF(?:S-?e)?\s*(?:n[º°o.]?\s*)?/gi, '')
            .replace(/\bn[º°o.]\s*(?=\d)/gi, '')
            // Dois números com aparência de ano mantêm a ordem brasileira NF/ano.
            // Ex.: 2028/2026 é NF 2028, e nunca deve virar NF 2026.
            .replace(/\b(20\d{2})\s*\/\s*(\d{1,9})\b/g, (todo, ano, numero) => /^20\d{2}$/.test(numero) ? todo : `${numero}/${ano}`);
        const notas = [];
        const re = /(\d{1,9})(?:\s*\/\s*20\d{2})?(?:\s*(?:a|à|até|ate|-|–)\s*(\d{1,9})(?:\s*\/\s*20\d{2})?)?/gi;
        let m;
        while ((m = re.exec(s)) !== null) {
            const ini = Number(m[1]);
            const fim = m[2] ? Number(m[2]) : null;
            if (!ini) continue;
            if (fim && fim > ini && fim - ini <= 300) { for (let n = ini; n <= fim; n++) notas.push(n); }
            else notas.push(ini);
            if (fim && !(fim > ini && fim - ini <= 300)) notas.push(fim);
        }
        return [...new Set(notas)].filter(n => n > 0);
    }

    function trdParse(textoBruto) {
        const t = trdTextoNormalizado(textoBruto);
        const plano = t.replace(/\s+/g, ' ');
        const proc = (m) => m ? m.replace(/\s+/g, '').replace(/^0+/, '') : null;
        const r = { confirmado: trdConfirmaConteudo(t), notas: [], proadPrincipal: null, proadProvidencia: null,
            contrato: null, competencia: null, competenciaTexto: null, valorGlobal: null, dataTRD: null,
            dataEmissaoNF: null, assinaturas: [] };

        let m = plano.match(/PROAD\s+principal\s*(?:n\S{0,2}\s*)?:?\s*(\d{1,6}\s*\/\s*20\d{2})/i);
        r.proadPrincipal = proc(m?.[1]);
        m = plano.match(/PROAD\s+provid\S{0,4}ncia\s*(?:n\S{0,2}\s*)?:?\s*(\d{1,6}\s*\/\s*20\d{2})/i);
        r.proadProvidencia = proc(m?.[1]);
        m = plano.match(/Contrato\s*n\S{0,2}\s*:?\s*(\d{1,6}\s*\/\s*20\d{2})/i);
        r.contrato = proc(m?.[1]);

        // Campo da tabela ou observações: admite "NF nº", parênteses e ausência de "nº".
        const marcaNotas = /Nota(?:\(s\)|s)?\s+Fisca(?:l(?:\(is\))?|is)\s+Eletr\S{1,3}nica(?:\(s\)|s)?\s*:?/gi;
        const prefixoNF = String.raw`(?:NF(?:S-?e)?\s*)?(?:n[º°o.]?\s*)?`;
        const numeroNF = String.raw`\d{1,9}(?:\s*\/\s*20\d{2})?`;
        const listaNF = new RegExp(String.raw`^\s*` + prefixoNF + '(' + numeroNF
            + String.raw`(?:\s*(?:a|à|até|ate|-|–|,|;|e)\s*` + prefixoNF + numeroNF + ')*)', 'i');
        for (const cab of plano.matchAll(marcaNotas)) {
            const depois = plano.slice(cab.index + cab[0].length);
            // O rótulo também aparece em "Data de emissão da Nota Fiscal Eletrônica".
            // Não transforma dd/mm/aaaa em uma lista de NFs.
            if (/^\s*\d{1,2}\s*\/\s*\d{1,2}\s*\/\s*20\d{2}\b/.test(depois)) continue;
            const lista = depois.match(listaNF);
            if (!lista) continue;
            r.notas = trdNotasDoTrecho(lista[1]);
            if (r.notas.length) break;
        }

        // Competência: "Mês de competência do serviço (MM/AAAA) Agosto/26"; senão "prestados em Agosto/2026"
        m = plano.match(/compet\S{1,4}ncia\s+do\s+servi\S{1,2}o\s*(?:\(\s*MM\s*\/\s*AAAA\s*\))?\s*:?\s*([A-Za-zÀ-ÿ]{3,10}\s*\/\s*\d{2,4}|\d{1,2}\s*\/\s*\d{4})/i)
            || plano.match(/prestados\s+em\s+([A-Za-zÀ-ÿ]{3,10}\s*(?:\/|de)\s*\d{2,4}|\d{1,2}\s*\/\s*\d{4})/i);
        if (m) {
            const txt = m[1].replace(/\s+/g, '');
            const p = txt.split(/\/|de/i);
            const mes = /^\d+$/.test(p[0]) ? Number(p[0]) : _trdMesPorNome(p[0]);
            const ano = _trdAno(p[1]);
            if (mes && mes <= 12 && ano) { r.competencia = `${ano}-${String(mes).padStart(2, '0')}`; r.competenciaTexto = m[1].trim(); }
        }

        m = plano.match(/Valor\s+Global[\s\S]{0,90}?R\s*\$\s*([\d.]{1,15},\d{2})/i);
        if (m) r.valorGlobal = Number(m[1].replace(/\./g, '').replace(',', '.'));

        m = plano.match(/Data\s+de\s+emiss\S{1,3}o[\s\S]{0,70}?(\d{2})\/(\d{2})\/(20\d{2})/i);
        if (m) r.dataEmissaoNF = `${m[3]}-${m[2]}-${m[1]}`;

        // Data do TRD: "Belo Horizonte, 23 de setembro de 2026."
        m = plano.match(/[A-Za-zÀ-ÿ]{3,}\s*,\s*(\d{1,2})\s+de\s+([A-Za-zÀ-ÿ]{4,10})\s+de\s+(20\d{2})/);
        if (m) {
            const mes = _trdMesPorNome(m[2]);
            if (mes) r.dataTRD = `${m[3]}-${String(mes).padStart(2, '0')}-${String(Number(m[1])).padStart(2, '0')}`;
        }

        // Carimbos de assinatura: "23/09/2026 13:51"
        for (const a of plano.matchAll(/(\d{2})\/(\d{2})\/(20\d{2})\s+(\d{2}:\d{2})/g)) r.assinaturas.push(`${a[3]}-${a[2]}-${a[1]} ${a[4]}`);
        return r;
    }

    // Certidões originais (RFB/PGFN, CRF-FGTS e CNDT), inclusive em um PDF conjunto.
    // Não interpreta o relatório SICAF como certidão nem usa data de emissão como validade.
    // v1.7.8: título só conta se vier seguido de um CNPJ (o texto da CNDT repete o próprio
    // título no rodapé "Informação importante"); títulos e CNPJ tolerantes a ruído de OCR.
    function certidoesParse(textoBruto) {
        const normalizar = s => String(s || '').normalize('NFD').replace(/[\u0300-\u036f]/g, '').toUpperCase()
            .replace(/[‐-―]/g, '-').replace(/\s+/g, ' ').trim();
        const dataIso = (dia, mes, ano) => {
            const dt = new Date(Date.UTC(Number(ano), Number(mes) - 1, Number(dia)));
            return dt.getUTCFullYear() === Number(ano) && dt.getUTCMonth() === Number(mes) - 1 && dt.getUTCDate() === Number(dia)
                ? `${ano}-${String(mes).padStart(2, '0')}-${String(dia).padStart(2, '0')}` : null;
        };
        const D = String.raw`(\d{2})\s*[\/.]\s*(\d{2})\s*[\/.]\s*(\d{4})`;
        const CNPJ = /(\d{2})\s*\.?\s*(\d{3})\s*\.?\s*(\d{3})\s*\/\s*(\d{4})\s*-?\s*(\d{2})/g;
        const titulo = new RegExp([
            String.raw`CERT[I1L]DA[O0][\s\S]{0,170}?TRIBUTOS\s+FEDERA[I1L]S`,
            String.raw`CERT[I1L]F[I1L]CADO\s+DE\s+REGULAR[I1L]DADE\s+DO\s+FGT[S5]`,
            String.raw`CERT[I1L]DA[O0]\s+(?:NEGAT[I1L]VA|POS[I1L]T[I1L]VA)\s+DE\s+DEB[I1L]TOS\s+TRABALH[I1L]STAS`,
        ].join('|'), 'g');
        const saida = [];
        for (const pagina of String(textoBruto || '').split('\f')) {
            const t = normalizar(pagina);
            // Só títulos seguidos de um CNPJ em até 700 caracteres (descarta menções no corpo do texto)
            const temCnpj = new RegExp(CNPJ.source); // sem /g: test() não mexe no lastIndex do CNPJ
            const titulos = [...t.matchAll(titulo)].filter(m => temCnpj.test(t.slice(m.index, m.index + 700)));
            for (let i = 0; i < titulos.length; i++) {
                const cab = titulos[i][0];
                const trecho = t.slice(titulos[i].index, titulos[i + 1]?.index ?? t.length);
                const tipo = /TRIBUTOS/.test(cab) ? 'receitaFederal' : /FGT/.test(cab) ? 'fgts' : 'trabalhista';
                CNPJ.lastIndex = 0;
                const cnpjs = [...new Set([...trecho.matchAll(CNPJ)].map(m => m.slice(1, 6).join('')))];
                let m;
                if (tipo === 'receitaFederal') m = trecho.match(new RegExp(String.raw`VAL[I1L]DA\s+AT[EÉ]\s*:?\s*` + D));
                else if (tipo === 'fgts') m = trecho.match(new RegExp(String.raw`VAL[I1L]DADE\s*:?\s*\d{2}\s*[\/.]\s*\d{2}\s*[\/.]\s*\d{4}\s*(?:A|ATE|-)\s*` + D));
                else m = trecho.match(new RegExp(String.raw`VAL[I1L]DADE\s*:?\s*` + D));
                saida.push({
                    tipo,
                    cnpj: cnpjs.length === 1 ? cnpjs[0] : null,
                    validade: m ? dataIso(m[1], m[2], m[3]) : null,
                    positivaComEfeitosDeNegativa: /POSITIVA[\s\S]{0,120}?EFEITOS? DE NEGATIVA/.test(trecho),
                    erro: cnpjs.length > 1 ? 'mais de um CNPJ no trecho da certidão' : '',
                });
            }
        }
        return saida;
    }

    // v1.7.8: documentos de "certidão" que não são RFB/PGFN, FGTS nem CNDT (municipal,
    // estadual, falência, SICAF…). São ignorados sem gerar alerta.
    function certidaoDeOutroTipo(texto) {
        const t = String(texto || '').normalize('NFD').replace(/[\u0300-\u036f]/g, '').toUpperCase();
        // v1.7.9: também documentos do próprio PROAD e comprovantes que não são certidão
        const proprios = [
            [/APROVACAO DE PROVIDENCIA/, 'certidão de aprovação de providência'],
            [/SOLICITACAO DE PROVIDENCIA/, 'solicitação de providência'],
            [/COMPROVANTE DE (?:PAGAMENTO|TRANSFERENCIA|AGENDAMENTO)|AUTENTICACAO MECANICA|DADOS DO RECEBEDOR/, 'comprovante de pagamento'],
            [/DOCUMENTO DE ARRECADACAO|GUIA DO FGTS|\bGRF\b|\bGFD\b/, 'guia de recolhimento'],
            [/CONTA VINCULADA/, 'conta vinculada'],
        ];
        for (const [rx, nome] of proprios) if (rx.test(t)) return nome;
        const m = t.match(/SICAF|MUNICIPA[LI]|PREFEITURA|ESTADUA[LI]|FAZENDA ESTADUAL|SECRETARIA DE ESTADO|DISTRITAL|FALENCIA|RECUPERACAO JUDICIAL|CONCORDATA|IMPROBIDADE|CADIN|\bCEIS\b|\bCNEP\b|TRIBUNAL DE CONTAS/);
        return m ? `certidão ${m[0].toLowerCase()}` : '';
    }


    /* ====================================================================================
     * 13. PROAD — BUSCA DO TRD [v1.6.0]
     *
     *  POR QUE DUAS PONTAS: o PROAD tem filtro anti-CSRF. O GET atravessa de outra origem,
     *  mas o POST que abre a aba "Providências" volta 403 fora do próprio PROAD. Por isso o
     *  robô também roda na aba do PROAD (@match) como TRABALHADOR: o SIGEO manda o pedido
     *  por GM_setValue, o trabalhador faz as requisições same-origin e devolve um JSON.
     *  Mesma arquitetura já validada no robô "SIGEO - Dados de documentos fiscais".
     *
     *  Caminho: ficha do PROAD principal da contratação (ex.: 30035/2025) → aba
     *  Providências → fichas das providências mais recentes → documentos com "TRD" /
     *  "Recebimento Definitivo" na descrição → PDF por /proad/pages/exibirarquivo?idArquivo=
     *  (o data-rk da linha é o idArquivo) → texto pelo pdf.js. TRD sem camada de texto
     *  (montado como imagem, caso do TRD de julho/2026) volta em base64 e o SIGEO faz OCR.
     *
     *  Tudo aqui é function declaration e só usa constantes LOCAIS: na aba do PROAD o
     *  script retorna logo no começo, antes de inicializar as constantes do resto do robô.
     * ==================================================================================== */
    function proadCanal() {
        const v = 'ter_v187';
        return {
            pedido: `ter_proad_pedido_${v}`,
            resposta: `ter_proad_resposta_${v}`,
            vivo: `ter_proad_vivo_${v}`,
            ping: `ter_proad_ping_${v}`,
            pong: `ter_proad_pong_${v}`,
        };
    }

    function proadChaveOrdem(numero) {
        const m = String(numero || '').match(/(\d+)\s*\/\s*(\d{4})/);
        return m ? Number(m[2]) * 1e6 + Number(m[1]) : 0;
    }

    function iniciarTrabalhadorProad() {
        if (typeof pdfjsLib !== 'undefined') {
            pdfjsLib.GlobalWorkerOptions.workerSrc = 'https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.worker.min.js';
        } else {
            console.error('[PROAD Terceirizados] pdf.js não carregou nesta aba — verifique o @require.');
        }
        const C = proadCanal();
        const meuId = Math.random().toString(36).slice(2, 10);
        // Atenção ao \b: em JavaScript o sublinhado é letra, então \bTRD\b não casa em
        // "08_2026_TRD". A fronteira é explícita.
        const FILTRO_TRD = /(?:^|[^A-Za-z0-9])TRD(?:$|[^A-Za-z0-9])|Recebimento[\s_-]*Definitivo|Termo[^]{0,40}Recebimento/i;
        const TIMEOUT_MS = 30000;
        let andamentoRede = null;
        let prazoPedido = 0;
        const MAX_TRD_POR_PROCESSO = 4;
        const MAX_OCR = 4;

        const anunciarVivo = () => { try { GM_setValue(C.vivo, Date.now()); } catch (_) {} };
        // O ping responde por evento: não depende de um relógio de 2 s em aba inativa.
        GM_addValueChangeListener(C.ping, (_k, _a, novo) => {
            let p; try { p = JSON.parse(novo); } catch (_) { return; }
            if (p?.id) GM_setValue(C.pong, JSON.stringify({ id: p.id, trabalhador: meuId, versao: '1.9.8' }));
        });

        async function buscar(url, opcoes = {}, rotulo = 'requisição') {
            const tentativas = String(opcoes.method || 'GET').toUpperCase() === 'GET' ? 2 : 1;
            for (let tentativa = 1; tentativa <= tentativas; tentativa++) {
                const restante = prazoPedido ? prazoPedido - Date.now() : TIMEOUT_MS;
                if (restante <= 0) throw new Error(`${rotulo}: prazo global da busca esgotado. Busque de novo.`);
                const prazo = Math.min(TIMEOUT_MS, restante);
                const ctrl = new AbortController();
                const timer = setTimeout(() => ctrl.abort(), prazo);
                try {
                    const r = await fetch(url, { credentials: 'include', ...opcoes, signal: ctrl.signal });
                    // O prazo cobre cabeçalhos e corpo. Só leituras GET podem ser repetidas.
                    const buf = await r.arrayBuffer();
                    if ([408, 500, 502, 503, 504].includes(r.status) && tentativa < tentativas) {
                        andamentoRede?.(`${rotulo}: HTTP ${r.status}; tentando a leitura novamente (2/2)…`);
                        continue;
                    }
                    return { ok: r.ok, status: r.status, url: r.url,
                        text: async () => new TextDecoder().decode(buf), arrayBuffer: async () => buf };
                } catch (e) {
                    if (tentativa < tentativas && (!prazoPedido || Date.now() < prazoPedido)) {
                        andamentoRede?.(`${rotulo}: ${e?.name === 'AbortError' ? `sem resposta em ${Math.ceil(prazo / 1000)} s` : 'falha de comunicação'}; tentando a leitura novamente (2/2)…`);
                        continue;
                    }
                    throw new Error(e?.name === 'AbortError'
                        ? `${rotulo}: o PROAD não respondeu em até ${TIMEOUT_MS / 1000} s por tentativa (${tentativa} tentativa(s)). Confira se o processo abre na aba do PROAD e busque de novo.`
                        : `${rotulo}: ${e.message} (${tentativa} tentativa(s))`);
                } finally { clearTimeout(timer); }
            }
        }

        async function lerFicha(processo) {
            const [numero, ano] = String(processo).split('/');
            const url = `${location.origin}/proad/pages/fichadoprocesso.xhtml?faces-redirect=true&numeroProtocolo=${Number(numero)}&numeroAno=${ano}`;
            const r = await buscar(url, {}, `ficha ${processo}`);
            if (!r.ok) throw new Error(`ficha ${processo}: HTTP ${r.status}`);
            if (r.url && new URL(r.url).origin !== location.origin) throw new Error('o PROAD pediu login. Entre no PROAD e busque de novo.');
            const html = await r.text();
            const doc = new DOMParser().parseFromString(html, 'text/html');
            if (!doc.querySelector('input[name="jakarta.faces.ViewState"]')) throw new Error(`a ficha do ${processo} não abriu (sessão do PROAD expirada?). Entre no PROAD e busque de novo.`);
            return { url, doc };
        }

        async function listarProvidencias(ficha) {
            const componente = ficha.doc.querySelector('[id$="selecionarAba"]');
            if (!componente) throw new Error('Não reconheci a aba Providências na ficha do PROAD.');
            const idComponente = componente.id;
            const idForm = componente.closest('form')?.id;
            const viewState = ficha.doc.querySelector('input[name="jakarta.faces.ViewState"]')?.value;
            const radio = [...componente.querySelectorAll('input[type="radio"]')]
                .find(i => /providencias/i.test(i.getAttribute('value') || ''));
            if (!radio || !idForm || !viewState) throw new Error('Não reconheci os campos da aba Providências na ficha do PROAD.');
            const p = new URLSearchParams({
                'jakarta.faces.partial.ajax': 'true',
                'jakarta.faces.source': idComponente,
                'jakarta.faces.partial.execute': '@all',
                'jakarta.faces.partial.render': '@all',
                'jakarta.faces.behavior.event': 'change',
                'jakarta.faces.partial.event': 'change',
                [idComponente]: radio.getAttribute('value'),
                [idForm]: idForm,
                'jakarta.faces.ViewState': viewState,
            });
            const r = await buscar(ficha.url, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
                    'Faces-Request': 'partial/ajax', 'X-Requested-With': 'XMLHttpRequest',
                },
                body: p.toString(),
            }, 'aba Providências');
            if (!r.ok) throw new Error(`aba Providências: HTTP ${r.status}`);
            const texto = await r.text();
            const d = new DOMParser().parseFromString(texto.replace(/<!\[CDATA\[|\]\]>/g, ''), 'text/html');
            const vistas = new Set();
            return [...d.querySelectorAll('tr')].map(tr => {
                const celulas = [...tr.querySelectorAll('td')]
                    .map(td => td.textContent.replace(/\$\(function\(\)[\s\S]*?\}\);/g, ' ').replace(/\s+/g, ' ').trim());
                const numero = celulas.find(x => /^\d{3,6}\/20\d{2}$/.test(x));
                if (!numero || vistas.has(numero)) return null;
                vistas.add(numero);
                return { numero, texto: celulas.join(' ').slice(0, 300) };
            }).filter(Boolean);
        }

        function listarDocumentos(doc) {
            return [...doc.querySelectorAll('tr[data-rk]')].map(tr => {
                const tds = [...tr.querySelectorAll('td')].map(td => td.textContent.replace(/\s+/g, ' ').trim());
                const elNumero = tr.querySelector('[id$="docNumero"], [id$="numeroDocumento"]');
                const elDesc = tr.querySelector('[id$="docDescricao"], [id$="descricaoDocumento"]');
                const numero = (elNumero?.textContent || '').replace(/\s+/g, ' ').trim() || tds.find(v => /^\d{1,8}$/.test(v)) || '';
                const descricao = (elDesc?.textContent || '').replace(/\s+/g, ' ').trim() || tds.filter(v => !/^\d+$/.test(v)).join(' ');
                const cadastradoEm = (tds.find(v => /^\d{2}\/\d{2}\/\d{4}/.test(v)) || '').slice(0, 10);
                return { idArquivo: tr.getAttribute('data-rk') || '', numero, descricao, cadastradoEm };
            }).filter(d => /^\d+$/.test(d.idArquivo) && d.descricao);
        }

        async function baixarPdf(idArquivo) {
            const r = await buscar(`${location.origin}/proad/pages/exibirarquivo?idArquivo=${idArquivo}`, {}, `PDF ${idArquivo}`);
            if (!r.ok) throw new Error(`PDF ${idArquivo}: HTTP ${r.status}`);
            const buf = await r.arrayBuffer();
            if (!new TextDecoder().decode(new Uint8Array(buf).slice(0, 5)).startsWith('%PDF')) throw new Error(`PDF ${idArquivo}: o PROAD não devolveu um PDF`);
            return buf;
        }

        async function textoDoPdf(buf, maxPaginas = 3) {
            if (typeof pdfjsLib === 'undefined') throw new Error('pdf.js não carregou na aba do PROAD');
            const tarefa = pdfjsLib.getDocument({ data: new Uint8Array(buf.slice(0)) });
            let timer;
            try {
                return await Promise.race([
                    (async () => {
                        const pdf = await tarefa.promise;
                        if (maxPaginas > 3 && pdf.numPages > maxPaginas) throw new Error(`PDF de certidões com ${pdf.numPages} páginas; limite de leitura ${maxPaginas}. Confira no PROAD.`);
                        let texto = '';
                        for (let p = 1; p <= Math.min(pdf.numPages, maxPaginas); p++) {
                            const page = await pdf.getPage(p);
                            const content = await page.getTextContent();
                            texto += content.items.map(i => i.str + (i.hasEOL ? '\n' : ' ')).join('') + '\f';
                        }
                        return texto;
                    })(),
                    new Promise((_, reject) => { timer = setTimeout(() => reject(new Error('leitura do PDF excedeu 20 s')), 20000); }),
                ]);
            } finally {
                clearTimeout(timer);
                try { Promise.resolve(tarefa.destroy()).catch(() => {}); } catch (_) {}
            }
        }

        function base64(buf) {
            const bytes = new Uint8Array(buf);
            let bin = '';
            for (let i = 0; i < bytes.length; i += 0x8000) bin += String.fromCharCode.apply(null, bytes.subarray(i, i + 0x8000));
            return btoa(bin);
        }

        async function trdsDoProcesso(processo, certidoesPorProcesso, fichas) {
            const ficha = fichas?.get(processo) || await lerFicha(processo);
            fichas?.set(processo, ficha);
            const todos = listarDocumentos(ficha.doc);
            // Guarda documentos de certidões; o PDF é lido se o TRD for deste processo.
            // v1.7.9: "Certidão de Aprovação de Providência", solicitações e comprovantes de pagamento do FGTS
            // casavam com o filtro e geravam alerta falso.
            const NAO_E_CERTIDAO = /SICAF|COMPROVANTE|PAGAMENTO|\bGUIA|\bGRF\b|\bGFD\b|SEFIP|GFIP|DCTF|E-?SOCIAL|FOLHA|CONTA\s+VINCULADA|SOLICITA\S{0,6}\s+DE\s+PROVID|APROVA\S{0,6}\s+DE\s+PROVID|RELA\S{0,6}\s+DE\s+(?:EMPREGADOS|FUNCION)|EXTRATO/i;
            if (certidoesPorProcesso) certidoesPorProcesso.set(processo, todos.filter(d => !NAO_E_CERTIDAO.test(d.descricao) && /CERTID|REGULARIDADE|FGTS|\bCRF\b|\bCNDT\b|\bCND\b|RFB.*PGFN/i.test(d.descricao)));
            const docs = todos.filter(d => FILTRO_TRD.test(d.descricao)).slice(-MAX_TRD_POR_PROCESSO);
            const saida = [];
            for (const d of docs.reverse()) {
                const item = { processo, doc: d.numero, descricao: d.descricao, idArquivo: d.idArquivo, cadastradoEm: d.cadastradoEm, texto: '' };
                try {
                    const buf = await baixarPdf(d.idArquivo);
                    const texto = await textoDoPdf(buf);
                    if (trdConfirmaConteudo(texto)) item.texto = texto.slice(0, 30000);
                    else { item.semTexto = true; item._buf = buf; }
                } catch (e) {
                    item.erro = e.message;
                }
                saida.push(item);
            }
            return saida;
        }

        async function atender(pedido, andamento) {
            const alvo = new Set((pedido.notas || []).map(Number));
            const principal = String(pedido.principal || '').replace(/\s+/g, '');
            if (!/^\d+\/\d{4}$/.test(principal)) throw new Error(`PROAD principal inválido: "${pedido.principal}"`);

            andamentoRede = andamento;
            prazoPedido = Date.now() + 240000;
            andamento(`Abrindo a ficha do PROAD ${principal} (até 30 s por tentativa)…`);
            const ficha = await lerFicha(principal);
            const fichas = new Map([[principal, ficha]]);
            andamento('Lendo a lista de providências…');
            const falhas = [];
            let providencias = [];
            try { providencias = await listarProvidencias(ficha); } catch (e) { falhas.push(e.message); console.warn('[PROAD Terceirizados]', e.message); }
            providencias.sort((a, b) => proadChaveOrdem(b.numero) - proadChaveOrdem(a.numero));
            const processos = [...providencias.slice(0, pedido.maxProvidencias || 15).map(p => p.numero), principal];

            const legiveis = [], semTexto = [];
            const cobertas = new Set();
            const certidoesPorProcesso = new Map();
            for (let i = 0; i < processos.length && cobertas.size < alvo.size; i += 3) {
                const lote = processos.slice(i, i + 3);
                andamento(`Procurando o TRD: providências ${i + 1} a ${i + lote.length} de ${processos.length} (${lote.join(', ')})…`);
                const resultados = await Promise.all(lote.map(p => trdsDoProcesso(p, certidoesPorProcesso, fichas).catch(e => { falhas.push(`${p}: ${e.message}`); return []; })));
                for (const trd of resultados.flat()) {
                    if (trd.erro) { falhas.push(`${trd.processo} DOC ${trd.doc}: ${trd.erro}`); continue; }
                    if (trd.semTexto) { semTexto.push(trd); continue; }
                    const notas = trdParse(trd.texto).notas;
                    if (!notas.length) {
                        falhas.push(`${trd.processo} DOC ${trd.doc}: o PDF é um TRD legível, mas não foi possível identificar a relação de notas.`);
                        continue;
                    }
                    if (notas.some(n => alvo.has(n))) {
                        legiveis.push(trd);
                        notas.forEach(n => { if (alvo.has(n)) cobertas.add(n); });
                    }
                }
            }
            // Se ainda falta nota, os TRDs sem camada de texto vão para OCR no SIGEO.
            const paraOcr = cobertas.size < alvo.size ? semTexto.slice(0, MAX_OCR) : [];
            for (const t of paraOcr) t.pdfBase64 = base64(t._buf);
            const limpar = (t) => { const { _buf, ...resto } = t; return resto; };

            // Certidões originais da providência do TRD, avulsas ou em PDF conjunto.
            const certidoesDocumentos = [];
            let ocrCertidoes = 0;
            const processosTrd = [...new Set([...legiveis, ...paraOcr].map(t => t.processo))];
            for (const proc of (pedido.buscarCertidoes ? processosTrd : [])) {
                // v1.7.8: as de descrição mais clara primeiro (gastam o OCR antes), depois as mais recentes
                const peso = d => (/FGTS|CRF|CNDT|TRABALH|RFB|PGFN|FEDERA|FISCAL|REGULARIDADE/i.test(d.descricao) ? 0 : 1);
                const cands = (certidoesPorProcesso.get(proc) || []).slice()
                    .sort((a, b) => peso(a) - peso(b) || (Number(b.numero) || 0) - (Number(a.numero) || 0)).slice(0, 10);
                for (const d of cands) {
                    andamento(`Lendo as certidões do PROAD ${proc} (DOC ${d.numero})…`);
                    const item = { processo: proc, doc: d.numero, descricao: d.descricao, idArquivo: d.idArquivo, texto: '' };
                    try {
                        const buf = await baixarPdf(d.idArquivo);
                        const texto = await textoDoPdf(buf, 20);
                        if (texto.length > 120000) throw new Error('PDF de certidões excede o limite de texto; confira o documento no PROAD.');
                        const paginas = texto.split('\f').slice(0, -1);
                        item.caracteres = texto.replace(/\s/g, '').length;
                        // v1.7.8: páginas sem camada de texto (digitalizadas) num PDF que tem outras com texto
                        const vazias = paginas.map((p, i) => (p.replace(/\s/g, '').length < 60 ? i + 1 : 0)).filter(Boolean);
                        const achadas = certidoesParse(texto);
                        if (achadas.length) {
                            item.texto = texto;
                            if (vazias.length && achadas.length < 3 && ocrCertidoes < MAX_OCR) { item.pdfBase64 = base64(buf); item.ocrPaginas = vazias.slice(0, 6); ocrCertidoes++; }
                        } else if (certidaoDeOutroTipo(texto) && item.caracteres >= 100) {
                            item.ignorado = `não é certidão de RFB/FGTS/CNDT (${certidaoDeOutroTipo(texto)})`;
                        } else if ((item.caracteres < 100 || vazias.length || /FISCAL|TRABALH|FGTS|CNDT|CRF|POSITIV|NEGATIV|RFB|PGFN|FEDERA|REGULARIDADE/i.test(d.descricao)) && ocrCertidoes < MAX_OCR) {
                            item.texto = texto; item.pdfBase64 = base64(buf); ocrCertidoes++;
                            if (item.caracteres >= 100 && vazias.length) item.ocrPaginas = vazias.slice(0, 6);
                        } else {
                            item.erro = ocrCertidoes >= MAX_OCR && item.caracteres < 100
                                ? `PDF sem texto e o limite de ${MAX_OCR} OCRs por busca já foi usado`
                                : 'RFB/PGFN, FGTS ou CNDT não reconhecidas no conteúdo do PDF';
                            item.amostra = texto.replace(/\s+/g, ' ').slice(0, 300);
                        }
                    } catch (e) { item.erro = e.message; }
                    certidoesDocumentos.push(item);
                }
            }
            return {
                principal,
                certidoesDocumentos,
                providenciasLidas: processos.length,
                totalProvidencias: providencias.length,
                trds: legiveis.map(limpar),
                semTexto: semTexto.map(limpar),
                falhas,
            };
        }

        let ocupado = false;
        // O cliente escolhe o ID da aba que respondeu ao ping. Não há disputa de
        // claim nem espera de timer antes do recebimento, inclusive com várias abas.
        const respostas = new Map();
        async function receberPedido(novo) {
            let pedido;
            try { pedido = JSON.parse(novo); } catch (_) { return; }
            if (!pedido?.id || pedido.trabalhador !== meuId || Date.now() - (pedido.criadoEm || 0) > 60000) return;
            if (respostas.has(pedido.id)) {
                GM_setValue(C.resposta, respostas.get(pedido.id));
                return;
            }
            const responder = (dados) => {
                const valor = JSON.stringify({ id: pedido.id, trabalhador: meuId, em: Date.now(), ...dados });
                respostas.set(pedido.id, valor);
                // Limite de memória por aba; mantém a resposta do pedido em execução.
                if (respostas.size > 20) respostas.delete(respostas.keys().next().value);
                GM_setValue(C.resposta, valor);
            };
            if (ocupado) {
                responder({ fim: true, ok: false, erro: 'O PROAD ainda está atendendo a busca anterior. Tente de novo em instantes.' });
                return;
            }
            ocupado = true;
            try {
                responder({ recebido: true, andamento: 'Pedido recebido pelo PROAD; iniciando a busca…' });
                const r = await atender(pedido, (txt) => responder({ andamento: txt }));
                responder({ fim: true, ok: true, ...r });
            } catch (e) {
                console.error('[PROAD Terceirizados]', e);
                responder({ fim: true, ok: false, erro: e.message });
            } finally {
                ocupado = false;
                andamentoRede = null;
                prazoPedido = 0;
            }
        }
        GM_addValueChangeListener(C.pedido, (_k, _anterior, novo) => { void receberPedido(novo); });
        // Eventos perdidos também são recuperados pelo valor persistido.
        setInterval(() => {
            anunciarVivo();
            void receberPedido(GM_getValue(C.pedido, ''));
        }, 2000);
        anunciarVivo();
        void receberPedido(GM_getValue(C.pedido, ''));
        console.log('[PROAD Terceirizados] Trabalhador v1.9.8 pronto (TRD em segundo plano).');
    }

    /* ---- Cliente (lado SIGEO) ---- */
    const TRD = {
        estado: 'inicial',   // inicial | buscando | ok | erro
        andamento: '',
        erro: '',
        principal: '',
        trds: [],            // TRDs lidos (já com trdParse), só os que citam notas do lote
        certidoesDocumentos: [],          // Certidões originais juntadas nas providências dos TRDs
        semTexto: [],        // TRDs sem texto que não puderam ser lidos nem por OCR
        falhas: [],
        abaAberta: null,
        trabalhadorId: '',
        loteId: 0,
        cancelarEspera: null,
    };

    function proadPrincipalDosDocs(docs) {
        const cont = new Map();
        for (const d of docs) {
            const m = String(d.registro?.contratacao?.processoAdministrativo || '').match(/(\d{1,6})\s*\/\s*(20\d{2})/);
            if (!m) continue;
            const k = `${Number(m[1])}/${m[2]}`;
            cont.set(k, (cont.get(k) || 0) + 1);
        }
        if (cont.size > 1) throw new Error(`O lote contém mais de um PROAD principal (${[...cont.keys()].join(', ')}). Extraia um contrato por vez.`);
        return [...cont.keys()][0] || '';
    }

    const numeroNF = (d) => Number(String(d?.numero ?? '').replace(/\D/g, '')) || null;

    function reiniciarBuscaProad() {
        TRD.loteId++;
        TRD.cancelarEspera?.();
        fecharAbaProadAberta();
        Object.assign(TRD, { estado: 'inicial', andamento: '', erro: '', principal: '', trds: [], semTexto: [], falhas: [], certidoesDocumentos: [], trabalhadorId: '', cancelarEspera: null });
    }

    function confirmarTrabalhadorProad(tempoMs) {
        const C = proadCanal();
        return new Promise((resolve, reject) => {
            const id = crypto.randomUUID();
            let ouvinte = null, timer = null, repeticao = null, terminou = false;
            const cancelar = () => concluir(false, new Error('Busca substituída por um novo lote.'));
            function concluir(ok, erro) {
                if (terminou) return;
                terminou = true;
                clearTimeout(timer); clearInterval(repeticao);
                if (ouvinte !== null) GM_removeValueChangeListener(ouvinte);
                if (TRD.cancelarEspera === cancelar) TRD.cancelarEspera = null;
                erro ? reject(erro) : resolve(ok);
            }
            ouvinte = GM_addValueChangeListener(C.pong, (_k, _a, novo) => {
                if (terminou) return;
                let r; try { r = JSON.parse(novo); } catch (_) { return; }
                if (r?.id === id && r.versao === '1.9.8' && r.trabalhador) {
                    TRD.trabalhadorId = r.trabalhador;
                    concluir(true);
                }
            });
            const enviar = () => GM_setValue(C.ping, JSON.stringify({ id, em: Date.now() }));
            TRD.cancelarEspera = cancelar;
            timer = setTimeout(() => concluir(false), tempoMs);
            repeticao = setInterval(enviar, 1000);
            try { enviar(); } catch (e) { concluir(false, e); }
        });
    }

    async function aguardarTrabalhadorProad(principal, loteId) {
        if (await confirmarTrabalhadorProad(1500)) return true;
        if (TRD.loteId !== loteId) return false;
        const [n, a] = principal.split('/');
        const url = `${CONFIG.proad.base}/proad/pages/fichadoprocesso.xhtml?faces-redirect=true&numeroProtocolo=${n}&numeroAno=${a}`;
        try {
            TRD.abaAberta = GM_openInTab(url, { active: false, insert: true, setParent: true });
        } catch (e) { throw new Error(`Não foi possível abrir a aba do PROAD: ${e.message}`); }
        TRD.andamento = 'Aguardando a aba do PROAD confirmar a comunicação (até 30 s)…';
        atualizarStatusBuscaProad();
        return confirmarTrabalhadorProad(CONFIG.proad.esperaAbaMs);
    }

    function fecharAbaProadAberta() {
        try { TRD.abaAberta?.close?.(); } catch (_) {}
        TRD.abaAberta = null;
    }

    function pedirAoProad(pedido, aoAndamento) {
        const C = proadCanal();
        return new Promise((resolve, reject) => {
            let ouvinte = null, timer = null, timerRecebimento = null, repeticao = null, terminou = false;
            let recebido = false, ultimaResposta = '';
            let ultimoAndamento = 'pedido enviado, aguardando confirmação';
            const cancelar = () => concluir(null, new Error('Busca substituída por um novo lote.'));
            function concluir(r, erro) {
                if (terminou) return;
                terminou = true;
                clearTimeout(timer);
                clearTimeout(timerRecebimento);
                clearInterval(repeticao);
                if (ouvinte !== null) GM_removeValueChangeListener(ouvinte);
                if (TRD.cancelarEspera === cancelar) TRD.cancelarEspera = null;
                erro ? reject(erro) : resolve(r);
            }
            function lerResposta(novo) {
                if (terminou || novo === ultimaResposta) return;
                let r; try { r = JSON.parse(novo); } catch (_) { return; }
                if (r?.id !== pedido.id || r.trabalhador !== pedido.trabalhador) return;
                ultimaResposta = novo;
                recebido = true;
                clearTimeout(timerRecebimento);
                if (!r.fim) { ultimoAndamento = r.andamento || ultimoAndamento; aoAndamento?.(ultimoAndamento); return; }
                if (r.ok) concluir(r); else concluir(null, new Error(r.erro || 'falha no PROAD'));
            }
            if (!pedido.trabalhador) { concluir(null, new Error('Nenhuma aba do PROAD foi confirmada para receber o pedido. Busque de novo.')); return; }
            const valorPedido = JSON.stringify(pedido);
            timer = setTimeout(() => concluir(null, new Error(`O PROAD não terminou em ${CONFIG.proad.timeoutBuscaMs / 1000} s. Última etapa: ${ultimoAndamento}.`)), CONFIG.proad.timeoutBuscaMs);
            ouvinte = GM_addValueChangeListener(C.resposta, (_k, _a, novo) => lerResposta(novo));
            TRD.cancelarEspera = cancelar;
            timerRecebimento = setTimeout(() => concluir(null, new Error('A aba do PROAD confirmou a comunicação, mas não confirmou o recebimento do pedido em 15 s, mesmo após reenvio. Recarregue a aba do PROAD e clique em "Buscar de novo".')), CONFIG.proad.timeoutRecebimentoMs);
            const conferirEntrega = () => {
                if (terminou) return;
                try {
                    lerResposta(GM_getValue(C.resposta, ''));
                    // Mesmo ID/destinatário: a aba devolve a resposta guardada, sem repetir a busca.
                    if (!terminou && !recebido) GM_setValue(C.pedido, valorPedido);
                } catch (e) { concluir(null, e); }
            };
            repeticao = setInterval(conferirEntrega, 1000);
            try {
                aoAndamento?.('Pedido enviado; aguardando confirmação do PROAD…');
                conferirEntrega();
            } catch (e) { concluir(null, e); }
        });
    }

    // v1.7.8: OCR só das páginas indicadas (as que não têm camada de texto)
    async function ocrPaginasBase64(b64, paginas) {
        const bin = atob(b64);
        const bytes = new Uint8Array(bin.length);
        for (let i = 0; i < bin.length; i++) bytes[i] = bin.charCodeAt(i);
        const tarefa = pdfjsLib.getDocument({ data: bytes });
        try {
            const pdf = await tarefa.promise;
            let texto = '';
            for (const p of paginas) if (p >= 1 && p <= pdf.numPages) texto += await ocrPaginaPDF(await pdf.getPage(p)) + '\f';
            return texto;
        } finally {
            try { Promise.resolve(tarefa.destroy()).catch(() => {}); } catch (_) {}
        }
    }

    async function ocrTrdBase64(b64, maxPaginas = 2) {
        const bin = atob(b64);
        const bytes = new Uint8Array(bin.length);
        for (let i = 0; i < bin.length; i++) bytes[i] = bin.charCodeAt(i);
        const tarefa = pdfjsLib.getDocument({ data: bytes });
        try {
            const pdf = await tarefa.promise;
            let texto = '';
            if (maxPaginas > 2 && pdf.numPages > maxPaginas) throw new Error(`PDF de certidões excede ${maxPaginas} páginas de OCR; confira no PROAD.`);
            for (let p = 1; p <= Math.min(pdf.numPages, maxPaginas); p++) texto += await ocrPaginaPDF(await pdf.getPage(p)) + '\f';
            return texto;
        } finally {
            try { Promise.resolve(tarefa.destroy()).catch(() => {}); } catch (_) {}
        }
    }

    async function buscarTRDNoProad(docsDoLote = null) {
        if (TRD.estado === 'buscando') return;
        const loteId = TRD.loteId;
        const docs = (docsDoLote || documentosProcessados).filter(d => d.status !== 'erro');
        const notas = docs.map(numeroNF).filter(Boolean);
        Object.assign(TRD, { estado: 'buscando', andamento: 'Preparando a busca…', erro: '', trds: [], semTexto: [], falhas: [], certidoesDocumentos: [] });
        atualizarStatusBuscaProad();
        try {
            if (!notas.length) throw new Error('nenhuma nota processada para procurar.');
            if (typeof GM_addValueChangeListener === 'undefined' || typeof GM_openInTab === 'undefined') throw new Error('o Tampermonkey não liberou as permissões novas. Reinstale o robô v1.9.8 e recarregue SIGEO e PROAD.');
            TRD.principal = proadPrincipalDosDocs(docs);
            if (!TRD.principal) throw new Error('as notas não trazem o PROAD principal da contratação no SIGEO.');

            console.log(`[SIGEO-Terceirizados] Iniciando TRD em segundo plano: PROAD ${TRD.principal}, ${notas.length} NFs selecionadas.`);
            TRD.andamento = 'Confirmando a comunicação com a aba do PROAD…';
            atualizarStatusBuscaProad();
            if (!(await aguardarTrabalhadorProad(TRD.principal, loteId))) {
                throw new Error('A aba do PROAD não confirmou a comunicação em 30 s. Abra a aba criada pelo robô; se pedir login, entre. Se já estiver autenticado, recarregue essa aba após atualizar o robô e clique em "Buscar de novo" no SIGEO.');
            }
            if (TRD.loteId !== loteId) return;
            const r = await pedirAoProad(
                { id: crypto.randomUUID(), criadoEm: Date.now(), trabalhador: TRD.trabalhadorId, principal: TRD.principal, notas, maxProvidencias: CONFIG.proad.maxProvidencias, buscarCertidoes: !!CONFIG.proad.buscarCertidoes },
                (txt) => { if (TRD.loteId !== loteId) return; TRD.andamento = txt; console.log('[SIGEO-Terceirizados] PROAD:', txt); atualizarStatusBuscaProad(); }
            );

            if (TRD.loteId !== loteId) return;
            const lidos = r.trds.map(t => ({ ...t, ...trdParse(t.texto), viaOcr: false }));
            const alvo = new Set(notas);
            const cobertas = new Set(lidos.flatMap(t => t.notas).filter(n => alvo.has(n)));
            const semTexto = [];
            for (const t of r.semTexto) {
                if (TRD.loteId !== loteId) return;
                if (!t.pdfBase64 || cobertas.size >= alvo.size) { semTexto.push(t); continue; }
                TRD.andamento = `Lendo por OCR o TRD do PROAD ${t.processo} (DOC ${t.doc}), que não tem texto…`;
                atualizarStatusBuscaProad();
                try {
                    const texto = await ocrTrdBase64(t.pdfBase64);
                    if (TRD.loteId !== loteId) return;
                    const p = trdParse(texto);
                    if (p.confirmado && p.notas.some(n => alvo.has(n))) {
                        lidos.push({ ...t, pdfBase64: undefined, texto, ...p, viaOcr: true });
                        p.notas.forEach(n => { if (alvo.has(n)) cobertas.add(n); });
                    } else if (!p.confirmado) {
                        semTexto.push({ ...t, pdfBase64: undefined, erro: 'OCR não reconheceu o TRD' });
                    }
                } catch (e) {
                    semTexto.push({ ...t, pdfBase64: undefined, erro: `OCR falhou: ${e.message}` });
                }
            }
            if (TRD.loteId !== loteId) return;
            const certidoesDocumentos = [];
            for (const original of (r.certidoesDocumentos || [])) {
                if (TRD.loteId !== loteId) return;
                const x = { ...original };
                if (x.pdfBase64) {
                    TRD.andamento = `Lendo por OCR as certidões do PROAD ${x.processo} (DOC ${x.doc}${x.ocrPaginas ? `, página(s) ${x.ocrPaginas.join(', ')}` : ''})…`;
                    atualizarStatusBuscaProad();
                    try {
                        const ocr = x.ocrPaginas ? await ocrPaginasBase64(x.pdfBase64, x.ocrPaginas) : await ocrTrdBase64(x.pdfBase64, 6);
                        x.texto = `${x.texto || ''}${ocr}`; x.viaOcr = true;
                    } catch (e) { x.erro = `OCR das certidões falhou: ${e.message}`; }
                    delete x.pdfBase64;
                }
                x.certidoes = certidoesParse(x.texto || '');
                x.confirmado = x.certidoes.length > 0;
                // v1.7.8: OCR que não acha nada deixava de avisar
                if (!x.confirmado && !x.erro && !x.ignorado) {
                    if (certidaoDeOutroTipo(x.texto)) { x.ignorado = `não é certidão de RFB/FGTS/CNDT (${certidaoDeOutroTipo(x.texto)})`; delete x.amostra; }
                    else {
                        x.erro = x.viaOcr ? 'o OCR não reconheceu RFB/PGFN, FGTS nem CNDT; confira o PDF' : 'RFB/PGFN, FGTS ou CNDT não reconhecidas no conteúdo do PDF';
                        x.amostra = x.amostra || String(x.texto || '').replace(/\s+/g, ' ').slice(0, 300);
                    }
                }
                certidoesDocumentos.push(x);
            }
            if (TRD.loteId !== loteId) return;
            Object.assign(TRD, { estado: 'ok', trds: lidos, semTexto, falhas: r.falhas || [], certidoesDocumentos, andamento: '' });
            if (certidoesDocumentos.length) {
                console.log('[SIGEO-Terceirizados] Certidões — o que foi lido em cada documento:');
                console.table(certidoesDocumentos.map(x => ({
                    PROAD: x.processo, DOC: x.doc, descricao: x.descricao, caracteres: x.caracteres ?? (x.texto || '').length,
                    OCR: x.viaOcr ? (x.ocrPaginas ? `pág. ${x.ocrPaginas.join(',')}` : 'sim') : '',
                    encontradas: (x.certidoes || []).map(c => `${c.tipo} ${c.validade || 'sem validade'} CNPJ ${c.cnpj || '?'}`).join(' | '),
                    situacao: x.erro || x.ignorado || 'ok',
                })));
                for (const x of certidoesDocumentos.filter(y => y.erro && y.amostra)) console.log(`[SIGEO-Terceirizados] DOC ${x.doc} — início do texto lido: ${x.amostra}`);
            }
            console.log('[SIGEO-Terceirizados] TRD:', lidos.map(t => resumoTRD(t)), '| sem texto:', semTexto.map(t => `${t.processo} DOC ${t.doc}`));
            if (TRD.falhas.length) console.warn('[SIGEO-Terceirizados] PROAD — documentos não lidos:', TRD.falhas);
        } catch (e) {
            if (TRD.loteId !== loteId) return;
            console.error('[SIGEO-Terceirizados] Busca do TRD:', e);
            Object.assign(TRD, { estado: 'erro', erro: e.message, andamento: '' });
        } finally {
            // Se deu erro, a aba aberta pelo robô fica: pode ser o login do PROAD esperando o usuário.
            if (TRD.loteId === loteId) {
                if (TRD.estado === 'ok') fecharAbaProadAberta();
                atualizarStatusBuscaProad();
            }
        }
    }

    /* ---- Situação de cada nota frente ao TRD ---- */
    function analisarTRD() {
        const docs = documentosProcessados.filter(d => d.status !== 'erro');
        const res = { porNota: new Map(), principal: null, alertas: [], erros: [] };
        if (TRD.estado !== 'ok') return res;

        // TRD "da competência" = o que cobre mais notas do lote
        const lote = new Set(docs.map(numeroNF).filter(Boolean));
        const ranking = TRD.trds.map(t => ({ t, n: t.notas.filter(x => lote.has(x)).length })).sort((a, b) => b.n - a.n);
        res.principal = ranking[0]?.t || null;
        const p = res.principal;

        for (const d of docs) {
            const nf = numeroNF(d);
            const trd = p && p.notas.includes(nf) ? p : TRD.trds.find(t => t.notas.includes(nf));
            let situacao;
            if (!trd) situacao = TRD.semTexto.length ? 'TRD ILEGÍVEL' : 'SEM TRD';
            else if (trd !== p) situacao = 'OUTRO TRD';
            else situacao = 'OK';
            res.porNota.set(nf, { trd, situacao });
        }

        const fmt = (v) => Formatacao.formatarValorBrasileiro(v);
        const lista = (ns) => ns.length > 6 ? `${ns.slice(0, 6).join(', ')} e mais ${ns.length - 6}` : ns.join(', ');
        if (!p) {
            res.erros.push(TRD.semTexto.length
                ? `Nenhum TRD legível cita as notas do lote. ${TRD.semTexto.length} TRD(s) sem texto não puderam ser lidos (${TRD.semTexto.map(t => `${t.processo} DOC ${t.doc}`).join('; ')}). Confira no PROAD.`
                : `Nenhum TRD com as notas do lote nas ${CONFIG.proad.maxProvidencias} providências mais recentes do PROAD ${TRD.principal}.`);
            return res;
        }
        const fora = [...res.porNota.entries()].filter(([, v]) => v.situacao !== 'OK').map(([nf, v]) => `${nf} (${v.situacao.toLowerCase()}${v.trd ? ' ' + v.trd.proadProvidencia : ''})`);
        if (fora.length) res.erros.push(`Notas fora do TRD ${p.proadProvidencia || p.processo}: ${lista(fora)}. A colagem leva um PROAD só; copie um TRD por vez.`);
        const faltam = p.notas.filter(n => !lote.has(n));
        if (faltam.length) res.alertas.push(`O TRD ${p.proadProvidencia || p.processo} cita a(s) NF ${lista(faltam)}, que não está(ão) neste lote.`);
        if (p.valorGlobal !== null) {
            const soma = docs.filter(d => p.notas.includes(numeroNF(d))).reduce((s, d) => s + (centavos(d.valor) || 0), 0);
            const dif = soma - centavos(p.valorGlobal);
            if (!faltam.length && dif !== 0) res.erros.push(`Valor global do TRD (R$ ${fmt(p.valorGlobal)}) diferente da soma das notas (R$ ${fmt(soma / 100)}).`);
        } else {
            res.alertas.push('Valor global do TRD não foi lido.');
        }
        if (!p.competencia) res.alertas.push('Competência do TRD não foi lida; confira na macro antes de colar.');
        if (SEGEST.competencia && p.competencia && SEGEST.competencia !== p.competencia) {
            res.erros.push(`Competência do TRD (${p.competenciaTexto || p.competencia}) diferente da planilha da SEGEST (${SEGEST.competencia}).`);
        }
        if (!p.proadProvidencia) res.alertas.push(`O TRD não informa o PROAD providência; será usado o processo onde ele está juntado (${p.processo}).`);
        else if (p.processo && p.processo !== p.proadProvidencia) res.alertas.push(`O TRD diz providência ${p.proadProvidencia}, mas está juntado no PROAD ${p.processo}.`);
        if (p.viaOcr) res.alertas.push(`O TRD ${p.proadProvidencia || p.processo} não tem texto e foi lido por OCR. Confira competência, PROAD e valor na macro.`);
        const contratoNota = String(docs[0]?.numeroContrato || '').match(/(\d{1,6})\s*\/\s*(20\d{2})/);
        if (p.contrato && contratoNota && `${Number(contratoNota[1])}/${contratoNota[2]}` !== p.contrato) {
            res.alertas.push(`Contrato do TRD (${p.contrato}) diferente do contrato das notas no SIGEO (${contratoNota[0]}).`);
        }
        if (CONFIG.proad.buscarCertidoes) analisarCertidoes(res, p, docs);
        const docsDoTrd = docs.filter(d => p.notas.includes(numeroNF(d)));
        if (CONFIG.dataAtesteNaColagem === 'trd') {
            if (p.dataTRD) {
                const atestes = [...new Set(docsDoTrd.map(d => String(d.ateste?.dataAteste || '').slice(0, 10)).filter(Boolean))];
                const outras = atestes.filter(a => a !== p.dataTRD);
                if (outras.length) res.alertas.push(`A Data Ateste NF vai com a data do TRD (${Formatacao.formatarDataBrasileira(p.dataTRD)}); no SIGEO o ateste está em ${outras.map(a => Formatacao.formatarDataBrasileira(a)).join(', ')}.`);
            }
        } else if (p.dataTRD) {
            // v1.9.3: ateste do SIGEO depois do TRD é incomum; avisa sem bloquear.
            const depois = docsDoTrd.filter(d => d.ateste?.dataAteste && String(d.ateste.dataAteste).slice(0, 10) > p.dataTRD).map(d => d.numero);
            if (depois.length) res.alertas.push(`Ateste no SIGEO posterior à data do TRD (${Formatacao.formatarDataBrasileira(p.dataTRD)}) na(s) NF ${lista(depois)}.`);
        }
        return res;
    }

    function analisarCertidoes(res, p, docs) {
        const certs = { receitaFederal: null, fgts: null, trabalhista: null, fontes: {} };
        res.certidoes = certs;
        const cnpjNota = String(docs[0]?.registro?.fornecedor?.documento || docs[0]?.xml?.cnpj || docs[0]?.pdf?.cnpj || '').replace(/\D/g, '').padStart(14, '0');
        const documentos = TRD.certidoesDocumentos.filter(d => d.processo === p.processo)
            .sort((a, b) => (Number(b.doc) || 0) - (Number(a.doc) || 0));
        const nomes = { receitaFederal: 'Receita Federal/PGFN', fgts: 'FGTS', trabalhista: 'Trabalhista' };
        for (const d of documentos) if (d.erro) res.alertas.push(`Certidões PROAD ${d.processo} DOC ${d.doc}: ${d.erro}.`);
        // v1.7.8: entre todos os documentos da providência, vale a certidão do fornecedor com a
        // validade mais longa. RFB/PGFN e CNDT valem para matriz e filiais (compara a raiz do CNPJ);
        // o CRF do FGTS é por estabelecimento (CNPJ completo).
        const raiz = c => String(c || '').slice(0, 8);
        for (const [tipo, nome] of Object.entries(nomes)) {
            const candidatas = [];
            for (const d of documentos) {
                const doTipo = (d.certidoes || []).filter(c => c.tipo === tipo);
                if (!doTipo.length) continue;
                const proprias = doTipo.filter(c => c.cnpj && (tipo === 'fgts' ? c.cnpj === cnpjNota : raiz(c.cnpj) === raiz(cnpjNota)));
                if (!proprias.length) {
                    res.alertas.push(`Certidão ${nome} DOC ${d.doc}: ${doTipo.some(c => c.cnpj) ? `CNPJ ${doTipo.find(c => c.cnpj).cnpj} diferente do fornecedor (${cnpjNota})` : 'CNPJ não identificado'}; validade não usada.`);
                    continue;
                }
                const comValidade = proprias.filter(c => c.validade);
                if (!comValidade.length) { res.alertas.push(`Certidão ${nome} DOC ${d.doc}: validade não encontrada; confira o documento.`); continue; }
                for (const c of comValidade) candidatas.push({ validade: c.validade, d });
            }
            if (candidatas.length) {
                candidatas.sort((x, y) => (x.validade < y.validade ? 1 : x.validade > y.validade ? -1 : (Number(y.d.doc) || 0) - (Number(x.d.doc) || 0)));
                const { validade, d } = candidatas[0];
                certs[tipo] = validade;
                certs.fontes[tipo] = { processo: d.processo, doc: d.doc, idArquivo: d.idArquivo, viaOcr: !!d.viaOcr };
            }
            if (!certs[tipo]) res.alertas.push(`Validade da certidão ${nome} não encontrada no PROAD ${p.processo}; esse campo não será preenchido na Liquidação.`);
        }
        const pelaDataDoTrd = CONFIG.proad.validadeCertidaoNaData === 'trd' && p.dataTRD;
        const hoje = pelaDataDoTrd ? new Date(`${p.dataTRD}T00:00:00`) : new Date(); hoje.setHours(0, 0, 0, 0);
        const limite = new Date(hoje); limite.setDate(limite.getDate() + (CONFIG.proad.diasAvisoCertidao || 15));
        const trdDt = p.dataTRD ? new Date(`${p.dataTRD}T00:00:00`) : null;
        const vencidas = [], vencendo = [];
        for (const [tipo, nome] of Object.entries(nomes)) {
            const d = certs[tipo];
            if (!d) continue;
            const dt = new Date(`${d}T00:00:00`);
            const descricao = `${nome} (${Formatacao.formatarDataBrasileira(d)}, DOC ${certs.fontes[tipo].doc})`;
            if (dt < hoje) vencidas.push(trdDt && !pelaDataDoTrd && dt >= trdDt ? `${descricao}, válida na data do TRD ${Formatacao.formatarDataBrasileira(p.dataTRD)}` : descricao);
            else if (dt <= limite) vencendo.push(descricao);
            if (certs.fontes[tipo].viaOcr) res.alertas.push(`Certidão ${nome} DOC ${certs.fontes[tipo].doc}: validade lida por OCR; confira no PDF.`);
        }
        if (vencidas.length) res.erros.push(`Certidão vencida ${pelaDataDoTrd ? 'na data do TRD' : 'hoje'} — ${vencidas.join('; ')}. Junte certidão atualizada no PROAD e busque de novo.`);
        if (vencendo.length) res.alertas.push(`Certidão vencendo em até ${CONFIG.proad.diasAvisoCertidao} dias — ${vencendo.join(', ')}.`);
    }

    // v1.7.9: o que cada documento lido era, numa linha (para não precisar abrir o console)
    function resumoDocumentosCertidoes(processo) {
        const nomes = { receitaFederal: 'RFB', fgts: 'FGTS', trabalhista: 'CNDT' };
        return TRD.certidoesDocumentos.filter(d => d.processo === processo)
            .sort((a, b) => (Number(b.doc) || 0) - (Number(a.doc) || 0))
            .map(d => {
                const tipos = [...new Set((d.certidoes || []).map(c => nomes[c.tipo]))];
                const sit = tipos.length ? tipos.join('/') : d.ignorado ? d.ignorado.replace(/^não é certidão de RFB\/FGTS\/CNDT \((.*)\)$/, '$1') : 'não reconhecido';
                return `DOC ${d.doc} ${sit}${d.viaOcr ? ' (OCR)' : ''}`;
            }).join(' · ');
    }

    function resumoCertidoes(certs) {
        if (!certs) return 'Validades das certidões não lidas';
        return [['receitaFederal', 'RFB/PGFN'], ['fgts', 'FGTS'], ['trabalhista', 'CNDT']]
            .map(([tipo, nome]) => `${nome}: ${certs[tipo] ? Formatacao.formatarDataBrasileira(certs[tipo]) : 'não lida'}${certs.fontes?.[tipo] ? ` (DOC ${certs.fontes[tipo].doc})` : ''}`)
            .join(' · ');
    }

    function resumoTRD(t) {
        if (!t) return '';
        const ns = [...t.notas].sort((a, b) => a - b);
        const faixa = ns.length > 1 && ns[ns.length - 1] - ns[0] === ns.length - 1 ? `NF ${ns[0]} a ${ns[ns.length - 1]}` : `NF ${ns.join(', ')}`;
        return [`TRD ${t.proadProvidencia || t.processo} (DOC ${t.doc})`, faixa, t.competenciaTexto,
            t.valorGlobal !== null ? `R$ ${Formatacao.formatarValorBrasileiro(t.valorGlobal)}` : null, t.viaOcr ? 'lido por OCR' : null]
            .filter(Boolean).join(' · ');
    }

    /* ====================================================================================
     * 11. INICIALIZAÇÃO
     * ==================================================================================== */
    // Um observer só para a tabela atual. Quando o Angular substitui a tabela inteira,
    // o observador global abaixo detecta o novo componente e reconecta este observer.
    let _observadorTabela = null;
    let _tabelaObservada = null;
    let _observadorEstruturaPagina = null;

    function noContemEstruturaRelevante(no) {
        if (!no || no.nodeType !== Node.ELEMENT_NODE) return false;
        return no.matches?.('mat-table, mat-row, app-exportacao-csv')
            || !!no.querySelector?.('mat-table, mat-row, app-exportacao-csv');
    }

    function garantirObservadorEstruturaPagina() {
        if (_observadorEstruturaPagina || !document.documentElement) return;
        _observadorEstruturaPagina = new MutationObserver((mutacoes) => {
            const mudouEstrutura = mutacoes.some(m =>
                [...m.addedNodes, ...m.removedNodes].some(noContemEstruturaRelevante));
            if (!mudouEstrutura) return;
            iniciarNaTelaDeDocumentosFiscais();
        });
        _observadorEstruturaPagina.observe(document.documentElement, { childList: true, subtree: true });
    }

    function iniciarNaTelaDeDocumentosFiscais() {
        garantirObservadorEstruturaPagina();
        agendarAtualizacaoUI(0, true);

        const tabela = document.querySelector('mat-table');
        if (!tabela || tabela === _tabelaObservada) return;

        _observadorTabela?.disconnect();
        _observadorTabela = new MutationObserver((mutacoes) => {
            // Interessa quando uma linha entra/sai diretamente OU dentro de um fragmento/
            // contêiner criado pelo Angular. A versão anterior só reconhecia MAT-ROW direto.
            const mexeuEmLinhas = mutacoes.some(m =>
                [...m.addedNodes, ...m.removedNodes].some(no => {
                    if (!no || no.nodeType !== Node.ELEMENT_NODE) return false;
                    return no.nodeName === 'MAT-ROW' || !!no.querySelector?.('mat-row');
                }));
            if (mexeuEmLinhas) agendarAtualizacaoUI(60, true);
        });
        _observadorTabela.observe(tabela, { childList: true, subtree: true });
        _tabelaObservada = tabela;
    }


    /* ====================================================================================
     * 14. MÓDULO: CONFERÊNCIA PREVIDENCIÁRIA E FGTS (v2.0.0; conferência refeita na v2.3.0)
     * ------------------------------------------------------------------------------------
     * Isolado do fluxo das notas: só é montado quando o usuário abre a janela (botão
     * "🧾 Prev./FGTS" ou menu do Tampermonkey). Não altera SEGEST, TRD nem a colagem da
     * Liquidação; só LÊ a planilha da SEGEST já importada, se houver.
     * Documentos: planilha da SEGEST (lista-base), folha analítica, S-5001 e FGTS Digital
     * (detalhe da guia, GFD e comprovante). Duas saídas: (1) o checklist e a Amostragem, colados
     * no "Relatório SLDST - Conferência Previdenciária e FGTS Digital" pela macro
     * ColarConferenciaPrevidenciaria (v2.3.0); (2) a memória da conferência (Excel ou PDF), com
     * o detalhe por trabalhador, para arquivar na pasta do mês e juntar ao PROAD.
     * ==================================================================================== */
    let _moduloPrev = null;
    function moduloPrev() {
        if (!_moduloPrev) _moduloPrev = criarModuloPrev();
        return _moduloPrev;
    }
    function abrirModuloPrev() {
        if (!MODULO_PREV_ATIVO) return;
        try { moduloPrev().abrir(); } catch (e) {
            console.error('[SIGEO-Terceirizados] Conferência previdenciária:', e);
            mostrarErroSnackbar(`Conferência previdenciária: ${e.message}. O restante do robô segue normal.`);
        }
    }
    function criarModuloPrev() {
    // ---------- utilidades ----------
    const P = {};
    P.dig = (v) => String(v ?? '').replace(/\D/g, '');
    P.cpf = (v) => { const d = P.dig(v); return d && d.length <= 11 && Number(d) > 0 ? d.padStart(11, '0') : ''; };
    P.fmtCpf = (d) => (d || '').replace(/^(\d{3})(\d{3})(\d{3})(\d{2})$/, '$1.$2.$3-$4');
    P.fmtCnpj = (d) => (d || '').replace(/^(\d{2})(\d{3})(\d{3})(\d{4})(\d{2})$/, '$1.$2.$3/$4-$5');
    P.ce = (v) => { // "3.282,37" -> 328237 (centavos)
        if (v === null || v === undefined || v === '') return null;
        if (typeof v === 'number') return Math.round(v * 100);
        const s = String(v).trim().replace(/\./g, '').replace(',', '.');
        const n = Number(s); return Number.isFinite(n) ? Math.round(n * 100) : null;
    };
    P.rs = (c) => (c === null || c === undefined) ? '' : (c < 0 ? '-' : '') + (Math.abs(c) / 100).toFixed(2).replace('.', ',').replace(/\B(?=(\d{3})+(?!\d))/g, '.');
    P.nome = (s) => String(s || '').normalize('NFD').replace(/[\u0300-\u036f]/g, '').toUpperCase().replace(/[^A-Z ]/g, ' ').replace(/\s+/g, ' ').trim();
    P.curto = (s) => { const p = String(s || '').trim().split(/\s+/); return p.length > 2 ? `${p[0]} ${p[p.length - 1]}` : String(s || '').trim(); };
    P.fmtRaiz = (d) => { const x = P.dig(d); return x.length >= 14 ? P.fmtCnpj(x) : x.slice(0, 8).replace(/^(\d{2})(\d{3})(\d{3})$/, '$1.$2.$3'); };
    P.titulo = (s) => String(s || '').toLowerCase().replace(/(^|\s)(\S)/g, (m, a, b) => a + b.toUpperCase()).replace(/\s(De|Da|Do|Dos|Das|E)\s/g, (m) => m.toLowerCase());
    const MONEY = /^-?(?:\d{1,3}(?:\.\d{3})+|\d+),\d{2}$/;
    const MESES = ['Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho', 'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'];
    P.MESES = MESES;
    P.compDe = (mmAAAA) => { const m = String(mmAAAA || '').match(/(\d{2})\/(\d{4})/); return m ? `${m[2]}-${m[1]}` : ''; };
    P.compTexto = (iso) => { const [a, m] = String(iso || '').split('-'); return a && m ? `${m}/${a}` : '?'; };

    // Linhas de texto na posição em que aparecem NA TELA (aplica a rotação da página: o
    // detalhe da guia do FGTS Digital vem em página girada, e ordenar pela coordenada crua
    // empilhava as colunas da tabela).
    P.linhasDaPagina = (items, viewport, Util) => {
        const its = (items || []).map((it, ordem) => {
            const t = Util.transform(viewport.transform, it.transform);
            return { texto: String(it.str || '').replace(/\s+/g, ' ').trim(), x: t[4], y: t[5], ordem };
        }).filter(i => i.texto);
        its.sort((a, b) => (a.y - b.y) || (a.x - b.x) || (a.ordem - b.ordem));
        const linhas = [];
        for (const it of its) {
            let l = linhas[linhas.length - 1];
            if (!l || Math.abs(l.y - it.y) > 2.5) { l = { y: it.y, itens: [] }; linhas.push(l); }
            l.itens.push(it);
            l.y = l.itens.reduce((s, i) => s + i.y, 0) / l.itens.length;
        }
        return linhas.map(l => l.itens.sort((a, b) => (a.x - b.x) || (a.ordem - b.ordem)).map(i => i.texto).join(' ').replace(/\s+/g, ' ').trim()).join('\n');
    };

    // Identifica o tipo de cada PDF pelo conteúdo (o usuário pode juntar tudo de uma vez).
    P.tipoDoPdf = (paginas) => {
        const t = paginas.slice(0, 6).join('\n');
        if (/S-5001\s*-\s*Informa[çc][õo]es das contribui[çc][õo]es/i.test(t)) return 's5001';
        if (/FOLHA ANAL[IÍ]TICA/i.test(t)) return 'folha';
        if (/Detalhe da Guia Emitida|GFD\s*-\s*Guia do FGTS Digital|Rela[çc][ãa]o de Trabalhadores/i.test(t)) return 'fgts';
        if (/comprovante/i.test(t) && /FGTS|CEF|CAIXA/i.test(t)) return 'fgts';
        return '';
    };

    // ---------- S-5001 ----------
    P.lerS5001 = (paginas) => {
        let texto = paginas.join('\n');
        const r = { competencia: '', lotacao: '', trabalhadores: new Map(), totais: {}, avisos: [] };
        r.competencia = P.compDe(texto.match(/Folha de Pagamento Mensal\s*-\s*(\d{2}\/\d{4})/i)?.[1]);
        const iTot = texto.search(/^TOTAIS\s*$/m);
        const corpo = iTot >= 0 ? texto.slice(0, iTot) : texto;
        const tot = iTot >= 0 ? texto.slice(iTot) : '';
        for (const m of tot.matchAll(/^\S+\s+(11|19|21)\s+((?:\d{1,3}(?:\.\d{3})+|\d+),\d{2})\s*$/gm)) if (r.totais[m[1]] === undefined) r.totais[m[1]] = P.ce(m[2]);
        // a 2ª metade ("REMUNERAÇÕES POR PERÍODO") repete os mesmos trabalhadores: vale a 1ª ocorrência
        const primeira = corpo.split(/REMUNERA[ÇC][ÕO]ES POR PER[IÍ]ODO/i)[0];
        let atual = null;
        for (const linha of primeira.split('\n')) {
            const mc = linha.match(/(\d{3}\.\d{3}\.\d{3}-\d{2})/);
            const toks = linha.trim().split(/\s+/);
            if (mc) {
                const cpf = P.cpf(mc[1]);
                if (!r.lotacao) r.lotacao = P.dig(linha.match(/(\d{2}\.\d{3}\.\d{3}\/\d{4}-\d{2})/)?.[1]);
                atual = { cpf, nome: '', matFolha: '', matEsocial: '', categoria: '', b11: 0, b11x: 0, b19: 0, d21: 0, d21x: 0 };
                const depois = linha.slice(linha.indexOf(mc[1]) + mc[1].length).replace(/^\s*\d{2}\/\d{4}\s*/, '');
                atual.nome = (depois.match(/^(.*?)\s*\d+\/\d+/)?.[1] || depois.match(/^([A-ZÀ-Ú' .]+?)\s+\d/)?.[1] || '').replace(/\d+$/, '').trim();
                atual.matFolha = linha.match(/\b\d+\/(\d{5,})\b/)?.[1] || '';
                atual.categoria = linha.match(/\b(1\d\d)\b\s+(?:\d{6}|\d{2}\b)/)?.[1] || '';
                // tipo 11 na própria linha do CPF; o valor é o último monetário da linha
                const iVal = toks.map((t, i) => MONEY.test(t) ? i : -1).filter(i => i >= 0).pop();
                if (iVal !== undefined) {
                    let cod = '11';
                    for (let i = iVal - 1; i >= 0; i--) if (/^(11\*?|19|21\*?)$/.test(toks[i])) { cod = toks[i]; break; }
                    P._s5Soma(atual, cod, P.ce(toks[iVal]));
                }
                if (r.trabalhadores.has(cpf)) { atual = null; continue; }
                r.trabalhadores.set(cpf, atual);
                continue;
            }
            const mv = linha.trim().match(/^(11\*?|19|21\*?)\s+((?:\d{1,3}(?:\.\d{3})+|\d+),\d{2})$/);
            if (mv && atual) P._s5Soma(atual, mv[1], P.ce(mv[2]));
        }
        if (!r.trabalhadores.size) r.avisos.push(`S-5001: nenhum trabalhador reconhecido. Início do texto lido: "${texto.slice(0, 160).replace(/\s+/g, ' ')}"`);
        const soma = (k) => [...r.trabalhadores.values()].reduce((s, t) => s + t[k], 0);
        r.soma = { 11: soma('b11') + soma('b11x'), 19: soma('b19'), 21: soma('d21') + soma('d21x') };
        for (const k of ['11', '19', '21']) {
            if (r.totais[k] !== undefined && r.totais[k] !== r.soma[k]) r.avisos.push(`S-5001: a soma lida do código ${k} (R$ ${P.rs(r.soma[k])}) difere do total do relatório (R$ ${P.rs(r.totais[k])}). Confira se alguma linha não foi lida.`);
        }
        return r;
    };
    P._s5Soma = (t, cod, v) => {
        if (v === null) return;
        if (cod === '11') t.b11 += v; else if (cod === '11*') t.b11x += v; else if (cod === '19') t.b19 += v;
        else if (cod === '21') t.d21 += v; else if (cod === '21*') t.d21x += v;
    };

    // ---------- Folha analítica ----------
    // Cada lançamento é "Cód Tp Descrição [Referência] Valor"; a folha tem duas colunas por linha.
    P.itensFolha = (bloco) => {
        const itens = [];
        for (const linha of bloco.split('\n')) {
            const tk = linha.trim().split(/\s+/);
            for (let i = 0; i < tk.length - 2; i++) {
                if (!/^\d{1,4}$/.test(tk[i]) || !/^0[1-4]$/.test(tk[i + 1]) || MONEY.test(tk[i + 2])) continue;
                let j = i + 2; const desc = [];
                while (j < tk.length && !MONEY.test(tk[j])) desc.push(tk[j++]);
                const valores = [];
                while (j < tk.length && MONEY.test(tk[j])) valores.push(tk[j++]);
                if (!valores.length) continue;
                itens.push({ cod: tk[i], tp: tk[i + 1], desc: desc.join(' '), valor: P.ce(valores[valores.length - 1]) });
                i = j - 1;
            }
        }
        return itens;
    };
    P.lerFolha = (paginas) => {
        const r = { competencia: '', colaboradores: [], avisos: [], paginasIgnoradas: 0 };
        const uteis = paginas.filter(p => /FOLHA ANAL[IÍ]TICA/i.test(p));
        r.paginasIgnoradas = paginas.length - uteis.length;
        const texto = uteis.join('\n');
        const per = texto.match(/Per[ií]odo:\s*\d{2}\/(\d{2})\/(\d{4})/);
        r.competencia = per ? `${per[2]}-${per[1]}` : '';
        let cc = '';
        const partes = texto.split(/(?=^C\.Custo:|^Colaborador:)/m);
        for (const parte of partes) {
            const mcc = parte.match(/^C\.Custo:\s*(.+)$/m);
            if (/^C\.Custo:/.test(parte) && mcc) { cc = mcc[1].trim(); continue; }
            const m = parte.match(/^Colaborador:\s*\d+\s*-\s*(\d+)\s*-\s*(.+?)\s+Admiss[ãa]o:\s*(\d{2}\/\d{2}\/\d{4}).*?St:\s*(.+)$/m);
            if (!m) continue;
            const c = { mat: m[1], nome: m[2].trim(), admissao: m[3], situacao: m[4].replace(/\s+/g, ' ').trim(), ccusto: cc, cpf: '',
                baseInss: null, baseFgts: null, inss: 0, fgts: 0, temInss: false, temFgts: false };
            c.demitido = /DEMITIDO/i.test(c.situacao);
            c.ferias = /F[ÉE]RIAS/i.test(c.situacao);
            for (const it of P.itensFolha(parte)) {
                if (it.tp === '03' && /^INSS\b/i.test(it.desc)) { c.inss += it.valor; c.temInss = true; }
                if (it.tp === '04' && /^FGTS\b/i.test(it.desc)) { c.fgts += it.valor; c.temFgts = true; }
            }
            const mb = parte.match(/FGTS Proc:\s*((?:\d{1,3}(?:\.\d{3})+|\d+),\d{2})\s*INSS Proc:\s*((?:\d{1,3}(?:\.\d{3})+|\d+),\d{2})/);
            if (mb) { c.baseFgts = P.ce(mb[1]); c.baseInss = P.ce(mb[2]); }
            r.colaboradores.push(c);
        }
        // v2.3.0: soma dos "Total de Colaboradores" impressos (um por centro de custo), para conciliar
        r.totalImpresso = [...texto.matchAll(/Total de Colaboradores\s+(\d+)/g)].reduce((s, m) => s + Number(m[1]), 0) || null;
        if (uteis.length && !r.colaboradores.length) r.avisos.push(`Folha analítica: ${uteis.length} página(s) lidas, mas nenhum colaborador reconhecido. Início do texto lido: "${texto.slice(0, 160).replace(/\s+/g, ' ')}"`);
        return r;
    };

    // ---------- FGTS Digital (detalhe da guia, GFD e comprovante) ----------
    P.lerFgts = (paginas) => {
        const r = { guias: new Map(), linhas: [], tomadores: new Map(), estabelecimentos: new Map(), gfds: [], comprovantes: [], avisos: [] };
        const vistas = new Set();
        for (const pg of paginas) {
            if (/Detalhe da Guia Emitida/i.test(pg)) {
                const num = pg.match(/N[úu]mero da Guia:\s*([\d-]+)/)?.[1] || '?';
                const pag = pg.match(/P[áa]gina\s+(\d+)\s+de\s+(\d+)/);
                // v2.5.22: sem "Página X de Y", a página é identificada pelo texto inteiro, e não só pelo
                // tamanho: páginas diferentes com o mesmo número de caracteres eram descartadas como cópia.
                const chave = `${num}|${pag ? pag[1] : pg.replace(/\s+/g, '')}`;
                if (vistas.has(chave)) continue; // o detalhe às vezes vem repetido no mesmo PDF
                vistas.add(chave);
                if (!r.guias.has(num)) {
                    r.guias.set(num, {
                        numero: num,
                        empregadorRaiz: P.dig(pg.match(/Empregador:\s*([\d./-]+)/)?.[1]),
                        empregadorNome: (pg.match(/Nome Empregador:\s*(.+?)\s+Qtd\./)?.[1] || '').trim(),
                        qtd: Number(pg.match(/Qtd\. Trabalhadores FGTS:\s*(\d+)/)?.[1] || 0),
                        vencimento: pg.match(/Vencimento da Guia:\s*(\d{2}\/\d{2}\/\d{4})/)?.[1] || '',
                        total: P.ce(pg.match(/Total da Guia \(FGTS\):\s*([\d.,]+)/)?.[1]),
                        totalFgts: null, competencias: new Set(),
                    });
                }
                const g = r.guias.get(num);
                const tf = pg.match(/^Total FGTS\s+([\d.,]+)\s+([\d.,]+)/m);
                if (tf) g.totalFgts = P.ce(tf[2]);
                for (const m of pg.matchAll(/^Total do Estabelecimento\s+([\d./-]+)\s+([\d.,]+)\s+([\d.,]+)/gm)) r.estabelecimentos.set(P.dig(m[1]), { base: P.ce(m[2]), fgts: P.ce(m[3]), guia: num });
                for (const m of pg.matchAll(/^Total do Tomador\s+(Sem Tomador|[\d./-]+)\s+([\d.,]+)\s+([\d.,]+)/gm)) r.tomadores.set(m[1] === 'Sem Tomador' ? 'SEM' : P.dig(m[1]), { base: P.ce(m[2]), fgts: P.ce(m[3]) });
                if (!/Rela[çc][ãa]o de Trabalhadores/i.test(pg)) continue;
                const linhas = pg.split('\n');
                let estab = '', tomador = '';
                for (let i = 0; i < linhas.length; i++) {
                    const ln = linhas[i];
                    const mt = ln.match(/Estabelecimento:\s*([\d./-]+)\s+Tomador:\s*(Sem Tomador|[\d./-]+)/);
                    if (mt) { estab = P.dig(mt[1]); tomador = mt[2] === 'Sem Tomador' ? 'SEM' : P.dig(mt[2]); continue; }
                    const m = ln.match(/^(\d{2}\/\d{4})\s+(.*?)\s*(\d{3}\.\d{3}\.\d{3}-\d{2})\s+(\d{3})\s+(\d{2}\/\d{2}\/\d{4})\s+(.+?)\s+((?:\d{1,3}(?:\.\d{3})+|\d+),\d{2})\s+((?:\d{1,3}(?:\.\d{3})+|\d+),\d{2})\s+(?:(?:\d{1,3}(?:\.\d{3})+|\d+),\d{2}\s+){3}((?:\d{1,3}(?:\.\d{3})+|\d+),\d{2})\s*$/);
                    if (!m) continue;
                    // nome partido em três linhas: "KENEDY ... DOS <matrícula>" / dados / "SANTOS 97"
                    const nome = P.nomeTrabalhadorFgtsPrev(linhas, i, m[2]);
                    g.competencias.add(P.compDe(m[1]));
                    r.linhas.push({ guia: num, comp: P.compDe(m[1]), nome, cpf: P.cpf(m[3]), categoria: m[4], tipo: m[6].trim(), base: P.ce(m[7]), fgts: P.ce(m[8]), total: P.ce(m[9]), estab, tomador });
                }
                continue;
            }
            if (/GFD\s*-\s*Guia do FGTS Digital/i.test(pg)) {
                const gfd = {
                    identificador: pg.match(/(\d{16}-\d)/)?.[1] || '',
                    vencimento: pg.match(/Pagar este documento at[ée][\s\S]{0,200}?(\d{2}\/\d{2}\/\d{4})/i)?.[1] || '',
                    valor: P.ce(pg.match(/Total da Guia:\s*([\d.,]+)/i)?.[1] || pg.match(/Valor a recolher[\s\S]{0,120}?((?:\d{1,3}(?:\.\d{3})+|\d+),\d{2})/i)?.[1]),
                    competencia: P.compDe(pg.match(/^(\d{2}\/\d{4})\s+\d+\s+[\d.,]+/m)?.[1]),
                    empregadorRaiz: '', empregadorNome: '',
                };
                const me = pg.match(/(\d{2}\.\d{3}\.\d{3}(?:\/\d{4}-\d{2})?)\s+([A-ZÀ-Ú][^\n]+)/);
                if (me) { gfd.empregadorRaiz = P.dig(me[1]).slice(0, 8); gfd.empregadorNome = me[2].trim(); }
                if (!r.gfds.some(x => x.identificador === gfd.identificador && x.valor === gfd.valor)) r.gfds.push(gfd);
                continue;
            }
            if (/comprovante/i.test(pg)) {
                const valor = P.ce(pg.match(/valor (?:final|pago|total pago|cobrado|do pagamento)\s*:?\s*(?:R\$\s*)?((?:\d{1,3}(?:\.\d{3})+|\d+),\d{2})/i)?.[1]
                    || pg.match(/valor da transa[çc][ãa]o\s*:?\s*(?:R\$\s*)?((?:\d{1,3}(?:\.\d{3})+|\d+),\d{2})/i)?.[1]
                    || pg.match(/valor (?:do documento|total)\s*:?\s*(?:R\$\s*)?((?:\d{1,3}(?:\.\d{3})+|\d+),\d{2})/i)?.[1]);
                const data = pg.match(/(?:pagamento efetuado em|data d[oe] pagamento|data da transa[çc][ãa]o|pago em|debitado em|data do d[ée]bito)\s*:?\s*(\d{2}\/\d{2}\/\d{4})/i)?.[1] || '';
                const pagador = P.dig(pg.match(/CNPJ do (?:pagador|devedor)\s*:?\s*([\d./-]{14,18})/i)?.[1]);
                const identificador = pg.match(/(\d{16}-?\d)/)?.[1] || '';
                if (valor !== null && !r.comprovantes.some(x => x.valor === valor && x.data === data)) r.comprovantes.push({ valor, data, pagador, identificador });
            }
        }
        if (!r.linhas.length) r.avisos.push('Nenhum trabalhador lido no detalhe da guia do FGTS Digital ("Relação de Trabalhadores").');
        return r;
    };

    // v2.5.0 — Adaptadores do módulo previdenciário. Os leitores anteriores continuam
    // sendo usados para os layouts que já atendiam à Interfort. Não usa o nome da
    // contratada para decidir o formato, nem inventa identidade a partir de valores.
    const prevOriginal = {
        linhas: P.linhasDaPagina, folha: P.lerFolha, s5001: P.lerS5001, fgts: P.lerFgts,
    };
    const PREV_VALOR = '(?:\\d{1,3}(?:\\.\\d{3})+|\\d+),\\d{2}';
    const PREV_VERSAO = GM_info.script.version;
    // Só fragmentos de nome podem completar a linha. Uma linha inteira de outro
    // trabalhador (com competência/CPF/valores) nunca vira parte do nome seguinte.
    P.fragmentoNomeFgtsPrev = (linha) => {
        const t = String(linha || '').replace(/\S*\d{6,}\S*/g, '').replace(/\s*\d+\s*$/, '').trim();
        return t && /^[A-ZÀ-Ú' -]+$/.test(t) && !/TOTAL|APURA|REFER|NOME|VERBA|INDENIZ|RESCIS|MENSAL|CATEGORIA|MONETARIA/.test(P.nome(t)) ? t : '';
    };
    P.nomeTrabalhadorFgtsPrev = (linhas, i, campo) => {
        const semMatricula = (s) => String(s || '').trim().replace(/(?:^|\s)\S*\d\S*\s*$/, '').trim();
        const centro = semMatricula(campo);
        const ant = centro ? '' : P.fragmentoNomeFgtsPrev(linhas[i - 1]);
        let prox = P.fragmentoNomeFgtsPrev(linhas[i + 1]);
        // Um nome acima da próxima linha sem nome pertence à próxima pessoa.
        const seguinte = String(linhas[i + 2] || '').match(/^\d{2}\/\d{4}\s+(.*?)\s*\d{3}\.\d{3}\.\d{3}-\d{2}/);
        if (seguinte && !semMatricula(seguinte[1])) prox = '';
        return [ant, centro, prox].filter(Boolean).join(' ').trim();
    };
    P.viaOcrPrev = (r) => !!r && (r.viaOcr === true || (r.fontes || []).some(f => f.metodo === 'ocr'));
    P.valoresPrev = (s) => [...String(s || '').matchAll(new RegExp(PREV_VALOR, 'g'))].map(m => P.ce(m[0]));
    P.rotuloPrev = (s, re) => P.ce(String(s || '').match(new RegExp(re + '\\s*:?\\s*(' + PREV_VALOR + ')', 'i'))?.[1]);
    P.compPrev = (t) => P.compDe(String(t).match(/(?:Compet.ncia|Refer.ncia|Per.odo apura[çc][ãa]o)\s*:?\s*(\d{2}\/\d{4})/i)?.[1])
        || P.compDe(String(t).match(/Folha de Pagamento Mensal\s*-\s*(\d{2}\/\d{4})/i)?.[1])
        || (() => { const m = String(t).match(/Per[ií]odo:\s*\d{2}\/(\d{2})\/(\d{4})/i); return m ? `${m[2]}-${m[1]}` : ''; })();
    P.cpfValidoPrev = (s) => {
        const d = P.dig(s); if (d.length !== 11 || /^(\d)\1{10}$/.test(d)) return false;
        for (let n = 9; n <= 10; n++) { let sum = 0; for (let i = 0; i < n; i++) sum += +d[i] * (n + 1 - i); if (((sum * 10) % 11) % 10 !== +d[n]) return false; }
        return true;
    };
    // PDFs exportados de impressão podem estar girados sem /Rotate; outros têm uma
    // segunda camada de texto na mesma posição. Corrige apenas esses casos.
    P.linhasDaPagina = (items, viewport, Util) => {
        const seen = new Set(), dedup = [];
        const angles = new Map();
        for (const it of items || []) {
            if (!String(it.str || '').trim()) continue;
            const t = Util.transform(viewport.transform, it.transform);
            const key = `${it.str}|${Math.round(t[4] * 5)}|${Math.round(t[5] * 5)}`;
            if (seen.has(key)) continue; seen.add(key); dedup.push(it);
            const a = ((Math.round(Math.atan2(t[1], t[0]) / (Math.PI / 2)) % 4) + 4) % 4;
            angles.set(a, (angles.get(a) || 0) + String(it.str).length);
        }
        const angle = [...angles].sort((a, b) => b[1] - a[1])[0]?.[0] || 0;
        if (!angle) return prevOriginal.linhas(dedup, viewport, Util);
        const rad = angle * Math.PI / 2, c = Math.cos(rad), s = Math.sin(rad);
        const trs = dedup.map(it => {
            const t = Util.transform(viewport.transform, it.transform);
            return { ...it, transform: [1, 0, 0, 1, t[4] * c + t[5] * s, -t[4] * s + t[5] * c] };
        });
        return prevOriginal.linhas(trs, { transform: [1, 0, 0, 1, 0, 0] }, Util);
    };
    P.RX_PORTAL_ESOCIAL_S5001 = /T\s?otalizador\s+da\s+Contribui[çc][ãa]o\s+Previdenci[áa]ria/i;
    // v2.5.21: o navegador, ao gerar o PDF, separa a 1ª letra de algumas palavras ("T otalizador", "V alor").
    // Só usado no texto do portal do eSocial.
    P.juntarLetraSoltaPrev = (t) => String(t || '').replace(/\b([A-ZÀ-Ú]) (?=[a-zà-ú]{2,})/g, '$1');
    P.tipoPaginaPrev = (t) => {
        t = P.rotulosFgtsPrev(t);
        if (P.ehCadastroEsocialPrev(t)) return 'cadastroEsocial';
        // v2.5.5: aviso/recibo de férias e comprovante bancário de lote não são folha nem S-5001; os valores
        // de férias já estão na folha do mês. Sem isto, a página herdava o tipo da anterior.
        if (/[AÁÀ]viso\s+de\s+F[ée]rias|Recibo\s+de\s+F[ée]rias|Tipo da Carga\s*:/i.test(t) && !/FOLHA ANAL[IÍ]TICA|EXTRATO MENSAL|S\s*-?\s*5001/i.test(t)) return 'ignorar';
        if (/S\s*-?\s*5001|RELA[ÇC][ÃA]O DE BASES DO INSS|RELAT[ÓO]RIO DE INSS|ANAL[IÍ]TICO DE CONTRIBUI[ÇC][ÕO]ES SOCIAIS|DECLARA[ÇC][ÃA]O COMPLETA\s*-\s*DCTFWeb/i.test(t)) return 's5001';
        // v2.5.20: telas impressas do portal do eSocial (totalizador S-5001 consultado por CPF)
        if (P.RX_PORTAL_ESOCIAL_S5001.test(t)) return 's5001';
        if (P.ehRelatorioInssIdentificadoPrev(t)) return 's5001';
        if (/FOLHA ANAL[IÍ]TICA|EXTRATO MENSAL|Rela[çc][ãa]o de C[áa]lculo/i.test(t)
            || /Colaborador\s*:/.test(t) && /FGTS Proc:|INSS Proc:/.test(t)
            || /CPF\s*:/.test(t) && /Proventos|BASE INSS|Base FGTS/i.test(t)) return 'folha';
        if (/Detalhe da Guia Emitida|GFD\s*-\s*Guia do FGTS Digital|Rela[çc][ãa]o de Trabalhadores/i.test(t)) return 'fgts';
        if (P.ehComprovanteFgtsPrev(t)) return 'fgts';
        return '';
    };
    P.tipoDoPdf = (pgs) => pgs.map(P.tipoPaginaPrev).find(Boolean) || '';
    // v2.5.5: o OCR cola palavras que no PDF vêm separadas; os leitores esperam os rótulos do texto do PDF.
    P.normalizarOcrPrev = (t) => String(t || '')
        // Correções restritas ao início de uma rubrica: nunca alteram dinheiro/CPF.
        .replace(/\b(\d{1,4})[ \t]+[O0]([1-4])[ \t]+(?=(?:FGTS|INSS)\b)/gi, '$1 0$2 ')
        .replace(/\bFGTS\$(?=\s*\d|\s)/gi, 'FGTS ')
        .replace(/\b(INSS|FGTS|IRRF)(?=[A-ZÀ-Úa-zà-ú]{3})/g, '$1 ')
        .replace(/\b(INSS|FGTS|IRRF)(?=\d)/g, '$1 ')
        .replace(/(\d{3}\.\d{3}\.\d{3}),(\d{2})\b/g, '$1-$2')
        .replace(/(\d{3}\.\d{3}),(\d{3}-\d{2})/g, '$1.$2')
        .replace(/[ \t]+\|[ \t]+/g, ' ')
        .replace(/[ \t]+\|$/gm, '')
        // v2.5.26: sobras de borda de tabela entre valores ("0,00 — 590,76", "0,00, 15,32"), espaço antes do ponto
        // em número ("16 .536,66", nº da DComp) e ponto/barra colados ao código da receita ("1170-01. CP", "1646-01 |CP")
        .replace(/(\d,\d{2})[ \t]+[—–|\/\\\[\]{}]{1,2}(?=[ \t]+-?\d)/g, '$1')
        .replace(/(\d,\d{2}),(?=[ \t]+-?\d)/g, '$1')
        .replace(/(\d)[ \t]+\.(?=\d)/g, '$1.') // "16 .536,66", "25042 .29966.141026.1.3.02-5016" 
        .replace(/^([ \t]*\d{4}-\d{2})[ \t]*[.,;:|\/\]]+(?=[ \t]*[A-ZÀ-Ú])/gm, '$1 ')
        // v2.5.31: o OCR troca o símbolo "R$" por "RS", "R5", "R§" ou "R $" (ex.: comprovante de envio Pix do
        // Sicoob, "RS 61.112,10"); os leitores de comprovante só aceitam "R$" e descartavam o valor pago.
        // Só troca o símbolo isolado (início de linha, espaço, "(" ou ":" antes) e seguido de valor com centavos.
        .replace(/(^|[\s(:])R[ \t]?[$Ss5§](?=[ \t]*(?:\d{1,3}(?:\.\d{3})+|\d+),\d{2}(?!\d))/gm, '$1R$$');
    // v2.5.28: o cadastro do eSocial comprova identificação/vínculo, mas não traz
    // a base mensal de INSS. Fica separado dos relatórios de valores, em qualquer
    // ordem de importação. Nunca liga páginas anônimas por posição ou por valores.
    P.ehCadastroEsocialPrev = (texto) => {
        const t = P.juntarLetraSoltaPrev(texto);
        return /eSocial|esocial\.gov\.br/i.test(t)
            && /Dados\s+Contratuais\s+do\s+Trabalhador|AlteracaoContratualCompleto\/(?:DadosContratuais|DataAlteracao)/i.test(t);
    };
    P.lerCadastroEsocialPrev = (paginas) => {
        const r = { layout: 'Cadastro contratual do eSocial', trabalhadores: new Map(), avisos: [], informacoes: [], somenteCadastro: true };
        // Algumas impressões omitem o cabeçalho do empregador na página da pessoa.
        // Procura o CNPJ nas páginas do MESMO idContrato da URL do portal. Não usa
        // vizinhança nem ordem: páginas de outro contrato não completam o cadastro.
        const contratos = new Map();
        const fonteDaPagina = (i) => ({ ...(paginas.fontes?.[i] || { pagina: i + 1 }), metodo: paginas.fontes?.[i]?.metodo || ((paginas.ocr || []).includes(i) ? 'ocr' : 'texto_pdf') });
        for (const [i, pagina] of paginas.entries()) {
            if (!P.ehCadastroEsocialPrev(pagina)) continue;
            const t = P.juntarLetraSoltaPrev(pagina), id = t.match(/idContrato=(\d+)/i)?.[1];
            if (!id) continue;
            if (!contratos.has(id)) contratos.set(id, { cabecalhos: new Map(), locais: new Map() });
            const bloco = contratos.get(id);
            const cab = P.dig(t.match(/\b(\d{2}\.\d{3}\.\d{3}\/\d{4}-\d{2})\s*-/)?.[1]);
            if (cab) bloco.cabecalhos.set(cab, fonteDaPagina(i));
            const local = t.match(/Local de trabalho([\s\S]*?)(?=Hor[áa]rio Contratual|$)/i)?.[1] || '';
            const numero = local.match(/N[úu]mero de Inscri[çc][ãa]o\s*\*?\s*:?\s*([\dɨɩɪɫɬɭɮɯɰ./\- ]+)/i)?.[1] || '';
            // A fonte desta tela mapeia os glifos 1–9 para ɨ–ɰ na camada de texto.
            // Correção restrita ao campo CNPJ; não modifica nome, CPF ou dinheiro.
            const digitos = P.dig(numero.replace(/[ɨɩɪɫɬɭɮɯɰ]/g, c => String('ɨɩɪɫɬɭɮɯɰ'.indexOf(c) + 1)));
            if (digitos.length === 14) bloco.locais.set(digitos, fonteDaPagina(i));
        }
        for (const [i, pagina] of paginas.entries()) {
            if (!P.ehCadastroEsocialPrev(pagina)) continue;
            const t = P.juntarLetraSoltaPrev(pagina);
            const cpfTexto = t.match(/(?:^|\n)\s*CPF\s*:?\s*(\d{3}\.\d{3}\.\d{3}-\d{2}|\d{11})(?=\s|$)/i)?.[1];
            if (!cpfTexto) continue; // páginas de continuação sem identidade não geram empregados
            const cpf = P.cpf(cpfTexto);
            const fonte = fonteDaPagina(i);
            if (!P.cpfValidoPrev(cpf)) { r.avisos.push(`Cadastro eSocial: CPF inválido/ilegível na página ${fonte.pagina}; não associado.`); continue; }
            // O primeiro Nome, antes das Informações do Vínculo, é o trabalhador;
            // Nome do cargo e Nome do empregador não completam o nome da pessoa.
            const nome = (t.match(/(?:^|\n)\s*Nome\s*:?\s*([\s\S]*?)(?=\n\s*Informa[çc][õo]es\s+do\s+V[ií]nculo)/i)?.[1] || '').replace(/\s+/g, ' ').trim();
            const mat = t.match(/(?:^|\n)\s*Matr[ií]cula\s*\*?\s*:?\s*([^\s]+)/i)?.[1] || '';
            const contrato = contratos.get(t.match(/idContrato=(\d+)/i)?.[1]);
            const empregadores = contrato?.cabecalhos.size ? contrato.cabecalhos : contrato?.locais;
            const cnpj = empregadores?.size === 1 ? [...empregadores.keys()][0] : P.dig(t.match(/\b(\d{2}\.\d{3}\.\d{3}\/\d{4}-\d{2})\s*-/)?.[1]);
            if (!nome || P.tokens(nome).length < 2) { r.avisos.push(`Cadastro eSocial: nome não identificado para ${P.fmtCpf(cpf)}; conferir a página ${fonte.pagina}.`); continue; }
            const novo = { cpf, nome, matEsocial: mat, matriculas: mat ? [mat] : [], cnpj, fontes: [fonte], somenteCadastro: true,
                idContrato: t.match(/idContrato=(\d+)/i)?.[1] || '',
                fonteEmpregador: cnpj && empregadores?.get(cnpj) || null,
                origemCnpj: contrato?.cabecalhos.size ? 'cabeçalho do mesmo contrato' : 'local de trabalho do mesmo contrato',
                conflitoIdentificacao: (empregadores?.size || 0) > 1,
                viaOcr: fonte.metodo === 'ocr' };
            const anterior = r.trabalhadores.get(cpf);
            if (!anterior) { r.trabalhadores.set(cpf, novo); continue; }
            if (P.dig(anterior.cnpj) !== cnpj || !P.nomesCompativeisPrev(anterior.nome, nome)) {
                anterior.conflitoIdentificacao = true;
                r.avisos.push(`Cadastro eSocial: CPF ${P.fmtCpf(cpf)} repetido com nome ou empregador diferente; não utilizado automaticamente.`);
            }
            if (mat && !anterior.matriculas.includes(mat)) anterior.matriculas.push(mat);
            if (!anterior.fontes.some(f => f.arquivo === fonte.arquivo && f.pagina === fonte.pagina && f.metodo === fonte.metodo)) anterior.fontes.push(fonte);
            anterior.viaOcr ||= novo.viaOcr;
        }
        r.viaOcr = [...r.trabalhadores.values()].some(P.viaOcrPrev);
        r.informacoes.push(`${r.trabalhadores.size} trabalhador(es) identificados no cadastro do eSocial. Este documento serve à presença (item 3); salário contratual não substitui a base mensal de INSS (item 4).`);
        if (!r.trabalhadores.size) r.avisos.push('Cadastro eSocial reconhecido, mas sem CPF e nome legíveis de trabalhador.');
        return r;
    };

    // Fallback por rótulos para relatórios de INSS de outros sistemas de folha.
    // Só é usado se nenhum adaptador anterior tiver extraído empregados. Exige
    // identidade explícita e base/desconto rotulados; não interpreta salário,
    // percentuais, totais gerais ou números sem título como base de contribuição.
    P.ehRelatorioInssIdentificadoPrev = (texto) => {
        const t = String(texto || '');
        return !P.ehCadastroEsocialPrev(t) && !/Proventos|L[ií]quido|EXTRATO MENSAL|FOLHA ANAL[IÍ]TICA|Folha de Pagamento|Rela[çc][ãa]o de C[áa]lculo|(?:FGTS|INSS) Proc\s*:|Detalhe da Guia|DCTFWeb|NOTA FISCAL|NFS[- ]?e\b/i.test(t)
            && /(?:Base\s*(?:de\s*c[áa]lculo\s*)?(?:(?:da|do|de)\s*)?(?:INSS|Cont\.?\s*Previdenci[áa]ria|Contribui[çc][ãa]o\s+Previdenci[áa]ria)|Sal[áa]rio\s+de\s+Contribui[çc][ãa]o)/i.test(t)
            && /(?:CPF|Matr[ií]cula|Empregado|Trabalhador|Colaborador|Nome)\s*:/i.test(t);
    };
    P.lerInssIdentificadoPrev = (paginas) => {
        const texto = paginas.join('\n');
        const r = P.novoS5Prev(texto, 'Relatório do INSS por campos identificados', /S\s*-?\s*5001|eSocial/i.test(texto));
        for (const pagina of paginas) {
            if (!P.ehRelatorioInssIdentificadoPrev(pagina)) continue;
            const temEmpregado = /(?:^|\n)\s*(?:Empregad[oa]|Trabalhador|Colaborador|Funcion[áa]rio)\s*:/i.test(pagina);
            const blocos = temEmpregado ? pagina.split(/(?=^\s*(?:Empregad[oa]|Trabalhador|Colaborador|Funcion[áa]rio)\s*:)/mi)
                : pagina.split(/(?=^\s*CPF\s*:)/mi);
            for (const bloco of blocos) {
                const cpfs = [...new Set([...bloco.matchAll(/\b\d{3}\.\d{3}\.\d{3}-\d{2}\b|(?:CPF\s*:\s*)(\d{11})\b/gi)].map(m => P.cpf(m[1] || m[0])))];
                if (cpfs.length > 1 || cpfs.some(c => !P.cpfValidoPrev(c))) continue;
                const emp = bloco.match(/(?:^|\n)\s*(?:Empregad[oa]|Trabalhador|Colaborador|Funcion[áa]rio)\s*:\s*(\d+)?[ \t]*(?:[-–][ \t]*)?([^\n]*)/i);
                const nome = (bloco.match(/(?:^|\n)\s*Nome(?:\s+do\s+(?:Empregado|Trabalhador))?\s*:\s*([^\n]+)/i)?.[1] || emp?.[2] || '').trim();
                const mat = bloco.match(/(?:^|\n)\s*Matr[ií]cula\s*:\s*(\S+)/i)?.[1] || emp?.[1] || '';
                if (!cpfs.length && !(mat && P.tokens(nome).length >= 2)) continue;
                const bases = new Set(), descontos = new Set(), linhas = bloco.split('\n').map(l => l.trim()).filter(Boolean);
                for (let i = 0; i < linhas.length; i++) {
                    const m = linhas[i].match(new RegExp('^(.*?)[ \\t:]+(?:R\\$\\s*)?(' + PREV_VALOR + ')\\s*$'));
                    const separado = !m && new RegExp('^(?:R\\$\\s*)?' + PREV_VALOR + '$').test(linhas[i + 1] || '');
                    const rotulo = m ? m[1] : separado ? linhas[i] : '';
                    if (!rotulo || /13|adicional|empregador|patronal|rescis|f[ée]rias|total geral/i.test(rotulo)) continue;
                    const rot = P.nome(rotulo), valor = P.ce(m ? m[2] : linhas[i + 1].replace(/^R\$\s*/, ''));
                    if (/^(?:BASE(?: DE CALCULO)? (?:(?:DA|DO|DE) )?(?:INSS|CONT PREVIDENCIARIA|CONTRIBUICAO PREVIDENCIARIA|PREVIDENCIA SOCIAL)|SALARIO DE CONTRIBUICAO)(?: MENSAL| DO MES| TOTAL)?$/.test(rot)) bases.add(valor);
                    if (/^(?:INSS(?: EMPREGADO)? DESCONTADO|DESCONTO (?:DO )?INSS|VALOR (?:DO )?INSS|CONTRIBUICAO PREVIDENCIARIA DESCONTADA)(?: MENSAL| DO MES)?$/.test(rot)) descontos.add(valor);
                }
                if (!bases.size && !descontos.size) continue;
                const t = P.registroS5Prev({ cpf: cpfs[0] || '', nome, matFolha: mat, b11: bases.size === 1 ? [...bases][0] : 0,
                    d21: descontos.size === 1 ? [...descontos][0] : 0, _semBase: bases.size !== 1, _semDesconto: descontos.size !== 1, auxiliar: !cpfs.length });
                if (bases.size > 1 || descontos.size > 1) r.avisos.push(`Relatório do INSS: mais de um valor para ${nome || P.fmtCpf(t.cpf)}; campo ambíguo não comparado.`);
                if (!t.cpf) r.auxiliares.push(t);
                else if (!r.trabalhadores.has(t.cpf)) r.trabalhadores.set(t.cpf, t);
                else {
                    const ant = r.trabalhadores.get(t.cpf);
                    if (['b11', 'd21', '_semBase', '_semDesconto'].some(k => ant[k] !== t[k]) || ant.nome && nome && !P.nomesCompativeisPrev(ant.nome, nome)) {
                        ant._semBase = true; ant._semDesconto = true;
                        r.avisos.push(`Relatório do INSS: registros diferentes para ${nome || P.fmtCpf(t.cpf)}; não houve soma ou escolha automática.`);
                    }
                }
            }
        }
        if (!r.trabalhadores.size && !r.auxiliares.length) return null;
        r.informacoes.push('Relatório do INSS lido pelos rótulos e identificadores, sem depender da empresa ou do nome do arquivo. Bases ausentes/ambíguas permanecem pendentes.');
        return P.somaS5Prev(r);
    };

    P.novoColabPrev = (mat, nome) => ({ mat, nome: nome.trim(), admissao: '', situacao: '', ccusto: '', cpf: '',
        baseInss: null, baseFgts: null, inss: 0, fgts: 0, temInss: false, temFgts: false, adaptado: true });
    // v2.5.34: no Pessoal+, o resumo do departamento não tem identidade de empregado.
    // O marcador interrompe o último bloco individual, preservando continuações sem resumo.
    P.ehResumoPessoalPrev = (pagina) => {
        const t = String(pagina || '');
        if (/^\s*\d+\s*-\s*[^\n]+\s+CPF\s*:/mi.test(t)) return false;
        return /^\s*(?:Total\s+Guia|Resumo\s+(?:Geral|por\s+Rubricas|GPS|DARF)|Dados\s+GRRF)\b/mi.test(t)
            || /^\s*Departamento\s*:\s*\d+\s*-/mi.test(t)
                && /Admitidos\s+no[\s\S]*Demitidos\s+no[\s\S]*(?:Afastados\s+no|Total\s+de)/i.test(t);
    };
    P.somaRotuloPessoalPrev = (texto, rotulo) => {
        const valores = [...String(texto || '').matchAll(new RegExp('\\b\\d+[ \\t]*-[ \\t]*' + rotulo + '[ \\t]+(' + PREV_VALOR + ')(?!\\d)', 'gi'))].map(m => P.ce(m[1]));
        return valores.length ? valores.reduce((s, v) => s + v, 0) : null;
    };
    P.chaveDemonstrativoPessoalPrev = (c) => `${c.cpf}|${c.mat}|${P.nome(c.nome)}`;
    P.selecionarMensaisPessoalPrev = (r) => {
        const mensais = new Set(r.colaboradores.filter(c => c.tipoDemonstrativoPessoal === 'mensal').map(P.chaveDemonstrativoPessoalPrev));
        const recibos = r.colaboradores.filter(c => c.tipoDemonstrativoPessoal === 'recibo_ferias' && mensais.has(P.chaveDemonstrativoPessoalPrev(c)));
        if (recibos.length) {
            (r.recibosFeriasIgnorados ||= []).push(...recibos);
            r.colaboradores = r.colaboradores.filter(c => !recibos.includes(c));
            (r.informacoes ||= []).push(`Folha: ${recibos.length} demonstrativo(s) de adiantamento de férias separado(s) da folha mensal do mesmo CPF e matrícula; bases e FGTS conferidos pelo demonstrativo mensal, sem somar o recibo em duplicidade.`);
        }
        return r;
    };
    P.finalizaFolhaPrev = (r, texto) => {
        P.selecionarMensaisPessoalPrev(r);
        r.competencia = r.competencia || P.compPrev(texto);
        const cabecalho = texto.split('\n').slice(0, 5).filter(l => !/TOMADOR/i.test(l)).join('\n');
        r.cnpj = P.dig(cabecalho.match(/CNPJ\s*:\s*([\d./-]{14,18})/i)?.[1] || cabecalho.match(/\b(\d{2}\.\d{3}\.\d{3}\/\d{4}-\d{2})\b/)?.[1]);
        const vistos = new Map(), out = [];
        for (const c of r.colaboradores) {
            c.cpfDireto = c.cpf || '';
            c.demitido = /DEMITIDO|DEMISS[ÃA]O/i.test(c.situacao); c.ferias = /F[ÉE]RIAS/i.test(c.situacao);
            const k = `${c.cpf || c.mat}|${P.nome(c.nome)}|${c.baseInss}|${c.baseFgts}|${c.inss}|${c.fgts}`;
            if (!vistos.has(k)) { vistos.set(k, c); out.push(c); }
        }
        r.colaboradores = out;
        if (!out.length) r.avisos.push('Folha: formato identificado, mas nenhum empregado foi lido. Conferência pendente.');
        const afastados = out.filter(c => c.afastamentoSemBasesPessoal);
        if (afastados.length) r.avisos.push(`Folha: ${afastados.length} empregado(s) afastado(s), com FGTS de R$ 0,00 impresso e bases de INSS/FGTS não informadas no demonstrativo individual (${afastados.map(c => c.nome).join(', ')}); bases ausentes não foram tratadas como zero.`);
        const faltam = out.filter(c => (c.baseInss === null || c.baseFgts === null) && !c.afastamentoSemBasesPessoal);
        if (faltam.length) r.avisos.push(`Folha: ${faltam.length} empregado(s) com base de INSS/FGTS não legível; valor ausente não foi tratado como zero.`);
        return r;
    };
    P.lerFolha = (paginas) => {
        if (paginas.ocr?.length) {
            const indices = new Set(paginas.ocr), limpas = paginas.filter((_, i) => !indices.has(i)), imagens = paginas.filter((_, i) => indices.has(i)).map(P.normalizarOcrPrev);
            const base = limpas.length ? P.lerFolha(limpas) : { colaboradores: [], avisos: [], competencia: '', paginasIgnoradas: 0, totalImpresso: null };
            const lido = P.lerFolha(imagens);
            let recibosSeparados = 0;
            for (const c of lido.colaboradores) {
                c.viaOcr = true;
                const anterior = base.colaboradores.find(b => b.mat === c.mat || b.cpf && b.cpf === c.cpf);
                if (!anterior) base.colaboradores.push(c);
                // Exceção à prioridade do texto: recibo de férias não substitui o mensal
                // recuperado por OCR. Exige os mesmos CPF, matrícula e nome.
                else if (anterior.tipoDemonstrativoPessoal === 'recibo_ferias' && c.tipoDemonstrativoPessoal === 'mensal'
                    && P.chaveDemonstrativoPessoalPrev(anterior) === P.chaveDemonstrativoPessoalPrev(c)) {
                    (base.recibosFeriasIgnorados ||= []).push(anterior);
                    base.colaboradores[base.colaboradores.indexOf(anterior)] = c;
                    recibosSeparados++;
                } else if (anterior.tipoDemonstrativoPessoal === 'mensal' && c.tipoDemonstrativoPessoal === 'recibo_ferias'
                    && P.chaveDemonstrativoPessoalPrev(anterior) === P.chaveDemonstrativoPessoalPrev(c)) {
                    (base.recibosFeriasIgnorados ||= []).push(c);
                    recibosSeparados++;
                }
            }
            base.competencia ||= lido.competencia;
            // O subtotal impresso do trecho de texto não abrange automaticamente
            // as páginas de complemento recuperadas por OCR.
            base.totalImpressoTexto = base.totalImpresso;
            base.colaboradoresTexto = base.colaboradores.filter(c => !c.viaOcr).length;
            base.colaboradoresOcr = base.colaboradores.filter(c => c.viaOcr).length;
            base.totalImpressoOcr = lido.totalImpresso;
            base.avisos.push(...lido.avisos);
            if (recibosSeparados) {
                // As advertências anteriores descreviam o recibo isolado, não a
                // folha mensal agora localizada. Recalcula somente esses avisos.
                base.avisos = base.avisos.filter(a => !/^Folha: \d+ empregado\(s\) (?:com base de INSS\/FGTS não legível|afastado\(s\), com FGTS)/.test(a));
                P.finalizaFolhaPrev(base, paginas.join('\n'));
                (base.informacoes ||= []).push(`Folha: ${recibosSeparados} recibo(s) de férias separado(s) do demonstrativo mensal entre as páginas em texto e OCR; conferência pelo mensal do mesmo CPF e matrícula.`);
            }
            // v2.5.20: leitura por OCR é informação, não alerta
            (base.informacoes ||= []).push(`Folha: ${imagens.length} página(s) lidas por OCR. Linhas já lidas em texto mantidas como fonte prioritária.`);
            return base;
        }
        const texto = paginas.join('\n');
        // Mantém o caminho original para as folhas da Interfort.
        if (/FOLHA ANAL[IÍ]TICA/i.test(texto) && !/EXTRATO MENSAL|Rela[çc][ãa]o de C[áa]lculo/i.test(texto)) {
            // v2.5.48: em 10/2026 o PDF da Interfort trouxe "Adm issão:" (palavra partida), e nenhum
            // colaborador era reconhecido. Junta só essa palavra; as demais páginas seguem intactas.
            const partida = /Adm\s+iss([ãa])o:/g;
            const ajustadas = paginas.some(p => /Adm\s+iss[ãa]o:/.test(p))
                ? Object.assign(paginas.map(p => String(p).replace(partida, 'Admiss$1o:')), { fontes: paginas.fontes, ocr: paginas.ocr })
                : paginas;
            return prevOriginal.folha(ajustadas);
        }
        const r = { competencia: P.compPrev(texto), colaboradores: [], avisos: [], paginasIgnoradas: 0, totalImpresso: null };
        if (/EXTRATO MENSAL/i.test(texto)) {
            r.layout = 'Extrato mensal (Domínio)';
            for (const bloco of texto.split(/(?=^\s*Empr\.?\s*:\s*\d+)/mi)) {
                const m = bloco.match(/^\s*Empr\.?\s*:\s*(\d+)\s+(.+?)\s+Situa\S*\s*:\s*(.*?)\s+CPF\s*:\s*([\d.,\s-]{11,18})\s+Adm\s*:\s*(\d{2}\/\d{2}\/\d{4})/mi);
                if (!m) continue;
                // O resumo por rubricas depois do fechamento não pertence ao último
                // empregado. A linha NF contém o fechamento individual das bases.
                const fechamento = bloco.match(/^NF:\s*\d+[^\n]*$/m);
                const corpo = fechamento ? bloco.slice(0, fechamento.index + fechamento[0].length)
                    : bloco.split(/^Resumo por Rubricas|^Resumo Geral/m)[0];
                const c = P.novoColabPrev(m[1], m[2].replace(/_+$/, '')); c.situacao = m[3]; c.admissao = m[5];
                const cpf = P.dig(m[4]);
                if (P.cpfValidoPrev(cpf)) c.cpf = cpf;
                else { c.cpfInvalido = m[4]; r.avisos.push(`Folha: CPF ilegível/inválido na matrícula ${c.mat}; conferir no PDF.`); }
                c.ccusto = bloco.match(/\bCC\s*:\s*(\S+)/i)?.[1] || '';
                // v2.5.20: o OCR às vezes cola "BaseINSS:"; o espaço passa a ser opcional (só neste layout)
                c.baseInss = P.rotuloPrev(corpo, 'Base\\s*INSS'); c.baseFgts = P.rotuloPrev(corpo, 'Base\\s*FGTS');
                const fg = P.rotuloPrev(corpo, 'Valor\\s+FGTS'); if (fg !== null) { c.fgts = fg; c.temFgts = true; }
                c.rubricasInss = [];
                for (const line of corpo.split('\n')) {
                    for (const mi of line.matchAll(/\b(\d{1,4})\s+_?I[.\sL]*N[.\s]*S[.\s]*S\.?\s+(.+?)\s*([PD])(?:\s|$)/gi)) {
                        const vals = P.valoresPrev(mi[2]); if (!vals.length) continue;
                        const valor = vals[vals.length - 1], natureza = mi[3].toUpperCase();
                        c.inss += natureza === 'P' ? -valor : valor;
                        c.temInss = true;
                        c.rubricasInss.push({ codigo: mi[1], texto: mi[2], natureza, valor });
                    }
                }
                // Sem rubrica impressa só se sabe que o desconto é zero quando a base é zero.
                if (!c.temInss && c.baseInss === 0) c.temInss = true;
                Object.defineProperty(c, '_corpo', { value: corpo, enumerable: false, configurable: true });
                r.colaboradores.push(c);
            }
            // v2.5.5: no OCR o nome da rubrica pode sair estragado ("998 IN... 7,70 144,04 D"). O código
            // aprendido nas rubricas legíveis do mesmo documento identifica a linha.
            const codsInss = new Set(r.colaboradores.flatMap(c => (c.rubricasInss || []).filter(x => x.natureza === 'D').map(x => x.codigo)));
            for (const c of r.colaboradores) {
                if (c.temInss && !(c.baseInss > 0 && c.inss === 0)) continue;
                if (!(c.baseInss > 0) || !codsInss.size) continue;
                for (const line of String(c._corpo || '').split('\n')) {
                    for (const cod of codsInss) {
                        const mi = line.match(new RegExp('(?:^|\\s)' + cod + '\\s+[^\\d\\s][^\\d]{0,20}?\\s+(?:\\d{1,2},\\d{2}\\s+)?(' + PREV_VALOR + ')\\s*D(?:\\s|$)'));
                        if (!mi) continue;
                        if (c.rubricasInss.some(x => x.codigo === cod)) continue;
                        const valor = P.ce(mi[1]); if (!valor) continue;
                        c.inss += valor; c.temInss = true;
                        c.rubricasInss.push({ codigo: cod, texto: mi[0].trim(), natureza: 'D', valor, pelaCodigo: true });
                    }
                }
            }
        } else if (/Colaborador\s*:/.test(texto)) {
            r.layout = 'Folha/Relação de cálculo (Senior)';
            const t = texto.replace(/Adm\s+iss[ãa]o/g, 'Admissão');
            const partes = t.split(/(?=^(?:Tipo:\s*\d+\s+)?Colaborador\s*:)/m);
            for (const bloco of partes) {
                const m = bloco.match(/^(?:Tipo:\s*\d+\s+)?Colaborador\s*:\s*(?:\d+\s*-\s*)?(\d+)\s*-\s*(.+?)\s+Admiss[ãa]o:\s*(\d{2}\/\d{2}\/\d{4}).*?(?:St|Sit)\s*:\s*([^\n]+)/m);
                if (!m) continue;
                const c = P.novoColabPrev(m[1], m[2]); c.admissao = m[3]; c.situacao = m[4];
                c.ccusto = bloco.match(/C\.Custo:\s*(.+?)(?:\s+Sal[áa]rio Base:|\n)/)?.[1] || '';
                c.baseInss = P.rotuloPrev(bloco, 'INSS Proc'); c.baseFgts = P.rotuloPrev(bloco, 'FGTS Proc');
                for (const it of P.itensFolha(bloco)) {
                    const desc = it.desc.replace(/\./g, '').replace(/\s+/g, ' ').trim();
                    if (it.tp === '03' && /^INSS\b/i.test(desc)) { c.inss += it.valor; c.temInss = true; }
                    if (it.tp === '04' && /^FGTS\b/i.test(desc)) { c.fgts += it.valor; c.temFgts = true; }
                }
                if (c.baseInss === 0 && !c.temInss) c.temInss = true;
                if (c.baseFgts === 0 && !c.temFgts) c.temFgts = true;
                r.colaboradores.push(c);
            }
        } else {
            r.layout = 'Folha Pessoal+';
            const marcadorResumo = '\n<<RESUMO_FOLHA>>\n';
            const textoIndividual = paginas.map(pg => {
                if (!P.ehResumoPessoalPrev(pg)) return pg;
                r.paginasIgnoradas++;
                return marcadorResumo;
            }).join('\n');
            for (const parte of textoIndividual.split(/(?=^\s*\d+\s*-\s*[^\n]+\s+CPF\s*:)/m)) {
                const bloco = parte.split(marcadorResumo)[0];
                const m = bloco.match(/^\s*(\d+)\s*-\s*(.+?)\s+CPF\s*:\s*(\d{3}\.\d{3}\.\d{3}-\d{2})([^\n]*)/m);
                if (!m) continue;
                const c = P.novoColabPrev(m[1], m[2]); c.cpf = P.cpf(m[3]); c.situacao = m[4].trim();
                c.admissao = bloco.match(/Admiss[ãa]o:\s*(\S+)/)?.[1] || '';
                c.ccusto = bloco.match(/Departamento:\s*([^\n]+)/)?.[1] || '';
                c.baseInss = P.somaRotuloPessoalPrev(bloco, 'BASE INSS');
                c.baseFgts = P.somaRotuloPessoalPrev(bloco, 'BASE FGTS');
                const f = P.rotuloPrev(bloco, 'Valor FGTS'); if (f !== null) { c.fgts = f; c.temFgts = true; }
                // Rubricas mensais repetidas podem ocupar as duas colunas. Não inclui
                // provisão, desconto de férias ou INSS de 13º no INSS mensal.
                const rubricasInss = [...bloco.matchAll(new RegExp('\\b\\d+[ \\t]*-[ \\t]*INSS(?:[ \\t]+INTERMITENTE)?[ \\t]+(?:-?\\d+(?:,\\d{1,3})?[ \\t]+)?(' + PREV_VALOR + ')(?!\\d)', 'gi'))];
                if (rubricasInss.length) { c.inss = rubricasInss.reduce((s, m) => s + P.ce(m[1]), 0); c.temInss = true; }
                const reciboFerias = c.baseInss === null && c.baseFgts === null
                    && /^\s*\d+\s*-\s*F[ÉE]RIAS[ \t]+\d/mi.test(bloco)
                    && /\b\d+\s*-\s*PROVIS[ÃA]O DE DESCONTO INSS\b/i.test(bloco)
                    && !/^\s*\d+\s*-\s*(?:SAL[ÁA]RIO BASE|F[ÉE]RIAS NA COMPET[ÊE]NCIA)\b/mi.test(bloco);
                c.tipoDemonstrativoPessoal = reciboFerias ? 'recibo_ferias' : 'mensal';
                if (reciboFerias) {
                    c.fgtsNoReciboFerias = c.temFgts ? c.fgts : null;
                    c.temFgts = false; // zero no recibo não comprova FGTS zero na folha mensal
                }
                c.afastamentoSemBasesPessoal = !reciboFerias && /afastad[oa]|licen[çc]a/i.test(c.situacao)
                    && c.temFgts && c.fgts === 0 && !c.temInss && c.baseInss === null && c.baseFgts === null;
                if (c.baseInss === 0 && !c.temInss) c.temInss = true;
                r.colaboradores.push(c);
            }
            if (r.paginasIgnoradas) (r.informacoes ||= []).push(`Folha: ${r.paginasIgnoradas} página(s) de resumo do departamento/guias separadas dos demonstrativos individuais; totais coletivos não atribuídos a empregados.`);
        }
        return P.finalizaFolhaPrev(r, texto);
    };
    P.anotarFontesRegistrosPrev = (r, paginas) => {
        const ocr = new Set(paginas.ocr || []), fontes = paginas.fontes || [];
        const textos = paginas.map(pg => ({ texto: pg, digitos: P.dig(pg), nome: P.nome(pg) }));
        const registros = [...(r.colaboradores || []), ...(r.recibosFeriasIgnorados || []), ...(r.trabalhadores?.values() || []), ...(r.auxiliares || [])];
        for (const item of registros) {
            const cpf = P.dig(item.cpfDireto || item.cpf), mat = String(item.mat || item.matFolha || ''), nome = P.nome(item.nome);
            const reMat = mat ? new RegExp('(?:^|\\D)' + mat + '(?:\\D|$)') : null;
            const indices = textos.map((pg, i) => {
                const mesmoCpf = cpf.length === 11 && pg.digitos.includes(cpf);
                const mesmoNome = nome.length >= 6 && pg.nome.includes(nome);
                const mesmaMat = reMat && reMat.test(pg.texto);
                return mesmoCpf || (mesmoNome && (!mat || mesmaMat)) ? i : -1;
            }).filter(i => i >= 0);
            item.fontes = indices.map(i => ({ ...(fontes[i] || { pagina: i + 1 }), metodo: fontes[i]?.metodo || (ocr.has(i) ? 'ocr' : 'texto_pdf') }));
            if (indices.length) item.viaOcr = item.viaOcr === true || item.fontes.some(f => f.metodo === 'ocr');
            else if (ocr.size) item.viaOcr = true; // origem incerta continua exigindo conferência
        }
        r.viaOcr = registros.some(P.viaOcrPrev);
        return r;
    };
    const lerFolhaAnterior2517 = P.lerFolha;
    P.lerFolha = (paginas) => P.anotarFontesRegistrosPrev(lerFolhaAnterior2517(paginas), paginas);
    P.novoS5Prev = (t, layout, evidencia = true) => ({ competencia: P.compPrev(t), lotacao: '', trabalhadores: new Map(), totais: {}, avisos: [], informacoes: [],
        auxiliares: [], semIdentificacao: [], layout, evidenciaEsocial: evidencia,
        cnpj: P.dig(t.match(/CNPJ\s*:\s*([\d./-]{14,18})/)?.[1]), soma: { 11: 0, 19: 0, 21: 0 } });
    P.registroS5Prev = (dados) => ({ cpf: '', nome: '', matFolha: '', matEsocial: '', categoria: '', b11: 0, b11x: 0, b19: 0, d21: 0, d21x: 0, ...dados });
    P.somaS5Prev = (r) => {
        const registros = [...r.trabalhadores.values(), ...(r.auxiliares || [])];
        r.soma = { 11: registros.reduce((s, t) => s + (t.b11 || 0) + (t.b11x || 0), 0), 19: registros.reduce((s, t) => s + (t.b19 || 0), 0), 21: registros.reduce((s, t) => s + (t.d21 || 0) + (t.d21x || 0), 0) };
        return r;
    };
    P.cnpjServicoBasesInssPrev = (linha) => P.dig(linha?.match(/\bCNPJ\s*:\s*(\d{2}\.\d{3}\.\d{3}\/\d{4}-\d{2}|\d{14})\b/i)?.[1]);
    P.lerS5001 = (paginas) => {
        const texto = paginas.join('\n');
        // v2.5.20: "Consulta Totalizador da Contribuição Previdenciária" do portal do eSocial, impressa pelo
        // navegador: uma consulta por CPF, com "TIPO DO VALOR" (11, 19, 21), "VALOR 13º" e "VALOR MENSAL".
        // Usa só o primeiro quadro (por estabelecimento/lotação); o quadro "Período de referência" repete os valores.
        if (P.RX_PORTAL_ESOCIAL_S5001.test(texto)) {
            const texto = P.juntarLetraSoltaPrev(paginas.join('\n')); // v2.5.21
            const r = P.novoS5Prev(texto, 'S-5001 (consulta no portal do eSocial)');
            r.cnpj ||= P.dig(texto.match(/(\d{2}\.\d{3}\.\d{3}\/\d{4}-\d{2})\s*-\s*[A-ZÀ-Ú]/)?.[1]);
            r.competencia ||= P.compDe(texto.match(/Per[ií]odo de Apura[çc][ãa]o\s*:?\s*\n?\s*(\d{2}\/\d{4})/i)?.[1])
                || P.compDe(texto.match(/(?:^|\n)\s*(\d{2}\/\d{4})\s+\d{3}\.\d{3}\.\d{3}-\d{2}/)?.[1]);
            const blocos = texto.split(/(?=Consulta\s+Totalizador\s+da\s+Contribui)/i).filter(b => /^Consulta\s+Totalizador/i.test(b));
            for (const bloco of blocos) {
                const res = bloco.split(/Resultado da pesquisa/i)[1] || '';
                const cpfTexto = res.match(/CPF\s*:?\s*\n?\s*(\d{3}\.\d{3}\.\d{3}-\d{2})/i)?.[1]
                    || res.match(/(?:^|\n)\s*\d{2}\/\d{4}\s+(\d{3}\.\d{3}\.\d{3}-\d{2})/)?.[1] || ''; // v2.5.21: "09/2026 CPF NOME" (PDF com texto)
                const cpf = P.cpf(cpfTexto);
                if (!cpf || !P.cpfValidoPrev(cpf)) { r.avisos.push(`S-5001 (portal do eSocial): consulta sem CPF legível${cpfTexto ? ` (${cpfTexto})` : ''}; não associada a trabalhador.`); continue; }
                // v2.5.21: no PDF com texto o nome vem na linha do CPF ("09/2026 020.626.606-50 ANA ..."); na impressão
                // por OCR vem depois de "Nome:". Rótulo ("Tributária:") nunca é nome.
                const nomeNaLinha = (res.match(new RegExp(cpfTexto.replace(/[.\-]/g, '\\$&') + '[ \\t]+([A-ZÀ-Ú][A-ZÀ-Ú\x27 .]{3,})(?=\\n|$)'))?.[1] || '').trim();
                const nomeRotulo = (res.match(/Nome\s*:?\s*\n\s*([^\n]+)/i)?.[1] || '').trim();
                const nome = nomeNaLinha || (/:/.test(nomeRotulo) ? '' : nomeRotulo);
                const t = P.registroS5Prev({ cpf, nome, matEsocial: res.match(/Matr[ií]cula\s*:\s*(\d+)/i)?.[1] || '',
                    categoria: res.match(/Categoria\s*:\s*(\d{3})/i)?.[1] || '', _semBase: true, _semDesconto: true });
                if (!r.lotacao) r.lotacao = P.dig(res.match(/Estabelecimento\s*:\s*(\d{14})/i)?.[1]);
                const quadro = res.split(/Per[ií]odo de refer[êe]ncia/i)[0];
                for (const m of quadro.matchAll(/TIPO DO VALOR\s+(\d{2})\s*-([\s\S]*?)(?=TIPO DO VALOR|C[ÓO]DIGO DE RECEITA|$)/gi)) {
                    const cod = m[1];
                    if (!['11', '19', '21'].includes(cod)) continue;
                    const mensal = P.ce(m[2].match(new RegExp('VALOR MENSAL\\s+(' + PREV_VALOR + ')', 'i'))?.[1]);
                    const decimo = P.ce(m[2].match(new RegExp('VALOR 13\\S*\\s+(' + PREV_VALOR + ')', 'i'))?.[1]);
                    if (mensal !== null && mensal !== undefined) { P._s5Soma(t, cod, mensal); if (cod === '21') t._semDesconto = false; else t._semBase = false; }
                    if (decimo !== null && decimo !== undefined && cod !== '19') P._s5Soma(t, `${cod}*`, decimo);
                }
                // v2.5.21: PDF com texto: tabela "Tipo do Valor | Valor 13º | Valor Mensal" em uma linha por código
                // ("11 - Base de cálculo ... - 1.870,77"). Só quando o quadro acima não trouxe valores.
                if (t._semBase && t._semDesconto) {
                    const V = '(-|' + PREV_VALOR + ')';
                    for (const m of quadro.matchAll(new RegExp('^\\s*(11|19|21)\\s*-\\s*[^\\n]*?\\s' + V + '\\s+' + V + '\\s*$', 'gm'))) {
                        const cod = m[1], decimo = m[2] === '-' ? null : P.ce(m[2]), mensal = m[3] === '-' ? null : P.ce(m[3]);
                        if (mensal !== null && mensal !== undefined) { P._s5Soma(t, cod, mensal); if (cod === '21') t._semDesconto = false; else t._semBase = false; }
                        if (decimo !== null && decimo !== undefined && cod !== '19') P._s5Soma(t, `${cod}*`, decimo);
                    }
                }
                // tela sem o quadro "TIPO DO VALOR 21": vale o "VALOR DESCONTADO DO TRABALHADOR" (código de receita 108201)
                if (t._semDesconto) { const v = P.ce(res.match(new RegExp('VALOR DESCONTADO DO TRABALHADOR\\s+(' + PREV_VALOR + ')', 'i'))?.[1]); if (v !== null && v !== undefined) { t.d21 = v; t._semDesconto = false; } }
                if (r.trabalhadores.has(cpf)) { r.avisos.push(`S-5001 (portal do eSocial): CPF ${P.fmtCpf(cpf)} consultado mais de uma vez; vale a primeira consulta. Conferir.`); continue; }
                r.trabalhadores.set(cpf, t);
                if (t._semBase) r.avisos.push(`S-5001 (portal do eSocial): a tela de ${nome || P.fmtCpf(cpf)} não mostra a base de cálculo (tipo 11); não tratada como zero.`);
            }
            r.informacoes.push(`Consulta do totalizador S-5001 no portal do eSocial (telas impressas): ${r.trabalhadores.size} trabalhador(es) lidos, um por consulta de CPF.`);
            return P.somaS5Prev(r);
        }
        if (/Identifica[çc][ãa]o do Trabalhador/.test(texto)) {
            const r = P.novoS5Prev(texto, 'S-5001 individual (Senior)');
            for (const pg of paginas) {
                const cpf = P.cpf(pg.match(/\b(\d{3}\.\d{3}\.\d{3}-\d{2})\b/)?.[1]); if (!cpf) continue;
                const corpo = pg.split(/Remunera[çc][ãa]o por per[ií]odo de refer[êe]ncia/i)[0];
                const nome = pg.match(/\d{3}\.\d{3}\.\d{3}-\d{2}[^\n]*\n([^\n]+)/)?.[1]?.trim() || '';
                const t = P.registroS5Prev({ cpf, nome, matFolha: pg.match(/Cadastro\s*:\s*(\d+)/)?.[1] || '',
                    matEsocial: pg.match(/Matr[ií]cula\s*:\s*(\S+)/)?.[1] || '', categoria: pg.match(/Categoria\s*:\s*(\d{3})/)?.[1] || '', _semBase: true, _semDesconto: true });
                if (!r.lotacao) r.lotacao = P.dig(pg.match(/Num\. Inscri[çc][ãa]o\s*:\s*([\d./-]+)/)?.[1]);
                for (const m of corpo.matchAll(new RegExp('Tipo Valor\\s*:\\s*(11|19|21)\\s*-([^]*?)(?=Tipo Valor|$)', 'g'))) {
                    const v = P.rotuloPrev(m[2], '(?:^|\\n)Valor'); if (v === null) continue;
                    P._s5Soma(t, m[1], v); if (m[1] === '21') t._semDesconto = false; else t._semBase = false;
                }
                if (t._semDesconto) { const v = P.rotuloPrev(corpo, 'Valor Contribui[çc][ãa]o eSocial'); if (v !== null) { t.d21 = v; t._semDesconto = false; } }
                if (r.trabalhadores.has(cpf)) { r.avisos.push(`S-5001: CPF ${P.fmtCpf(cpf)} repetido; conferir eventos/retificações. Não foi somado em duplicidade.`); continue; }
                r.trabalhadores.set(cpf, t);
                if (t._semBase || t._semDesconto) r.avisos.push(`S-5001: base/desconto não lido para ${nome || P.fmtCpf(cpf)}; conferir.`);
            }
            return P.somaS5Prev(r);
        }
        if (/S-5001\s*-\s*Informa[çc][õo]es das contribui[çc][õo]es/i.test(texto)) return prevOriginal.s5001(paginas);
        const dominio = /RELA[ÇC][ÃA]O DE BASES DO INSS/i.test(texto), rio = /RELAT[ÓO]RIO DE INSS/i.test(texto);
        if (dominio || rio) {
            const r = P.novoS5Prev(texto, dominio ? 'Relação de bases do INSS' : 'Relatório de INSS', false);
            let servico = '';
            const resumoServico = new Map();
            const ocr = new Set(paginas.ocr || []);
            const linhaInss = '(\\d+)\\s+([A-ZÀ-Ú][A-ZÀ-Ú .\x27-]+?)\\s+';
            const linhaNormal = new RegExp('^' + linhaInss + '(' + PREV_VALOR + '(?:\\s+' + PREV_VALOR + '){5})\\s*$');
            // A taxa é uma coluna intermediária. Só aceita os formatos de OCR
            // conhecidos, com a base, as demais colunas e o desconto legíveis.
            const linhaTaxaOcr = new RegExp('^' + linhaInss + '(' + PREV_VALOR + ')'
                + '(?:\\s+' + PREV_VALOR + '){3}\\s+\\d{1,3}(?:/\\d{2}|,\\d{3})\\s+(' + PREV_VALOR + ')\\s*$');
            const totalEmpregados = new RegExp('^\\s*Empregados:\\s*(\\d+)\\s+Total:\\s*'
                + PREV_VALOR + '(?:\\s+' + PREV_VALOR + '){4}\\s*$', 'i');
            for (const [i, pagina] of paginas.entries()) {
                const viaOcr = ocr.has(i) || paginas.fontes?.[i]?.metodo === 'ocr';
                const tabelaInss = dominio && /RELA[ÇC][ÃA]O DE BASES DO INSS/i.test(pagina);
                for (const line of pagina.split('\n')) {
                    if (/Servi[cç]o\s*:/.test(line)) servico = line;
                    if (dominio) {
                        const total = tabelaInss && line.match(totalEmpregados);
                        const cnpjServico = total && P.cnpjServicoBasesInssPrev(servico);
                        if (cnpjServico) {
                            if (!resumoServico.has(cnpjServico)) resumoServico.set(cnpjServico, []);
                            resumoServico.get(cnpjServico).push(+total[1]);
                        }
                        const m = line.match(linhaNormal);
                        if (m) {
                            const vals = P.valoresPrev(m[3]);
                            r.auxiliares.push(P.registroS5Prev({ matFolha: m[1], nome: m[2], b11: vals[0], d21: vals[5], servico, auxiliar: true }));
                            continue;
                        }
                        const recuperado = viaOcr && tabelaInss && servico && line.match(linhaTaxaOcr);
                        if (recuperado) {
                            const [, matFolha, nome, base, desconto] = recuperado;
                            r.auxiliares.push(P.registroS5Prev({ matFolha, nome, b11: P.ce(base), d21: P.ce(desconto),
                                servico, auxiliar: true, viaOcr: true }));
                        }
                    } else {
                        const m = line.match(/^(\d+)\s+(.+?)\s+(\d{3}\.\d{3}\.\d{3}-\d{2})\s+(.+)$/);
                        if (!m) continue; const vals = P.valoresPrev(m[4]);
                        const t = P.registroS5Prev({ cpf: P.cpf(m[3]), matFolha: m[1], nome: m[2], b11: vals[0] ?? 0, d21: vals[1] ?? 0,
                            _semBase: vals.length < 2, _semDesconto: vals.length < 2, auxiliar: true,
                            base13: vals[2] ?? null, inss13: vals[3] ?? null });
                        if (!r.trabalhadores.has(t.cpf)) r.trabalhadores.set(t.cpf, t);
                        else r.avisos.push(`Relatório de INSS: CPF ${P.fmtCpf(t.cpf)} repetido; vale a primeira linha. Conferir.`);
                    }
                }
            }
            if (resumoServico.size) {
                r.totaisServicosInss = [...resumoServico].filter(([, totais]) => totais.length === 1)
                    .map(([cnpj, [declarados]]) => ({ cnpj, declarados }));
            }
            // v2.5.9: não é pendência; muitas empresas não enviam o S-5001. Só esclarecimento.
            r.informacoes.push('Relatório do INSS emitido pelo sistema de folha da empresa, aceito para os itens 3 e 4.');
            if (r.auxiliares.length) r.informacoes.push('Relatório sem CPF: cada linha é ligada ao empregado pela matrícula com nome compatível e, na falta dela, pelo nome, quando é único.');
            return P.somaS5Prev(r);
        }
        const r = P.novoS5Prev(texto, /DCTFWeb/i.test(texto) ? 'DCTFWeb (consolidada)' : 'S-5001 sem identificação individual', false);
        for (let i = 0; i < paginas.length; i++) {
            const base = P.rotuloPrev(paginas[i], 'Base de c[áa]lculo Cont\\. Previdenci[áa]ria');
            const inss = P.rotuloPrev(paginas[i], 'INSS Empregado Descontado');
            if (base !== null || inss !== null) r.semIdentificacao.push({ pagina: i + 1, base, inss });
        }
        r.avisos.push(/DCTFWeb/i.test(texto)
            ? 'DCTFWeb consolidada recebida: não substitui o S-5001 por trabalhador para este cruzamento. Junte o relatório identificado.'
            : `${r.semIdentificacao.length} página(s) de valores sem nome, CPF ou matrícula do trabalhador. Sem associação automática; junte o S-5001 identificado.`);
        return r;
    };
    const lerS5001Anterior2517 = P.lerS5001;
    P.lerS5001 = (paginas) => {
        const anterior = lerS5001Anterior2517(paginas);
        const registros = [...(anterior.trabalhadores?.values() || []), ...(anterior.auxiliares || [])];
        const semValores = !registros.length || registros.every(t => t._semBase && t._semDesconto);
        const alternativo = semValores ? P.lerInssIdentificadoPrev(paginas) : null;
        return P.anotarFontesRegistrosPrev(alternativo || anterior, paginas);
    };
    // v2.5.30: os PDFs individuais de alguns sistemas não imprimem o trabalhador.
    // A identidade externa só é candidata: matrícula e nome do arquivo precisam
    // ser confirmados na folha; valores e posição do arquivo nunca identificam CPF.
    P.identidadeArquivoInssPrev = (arquivo) => {
        const caminho = typeof arquivo === 'string' ? arquivo : arquivo?.name || arquivo?.webkitRelativePath || '';
        const base = String(caminho).split(/[\\/]/).pop().replace(/\.pdf$/i, '').trim();
        const m = base.match(/^(\d{1,12})\s*[-–_]\s*(.+)$/);
        const nome = (m ? m[2] : base).replace(/\s+/g, ' ').trim();
        if (!/^[A-Za-zÀ-ÿ'’ .-]+$/.test(nome) || P.tokens(nome).length < 2
            || /S\s*-?\s*5001|FOLHA|COMPROVANTE|FGTS|DARF|DCTF|CERTID|RELAT[ÓO]RIO|CONTRIBUI|FATURAMENTO|CONTRATO|ESOCIAL/i.test(nome)) return null;
        return { matFolha: m?.[1] || '', nome, caminho: String(caminho) };
    };
    P.chaveHashArquivoPrev = (hash, nome) => {
        const id = P.identidadeArquivoInssPrev(nome);
        return hash && id ? `${hash}|identidade:${id.matFolha}|${P.nome(id.nome)}` : hash;
    };
    P.lerInssDeArquivoPrev = (paginas, arquivo) => {
        const anterior = P.lerS5001(paginas);
        if (anterior.trabalhadores.size || anterior.auxiliares?.length) return anterior;
        const id = P.identidadeArquivoInssPrev(arquivo);
        if (!id) return anterior;
        const candidatas = paginas.map((texto, i) => ({ texto: P.normalizarOcrPrev(texto), i }))
            .filter(p => /S\s*-?\s*5001\s+Contribui[çc][õo]es Sociais/i.test(p.texto) && /Base de c[áa]lculo Cont\.? Previdenci[áa]ria/i.test(p.texto));
        if (candidatas.length !== 1 || (candidatas[0].texto.match(/Servi[çc]o\s*:/gi) || []).length > 1) {
            anterior.avisos.push(`${id.caminho}: identificação pelo arquivo exige um demonstrativo individual; não houve associação automática.`);
            return anterior;
        }
        const { texto, i } = candidatas[0];
        const cnpj = P.dig(texto.match(/CNPJ\s*:\s*([\d./-]{14,18})/i)?.[1]);
        if (cnpj.length !== 14) { anterior.avisos.push(`${id.caminho}: CNPJ da empresa não identificado; valores não associados pelo arquivo.`); return anterior; }
        const campo = (rot) => {
            const encontrados = [...texto.matchAll(new RegExp(rot + '\\s*:?\\s*(' + PREV_VALOR + ')(?=\\s|$)', 'gi'))];
            const valores = [...new Set(encontrados.map(m => P.ce(m[1])))];
            return valores.length === 1 ? valores[0] : null;
        };
        const base = campo('Base de c[áa]lculo Cont\\.? Previdenci[áa]ria');
        const rotAdicional = 'Base de c[áa]lculo Cont\\.? Previdenci[áa]ria Adicional\\s*[–—-]?\\s*Exclusiva Empregador';
        const temAdicional = new RegExp(rotAdicional, 'i').test(texto);
        const adicional = temAdicional ? campo(rotAdicional) : 0;
        const desconto = campo('INSS Empregado Descontado');
        const r = P.novoS5Prev(texto, 'S-5001 individual (identificação pelo arquivo)');
        r.cnpj = cnpj;
        const fonte = { ...(paginas.fontes?.[i] || { arquivo: id.caminho, pagina: i + 1 }), metodo: paginas.fontes?.[i]?.metodo || ((paginas.ocr || []).includes(i) ? 'ocr' : 'texto_pdf') };
        r.auxiliares.push(P.registroS5Prev({ nome: id.nome, matFolha: id.matFolha, b11: base ?? 0, b19: adicional ?? 0, d21: desconto ?? 0,
            _semBase: base === null || adicional === null, _semDesconto: desconto === null, auxiliar: true,
            identidadeOrigem: 'nome_arquivo', arquivoIdentificacao: id.caminho, identidadeNoArquivo: id,
            cnpjFonte: cnpj, competenciaFonte: r.competencia, fontes: [fonte], viaOcr: fonte.metodo === 'ocr',
            servico: texto.match(/Servi[çc]o\s*:[^\n]*/i)?.[0] || '' }));
        r.arquivosIdentificados = [id.caminho];
        r.informacoes.push(`Identificação candidata lida do arquivo "${id.caminho}"; CPF só é obtido após cruzar a matrícula e o nome com a folha, ou nome completo único.`);
        if (temAdicional) r.informacoes.push('Base mensal = base previdenciária + base adicional exclusiva do empregador. A rubrica 95, que repete a base adicional, não é somada novamente.');
        if (!r.competencia) r.informacoes.push('Competência não impressa neste PDF: não foi deduzida da data de emissão; conferir o período do conjunto documental.');
        if (base === null || adicional === null || desconto === null) r.avisos.push(`${id.caminho}: base/desconto não completamente legível; campo ausente permanece pendente.`);
        return P.somaS5Prev(r);
    };
    P.mesmosValoresInssPrev = (a, b) => ['b11', 'b11x', 'b19', 'd21', 'd21x'].every(k => (a[k] || 0) === (b[k] || 0))
        && ['_semBase', '_semDesconto'].every(k => !!a[k] === !!b[k]);
    P.unirFontesInssPrev = (a, b) => [...new Map([...(a || []), ...(b || [])].map(f => [`${f.arquivo}|${f.pagina}|${f.metodo}`, f])).values()];
    P.combinarRelatoriosInssPrev = (documentos) => {
        const todos = documentos.map(d => d.dados || d).filter(Boolean);
        if (!todos.length) return null;
        if (todos.length === 1) return todos[0];
        const identificados = todos.filter(r => r.trabalhadores?.size || r.auxiliares?.length);
        if (!identificados.length) return [...todos].sort((a, b) => (b.semIdentificacao?.length || 0) - (a.semIdentificacao?.length || 0))[0];
        const r = { ...identificados[0], trabalhadores: new Map(), auxiliares: [], avisos: [], informacoes: [], totais: {},
            arquivosIdentificados: [], competenciasFontes: [], cnpjsFontes: [], semIdentificacao: [], totaisServicosInss: [] };
        const auxiliares = new Map();
        const mesclar = (a, b) => {
            const fontes = P.unirFontesInssPrev(a.fontes, b.fontes);
            if (P.mesmosValoresInssPrev(a, b) && P.nomesCompativeisPrev(a.nome, b.nome)) return { ...a, fontes, viaOcr: P.viaOcrPrev(a) || P.viaOcrPrev(b) };
            r.avisos.push(`Relatórios de INSS com valores/identidades diferentes para ${a.nome || P.fmtCpf(a.cpf)}; não houve soma nem escolha automática.`);
            return { ...a, fontes, _semBase: true, _semDesconto: true, conflitoInss: true, valoresAlternativos: [a, b] };
        };
        for (const x of identificados) {
            r.avisos.push(...(x.avisos || [])); r.informacoes.push(...(x.informacoes || []));
            r.arquivosIdentificados.push(...(x.arquivosIdentificados || []));
            if (x.competencia) r.competenciasFontes.push(x.competencia);
            if (x.cnpj) r.cnpjsFontes.push(x.cnpj);
            for (const [cpf, t] of x.trabalhadores || []) r.trabalhadores.set(cpf, r.trabalhadores.has(cpf) ? mesclar(r.trabalhadores.get(cpf), t) : t);
            for (const t of x.auxiliares || []) {
                const k = `${String(t.matFolha || '').replace(/^0+/, '')}|${P.nome(t.nome).replace(/\s/g, '')}`;
                auxiliares.set(k, auxiliares.has(k) ? mesclar(auxiliares.get(k), t) : t);
            }
        }
        r.auxiliares = [...auxiliares.values()];
        for (const k of ['avisos', 'informacoes', 'arquivosIdentificados', 'competenciasFontes', 'cnpjsFontes']) r[k] = [...new Set(r[k])];
        if (r.arquivosIdentificados.length > 1) {
            r.informacoes = r.informacoes.filter(t => !t.startsWith('Identificação candidata lida do arquivo '));
            r.informacoes.unshift(`Matrícula e nome de ${r.arquivosIdentificados.length} arquivos individuais usados como candidatos para validação na folha. A origem exata permanece nas fontes e no diagnóstico; valores não identificam pessoas.`);
        }
        r.competencia = r.competenciasFontes.length === 1 ? r.competenciasFontes[0] : '';
        r.cnpj = r.cnpjsFontes.length === 1 ? r.cnpjsFontes[0] : '';
        r.evidenciaEsocial = identificados.some(x => x.evidenciaEsocial !== false);
        r.layout = r.arquivosIdentificados.length ? `Relatórios do INSS (${identificados.length} arquivos; identificação interna ou pelo arquivo)` : `Relatórios do INSS (${identificados.length} arquivos)`;
        if (todos.length > identificados.length) r.informacoes.push(`${todos.length - identificados.length} documento(s) sem identificação individual preservado(s) no diagnóstico, sem atribuir seus valores a pessoas; usados os relatórios identificáveis.`);
        return P.somaS5Prev(r);
    };


    // v2.5.8: o relatório do INSS de cada empresa tem um formato. A ligação com o empregado segue
    // a ordem CPF → matrícula (com nome compatível) → nome, este só quando aponta para um único CPF
    // e aparece uma única vez no relatório. A chave usada fica registrada em t.chave.
    P.ligarAuxiliaresPrev = (rel, folha, fgts, segest) => {
        if (!rel?.auxiliares?.length) return rel;
        const r = { ...rel, trabalhadores: new Map(rel.trabalhadores), avisos: [...rel.avisos], informacoes: [...(rel.informacoes || [])], naoLigados: [] };
        for (const t of r.trabalhadores.values()) if (!t.chave) t.chave = 'CPF';
        const junto = (n) => P.nome(n).replace(/\s/g, '');
        const compat = (a, b) => { const x = junto(a), y = junto(b); return !!x && !!y && (x === y || (Math.min(x.length, y.length) >= 10 && (x.startsWith(y) || y.startsWith(x)))); };
        const pessoas = [];
        for (const c of folha?.colaboradores || []) { const cpf = c.cpfDireto || c.cpf; if (cpf) pessoas.push({ cpf, mat: String(c.mat ?? '').replace(/^0+/, ''), nome: c.nome }); }
        for (const l of fgts?.linhas || []) if (l.cpf) pessoas.push({ cpf: l.cpf, mat: '', nome: l.nome });
        for (const l of segest?.linhas || []) { const cpf = P.cpf(l.cpf); if (cpf) pessoas.push({ cpf, mat: '', nome: l.nome }); }
        const cpfsPorNome = new Map();
        for (const p of pessoas) { const k = junto(p.nome); if (!k) continue; if (!cpfsPorNome.has(k)) cpfsPorNome.set(k, new Set()); cpfsPorNome.get(k).add(p.cpf); }
        const auxPorNome = new Map();
        for (const t of rel.auxiliares) { const k = junto(t.nome); auxPorNome.set(k, (auxPorNome.get(k) || 0) + 1); }
        // nome só por igualdade (ignorando espaços e acentos): nome abreviado não liga, para não confundir pessoas
        const porNomeUnicoAnterior2545 = (nome) => {
            const k = junto(nome); if (!k || auxPorNome.get(k) > 1) return '';
            const achados = cpfsPorNome.get(k);
            return achados?.size === 1 ? [...achados][0] : '';
        };
        // v2.5.45: só quando o nome idêntico não existe em nenhum documento. (1) mesmo nome sem as
        // partículas DE/DA/DO/DAS/DOS/E ("Camila Faustino de Andrade" × "CAMILA FAUSTINO ANDRADE");
        // (2) o mesmo, com os substitutos citados com CPF válido nas ocorrências da SEGEST.
        // Exige nome único no relatório e um único CPF; nome abreviado continua sem ligar.
        const semParticulas = (n) => P.nome(n).split(' ').filter(w => w && !/^(?:DE|DA|DO|DAS|DOS|E)$/.test(w)).join('');
        const mapaSemParticulas = (lista) => {
            const m = new Map();
            for (const p of lista) { const k = semParticulas(p.nome); if (k.length < 10) continue; if (!m.has(k)) m.set(k, new Set()); m.get(k).add(p.cpf); }
            return m;
        };
        const cpfsSemParticulas = mapaSemParticulas(pessoas);
        const citadosCobertura = [];
        for (const l of segest?.linhas || []) for (const c of P.coberturas?.(l.ocorrencias) || []) {
            const cpf = P.cpf(c.cpf); if (cpf && P.cpfValidoPrev(cpf)) citadosCobertura.push({ cpf, mat: '', nome: c.nome });
        }
        const cpfsCobertura = mapaSemParticulas(citadosCobertura);
        const auxSemParticulas = new Map();
        for (const t of rel.auxiliares) { const k = semParticulas(t.nome); auxSemParticulas.set(k, (auxSemParticulas.get(k) || 0) + 1); }
        const nomesConhecidos = new Set([...cpfsPorNome.keys()]);
        const porNomeUnico = (nome) => {
            const k = junto(nome);
            if (!k || nomesConhecidos.has(k) || auxPorNome.get(k) > 1) return porNomeUnicoAnterior2545(nome);
            const k2 = semParticulas(nome);
            if (k2.length < 10 || auxSemParticulas.get(k2) > 1) return '';
            const um = (set) => set?.size === 1 ? [...set][0] : '';
            if (cpfsSemParticulas.has(k2)) return um(cpfsSemParticulas.get(k2));
            const cpf = um(cpfsCobertura.get(k2));
            // o CPF da cobertura não pode pertencer, nos documentos, a outra pessoa
            return cpf && !pessoas.some(p => p.cpf === cpf && semParticulas(p.nome) !== k2) ? cpf : '';
        };
        const liga = (t, cpf, chave) => {
            if (r.trabalhadores.has(cpf)) {
                const existente = r.trabalhadores.get(cpf);
                if (t.identidadeOrigem === 'nome_arquivo' || existente.identidadeOrigem === 'nome_arquivo') {
                    const fontes = P.unirFontesInssPrev(existente.fontes, t.fontes);
                    if (P.mesmosValoresInssPrev(existente, t) && P.nomesCompativeisPrev(existente.nome, t.nome)) {
                        r.trabalhadores.set(cpf, { ...existente, fontes }); return;
                    }
                    r.trabalhadores.set(cpf, { ...existente, fontes, _semBase: true, _semDesconto: true, conflitoInss: true, valoresAlternativos: [existente, t] });
                    r.avisos.push(`Relatório do INSS: valores diferentes para ${P.titulo(t.nome)} em mais de um arquivo; comparação pendente, sem soma automática.`); return;
                }
                r.avisos.push(`Relatório do INSS: mais de uma linha para ${P.titulo(t.nome)}${t.matFolha ? ` (matrícula ${t.matFolha})` : ''}. Não houve soma automática; conferir.`); return;
            }
            r.trabalhadores.set(cpf, { ...t, cpf, cpfObtidoDaFolha: chave !== 'CPF', chave });
        };
        const resto = [];
        for (const t of rel.auxiliares) {
            const cpf = P.cpf(t.cpf);
            if (cpf) { liga(t, cpf, 'CPF'); continue; }
            const mat = String(t.matFolha ?? '').replace(/^0+/, '');
            const mesmaMatricula = mat ? pessoas.filter(p => p.mat && p.mat === mat) : [];
            const compativel = (nome) => compat(nome, t.nome) || t.identidadeOrigem === 'nome_arquivo' && P.grafiaProximaPrev(nome, t.nome);
            const cpfs = new Set(mesmaMatricula.filter(p => compativel(p.nome)).map(p => p.cpf));
            if (t.identidadeOrigem === 'nome_arquivo' && mesmaMatricula.length && !cpfs.size) {
                r.naoLigados.push(t); r.avisos.push(`Arquivo ${t.arquivoIdentificacao}: matrícula ${mat} pertence a outro nome na folha; não associado.`); continue;
            }
            if (cpfs.size === 1) liga(t, [...cpfs][0], 'matrícula'); else resto.push(t);
        }
        for (const t of resto) {
            const cpf = porNomeUnico(t.nome);
            if (cpf && (!r.trabalhadores.has(cpf) || t.identidadeOrigem === 'nome_arquivo')) liga(t, cpf, 'nome'); else r.naoLigados.push(t);
        }
        return r;
    };
    // v2.5.6: comprovantes são reconhecidos pelo conteúdo, inclusive com letras espaçadas.
    // A normalização é restrita a rótulos; não altera nomes, CPFs nem valores monetários.
    // v2.5.19: PDF com fonte sem mapeamento devolve códigos de controle no lugar das letras.
    // v2.5.26: texto embaralhado (fonte com os códigos das letras trocados, ex. recibo da DCTFWeb "impresso" pelo
    // PDFCreator): tem letras, mas nenhuma palavra de verdade e nenhum valor, data, CPF ou CNPJ. Vai ao OCR também.
    P.PALAVRAS_COMUNS_PREV = new Set(('DE DA DO DAS DOS EM NO NA NOS NAS AO AOS AS OS UM UMA PARA POR COM SEM QUE SE OU NAO SIM '
        + 'VALOR VALORES TOTAL TOTAIS DATA NOME CNPJ CPF PAGINA RECEITA FEDERAL PAGAMENTO PAGAR PAGO SALDO DEBITO DEBITOS CREDITO '
        + 'CREDITOS CODIGO PERIODO APURACAO EMPRESA EMPREGADOR EMPREGADO EMPREGADOS SALARIO FGTS INSS IRRF BANCO CONTA AGENCIA '
        + 'DOCUMENTO NUMERO RECIBO DECLARACAO CONTRIBUICAO CONTRIBUICOES GUIA COMPETENCIA BASE CALCULO MES ANO VENCIMENTO '
        + 'TRABALHADOR TRABALHADORES FOLHA LTDA SERVICOS RELATORIO TIPO DESCRICAO ENDERECO').split(' '));
    P.semPalavrasPrev = (t) => {
        const s = String(t || '');
        if ((s.match(/[A-Za-zÀ-ÿ]/g) || []).length < 150) return false;
        if ((s.match(/\d,\d{2}\b|\b\d{2}\/\d{2}\/\d{4}\b|\b\d{3}\.\d{3}\.\d{3}-\d{2}\b|\b\d{2}\.\d{3}\.\d{3}\/\d{4}-\d{2}\b/g) || []).length >= 3) return false;
        // 3 palavras diferentes bastam: nas páginas reais lidas até aqui o mínimo foi 13; no texto embaralhado, 1
        const vistas = new Set();
        for (const w of P.nome(s).split(' ')) if (w.length >= 2 && P.PALAVRAS_COMUNS_PREV.has(w) && vistas.add(w).size >= 3) return false;
        return true;
    };
    P.textoIlegivelPrev = (t) => {
        const s = String(t || '');
        const ctrl = (s.match(/[\x00-\x08\x0B\x0C\x0E-\x1F]/g) || []).length;
        const legiveis = (s.match(/[A-Za-zÀ-ú0-9]/g) || []).length;
        return ctrl > 20 && ctrl > 0.2 * (ctrl + legiveis) || P.semPalavrasPrev(s);
    };
    P.ehComprovanteFgtsPrev = (texto) => {
        const t = P.nome(texto).replace(/\s/g, '');
        return /COMPROVANTE|PAGAMENTOEFETUADO|TRANSACAOBANCARIA/.test(t)
            && /FGTS|GFD|CAIXA|CEF/.test(t) && !/TIPODACARGA|QTDREGISTROS/.test(t);
    };
    P.dataPagamentoPrev = (s) => {
        const m = String(s || '').match(/^(\d{2})\/(\d{2})\/(\d{4})$/);
        if (!m) return '';
        const d = new Date(Date.UTC(+m[3], +m[2] - 1, +m[1]));
        return d.getUTCFullYear() === +m[3] && d.getUTCMonth() === +m[2] - 1 && d.getUTCDate() === +m[1]
            ? `${m[3]}${m[2]}${m[1]}` : '';
    };
    P.lerComprovantePrev = (texto, indicePagina) => {
        const t = P.rotulosFgtsPrev(texto);
        if (!P.ehComprovanteFgtsPrev(t) && !/Comprovante de Transa[çc][ãa]o Banc[áa]ria/i.test(t)) return null;
        const linha = (rot) => t.match(new RegExp('(?:^|\\n)' + rot + '\\s*:?\\s*([^\\n]+)', 'i'))?.[1]?.trim() || '';
        const monetario = (rot) => P.ce(t.match(new RegExp(rot + '\\s*:?\\s*(?:R\\$\\s*)?(' + PREV_VALOR + ')', 'i'))?.[1]);
        const sicoobPix = /SICOOB/i.test(t) && /Comprovante de envio Pix/i.test(t)
            && /Recebedor[\s\S]*Pagador[\s\S]*Detalhes do pagamento/i.test(t);
        const valor = monetario('valor da transa[çc][ãa]o') ?? monetario('valor (?:final|pago|total pago|cobrado|do pagamento)')
            ?? monetario('valor (?:do documento|total)') ?? monetario('(?:^|\\n)Valor')
            ?? (sicoobPix ? P.ce(t.match(new RegExp('Comprovante de envio Pix\\s*R\\$\\s*(' + PREV_VALOR + ')', 'i'))?.[1]) : null);
        if (valor === null) return null;
        const data = t.match(/(?:pagamento efetuado em|pagamento realizado em|data d[oe] pagamento|data da transa[çc][ãa]o|pago em|debitado em|data do d[ée]bito|Data da Opera[çc][ãa]o|transferido em)\s*:?\s*(\d{2}\/\d{2}\/\d{4})/i)?.[1] || '';
        const vencimento = t.match(/data de vencimento\s*:?\s*(\d{2}\/\d{2}\/\d{4})/i)?.[1] || '';
        const cnpj = (rot) => {
            const v = linha(rot), m = v.match(/\b\d{2}\.\d{3}\.\d{3}\/\d{4}-\d{2}\b|\b\d{14}\b/);
            return m ? P.dig(m[0]) : '';
        };
        const blocoPessoa = (rot, fim) => sicoobPix ? t.match(new RegExp('(?:^|\\n)\\s*' + rot + '\\s*\\n([\\s\\S]*?)(?=\\n\\s*' + fim + ')', 'i'))?.[1] || '' : '';
        const dadosPessoa = (b) => ({ nome: b.match(/(?:^|\n)\s*Nome\s*\n\s*([^\n]+)/i)?.[1]?.trim() || '',
            cnpjTexto: b.match(/CPF\s*\/\s*CNPJ\s*\n\s*([^\n]+)/i)?.[1]?.trim() || '' });
        const pag = dadosPessoa(blocoPessoa('Pagador', 'Detalhes do pagamento'));
        const rec = dadosPessoa(blocoPessoa('Recebedor', 'Pagador'));
        const completo = (s) => /^(?:\d{2}\.\d{3}\.\d{3}\/\d{4}-\d{2}|\d{14})$/.test(s) ? P.dig(s) : '';
        const pagador = cnpj('(?:CPF\\s*\\/\\s*)?CNPJ do (?:pagador|devedor)') || cnpj('CNPJ do contribuinte') || completo(pag.cnpjTexto);
        const recebedor = cnpj('(?:CPF\\s*\\/\\s*)?CNPJ do (?:recebedor|benefici[áa]rio)') || completo(rec.cnpjTexto);
        const recebedorNome = linha('nome do (?:recebedor|benefici[áa]rio)') || linha('benefici[áa]rio') || rec.nome;
        const idTexto = linha('(?:n[úu]mero da guia|identificador da guia|identificador GFD|identificador)');
        const identificador = (idTexto.match(/\b\d{16}-?\d\b/) || t.match(/\b\d{16}-\d\b/))?.[0] || '';
        const qrCode = linha('identificador do QR Code').replace(/\s/g, '');
        const transacao = linha('ID da transa[çc][ãa]o').replace(/\s/g, '');
        const cancelado = /cancelad[oa]|estornad[oa]|n[ãa]o (?:efetuad[oa]|realizad[oa]|efetivad[oa])/i.test(t);
        const confirma = /pagamento (?:efetuado|realizado)|(?:transa[çc][ãa]o|pagamento) (?:efetivad[oa]|conclu[ií]d[oa])|pago em|debitado em|com sucesso|transferido em/i.test(t);
        const agendado = /agendamento|agendad[oa]|a efetivar|pendente de autoriza[çc][ãa]o/i.test(t) && !confirma;
        const efetivado = !cancelado && !agendado && !!P.dataPagamentoPrev(data)
            && (confirma || /Comprovante de (?:pagamento|Transa[çc][ãa]o Banc[áa]ria)/i.test(t));
        return { valor, data, vencimento, pagador, recebedor, recebedorNome, identificador, qrCode, transacao,
            efetivado, agendado, cancelado, indicePagina, pagadorNome: pag.nome,
            pagadorCnpjTexto: pag.cnpjTexto, recebedorCnpjTexto: rec.cnpjTexto, layout: sicoobPix ? 'Sicoob Pix' : '' };
    };
    // v2.5.7: chave da cobrança PIX dinâmica, que também consta no PIX Copia e Cola
    // da GFD. Não confundir com o número da guia nem com o ID bancário da transação.
    P.localizacaoPixPrev = (texto) => {
        const t = String(texto || '');
        const re = /pix-qrcode\.caixa\.gov\.br\/api\/v2\/cobv\/([a-f0-9]{32})(?=5204|[^a-f0-9]|$)/i;
        const m = t.match(re) || t.replace(/[ \t]/g, '').match(re);
        return m ? `pix-qrcode.caixa.gov.br/api/v2/cobv/${m[1].toLowerCase()}` : '';
    };
    const comprovanteAnteriorPrev257 = P.lerComprovantePrev;
    P.lerComprovantePrev = (texto, indicePagina) => {
        const cp = comprovanteAnteriorPrev257(texto, indicePagina);
        if (!cp) return cp;
        const t = P.rotulosFgtsPrev(texto);
        if (!/Comprovante de Transa[çc][ãa]o Banc[áa]ria/i.test(t)
            || !/Conta de d[ée]bito/i.test(t) || !/Dados de quem recebeu/i.test(t)) return cp;
        const iPag = t.search(/Conta de d[ée]bito/i), iRec = t.search(/Dados de quem recebeu/i), iTitulo = t.search(/Dados do T[ií]tulo/i);
        if (iPag < 0 || iRec <= iPag || iTitulo <= iRec) return cp;
        const pagador = t.slice(iPag, iRec), recebedor = t.slice(iRec, iTitulo);
        const reCnpj = '(\\d{2}\\.\\d{3}\\.\\d{3}\\/\\d{4}-\\d{2}|\\d{14})(?!\\d)';
        cp.pagador ||= P.dig(pagador.match(new RegExp('CNPJ\\s*:\\s*' + reCnpj, 'i'))?.[1]);
        cp.recebedor ||= P.dig(recebedor.match(new RegExp('CPF\\s*\\/\\s*CNPJ\\s*:\\s*' + reCnpj, 'i'))?.[1]);
        cp.recebedorNome ||= recebedor.match(/(?:^|\n)\s*N\s*o\s*m\s*e\s*:\s*([^\n]+)/i)?.[1]?.trim() || '';
        cp.localizacaoPix = P.localizacaoPixPrev(recebedor);
        cp.transacao ||= t.slice(iTitulo).match(/Identificador\s*:\s*(E[A-Z0-9]{20,40})(?![A-Z0-9])/i)?.[1]?.toUpperCase() || '';
        return cp;
    };
    // v2.5.19: novo comprovante do Banco do Brasil ("Comprovante BB"): o texto do PDF vem com as letras
    // separadas por espaço ("R $ 4 8 .1 6 6 , 7 7"). Junta as letras de cada linha e lê os campos do layout.
    P.compactarEspacadoPrev = (texto) => String(texto || '').split('\n').map(l => {
        const toks = l.trim().split(/\s+/).filter(Boolean);
        return toks.length >= 3 && toks.filter(x => x.length <= 2).length >= toks.length * 0.6 ? l.replace(/\s+/g, '') : l.trim();
    }).join('\n');
    const comprovanteAnteriorPrev2521 = P.lerComprovantePrev;
    P.lerComprovantePrev = (texto, indicePagina) => {
        const cp = comprovanteAnteriorPrev2521(texto, indicePagina);
        const t = String(texto || '');
        if (!cp || !/SISBB/i.test(t) || !/Comprovante Pix/i.test(t) || !/PAGO PARA\s*:/i.test(t)) return cp;
        const cnpj14 = (s) => { const d = P.dig(s); return d.length >= 12 && d.length <= 14 ? d.padStart(14, '0') : ''; };
        const pagoPara = t.slice(t.search(/PAGO PARA\s*:/i));
        cp.data ||= t.match(/(?:^|\n)\s*DATA\s*:\s*(\d{2}\/\d{2}\/\d{4})/i)?.[1] || '';
        cp.pagador ||= cnpj14(t.match(/CNPJ DO PAGADOR\s*:\s*([\d./-]+)/i)?.[1]);
        cp.recebedorNome ||= pagoPara.match(/PAGO PARA\s*:\s*([^\n]+)/i)?.[1]?.trim() || '';
        // só o CNPJ de quem recebeu; a instituição (banco da conta) não identifica o beneficiário
        cp.recebedor ||= cnpj14(pagoPara.match(/\bCNPJ\s*:\s*([\d./-]+)/i)?.[1]);
        cp.transacao ||= (t.match(/(?:^|\n)\s*ID\s*:\s*(E[0-9A-Z]{20,40})/i)?.[1] || '').toUpperCase();
        if (!cp.efetivado && !cp.cancelado && !cp.agendado && P.dataPagamentoPrev(cp.data)) cp.efetivado = true;
        cp.layout ||= 'Banco do Brasil (SISBB Pix)';
        return cp;
    };
    const comprovanteAnteriorPrev2519 = P.lerComprovantePrev;
    P.lerComprovantePrev = (texto, indicePagina) => {
        const cp = comprovanteAnteriorPrev2519(texto, indicePagina);
        if (cp) return cp;
        const t = P.compactarEspacadoPrev(texto);
        if (!/(?:^|\n)ComprovanteBB(?:\n|$)/i.test(t)) return null;
        const linhas = t.split('\n').map(l => l.trim()).filter(Boolean);
        const iRec = linhas.findIndex(l => /^Recebedor$/i.test(l)), iPag = linhas.findIndex(l => /^Pagador$/i.test(l));
        const bloco = (ini, fim) => ini < 0 ? [] : linhas.slice(ini + 1, fim > ini ? fim : undefined);
        const blocoRec = bloco(iRec, iPag), blocoPag = bloco(iPag, linhas.findIndex((l, i) => i > iPag && /^Informa[çc][õo]esadicionais$/i.test(l)));
        const cnpjDe = (b) => { const i = b.findIndex(l => /^CNPJ$/i.test(l)); const d = i >= 0 ? P.dig(b[i + 1]) : ''; return d.length >= 12 && d.length <= 14 ? d.padStart(14, '0') : ''; };
        const valor = P.ce(linhas.map(l => l.match(new RegExp('^R\\$(' + PREV_VALOR + ')$'))?.[1]).find(Boolean));
        if (valor === null || valor === undefined) return null;
        const data = linhas.map(l => l.match(/^(\d{2}\/\d{2}\/\d{4})(?:às|as)\d{2}:\d{2}/i)?.[1]).find(Boolean) || '';
        const instituicaoRec = blocoRec.find((l, i) => /^Institui[çc][ãa]o$/i.test(blocoRec[i - 1] || '')) || '';
        const recebedorNome = blocoRec[0] && !/^CNPJ$/i.test(blocoRec[0]) ? blocoRec[0] : '';
        const recebedor = cnpjDe(blocoRec) || (/00360305/.test(instituicaoRec) ? '00360305000104' : '');
        const transacao = (t.match(/(?:^|\n)ID:?(E[0-9A-Z]{20,40})/i)?.[1] || '').toUpperCase();
        const cancelado = /cancelad[oa]|estornad[oa]/i.test(t), agendado = /agendamento|agendad[oa]/i.test(t);
        return { valor, data, vencimento: '', pagador: cnpjDe(blocoPag), recebedor,
            recebedorNome: /^Cef/i.test(recebedorNome) ? 'CEF MATRIZ' : recebedorNome, identificador: '', qrCode: '', transacao,
            efetivado: !cancelado && !agendado && !!P.dataPagamentoPrev(data), agendado, cancelado, indicePagina,
            pagadorNome: blocoPag[0] || '', pagadorCnpjTexto: '', recebedorCnpjTexto: '', layout: 'Banco do Brasil' };
    };
    // v2.5.45: "Comprovante BB" em que só parte das palavras vem com letras separadas ("Institui çã o"),
    // mas o título, o valor, a data e o ID vêm com espaço comum ("Comprovante BB", "R$ 50.242,91",
    // "19/11/2026 à s 15:07:25", "ID: E…"). Só entra quando os leitores anteriores não leram nada e a página
    // é de comprovante do FGTS:
    // junta o espaço nessas quatro linhas e repete a mesma cadeia de leitura, sem outra regra nova.
    const comprovanteAnteriorPrev2545 = P.lerComprovantePrev;
    P.lerComprovantePrev = (texto, indicePagina) => {
        const cp = comprovanteAnteriorPrev2545(texto, indicePagina);
        if (cp) return cp;
        const s = String(texto || '');
        if (!/(?:^|\n)\s*Comprovante\s+BB\s*(?:\n|$)/i.test(s)) return cp;
        if (!P.ehComprovanteFgtsPrev(s)) return cp; // só comprovante de FGTS (Caixa/CEF/GFD); o Pix do DARF segue no leitor do DARF
        const reValor = new RegExp('^R\\$\\s+(' + PREV_VALOR + ')$');
        const t = s.split('\n').map(l => {
            const x = l.trim();
            if (/^Comprovante\s+BB$/i.test(x)) return 'ComprovanteBB';
            let m = x.match(reValor); if (m) return `R$${m[1]}`;
            m = x.match(/^(\d{2}\/\d{2}\/\d{4})\s*(?:à\s*s|a\s*s)\s*(\d{2}:\d{2}(?::\d{2})?)$/i); if (m) return `${m[1]}às${m[2]}`;
            m = x.match(/^ID\s*:\s*(E[0-9A-Z]{20,40})$/i); if (m) return `ID:${m[1]}`;
            return l;
        }).join('\n');
        return t === s ? cp : comprovanteAnteriorPrev2545(t, indicePagina);
    };
    // v2.5.51: Pix do Sicoob com a marca só em imagem (o OCR não traz a palavra "SICOOB"; a instituição do
    // pagador é a cooperativa, ex.: "CC CREDIBOM"). Mesmo layout do Sicoob já aceito; entra só quando nada leu.
    const comprovanteAnteriorPrev2551 = P.lerComprovantePrev;
    P.lerComprovantePrev = (texto, indicePagina) => {
        const cp = comprovanteAnteriorPrev2551(texto, indicePagina);
        if (cp) return cp;
        const t = String(texto || '');
        if (/SICOOB/i.test(t) || !/Comprovante de envio Pix/i.test(t) || !/Recebedor[\s\S]*Pagador[\s\S]*Detalhes do pagamento/i.test(t)
            || !/Transferido em\s*\d{2}\/\d{2}\/\d{4}/i.test(t) || !P.ehComprovanteFgtsPrev(t)) return cp;
        const lido = comprovanteAnteriorPrev2551(t + '\nSICOOB', indicePagina);
        if (lido) lido.marcaEmImagem = true; // mesmo layout e mesmas regras de vínculo do 'Sicoob Pix'
        return lido;
    };
    // v2.5.52: comprovante do Bradesco Multipag ("Comprovante de Pagamento / Crédito em Conta Real Time"), com
    // "Finalidade: Valor: R$ 269402,64" no meio da linha e "Pagam ento" partido. Só para favorecido Caixa e só
    // quando nenhum leitor anterior leu a página.
    const comprovanteAnteriorPrev2552 = P.lerComprovantePrev;
    P.lerComprovantePrev = (texto, indicePagina) => {
        const cp = comprovanteAnteriorPrev2552(texto, indicePagina);
        if (cp) return cp;
        const t = String(texto || '');
        if (!/Banco Bradesco/i.test(t) || !/Comprovante de Pagamento/i.test(t) || !/Favorecido\s*:\s*CAIXA\s+ECON/i.test(t) || !P.ehComprovanteFgtsPrev(t)) return cp;
        const valor = P.ce(t.match(new RegExp('Valor\\s*:\\s*R\\$\\s*(' + PREV_VALOR + ')(?![\\d,])', 'i'))?.[1]);
        if (valor === null || valor === undefined) return cp;
        const datas = [...t.matchAll(/Pagam\s*ento\s*:\s*(\d{2}\/\d{2}\/\d{4})/gi)].map(m => m[1]);
        const data = datas[datas.length - 1] || '';
        const cnpjDe = (rot) => P.dig(t.match(new RegExp(rot + '\\s*:[^\\n]*?CNPJ\\s*:\\s*(\\d{2}\\.?\\d{3}\\.?\\d{3}\\/?\\d{4}-?\\d{2})', 'i'))?.[1]);
        const recebedorNome = t.match(/Favorecido\s*:\s*(.+?)\s+CNPJ\s*:/i)?.[1]?.trim() || '';
        const transacao = (t.match(/Autentica[çc][ãa]o banc[áa]ria\s*:\s*(E[0-9A-Z]{20,40})/i)?.[1] || '').toUpperCase();
        const cancelado = /cancelad[oa]|estornad[oa]/i.test(t), agendado = /agendamento|agendad[oa]/i.test(t);
        return { valor, data, vencimento: '', pagador: cnpjDe('Pagador'), recebedor: cnpjDe('Favorecido'), recebedorNome,
            identificador: '', qrCode: '', transacao, efetivado: !cancelado && !agendado && !!P.dataPagamentoPrev(data),
            agendado, cancelado, indicePagina, pagadorNome: t.match(/Pagador\s*:\s*(.+?)\s*\|/i)?.[1]?.trim() || '',
            pagadorCnpjTexto: '', recebedorCnpjTexto: '', layout: 'Bradesco Multipag' };
    };
    P.fontesTextoPrev = (registros) => {
        const fontes = (registros || []).filter(Boolean).flatMap(r => r.fontes || []);
        const porArquivo = new Map();
        for (const f of fontes) {
            if (!f.arquivo || !f.pagina) continue;
            if (!porArquivo.has(f.arquivo)) porArquivo.set(f.arquivo, new Set());
            porArquivo.get(f.arquivo).add(f.pagina);
        }
        return [...porArquivo].map(([a, ps]) => `${a}, pág. ${[...ps].sort((x, y) => x - y).join(', ')}`).join('; ');
    };
    P.localizarFontesFgtsPrev = (r, paginas, fontes) => {
        if (!fontes?.length) return;
        const digitosPaginas = paginas.map(P.dig);
        for (const colecao of ['guias', 'linhas', 'tomadores', 'estabelecimentos', 'gfds', 'comprovantes']) {
            const itens = r[colecao] instanceof Map ? [...r[colecao]] : (r[colecao] || []).map((v, i) => [i, v]);
            for (const [chave, item] of itens) {
                item.fontes = [];
                for (let i = 0; i < paginas.length; i++) {
                    const pg = paginas[i], dig = digitosPaginas[i];
                    const ok = colecao === 'comprovantes' ? (item.indicesPaginas || [item.indicePagina]).includes(i)
                        : item.cpf ? dig.includes(item.cpf) && /Rela[çc][ãa]o de Trabalhadores/.test(pg)
                            && (!item.guia || pg.includes(item.guia))
                            && (!item.tomador || item.tomador === 'SEM' ? !item.tomador || /Tomador:\s*Sem Tomador/i.test(pg) : dig.includes(P.dig(item.tomador)))
                        : colecao === 'gfds' ? /GFD\s*-\s*Guia do FGTS Digital/i.test(pg) && !!item.identificador && pg.includes(item.identificador)
                        : colecao === 'guias' ? !!item.numero && pg.includes(item.numero) && /Detalhe da Guia Emitida/.test(pg)
                        : (P.dig(chave).length >= 8 ? dig.includes(P.dig(chave)) : chave === 'SEM' && /Total do Tomador\s+Sem Tomador/i.test(pg))
                            && /Detalhe da Guia Emitida/.test(pg);
                    if (ok && fontes[i]) item.fontes.push({ ...fontes[i] });
                }
            }
        }
    };
    // Não vincula recibos apenas pelo valor. Identificador explícito ou dados conjuntos
    // de pagador, beneficiário e vencimento precisam sustentar o vínculo com a GFD.
    P.vincularPagamentoPrev = (gfd, comprovantes) => {
        if (!gfd) return { sim: null, obs: 'GFD não localizada.', cp: null };
        const raiz = P.dig(gfd.empregadorRaiz).slice(0, 8), id = P.dig(gfd.identificador);
        const candidatos = [];
        for (const cp of comprovantes || []) {
            const idCp = P.dig(cp.identificador), mesmoId = !!id && idCp === id;
            if (id && idCp && !mesmoId) continue;
            const pagadorOk = !!raiz && cp.pagador?.slice(0, 8) === raiz;
            const recebedorOk = /^(?:CEF|CAIXAECONOMICAFEDERAL)/.test(P.nome(cp.recebedorNome).replace(/\s/g, ''))
                || cp.recebedor === '00360305000104';
            const mesmoQr = !!gfd.qrCode && !!cp.qrCode && gfd.qrCode === cp.qrCode;
            const mesmaCobrancaPix = !!gfd.localizacaoPix && !!cp.localizacaoPix && gfd.localizacaoPix === cp.localizacaoPix;
            const mesmoVenc = !!P.dataPagamentoPrev(cp.vencimento) && cp.vencimento === gfd.vencimento;
            // v2.5.19: comprovante sem "data de vencimento" (ex.: Pix do Banco do Brasil): vale o pagamento
            // feito entre o primeiro dia do mês seguinte à competência e o vencimento da guia.
            const dataCp = P.dataPagamentoPrev(cp.data), vencG = P.dataPagamentoPrev(gfd.vencimento);
            const comp = String(gfd.competencia || '').match(/^(\d{4})-(\d{2})$/);
            const inicioPrazo = comp ? (+comp[2] === 12 ? `${+comp[1] + 1}0101` : `${comp[1]}${String(+comp[2] + 1).padStart(2, '0')}01`) : '';
            const noPrazo = !cp.vencimento && !!dataCp && !!vencG && dataCp <= vencG && (!inicioPrazo || dataCp >= inicioPrazo);
            const vinculo = mesmoId || mesmoQr || mesmaCobrancaPix || (pagadorOk && recebedorOk && mesmoVenc && cp.valor === gfd.valor)
                || (pagadorOk && recebedorOk && noPrazo && cp.valor === gfd.valor);
            if (!vinculo) continue;
            candidatos.push({ cp, prioridade: mesmoId || mesmoQr || mesmaCobrancaPix ? 2 : 1, pagadorOk, recebedorOk, mesmoId, mesmoQr, mesmaCobrancaPix, porPrazo: !mesmoVenc && noPrazo });
        }
        if (!candidatos.length) {
            const parciais = (comprovantes || []).filter(cp => cp.layout === 'Sicoob Pix' && cp.valor === gfd.valor
                && P.nome(cp.pagadorNome) === P.nome(gfd.empregadorNome));
            if (parciais.length === 1) {
                const cp = parciais[0];
                return { sim: null, cp: null, obs: `A verificar: comprovante Sicoob de R$ ${P.rs(cp.valor)}${cp.data ? `, transferido em ${cp.data}` : ''}; pagador ${cp.pagadorNome}; recebedor ${cp.recebedorNome || 'não identificado'}. Valor extraído; vínculo com a GFD ainda não confirmado${!cp.pagador && cp.pagadorCnpjTexto ? ' (CNPJ do pagador parcialmente oculto)' : ''}. Conferir identificador da cobrança e documento original.` };
            }
            return { sim: null, cp: null, obs: (comprovantes || []).length
            ? 'A verificar: há comprovante(s), mas os dados disponíveis não permitem vinculá-los com segurança à GFD. Conferir identificador, pagador, beneficiário, vencimento e valor.'
            : 'Comprovante de pagamento não localizado no PDF.' };
        }
        const prioridade = Math.max(...candidatos.map(x => x.prioridade));
        const fortes = candidatos.filter(x => x.prioridade === prioridade);
        const conflito = fortes.some(({cp}) => (comprovantes || []).some(outro => outro !== cp
            && ((cp.transacao && cp.transacao === outro.transacao) || (cp.qrCode && cp.qrCode === outro.qrCode))
            && (cp.valor !== outro.valor || cp.data !== outro.data || cp.cancelado !== outro.cancelado)));
        if (conflito) return { sim: null, cp: null, obs: 'A verificar: comprovantes com o mesmo identificador de transação/QR Code têm dados conflitantes; conferir valor, data e eventual cancelamento.' };
        // Um agendamento não deve ocultar o comprovante efetivado da mesma guia.
        const pagos = fortes.filter(x => x.cp.efetivado);
        const opcoes = pagos.length ? pagos : fortes;
        if (opcoes.length !== 1) return { sim: null, cp: null, obs: 'A verificar: mais de um comprovante distinto pode corresponder à GFD; conferir os pagamentos antes de concluir.' };
        const { cp, pagadorOk, recebedorOk, mesmoId, mesmoQr, mesmaCobrancaPix, porPrazo } = opcoes[0];
        const problemas = [], faltas = [];
        if (cp.cancelado) problemas.push('pagamento cancelado/estornado');
        if (cp.pagador && raiz && !pagadorOk) problemas.push('CNPJ do pagador diferente do empregador da GFD');
        if (cp.recebedorNome && !recebedorOk) problemas.push('beneficiário diferente da Caixa/FGTS');
        if (mesmaCobrancaPix && cp.recebedor && cp.recebedor !== '00360305000104') problemas.push('CNPJ do beneficiário diferente da Caixa identificada na cobrança PIX');
        if (cp.valor !== gfd.valor) problemas.push('valor diferente da GFD');
        if (!cp.efetivado) faltas.push(cp.agendado ? 'documento é agendamento, sem confirmação de pagamento' : 'efetivação/data de pagamento não confirmada');
        if (!cp.pagador || !raiz) faltas.push('CNPJ do pagador/empregador não identificado');
        if (!recebedorOk && ((!mesmoId && !mesmoQr) || mesmaCobrancaPix)) faltas.push('beneficiário não identificado');
        const data = P.dataPagamentoPrev(cp.data), venc = P.dataPagamentoPrev(gfd.vencimento);
        if (!data || !venc) faltas.push('data do pagamento ou vencimento não identificada');
        else if (data > venc) problemas.push('pago após o vencimento');
        const obs = `Comprovante R$ ${P.rs(cp.valor)}${cp.data ? `, pago em ${cp.data}` : ''}${gfd.vencimento ? ` (vencimento ${gfd.vencimento})` : ''}`
            + `${cp.pagador ? `; pagador ${P.fmtCnpj(cp.pagador)}` : ''}${cp.recebedorNome ? `; beneficiário ${cp.recebedorNome}` : ''}`
            + `; vínculo ${mesmoId ? 'pelo identificador da guia' : mesmoQr ? 'pelo identificador QR Code' : mesmaCobrancaPix ? 'pela mesma cobrança PIX da Caixa na GFD e no comprovante' : porPrazo ? 'por pagador, beneficiário, valor e pagamento dentro do prazo da guia (comprovante sem data de vencimento)' : 'por pagador, beneficiário, vencimento e valor'}`
            + `${problemas.length ? `; ${problemas.join('; ')}` : ''}${faltas.length ? `; a verificar: ${faltas.join('; ')}` : ''}.`;
        return { sim: problemas.length ? false : faltas.length ? null : true, obs, cp };
    };

    // v2.5.14: documento de rescisão (TRCT/TQRCT, conferência rescisória, extrato da conta vinculada).
    // O que vier dele é evidência COMPLEMENTAR: nunca entra na GFD mensal nem substitui folha/S-5001 já lidos.
    P.RX_NOME_RESCISORIO = /(?:RESCIS[ÃA]O|RESCIS[ÓO]RI|VERBAS?\s+RESCIS|\bTRCT\b|\bTQRCT\b|SCFPT)/i;
    P.RX_CONTEUDO_RESCISORIO = /TERMO\s+DE\s+(?:QUITA[ÇC][ÃA]O\s+DE\s+|HOMOLOGA[ÇC][ÃA]O\s+DE\s+)?RESCIS[ÃA]O\s+DO\s+CONTRATO\s+DE\s+TRABALHO|Extrato\s+de\s+Conta\s+do\s+Fundo\s+de\s+Garantia/i;
    P.ehDocumentoRescisorioPrev = (nome, paginas, papel) => papel === 'rescisorio' || P.RX_NOME_RESCISORIO.test(String(nome || ''))
        || (paginas || []).some(pg => P.RX_CONTEUDO_RESCISORIO.test(String(pg || '')));
    // Detalhe de guia só com recolhimentos rescisórios (nenhuma linha "Mensal"): guia rescisória, não a mensal.
    P.soDetalheRescisorioPrev = (lido) => {
        const linhas = lido?.linhas || [];
        return linhas.length > 0 && !linhas.some(l => /Mensal/i.test(l.tipo || '')) && linhas.some(l => /Rescis|Indeniz|Multa|Verba/i.test(l.tipo || ''));
    };
    // v2.5.14: uma página sem cabeçalho só herda o tipo da anterior se parecer continuação dela.
    // Antes, fichas, ASOs, e-mails e frequências anexados depois de uma guia herdavam o tipo "fgts".
    // E-mails, fichas, ASOs, termos e extratos nunca herdam; na guia do FGTS a página precisa ter CPF
    // com valor ou os totais/relações do detalhe.
    P.continuaTipoPrev = (texto, tipo) => {
        const t = String(texto || '');
        if (/(?:^|\n)\s*(?:De|Para|Assunto|Enviado|Cc)\s*:|Registro de Empregados|Sa[úu]de Ocupacional|\bASO\b|Termo de Recebimento|TERMO\s+DE\s+(?:QUITA[ÇC][ÃA]O\s+DE\s+)?RESCIS[ÃA]O|Extrato\s+de\s+Conta\s+do\s+Fundo/i.test(t)) return false;
        // folha e S-5001 seguem herdando como antes; a regra estrita vale só para a guia do FGTS
        if (tipo === 'cadastroEsocial') return P.ehCadastroEsocialPrev(t);
        if (tipo !== 'fgts') return true;
        const cpfs = (t.match(/\d{3}\.\d{3}\.\d{3}-\d{2}/g) || []).length;
        const valores = (t.match(/\d,\d{2}(?!\d)/g) || []).length;
        return (cpfs > 0 && valores > 0) || /Total (?:do Tomador|do Estabelecimento|FGTS)|Rela[çc][ãa]o de (?:Tomadores|Categorias|Trabalhadores)/i.test(t);
    };
    // v2.5.14: extrato da conta vinculada (Caixa/Conectividade Social) juntado à rescisão.
    P.ehExtratoContaFgtsPrev = (t) => /Extrato\s+de\s+Conta\s+do\s+Fundo\s+de\s+Garantia/i.test(String(t || ''));
    P.lerExtratoContaFgtsPrev = (texto, fonte) => {
        const t = String(texto || '');
        if (!P.ehExtratoContaFgtsPrev(t)) return null;
        const nome = (t.match(/(?:^|\n)[^\S\n]*Nome[^\S\n]*:?[^\S\n]+([A-ZÀ-Ú][A-ZÀ-Ú' ]{3,}?)[^\S\n]*(?=\n|$)/)?.[1] || '').trim();
        const pis = P.dig(t.match(/PIS\s*\/?\s*PASEP(?:\s*\/\s*NIT)?\s*:?\s*([\d.\-]{11,16})/i)?.[1]);
        const empregadorRaiz = P.dig(t.match(/CNP[JI]\s*\/\s*CEI\s*\/\s*CPF\s*:?\s*([\d./-]{10,18})/i)?.[1]).slice(0, 8);
        const lancamentos = [];
        for (const m of t.matchAll(/^[^\S\n]*(\d{2}\/\d{2}\/\d{4})[^\S\n]+(DEP\b[^\n]*?)[^\S\n]+(-?(?:\d{1,3}(?:\.\d{3})+|\d+),\d{2})(?:[^\S\n]+\S+)?[^\S\n]*$/gmi)) // v2.5.15: saldo (última coluna) opcional; o OCR às vezes o deixa ilegível
            lancamentos.push({ data: m[1], descricao: m[2].replace(/\s+/g, ' ').trim(), valor: P.ce(m[3]) });
        if (!nome || !lancamentos.length) return null;
        return { nome, pis, empregadorRaiz, lancamentos, fontes: fonte ? [fonte] : [] };
    };
    P.mesmoTrabalhadorExtratoPrev = (nomeExtrato, nomePessoa) => {
        const a = P.tokens(nomeExtrato), b = P.tokens(nomePessoa), sb = new Set(b);
        return a.length >= 2 && a[0] === b[0] && a[a.length - 1] === b[b.length - 1] && a.every(x => sb.has(x));
    };
    P.tipoDepositoPrev = (s) => /MULTA/i.test(s) ? 'multa' : /VERBA|INDENIZ/i.test(s) ? 'verba' : /RESCIS/i.test(s) ? 'rescisorio' : '';
    P.fonteCurtaPrev = (fontes) => [...new Set((fontes || []).map(f => `${f.arquivo}, pág. ${f.pagina}`))].slice(0, 3).join('; ');
    // v2.5.14: pagamento de uma guia rescisória. Mesmo rigor do GFD4: o comprovante só vale se vinculado
    // à GFD da própria guia (identificador, QR Code/PIX, ou pagador + Caixa + vencimento + valor). O extrato
    // da conta vinculada do trabalhador com os mesmos depósitos da guia também comprova o recolhimento.
    P.pagamentoGuiaRescisoriaPrev = (num, pessoa, rescisorio) => {
        const id = P.dig(num);
        const detalhe = [...(rescisorio?.guias?.values() || [])].find(g => P.dig(g.numero) === id) || null;
        let gfd = (rescisorio?.gfds || []).find(g => P.dig(g.identificador) === id) || null;
        let origemValor = 'GFD';
        if (gfd) gfd = { ...gfd, empregadorRaiz: gfd.empregadorRaiz || P.dig(detalhe?.empregadorRaiz).slice(0, 8), vencimento: gfd.vencimento || detalhe?.vencimento || '' };
        else if (detalhe && Number.isFinite(detalhe.totalDocumento) && detalhe.vencimento) {
            gfd = { identificador: detalhe.numero, vencimento: detalhe.vencimento, valor: detalhe.totalDocumento, empregadorRaiz: P.dig(detalhe.empregadorRaiz).slice(0, 8), empregadorNome: detalhe.empregadorNome };
            origemValor = 'detalhe da guia';
        }
        const pg = gfd ? P.vincularPagamentoPrev(gfd, rescisorio?.comprovantes || []) : { sim: null, cp: null, obs: 'GFD da guia não localizada' };
        // extrato: todos os depósitos da pessoa nesta guia (rescisório, verbas, multa) creditados na conta vinculada
        const linhasPessoa = (rescisorio?.linhasDetalhe?.length ? rescisorio.linhasDetalhe : rescisorio?.linhas || []).filter(l => P.cpf(l.cpf) === pessoa.cpf && P.dig(l.numeroGuia || l.guia) === id && Number.isFinite(l.fgts) && l.fgts > 0);
        const raizGuia = P.dig(detalhe?.empregadorRaiz || gfd?.empregadorRaiz).slice(0, 8);
        let extrato = null;
        for (const e of rescisorio?.extratos || []) {
            if (!linhasPessoa.length || !P.mesmoTrabalhadorExtratoPrev(e.nome, pessoa.nome)) continue;
            if (!raizGuia || !e.empregadorRaiz || e.empregadorRaiz !== raizGuia) continue;
            const usados = new Set(), achados = [];
            for (const l of linhasPessoa) {
                const tipo = P.tipoDepositoPrev(l.tipo);
                const comp = /^\d{4}-\d{2}$/.test(l.comp || '') ? l.comp : '';
                const inicio = comp ? comp.replace('-', '') + '01' : '';
                const limite = P.dataPagamentoPrev(gfd?.vencimento || detalhe?.vencimento);
                // Valor/tipo iguais em outro ano não comprovam esta rescisão. A
                // competência explícita no lançamento também precisa corresponder.
                const i = e.lancamentos.findIndex((x, k) => {
                    const data = P.dataPagamentoPrev(x.data), compDeposito = P.compDe(x.descricao);
                    return !usados.has(k) && !!tipo && !!inicio && !!limite && !!data && data >= inicio && data <= limite
                        && (!compDeposito || compDeposito === comp) && x.valor === l.fgts && P.tipoDepositoPrev(x.descricao) === tipo;
                });
                if (i < 0) break;
                usados.add(i); achados.push({ linha: l, lanc: e.lancamentos[i] });
            }
            if (achados.length === linhasPessoa.length) { extrato = { e, achados }; break; }
        }
        const partes = [];
        if (pg.sim === true && pg.cp) partes.push(`paga em ${pg.cp.data} (comprovante de R$ ${P.rs(pg.cp.valor)} = valor da ${origemValor}${P.fonteCurtaPrev(pg.cp.fontes) ? `; ${P.fonteCurtaPrev(pg.cp.fontes)}` : ''})`);
        else if (pg.sim === false) partes.push(`comprovante com problema: ${pg.obs}`);
        if (extrato) partes.push(`depósitos confirmados no extrato da conta FGTS (${extrato.achados.map(a => `${a.lanc.descricao.split(/\s+/).slice(0, 3).join(' ')} R$ ${P.rs(a.lanc.valor)} em ${a.lanc.data}`).join('; ')}${P.fonteCurtaPrev(extrato.e.fontes) ? `; ${P.fonteCurtaPrev(extrato.e.fontes)}` : ''})`);
        const sim = pg.sim === false ? false : (pg.sim === true || !!extrato) ? true : null;
        const motivo = sim === null ? (pg.cp ? pg.obs : (rescisorio?.comprovantes || []).length ? 'há comprovante(s) nos arquivos lidos, mas nenhum vinculado com segurança a esta guia' : 'comprovante não localizado nos arquivos lidos') : '';
        return { num, sim, cp: pg.cp, extrato, texto: `guia nº ${num}: ${partes.join('; ') || motivo}`, motivo, obsComprovante: pg.obs };
    };

    P.rotulosFgtsPrev = (pg) => {
        // Exportações de impressão inserem espaços dentro de palavras ("F GTS",
        // "E mitida"). Normaliza só rótulos conhecidos, sem tocar CPF nem valores.
        for (const rot of ['Detalhe da Guia Emitida', 'Nome Empregador', 'Qtd. Trabalhadores FGTS',
            'Vencimento da Guia', 'Total da Guia (FGTS + Consignado)', 'Total da Guia (FGTS)', 'Relação de Trabalhadores',
            'Total do Estabelecimento', 'Total do Tomador', 'Estabelecimento', 'Empregador',
            'Total FGTS', 'Total Consignado', 'Sem Tomador', 'Número da Guia', 'Página',
            'GFD - Guia do FGTS Digital', 'Comprovante de pagamento QR Code', 'Comprovante de Transação Bancária',
            'Comprovante', 'CAIXA ECONOMICA FEDERAL', 'CEF MATRIZ',
            'CPF / CNPJ do pagador', 'CPF / CNPJ do devedor', 'CPF / CNPJ do recebedor',
            'CNPJ do pagador', 'CNPJ do devedor', 'CNPJ do recebedor', 'CNPJ do beneficiário', 'CNPJ do contribuinte',
            'nome do pagador', 'nome do devedor', 'nome do recebedor', 'nome do beneficiário',
            'valor da transação', 'valor final', 'valor pago', 'valor total pago', 'valor cobrado', 'valor do pagamento',
            'valor do documento', 'valor total', 'Pagamento efetuado em', 'Pagamento realizado em',
            'Data da Operação', 'data do pagamento', 'data de pagamento', 'data da transação', 'data do débito',
            'data de vencimento', 'identificador do QR Code', 'ID da transação', 'identificador da guia', 'identificador GFD']) {
            const re = rot.replace(/\s/g, '').split('').map(c => c.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')).join('\\s*');
            pg = pg.replace(new RegExp(re, 'gi'), rot);
        }
        return pg.replace(/[ \t]+:/g, ':');
    };
    // Recompõe apenas o tipo de depósito explicitamente partido ao redor da
    // mesma linha. Não herda valores nem nomes de outro trabalhador.
    P.continuacoesFgtsPrev = (pg) => {
        if (!/Detalhe da Guia Emitida/.test(pg)) return pg;
        const ls = pg.split('\n');
        for (let i = 1; i < ls.length - 1; i++) {
            if (!/Verba\s*$/i.test(ls[i - 1]) || !/^\s*\d*\s*Indenizat[óo]ria\s*$/i.test(ls[i + 1])) continue;
            const re = new RegExp('^(\\d{2}/\\d{4}\\s+.*?\\d{3}\\.\\d{3}\\.\\d{3}-\\d{2}\\s+\\d{3}\\s+\\d{2}/\\d{2}/\\d{4})\\s+(?=' + PREV_VALOR + ')');
            if (!re.test(ls[i])) continue;
            ls[i] = ls[i].replace(re, '$1 Verba Indenizatória ');
            ls[i - 1] = ls[i - 1].replace(/Verba\s*$/i, '').trimEnd();
            ls[i + 1] = ls[i + 1].replace(/Indenizat[óo]ria\s*$/i, '').trimEnd();
        }
        return ls.join('\n');
    };
    P.totalLinhaFgtsPrev = (pg, rotulo) => {
        const linha = pg.match(new RegExp('^\\s*' + rotulo + '\\s*:?\\s*([^\\n]+)', 'mi'))?.[1];
        const valores = linha ? P.valoresPrev(linha) : [];
        return valores.length ? valores[valores.length - 1] : null;
    };
    P.lerFgts = (paginas) => {
        const fontes = paginas.fontes || [];
        const indicesOcr = new Set(paginas.ocr || []);
        paginas = paginas.map(p => P.continuacoesFgtsPrev(P.rotulosFgtsPrev(p)));
        const r = prevOriginal.fgts(paginas);
        for (const pg of paginas.filter(p => /Detalhe da Guia Emitida/.test(p))) {
            const num = pg.match(/N[úu]mero da Guia:\s*([\d-]+)/)?.[1], g = r.guias.get(num);
            if (!g) continue;
            const linha = pg.match(/^Total FGTS\s+([^\n]+)/m)?.[1], vals = linha ? P.valoresPrev(linha) : [];
            if (vals.length >= 2) { g.principalFgts = vals[1]; g.totalFgts = vals[vals.length - 1]; }
            // No detalhe com encargos, a última coluna é o total a recolher.
            for (const m of pg.matchAll(/^Total do Estabelecimento\s+([\d./-]+)\s+([^\n]+)/gm)) {
                const e = r.estabelecimentos.get(P.dig(m[1])), v = P.valoresPrev(m[2]);
                if (e && e.guia === num && v.length >= 2) { e.principalFgts = v[1]; e.fgts = v[v.length - 1]; }
            }
        }
        // A guia nova também pode recolher consignado; separa FGTS e total pago.
        for (const pg of paginas) {
            if (/Total da Guia \(FGTS \+ Consignado\)/.test(pg)) {
                const num = pg.match(/N[úu]mero da Guia:\s*([\d-]+)/)?.[1]; const g = r.guias.get(num);
                if (g) { g.totalDocumento = P.rotuloPrev(pg, 'Total da Guia \\(FGTS \\+ Consignado\\)'); g.temConsignado = true; }
            }
        }
        for (const g of r.guias.values()) if (g.temConsignado) {
            if (g.totalFgts !== null) g.total = g.totalFgts;
            else r.avisos.push(`Guia ${g.numero}: FGTS e consignado no mesmo documento; total exclusivo do FGTS não localizado.`);
        }
        for (const gfd of r.gfds) {
            const pg = paginas.find(p => /GFD\s*-\s*Guia do FGTS Digital/i.test(p) && p.includes(gfd.identificador));
            if (!pg) continue;
            const localizacaoPix = P.localizacaoPixPrev(pg);
            if (localizacaoPix) gfd.localizacaoPix = localizacaoPix;
            if (/Total Consignado/.test(pg)) {
                gfd.valorFgts = P.totalLinhaFgtsPrev(pg, 'Total FGTS'); gfd.valorConsignado = P.totalLinhaFgtsPrev(pg, 'Total Consignado');
                if (gfd.valorFgts !== null) (r.informacoes ||= []).push(`GFD ${gfd.identificador}: pagamento R$ ${P.rs(gfd.valor)} inclui FGTS R$ ${P.rs(gfd.valorFgts)} e consignado R$ ${P.rs(gfd.valorConsignado)}.`); // v2.5.20: informação
            }
        }
        // Releitura única e enriquecida: duplicatas do mesmo recibo não viram dois pagamentos.
        r.comprovantes = [];
        const pagamentos = new Map();
        r.comprovantesSemValor = [];
        paginas.forEach((pg, i) => {
            const cp = P.lerComprovantePrev(pg, i);
            if (!cp) { if (P.ehComprovanteFgtsPrev(pg)) r.comprovantesSemValor.push({ indicePagina: i, fontes: fontes[i] ? [fontes[i]] : [] }); return; }
            const dadosPagamento = `${cp.data}|${cp.valor}|${cp.pagador}|${cp.recebedor}|${P.nome(cp.recebedorNome)}|${cp.identificador}|${cp.efetivado}|${cp.cancelado}`;
            const chave = cp.transacao ? `transacao:${cp.transacao}|${dadosPagamento}` : cp.qrCode ? `qr:${cp.qrCode}|${dadosPagamento}`
                : pg.replace(/\s/g, '').toUpperCase();
            const anterior = pagamentos.get(chave);
            if (anterior) { anterior.indicesPaginas.push(i); return; }
            cp.indicesPaginas = [i]; pagamentos.set(chave, cp); r.comprovantes.push(cp);
        });
        P.localizarFontesFgtsPrev(r, paginas, fontes);
        // Origem por registro: OCR de um recibo não contamina as linhas do detalhe.
        for (const colecao of ['linhas', 'gfds', 'comprovantes']) for (const item of r[colecao]) {
            item.viaOcr = (item.fontes || []).some(f => f.metodo === 'ocr')
                || (colecao === 'comprovantes' && (item.indicesPaginas || []).some(i => indicesOcr.has(i)));
        }
        r.viaOcr = r.linhas.some(P.viaOcrPrev);
        return r;
    };

    // ---------- SEGEST: substitutos citados nas ocorrências ----------
    // v2.3.1: nomes próprios nas ocorrências (cada palavra com inicial maiúscula, partículas em minúsculo)
    P.RE_NOME = "((?:[A-ZÀ-Ú][A-Za-zÀ-ÿ']+)(?:\\s+(?:d[aeo]s?|e|[A-ZÀ-Ú][A-Za-zÀ-ÿ']*)){1,8})";
    // Substitutos citados nas ocorrências ("coberto por Fulano, CPF …"). Junta quebras de linha e
    // lê todos os "por Fulano" que vêm depois de um "coberto" (ex.: "coberto: dia 10, por A, CPF …;
    // de 12 a 30, por B, CPF …"). "Sem cobertura" não conta.
    P.coberturas = (ocorrencia) => {
        const out = [];
        const t = String(ocorrencia || '').replace(/\s+/g, ' ');
        const gatilhos = [...t.matchAll(/\bcobert[oa]s?\b/gi)].map(m => m.index);
        const rePor = new RegExp(`\\bpor\\s+(?:a\\s+|o\\s+)?${P.RE_NOME}\\s*,?\\s*(?:\\(?\\s*CPF\\s*:?\\s*([\\d.\\-\\s]{11,17}))?`, 'g');
        gatilhos.forEach((ini, k) => {
            let fim = Math.min(gatilhos[k + 1] ?? t.length, ini + 400);
            const corte = t.slice(ini + 6, fim).search(/\b(Permut|Plant[ãa]o|Feriado|Remanej|FREQU|Cobriu|Trabalhou|Complementa)/i);
            if (corte >= 0) fim = ini + 6 + corte;
            for (const m of t.slice(ini, fim).matchAll(rePor)) {
                const nome = m[1].replace(/\s+/g, ' ').trim();
                if (/^(ele|ela|outro|outra|este|esta|esse|essa)\b/i.test(nome)) continue;
                const cpfTexto = (m[2] || '').trim();
                const cpf = cpfTexto && P.dig(cpfTexto).length === 11 ? P.dig(cpfTexto) : '';
                if (!out.some(o => P.nome(o.nome) === P.nome(nome) && o.cpf === cpf)) out.push({ nome, cpf, cpfTexto });
            }
        });
        return out;
    };
    // v2.3.1: todo "Fulano, CPF …" citado nas ocorrências (coberturas, permutas etc.)
    P.citacoesCpf = (ocorrencia) => {
        const t = String(ocorrencia || '').replace(/\s+/g, ' ');
        const re = new RegExp(`${P.RE_NOME}\\s*,?\\s*\\(?\\s*CPF\\s*:?\\s*([\\d.\\-\\s]{11,17})`, 'g');
        const out = [];
        for (const m of t.matchAll(re)) {
            const nome = m[1].replace(/^(Cobriu|Coberto|Coberta|Permutou|Dia|Dias|De|Por|Com|O|A)\s+/i, '').trim();
            const cpfTexto = m[2].trim().replace(/[\s.\-]+$/, '');
            out.push({ nome, cpf: P.dig(cpfTexto).length === 11 ? P.dig(cpfTexto) : '', cpfTexto });
        }
        return out;
    };
    // Motivo de ausência do PRÓPRIO titular. Frases sobre outra pessoa ("cobriu o posto do X",
    // "permutou com", "o Fulano foi desligado") não contam.
    P.motivoAusencia = (texto) => {
        for (const frase of String(texto || '').split(/[.;\n]+/)) {
            if (/cobriu|permut|posto d[oa]s?\b|assumiu|foi desligad|foi demitid/i.test(frase)) continue;
            const m = frase.match(/(f[ée]rias[^,]{0,40}|licen[çc]a[^,]{0,40}|afastad[oa][^,]{0,40}|atestado[^,]{0,30}|aviso pr[ée]vio[^,]{0,30})/i);
            if (m) return m[1].replace(/\s*\(?\s*plant[ãa]o.*$/i, '').replace(/\s*[()].*$/, '').trim();
        }
        return '';
    };

    // ---------- Conferência (v2.3.0) ----------
    // A lista-base é a planilha da SEGEST (quem deveria estar lá). Para cada pessoa:
    //   presença: folha analítica, S-5001 (eSocial) e FGTS Digital (detalhe da guia)  → item 3
    //   INSS: BASE da folha ("INSS Proc") × S-5001 (11 + 11* + 19)                     → item 4
    //         desconto da folha (rubricas "INSS…") × S-5001 (21 + 21*)                → informativo
    //   FGTS: folha (rubricas "FGTS…") × "Valor FGTS na Guia" (soma dos tomadores)      → item 5
    // Item 3 também olha a direção da folha: quem tem base de FGTS na folha e falta no FGTS Digital.
    // Diferença de até P.TOL_ARRED centavos = arredondamento (só observação).
    P.TOL_ARRED = 3; // v2.5.10: até R$ 0,03
    P.SITUACOES = ['Divergente', 'Não localizado', 'Verificar', 'Não localizado (justificado)', 'OK c/ obs', 'OK'];
    P.ordemSituacao = Object.fromEntries(P.SITUACOES.map((s, i) => [s, i]));
    P.PARTICULAS = new Set(['DE', 'DA', 'DO', 'DOS', 'DAS', 'E']);
    P.tokens = (nome) => P.nome(nome).split(' ').filter(x => x && !P.PARTICULAS.has(x));
    P.nomesCompativeisPrev = (a, b) => {
        a = String(a || ''); b = String(b || '');
        const x = P.tokens(a), y = P.tokens(b);
        if (!x.length || !y.length) return true; // ausência de nome não é conflito comprovado
        if (P.nome(a) === P.nome(b)) return true;
        const juntoA = P.nome(a).replace(/\s/g, ''), juntoB = P.nome(b).replace(/\s/g, '');
        if (juntoA === juntoB || Math.min(juntoA.length, juntoB.length) >= 12 && (juntoA.startsWith(juntoB) || juntoB.startsWith(juntoA))) return true;
        const [curto, longo] = a.length <= b.length ? [P.nome(a), P.nome(b)] : [P.nome(b), P.nome(a)];
        if (curto.length >= 12 && longo.startsWith(curto)) return true;
        const sy = new Set(y), comuns = x.filter(k => sy.has(k)).length;
        return comuns >= 2 && comuns / Math.min(x.length, y.length) >= 0.6;
    };
    P.distanciaTextoPrev = (a, b) => {
        let anterior = Array.from({ length: b.length + 1 }, (_, i) => i);
        for (let i = 1; i <= a.length; i++) {
            const atual = [i];
            for (let j = 1; j <= b.length; j++) atual[j] = Math.min(atual[j - 1] + 1, anterior[j] + 1, anterior[j - 1] + (a[i - 1] === b[j - 1] ? 0 : 1));
            anterior = atual;
        }
        return anterior[b.length];
    };
    // Usado apenas para explicar grafias sob o MESMO CPF impresso, nunca para
    // obter/trocar um CPF nem associar registros por aproximação.
    P.grafiaProximaPrev = (a, b) => {
        const x = P.tokens(a), y = P.tokens(b), ax = x.join(''), by = y.join('');
        return x.length >= 2 && y.length >= 2
            && P.distanciaTextoPrev(x[0], y[0]) <= 1
            && P.distanciaTextoPrev(x[x.length - 1], y[y.length - 1]) <= 1
            && P.distanciaTextoPrev(ax, by) / Math.max(ax.length, by.length) <= 0.2;
    };

    P.conferir = ({ segest, s5001, folha, fgts, rescisorio, cadastroEsocial, cnpjOrgao }) => {
        s5001 = P.ligarAuxiliaresPrev(s5001, folha, fgts, segest);
        const orgao = P.dig(cnpjOrgao);
        const rs = P.rs;
        const avisos = [...(segest?.avisos || []), ...(s5001?.avisos || []), ...(folha?.avisos || []), ...(fgts?.avisos || [])];
        const informacoes = [...new Set([...(fgts?.informacoes || []), ...(folha?.informacoes || [])])]; // composição da GFD e limites dos demonstrativos da folha
        const rotuloInss = s5001?.evidenciaEsocial === false ? 'relatório do INSS' : 'S-5001';
        const raizCadastro = P.dig(segest?.cnpj || folha?.cnpj || s5001?.cnpj || [...(fgts?.guias?.values() || [])][0]?.empregadorRaiz).slice(0, 8);
        const cadPorCpf = new Map();
        for (const [cpf, c] of cadastroEsocial?.trabalhadores || []) {
            if (!raizCadastro || !c.cnpj || P.dig(c.cnpj).slice(0, 8) !== raizCadastro || c.conflitoIdentificacao) {
                avisos.push(`Cadastro eSocial: ${c.nome || P.fmtCpf(cpf)} não utilizado na presença (empregador não confirmado ou identificação conflitante).`);
                continue;
            }
            cadPorCpf.set(cpf, c);
        }
        avisos.push(...(cadastroEsocial?.avisos || []));
        informacoes.push(...(cadastroEsocial?.informacoes || []));
        const rotuloPresenca = cadPorCpf.size ? 'eSocial (relatório do INSS ou cadastro contratual)' : rotuloInss;
        const linhasSeg = (segest?.linhas || []).filter(l => P.cpf(l.cpf));

        // ----- índices -----
        const porNome = new Map();
        const indexaNome = (nome, cpf) => {
            const n = P.nome(nome); if (!n || !cpf) return;
            if (!porNome.has(n)) porNome.set(n, new Set()); porNome.get(n).add(cpf);
        };
        for (const l of linhasSeg) indexaNome(l.nome, P.cpf(l.cpf));
        for (const t of s5001?.trabalhadores?.values() || []) indexaNome(t.nome, t.cpf);
        for (const t of cadPorCpf.values()) indexaNome(t.nome, t.cpf);
        for (const l of fgts?.linhas || []) indexaNome(l.nome, l.cpf);
        // nome igual; senão um nome contido no outro (folha trunca nomes; SEGEST às vezes omite
        // sobrenome), desde que aponte para um único CPF
        const cpfPorNome = (nome) => {
            const n = P.nome(nome);
            if (!n) return '';
            if (porNome.has(n)) { const cpfs = porNome.get(n); return cpfs.size === 1 ? [...cpfs][0] : ''; }
            const tn = n.split(' ');
            const achados = new Set();
            for (const [k, cpfs] of porNome) {
                const [curto, longo] = k.length < n.length ? [k, n] : [n, k];
                if (curto.length >= 12 && longo.startsWith(curto)) { for (const cpf of cpfs) achados.add(cpf); continue; }
                const tk = k.split(' ');
                const [a, b] = tk.length < tn.length ? [tk, tn] : [tn, tk];
                if (a.length >= 3 && a.every(x => b.includes(x))) for (const cpf of cpfs) achados.add(cpf);
            }
            return achados.size === 1 ? [...achados][0] : '';
        };
        const fgPorCpf = new Map();
        for (const l of fgts?.linhas || []) { if (!fgPorCpf.has(l.cpf)) fgPorCpf.set(l.cpf, []); fgPorCpf.get(l.cpf).push(l); }
        const s5PorCpf = s5001?.trabalhadores || new Map();
        const s5PorMat = new Map();
        for (const t of s5PorCpf.values()) if (t.matFolha) {
            if (!s5PorMat.has(t.matFolha)) s5PorMat.set(t.matFolha, new Set()); s5PorMat.get(t.matFolha).add(t.cpf);
        }
        // folha: não tem CPF → matrícula do S-5001 ("1/7000417" = "7000417") ou nome
        const folPorCpf = new Map(), folSemCpf = [];
        for (const c of folha?.colaboradores || []) {
            const cpfsMat = s5PorMat.get(c.mat);
            let cpf = c.cpfDireto || (cpfsMat?.size === 1 ? [...cpfsMat][0] : '') || '', como = c.cpfDireto ? 'CPF impresso' : cpf ? 'matrícula' : '';
            if (!cpf) { cpf = cpfPorNome(c.nome); como = cpf ? 'nome' : ''; }
            c.cpf = cpf; c.como = como;
            if (!cpf) { folSemCpf.push(c); continue; }
            if (folPorCpf.has(cpf)) { avisos.push(`${c.nome} aparece duas vezes na folha (matrículas ${folPorCpf.get(cpf).mat} e ${c.mat}); vale a primeira.`); continue; }
            folPorCpf.set(cpf, c);
        }
        const tomFmt = (t) => t === 'SEM' ? 'sem tomador' : (t === orgao ? 'TRT' : P.fmtCnpj(t));
        const rotuloFg = (ls) => ls.map(l => `${tomFmt(l.tomador)} R$ ${rs(l.fgts)}`).join(' + ');
        const soma = (ls, k) => ls.reduce((s, l) => s + (l[k] || 0), 0);

        // v2.3.0: quem tem este nome nos documentos (para sugerir o CPF provável quando o da SEGEST não confere)
        const docsPorNome = new Map();
        const addDoc = (nome, cpf, onde) => {
            const n = P.tokens(nome).join(' ');
            if (!n || !cpf) return;
            if (!docsPorNome.has(n)) docsPorNome.set(n, new Map());
            const m = docsPorNome.get(n);
            if (!m.has(cpf)) m.set(cpf, []);
            if (!m.get(cpf).includes(onde)) m.get(cpf).push(onde);
        };
        for (const [cpf, ls] of fgPorCpf) for (const l of ls) addDoc(l.nome, cpf, `guia do FGTS — tomador ${tomFmt(l.tomador)}${l.categoria === '111' ? ', intermitente' : ''}, R$ ${rs(l.fgts)}`);
        for (const t of s5PorCpf.values()) addDoc(t.nome, t.cpf, rotuloInss);
        for (const t of cadPorCpf.values()) addDoc(t.nome, t.cpf, 'cadastro eSocial');
        for (const c of folPorCpf.values()) addDoc(c.nome, c.cpf, 'folha');
        for (const l of linhasSeg) addDoc(l.nome, P.cpf(l.cpf), 'planilha da SEGEST');
        // v2.5.31: o CPF provável também fica disponível em separado (vai para a observação do FGTS3)
        const cpfProvavel = (nome, excluir) => {
            const alvo = P.tokens(nome);
            if (alvo.length < 2) return null;
            const achados = new Map();
            for (const [n, m] of docsPorNome) {
                const tk = n.split(' ');
                const igual = n === alvo.join(' ') || (alvo.length >= 3 && tk.length === alvo.length && alvo.every(x => tk.includes(x)));
                if (!igual) continue;
                for (const [cpf, onde] of m) if (cpf !== excluir) achados.set(cpf, [...(achados.get(cpf) || []), ...onde]);
            }
            if (achados.size !== 1) return null;
            const [cpf, onde] = [...achados][0];
            return { cpf, onde: [...new Set(onde)] };
        };
        const sugerirCpf = (nome, excluir) => {
            const a = cpfProvavel(nome, excluir);
            return a ? `"${P.titulo(nome)}" aparece nos documentos com o CPF ${P.fmtCpf(a.cpf)} (${a.onde.join('; ')}): provável CPF correto` : '';
        };

        // v2.3.1: de quem é um CPF (planilha da SEGEST ou documentos) e se dois nomes são da mesma pessoa
        const segPorCpf = new Map(linhasSeg.map(l => [P.cpf(l.cpf), l]));
        const nomeNosDocs = (cpf) => folPorCpf.get(cpf)?.nome || s5PorCpf.get(cpf)?.nome || (fgPorCpf.get(cpf) || []).find(x => x.nome)?.nome || '';
        const nomeDoCpf = (cpf) => segPorCpf.get(cpf)?.nome || nomeNosDocs(cpf);
        const parecidos = (a, b) => { const x = P.tokens(a), y = new Set(P.tokens(b)); return x.filter(k => y.has(k)).length / Math.max(1, Math.min(x.length, y.size)) >= 0.6; };
        const incons = new Map(); // CPFs citados nas ocorrências que não conferem com o nome
        const registraIncons = (titular, citado, cpfTexto, problema, sugestao) => {
            const k = `${P.dig(cpfTexto)}|${P.nome(citado)}`;
            if (!incons.has(k)) incons.set(k, { titulares: [], citado, cpf: cpfTexto, problema, sugestao });
            const it = incons.get(k); if (!it.titulares.includes(titular)) it.titulares.push(titular);
        };

        // substitutos citados nas ocorrências da SEGEST ("coberto por Fulano, CPF …")
        const citados = new Map();
        for (const l of linhasSeg) {
            for (const c of P.coberturas(l.ocorrencias)) {
                const cpf = c.cpf || cpfPorNome(c.nome);
                const chave = cpf || `NOME:${P.nome(c.nome)}`;
                if (!citados.has(chave)) citados.set(chave, { cpf, nome: P.titulo(c.nome), de: [], cpfInvalido: c.cpfTexto && !c.cpf ? c.cpfTexto : '' });
                const ci = citados.get(chave);
                if (!ci.de.some(d => d.cpf === P.cpf(l.cpf))) ci.de.push({ cpf: P.cpf(l.cpf), nome: l.nome });
            }
        }

        // folha só com verbas sem incidência (ex.: complemento de rescisão com férias indenizadas)
        const semBase = (c) => !!c && c.baseFgts !== null && c.baseFgts !== undefined && c.baseInss !== null && c.baseInss !== undefined && !c.temFgts && !c.temInss && !(c.baseFgts > 0) && !(c.baseInss > 0);

        function avaliar(p) {
            p.obs = []; p.div = []; p.verif = []; p.nao = [];
            p.identidadePendente = false;
            p.cad = cadPorCpf.get(p.cpf) || null;
            const nomeReferencia = p.seg?.nome || p.nome;
            const nomesFontes = [['folha', p.fol], [rotuloInss, p.s5], ['cadastro eSocial', p.cad], ...p.fg.map(l => ['FGTS Digital', l])];
            for (const [fonte, registro] of nomesFontes) {
                // No FGTS impresso há espaços dentro das palavras. A folha com
                // o mesmo CPF fornece o nome por extenso para essa comparação;
                // o vínculo folha × SEGEST continua sendo conferido acima.
                const referencia = fonte === 'FGTS Digital' && p.fol?.nome ? p.fol.nome : nomeReferencia;
                if (!registro?.nome || P.nomesCompativeisPrev(referencia, registro.nome)) continue;
                if (p.fol?.cpfDireto === p.cpf && P.grafiaProximaPrev(referencia, registro.nome)) {
                    p.obs.push(`grafia do nome em ${fonte}: "${registro.nome}" × "${referencia}"; mesmo CPF impresso na folha, mantido sem alteração`);
                    continue;
                }
                const mensagem = `CPF ${P.fmtCpf(p.cpf)}: nome "${registro.nome}" em ${fonte} difere de "${referencia}"${P.fontesTextoPrev([registro]) ? ` (${P.fontesTextoPrev([registro])})` : ''}; conferir identidade no original`;
                if (!p.verif.includes(mensagem)) p.verif.push(mensagem);
                p.identidadePendente = true;
            }
            const fgTRT = p.fg.filter(l => l.tomador === orgao);
            p.fgtsGuia = p.fg.length ? soma(p.fg, 'fgts') : null;
            p.fgtsFolha = p.fol?.temFgts ? p.fol.fgts : null;
            p.inssFolha = p.fol?.temInss ? p.fol.inss : null;
            p.inssS5 = p.s5 && !p.s5._semDesconto ? p.s5.d21 + p.s5.d21x : null;
            p.baseInssFolha = p.fol && p.fol.baseInss !== null && p.fol.baseInss !== undefined ? p.fol.baseInss : null;
            p.baseInssS5 = p.s5 && !p.s5._semBase ? p.s5.b11 + p.s5.b11x + p.s5.b19 : null;
            p.baseFgtsFolha = p.fol && p.fol.baseFgts !== null && p.fol.baseFgts !== undefined ? p.fol.baseFgts : null;
            p.baseFgtsGuia = p.fg.length ? soma(p.fg, 'base') : null;
            p.tomadores = [...new Set(p.fg.map(l => l.tomador))].map(tomFmt).join(', ');
            // v2.5.8: o relatório do INSS que a empresa adota vale, desde que identifique o empregado
            p.temRegistroInss = !!p.s5; p.naFolha = !!p.fol; p.noS5 = !!p.s5; p.noEsocial = !!(p.s5 || p.cad); p.noFgts = p.fg.length > 0; p.noFgtsTRT = fgTRT.length > 0;
            p.chaveInss = p.s5 ? (p.s5.chave || 'CPF') : '';
            p.semBase = semBase(p.fol);
            // bases zeradas na folha (afastamento, licença): não há INSS nem FGTS a declarar no mês
            p.zerado = !!p.fol && !p.semBase && p.fol.baseInss === 0 && p.fol.baseFgts === 0 && !(p.fol.inss > 0) && !(p.fol.fgts > 0);
            p.locais = [p.fol && 'Folha', p.s5 && (s5001?.evidenciaEsocial === false ? 'Relatório do INSS' : 'S-5001'), p.cad && 'Cadastro eSocial', p.fg.length && (fgTRT.length ? 'FGTS' : 'FGTS (outro tomador)')].filter(Boolean).join(' / ') || 'nenhum documento';
            if (!p.fol) p.nao.push('folha');
            if (!p.noEsocial && (cadPorCpf.size || s5001?.evidenciaEsocial !== false || s5PorCpf.size || s5001?.auxiliares?.length)) p.nao.push(rotuloPresenca);
            if (!p.fg.length) p.nao.push('FGTS Digital');
            const cmp = (rot, a, b, ra, rb) => {
                if (a === null || b === null) return null;
                const d = a - b;
                if (d === 0) return 0;
                if (Math.abs(d) <= P.TOL_ARRED) p.obs.push(`arredondamento ${rot} de R$ ${rs(Math.abs(d))} (${ra} ${rs(a)} × ${rb} ${rs(b)})`);
                else p.div.push(`${rot} divergente: ${ra} R$ ${rs(a)} × ${rb} R$ ${rs(b)} (diferença R$ ${rs(d)})`);
                return d;
            };
            p.difFgts = cmp('no FGTS', p.fgtsFolha, p.fgtsGuia, 'folha', 'guia');
            p.difBaseInss = cmp('na base do INSS', p.baseInssFolha, p.baseInssS5, 'folha', rotuloInss);
            p.difInss = cmp('no INSS descontado', p.inssFolha, p.inssS5, 'folha', rotuloInss);
            if (p.fol && p.fg.length && p.fgtsFolha === null) p.verif.push(`folha sem rubrica de FGTS (guia R$ ${rs(p.fgtsGuia)})`);
            if (p.fol && p.s5 && p.inssFolha === null && p.inssS5 > 0) p.verif.push(`folha sem desconto de INSS (S-5001 R$ ${rs(p.inssS5)})`);
            if (p.s5 && p.baseInssS5 === null) p.verif.push('base do INSS ausente no relatório; não tratada como zero');
            if (!p.s5 && p.baseInssFolha > 0) p.verif.push(p.cad
                ? 'cadastro do eSocial localizado; base mensal de INSS não identificada por empregado'
                : 'base mensal de INSS não identificada por empregado no relatório enviado');
            if (p.s5 && p.inssS5 === null) p.verif.push('desconto do INSS ausente no relatório; não tratado como zero');
            if (p.fol?.adaptado && (p.baseInssFolha === null || p.baseFgtsFolha === null)) p.verif.push('base de cálculo não lida na folha');
            if (p.seg) {
                const nomesMesmoCpf = [...new Set(linhasSeg.filter(l => P.cpf(l.cpf) === p.cpf).map(l => P.nome(l.nome)))];
                if (nomesMesmoCpf.length > 1) { p.verif.push('CPF repetido na SEGEST para nomes diferentes; conferir a identificação antes de concluir'); p.identidadePendente = true; }
            }
            // v2.5.19: leitura por OCR não gera "Verificar" por pessoa; os itens do checklist registram quais
            // documentos foram lidos por OCR. Divergências de valor continuam apontadas normalmente.
            // base do FGTS: só observação, para ajudar a explicar uma diferença de valor
            if (p.baseFgtsFolha !== null && p.fg.length && Math.abs(p.baseFgtsFolha - p.baseFgtsGuia) > P.TOL_ARRED) p.obs.push(`base do FGTS: folha R$ ${rs(p.baseFgtsFolha)} × guia R$ ${rs(p.baseFgtsGuia)}`);
            // v2.5.8: titular da SEGEST com FGTS só sob outro tomador: o tomador TRT não foi informado para ele
            if (p.fg.length && !fgTRT.length) (p.papel === 'titular' && p.fol ? p.verif : p.obs).push(`FGTS só com outro tomador (${rotuloFg(p.fg)}), não com o TRT`);
            else if (fgTRT.length && p.fg.length > fgTRT.length) p.obs.push(`FGTS dividido entre tomadores: ${rotuloFg(p.fg)}`);
            if (p.fg.some(l => l.categoria === '111')) p.obs.push('categoria eSocial 111 (intermitente) no FGTS');
            if (p.fol?.como === 'nome') p.obs.push('identificado(a) na folha pelo nome');
            if (p.chaveInss === 'nome') p.obs.push(`identificado(a) no ${rotuloInss} pelo nome`);
            if (p.s5?.identidadeOrigem === 'nome_arquivo') p.obs.push(`identificação pelo arquivo validada por ${p.chaveInss === 'matrícula' ? 'matrícula e nome da folha' : 'nome completo único'}: ${p.s5.arquivoIdentificacao}`);
            if (p.semBase) p.obs.push('na folha só com verbas sem incidência de FGTS e INSS (bases zeradas): nada a conferir');
            const dem = p.fol?.situacao.match(/Dem\s*iss[ãa]o:\s*(\d{2}\/\d{2}\/\d{4})/);
            p.pendenciaRescisoria = !!(p.fol?.demitido || dem) && !p.fg.length && p.fgtsFolha > 0;
            if (p.pendenciaRescisoria) {
                // v2.5.12: a guia rescisória é evidência COMPLEMENTAR, nunca entra na GFD mensal.
                // Associação somente por CPF exato, empregador e tomador TRT; guia distinta da mensal.
                const extras = (rescisorio?.linhas || []).filter(l => P.cpf(l.cpf) === p.cpf
                    && P.dig(l.tomador) === orgao
                    && l.numeroGuia && !fgts?.guias?.has(l.numeroGuia));
                const guiasExtras = [...new Set(extras.map(l => l.numeroGuia))];
                if (guiasExtras.length) {
                    p.rescisorioComplementar = guiasExtras;
                    // v2.5.14: pagamento de cada guia rescisória (comprovante vinculado ou extrato da conta FGTS)
                    p.pagamentoRescisorio = guiasExtras.map(num => P.pagamentoGuiaRescisoriaPrev(num, p, rescisorio));
                    p.rescisorioPago = p.pagamentoRescisorio.every(x => x.sim === true);
                    if (p.rescisorioPago) {
                        p.nao = p.nao.filter(doc => doc !== 'FGTS Digital');
                        p.obs.push(`FGTS do mês da rescisão recolhido em guia rescisória, fora da GFD mensal: ${p.pagamentoRescisorio.map(x => x.texto).join('; ')}`);
                    } else {
                        const situacaoPagamento = p.pagamentoRescisorio.filter(x => x.sim !== true).map(x => `guia nº ${x.num}: ${x.sim === false ? x.obsComprovante : x.motivo}`).join('; ');
                        p.verif.push(`FGTS rescisório localizado em documento complementar: guia(s) ${guiasExtras.join(', ')}; conferir rubricas rescisórias e comprovante específico. Não consta da GFD mensal; não presumir pagamento${situacaoPagamento ? ` (${situacaoPagamento})` : ''}.`);
                    }
                    const fontes = [...new Set(extras.flatMap(l => l.fontes || []).map(f => `${f.arquivo}, pág. ${f.pagina}`))];
                    if (fontes.length) p.obs.push(`Fonte da guia rescisória: ${fontes.slice(0, 4).join('; ')}`);
                } else {
                    p.verif.push(`pendência documental de FGTS rescisório: desligado(a)${dem ? ` em ${dem[1]}` : ''}; não localizado(a) na guia mensal ou nas guias rescisórias complementares lidas; conferir guia/detalhe rescisório e comprovante de pagamento`);
                }
                const fonte = P.fontesTextoPrev([p.fol]); if (fonte) p.obs.push(`Fonte do desligamento: ${fonte}`);
            }
            if (dem) p.obs.push(`desligado(a) em ${dem[1]} (folha)`);
            else if (p.fol?.ferias) p.obs.push('em férias (folha)');
        }

        // ----- planilha da SEGEST -----
        const segestPessoas = [];
        for (const l of linhasSeg) {
            const cpf = P.cpf(l.cpf);
            const p = { cpf, nome: l.nome, seg: l, fol: folPorCpf.get(cpf) || null, s5: s5PorCpf.get(cpf) || null, fg: fgPorCpf.get(cpf) || [], papel: 'titular' };
            avaliar(p);
            let motivo = P.motivoAusencia(l.ocorrencias);
            p.motivoFolha = false;
            p.afastamentoFolha = false;
            if (!motivo && p.zerado && p.nao.length && !p.nao.includes('folha')) { motivo = `bases de INSS e FGTS zeradas na folha${p.fol.situacao ? ` (${p.fol.situacao})` : ''}: nada a declarar no mês`; p.motivoFolha = true; }
            // v2.5.34: afastamento e FGTS zero explicitamente impressos justificam a
            // ausência na relação de FGTS. As bases em branco continuam pendentes no INSS.
            if (!motivo && p.fol?.afastamentoSemBasesPessoal && p.fgtsFolha === 0 && p.temRegistroInss
                && !p.identidadePendente && p.nao.length === 1 && p.nao[0] === 'FGTS Digital') {
                motivo = `${p.fol.situacao}; FGTS de R$ 0,00 impresso no demonstrativo individual (folha)`;
                p.afastamentoFolha = true;
            }
            // v2.5.8: férias ou atestado não explicam a falta no FGTS ou no INSS se a própria folha tem o valor
            const devidos = [];
            if (p.nao.includes('FGTS Digital') && p.fgtsFolha > 0 && !p.pendenciaRescisoria) devidos.push(`FGTS de R$ ${rs(p.fgtsFolha)}`);
            if (p.nao.includes(rotuloPresenca) && p.baseInssFolha > 0) devidos.push(`base de INSS de R$ ${rs(p.baseInssFolha)}`);
            p.contraFolha = devidos.length ? `a folha tem ${devidos.join(' e ')} para o mês` : '';
            p.motivo = motivo;
            for (const ci of citados.values()) {
                if (!ci.de.some(d => d.cpf === cpf)) continue;
                const achou = ci.cpf && (fgPorCpf.has(ci.cpf) || folPorCpf.has(ci.cpf));
                const dono = ci.cpf ? nomeNosDocs(ci.cpf) : '';
                const quem = `${P.titulo(P.curto(ci.nome))}${ci.cpf ? ` (${P.fmtCpf(ci.cpf)})` : ''}`;
                if (ci.cpf && segPorCpf.has(ci.cpf)) p.obs.push(`coberto(a) por ${quem}, titular na planilha da SEGEST`);
                else if (dono && !parecidos(ci.nome, dono)) p.obs.push(`coberto(a) por ${quem}: nos documentos esse CPF é de "${P.titulo(dono)}" — ver "Fora da SEGEST"`);
                else p.obs.push(`coberto(a) por ${quem}: ${achou ? 'localizado(a) nos documentos' : 'NÃO localizado(a) nos documentos'} — ver "Fora da SEGEST"`);
            }
            // v2.3.1: CPFs citados na ocorrência (coberturas, permutas etc.) conferem com o nome?
            const cpfsCob = new Set(P.coberturas(l.ocorrencias).map(c => c.cpf).filter(Boolean));
            for (const c of P.citacoesCpf(l.ocorrencias)) {
                if (c.cpf === cpf) continue; // o próprio titular
                const dono = c.cpf ? nomeDoCpf(c.cpf) : '';
                if (c.cpf && dono && parecidos(c.nome, dono)) continue;
                if (c.cpf && !dono && cpfsCob.has(c.cpf) && (fgPorCpf.has(c.cpf) || s5PorCpf.has(c.cpf))) continue;
                const sug = sugerirCpf(c.nome, c.cpf);
                const problema = !c.cpf ? `"${c.nome}" citado(a) com CPF inválido (${c.cpfTexto})`
                    : dono ? `"${c.nome}" citado(a) com o CPF ${P.fmtCpf(c.cpf)}, que é de "${P.titulo(dono)}"`
                    : `"${c.nome}" citado(a) com o CPF ${P.fmtCpf(c.cpf)}, que não aparece na planilha nem nos documentos`;
                registraIncons(l.nome, c.nome, c.cpf ? P.fmtCpf(c.cpf) : c.cpfTexto, problema, sug);
                if (!cpfsCob.has(c.cpf)) p.obs.push(`ocorrência da SEGEST: ${problema}${sug ? `; ${sug}` : ''}`); // as coberturas já aparecem acima e em "Fora da SEGEST"
            }
            if (p.nao.length === 3) { const prov = cpfProvavel(l.nome, cpf); if (prov) { p.obs.push(sugerirCpf(l.nome, cpf)); p.cpfProvavel = prov.cpf; } }
            // v2.5.31: CPF da SEGEST com dígito verificador errado não identifica ninguém nos documentos
            if (cpf && !P.cpfValidoPrev(cpf)) { p.cpfSegestInvalido = true; p.verif.push(`CPF informado na SEGEST (${P.fmtCpf(cpf)}) é inválido (dígito verificador)`); }
            p.situacao = p.div.length ? 'Divergente'
                : p.nao.length ? (motivo && !p.pendenciaRescisoria && !p.contraFolha ? 'Não localizado (justificado)' : 'Não localizado')
                : p.verif.length ? 'Verificar' : p.obs.length ? 'OK c/ obs' : 'OK';
            // v2.5.13: a pessoa não consta da GFD mensal, mas pode constar de guia rescisória complementar.
            // Mantém a pendência até comprovar o recolhimento; não confunde ausência na GFD mensal com ausência de toda guia.
            const faltaDescrita = p.nao.map(doc => doc === 'FGTS Digital' && p.rescisorioComplementar?.length ? 'GFD mensal (guia rescisória complementar localizada)' : doc);
            p.texto = [...p.div,
                p.nao.length ? `Não localizado em: ${faltaDescrita.join(', ')}${motivo ? ` — ${motivo}${p.motivoFolha || p.afastamentoFolha ? '' : ' (SEGEST)'}` : ''}${p.contraFolha ? `, mas ${p.contraFolha}` : ''}` : '',
                ...p.verif.map(v => `Verificar: ${v}`), ...p.obs].filter(Boolean).join('; ');
            segestPessoas.push(p);
        }

        // ----- fora da SEGEST: folha, S-5001 e FGTS com tomador TRT, mais os substitutos citados -----
        const cpfsSeg = new Set(segestPessoas.map(p => p.cpf));
        const foraChaves = new Set();
        for (const cpf of folPorCpf.keys()) if (!cpfsSeg.has(cpf)) foraChaves.add(cpf);
        for (const cpf of s5PorCpf.keys()) if (!cpfsSeg.has(cpf)) foraChaves.add(cpf);
        for (const [cpf, ls] of fgPorCpf) if (!cpfsSeg.has(cpf) && ls.some(l => l.tomador === orgao)) foraChaves.add(cpf);
        for (const [k, ci] of citados) if (!cpfsSeg.has(ci.cpf)) foraChaves.add(k);
        const fora = [];
        const fazFora = (chave, folSem) => {
            const cpf = /^\d{11}$/.test(chave) ? chave : '';
            const ci = citados.get(chave) || (folSem ? [...citados.values()].find(c => !c.cpf && P.nome(c.nome) === P.nome(folSem.nome)) : null);
            const fol = folSem || (cpf ? folPorCpf.get(cpf) : null) || null;
            const p = { cpf, nome: fol?.nome || s5PorCpf.get(cpf)?.nome || fgPorCpf.get(cpf)?.[0]?.nome || ci?.nome || '', seg: null, fol, s5: cpf ? s5PorCpf.get(cpf) || null : null, fg: cpf ? fgPorCpf.get(cpf) || [] : [], papel: 'fora' };
            avaliar(p);
            p.vinculo = ci ? `Cobertura citada na SEGEST (cobriu ${ci.de.map(d => P.titulo(P.curto(d.nome))).join(', ')})`
                : /FERISTA/i.test(fol?.ccusto || '') ? 'Ferista (centro de custo da folha)' : 'Sem vínculo identificado';
            if (ci?.cpfInvalido) p.verif.push(`CPF informado na SEGEST (${ci.cpfInvalido}) é inválido`);
            // o CPF citado na SEGEST é de quem tem esse nome nos documentos?
            if (ci && cpf && p.nome) {
                const a = P.tokens(ci.nome), b = new Set(P.tokens(p.nome));
                const comuns = a.filter(x => b.has(x)).length / Math.max(1, Math.min(a.length, b.size));
                if (comuns < 0.6) {
                    p.verif.push(`na SEGEST o CPF ${P.fmtCpf(cpf)} está como "${ci.nome}", mas nos documentos esse CPF é de "${P.titulo(p.nome)}"`);
                    const sug = sugerirCpf(ci.nome, cpf); if (sug) p.verif.push(sug);
                } else if (P.nome(ci.nome) !== P.nome(p.nome)) p.obs.push(`nome na SEGEST: ${ci.nome}`);
            }
            if (ci && !cpf) { const sug = sugerirCpf(ci.nome, ''); if (sug) p.obs.push(sug); }
            if (!p.fol && (p.s5 || p.fg.length)) p.obs.push('não está na folha analítica (INSS e FGTS da folha não conferidos)');
            if (!cpf) {
                if (p.semBase) p.obs.push(`CPF não identificado (matrícula fora do ${rotuloInss} e nome fora dos outros documentos)`);
                else p.verif.push(`CPF não identificado (matrícula fora do ${rotuloInss} e nome não encontrado nos outros documentos)`);
            }
            let nenhum = !p.fol && !p.s5 && !p.cad && !p.fg.length;
            // v2.3.1: CPF citado que não existe nos documentos, mas o nome existe com outro CPF (erro de digitação na SEGEST)
            if (nenhum && ci && cpf) { const sug = sugerirCpf(ci.nome, cpf); if (sug) { p.verif.push(`o CPF citado na SEGEST não aparece em nenhum documento; ${sug}`); nenhum = false; } }
            if (p.vinculo.startsWith('Sem vínculo') && fgPorCpf.get(cpf)?.some(l => l.tomador === orgao)) p.verif.push('no FGTS com o tomador TRT, mas fora da planilha da SEGEST');
            else if (p.vinculo.startsWith('Sem vínculo') && p.s5) p.verif.push(`no ${rotuloInss} com o TRT, mas fora da planilha da SEGEST`);
            else if (p.vinculo.startsWith('Sem vínculo') && !p.semBase && !(p.obs.some(o => /desligado/.test(o)) && !p.fg.length)) p.verif.push('na folha, sem vínculo com a planilha da SEGEST');
            if (ci && !nenhum && !p.semBase) {
                if (!p.fol) p.verif.push('cobertura citada na SEGEST sem folha analítica: bases e descontos não conferidos');
                if (!p.noEsocial) p.verif.push('cobertura citada na SEGEST sem relatório identificado do INSS ou cadastro eSocial nos documentos enviados');
                if (!p.noFgtsTRT) p.verif.push(p.noFgts
                    ? 'cobertura com FGTS somente sob outro tomador; vínculo com o TRT não comprovado no FGTS enviado'
                    : 'cobertura citada na SEGEST sem registro de FGTS no tomador TRT');
            }
            p.situacao = p.div.length ? 'Divergente' : nenhum ? 'Não localizado' : p.verif.length ? 'Verificar' : p.obs.length || p.vinculo ? 'OK c/ obs' : 'OK';
            p.texto = [...p.div, nenhum ? 'não localizado(a) em nenhum documento' : '', ...p.verif.map(v => `Verificar: ${v}`), ...p.obs].filter(Boolean).join('; ');
            fora.push(p);
        };
        for (const k of foraChaves) fazFora(k);
        for (const c of folSemCpf) fazFora(`FOLHA:${c.mat}`, c);

        // ----- direção da folha (item 3): base de FGTS na folha e ausência no FGTS Digital / S-5001 -----
        const folhaTodos = folha?.colaboradores || [];
        const temBaseFgts = (c) => (c.baseFgts || 0) > 0 || (c.temFgts && c.fgts > 0);
        const temBaseInss = (c) => (c.baseInss || 0) > 0 || (c.temInss && c.inss > 0);
        // v2.5.14: quem tem o FGTS do mês recolhido em guia rescisória com pagamento comprovado não é pendência
        const cpfsRescisorioPago = new Set([...segestPessoas, ...fora].filter(p => p.rescisorioPago && p.cpf).map(p => p.cpf));
        const folhaSemFgts = folhaTodos.filter(c => temBaseFgts(c) && !(c.cpf && fgPorCpf.has(c.cpf)) && !(c.cpf && cpfsRescisorioPago.has(c.cpf)));
        const folhaSemS5 = folhaTodos.filter(c => temBaseInss(c) && !(c.cpf && s5PorCpf.has(c.cpf)));
        const folhaNoFgts = folhaTodos.filter(c => c.cpf && fgPorCpf.has(c.cpf)).length;
        const folhaNoS5 = folhaTodos.filter(c => c.cpf && s5PorCpf.has(c.cpf)).length;
        const folhaNoEsocial = folhaTodos.filter(c => c.cpf && (s5PorCpf.has(c.cpf) || cadPorCpf.has(c.cpf))).length;
        const folhaSemBase = folhaTodos.filter(semBase);

        // ----- checklist -----
        // obs: texto curto que vai para a aba do mês; evid: o detalhe, que vai para a memória da conferência
        const ck = {};
        const marca = (k, ok, obs, evid) => { ck[k] = { sim: ok === true ? 'SIM' : ok === false ? 'NAO' : '', obs: obs || '', evid: evid || obs || '' }; };
        const guias = [...(fgts?.guias?.values() || [])];
        const g0 = guias[0];
        const raizSeg = P.dig(segest?.cnpj).slice(0, 8) || String(s5001?.lotacao || '').slice(0, 8);
        const nomeCk = (p) => P.titulo(p.nome);
        const lista = (ps, max = 8) => ps.slice(0, max).map(nomeCk).join(', ') + (ps.length > max ? ` e mais ${ps.length - max}` : '');
        // v2.5.31: não localizado por CPF errado na planilha da SEGEST — a observação diz qual CPF consta dos documentos
        const notaCpfSegest = (p) => {
            const cpfSeg = `CPF ${P.fmtCpf(p.cpf)} da planilha da SEGEST`;
            if (p.cpfProvavel) return ` — ${cpfSeg} ${p.cpfSegestInvalido ? 'é inválido' : 'não consta dos documentos'}; nos documentos consta o CPF ${P.fmtCpf(p.cpfProvavel)}: provável erro na planilha`;
            return p.cpfSegestInvalido ? ` — ${cpfSeg} é inválido` : '';
        };
        const qTRT = new Set((fgts?.linhas || []).filter(l => l.tomador === orgao).map(l => l.cpf)).size;
        const resumoInssTRT = s5001?.totaisServicosInss?.find(t => t.cnpj === orgao);
        const qtdInssTexto = resumoInssTRT
            ? (() => {
                const doTRT = t => P.cnpjServicoBasesInssPrev(t.servico) === orgao;
                const lidos = s5001.auxiliares.filter(doTRT).length;
                const vinculados = [...s5PorCpf.values()].filter(doTRT).length;
                return `${resumoInssTRT.declarados} declarados no ${rotuloInss} do TRT (${lidos} linhas lidas, ${vinculados} vinculadas por CPF)`;
            })()
            : `${s5PorCpf.size} no ${rotuloInss}`;
        const resumoQtd = `${segestPessoas.length} pessoas na SEGEST, ${folhaTodos.length} na folha, ${qtdInssTexto}${cadPorCpf.size ? `, ${cadPorCpf.size} no cadastro do eSocial (sem valores mensais)` : ''}, ${qTRT} no FGTS com tomador TRT`;
        const competencia = segest?.competencia || folha?.competencia || s5001?.competencia || (g0 && [...g0.competencias][0]) || '';
        const ano = String(competencia).slice(0, 4);
        if (fgts) {
            const raizOk = g0 && raizSeg ? g0.empregadorRaiz.slice(0, 8) === raizSeg : null;
            const nomeGfd = (fgts.gfds || []).find(g => g.empregadorNome && g.empregadorRaiz && g0 && P.dig(g.empregadorRaiz).slice(0, 8) === P.dig(g0.empregadorRaiz).slice(0, 8))?.empregadorNome;
            const nomeEmp = nomeGfd && P.nome(nomeGfd).replace(/\s/g, '') === P.nome(g0?.empregadorNome).replace(/\s/g, '') ? nomeGfd : g0?.empregadorNome;
            const t1 = g0 ? `Empregador ${P.fmtRaiz(g0.empregadorRaiz)} - ${nomeEmp}${raizOk === false ? ` (CNPJ da SEGEST: ${P.fmtCnpj(P.dig(segest?.cnpj))})` : ''}.` : 'Detalhe da guia não localizado.';
            marca('FGTS1', raizOk, t1, g0 ? `${t1} Guia nº ${g0.numero}, ${g0.qtd} trabalhadores, total R$ ${rs(g0.total)}.` : t1);
            const tTRT = fgts.tomadores.get(orgao);
            marca('FGTS2', qTRT > 0, qTRT ? `Tomador ${P.fmtCnpj(orgao)} (TRT): ${qTRT} trabalhadores.` : `Nenhum trabalhador com o tomador ${P.fmtCnpj(orgao)}.`,
                qTRT ? `Tomador ${P.fmtCnpj(orgao)} (TRT): ${qTRT} trabalhadores${tTRT ? `, base R$ ${rs(tTRT.base)}, FGTS R$ ${rs(tTRT.fgts)}` : ''}.` : '');
        }
        const naoLoc = segestPessoas.filter(p => p.situacao === 'Não localizado');
        const justif = segestPessoas.filter(p => p.situacao === 'Não localizado (justificado)');
        const origemJustificativas = justif.some(p => p.afastamentoFolha || p.motivoFolha) ? 'na SEGEST ou na folha' : 'na SEGEST';
        const emTodos = segestPessoas.filter(p => p.naFolha && p.noEsocial && (p.noFgts || p.rescisorioPago) && !p.nao.length && !p.rescisorioPago);
        const foraCob = fora.filter(p => p.vinculo.startsWith('Cobertura')).length, foraFer = fora.filter(p => p.vinculo.startsWith('Ferista')).length;
        const foraSem = fora.filter(p => p.vinculo.startsWith('Sem vínculo'));
        const motivoCurto = (p) => (p.motivo.match(/f[ée]rias|licen[çc]a|afastad[oa]|atestado|aviso pr[ée]vio/i)?.[0] || 'justificado').toLowerCase();
        const porMotivo = (ps) => { const g = {}; for (const p of ps) (g[motivoCurto(p)] = g[motivoCurto(p)] || []).push(p); return Object.entries(g).map(([m, l]) => `${l.length} ${m}`).join(', '); };
        // v2.5.13: mesmos textos de situação rescisória na cópia TSV, tela e memórias.
        // Uma guia complementar sem comprovante próprio NÃO torna o FGTS3 regular.
        const rescisoriosPagos = segestPessoas.filter(p => p.rescisorioPago);
        const rescisoriosComGuia = segestPessoas.filter(p => p.pendenciaRescisoria && p.rescisorioComplementar?.length && !p.rescisorioPago);
        const rescisoriosSemGuia = segestPessoas.filter(p => p.pendenciaRescisoria && !p.rescisorioComplementar?.length);
        const naoLocSemGuia = naoLoc.filter(p => !p.rescisorioComplementar?.length);
        const folhaSemFgtsSemGuia = folhaSemFgts.filter(p => !rescisoriosComGuia.some(r => r.cpf === p.cpf));
        const rescisorioResumo = rescisoriosComGuia.map(p => `${nomeCk(p)}: guia rescisória complementar nº ${p.rescisorioComplementar.join(', ')} localizada; não consta da GFD mensal; pagamento não comprovado nos arquivos lidos`).join('; ');
        const desligadoEm = (p) => p.fol?.situacao?.match(/Dem\s*iss[ãa]o:\s*(\d{2}\/\d{2}\/\d{4})/)?.[1] || '';
        const rescisorioPagoResumo = rescisoriosPagos.map(p => `${nomeCk(p)}${desligadoEm(p) ? ` (desligado(a) em ${desligadoEm(p)})` : ''}: FGTS rescisório recolhido na ${p.pagamentoRescisorio.map(x => x.texto).join('; ')}`).join('; ');
        marca('FGTS3', naoLoc.length === 0 && folhaSemFgts.length === 0,
            `Conferidos os ${segestPessoas.length} terceirizados da planilha da SEGEST; a amostra do mês está registrada na tabela "Amostragem ${ano}". ${emTodos.length} constam da folha, do ${rotuloPresenca} e do FGTS Digital`
            + (justif.length ? `; ${justif.length} ausência(s) justificada(s) ${origemJustificativas} (${porMotivo(justif)})` : '')
            + (naoLocSemGuia.length ? `; não localizado(s) sem guia complementar: ${naoLocSemGuia.map(p => `${nomeCk(p)} (${p.nao.join(', ')}${notaCpfSegest(p)})`).join('; ')}` : '')
            + (folhaSemFgtsSemGuia.length ? `; na folha com FGTS e fora do FGTS Digital, sem guia complementar: ${lista(folhaSemFgtsSemGuia, 5)}` : '')
            + (rescisorioPagoResumo ? `; ${rescisorioPagoResumo}` : '')
            + (rescisorioResumo ? `; ${rescisorioResumo}` : '')
            + (rescisoriosSemGuia.length ? `; sem guia rescisória localizada: ${lista(rescisoriosSemGuia, 5)} — exigir guia, detalhe e comprovante` : '') + '.',
            `Lista-base: planilha da SEGEST (${segestPessoas.length} pessoas). ${resumoQtd}. `
            + `${emTodos.length} pessoas da SEGEST constam dos três documentos lidos (folha, ${rotuloPresenca} e FGTS Digital).`
            + (justif.length ? ` Ausências justificadas ${origemJustificativas}: ${justif.map(p => `${nomeCk(p)} (falta em: ${p.nao.join(', ')}; ${p.motivo})`).join('; ')}.` : '')
            + (naoLoc.length ? ` Não localizados na GFD mensal ou outro documento necessário: ${naoLoc.map(p => `${nomeCk(p)} (${p.nao.join(', ')}${notaCpfSegest(p)}${p.rescisorioComplementar?.length ? `; guia rescisória complementar nº ${p.rescisorioComplementar.join(', ')} localizada, pagamento ainda não comprovado` : ''})`).join('; ')}.` : '')
            + (rescisorioPagoResumo ? ` FGTS rescisório comprovado: ${rescisorioPagoResumo}.` : '')
            + (rescisorioResumo ? ` Evidência rescisória: ${rescisorioResumo}.` : '')
            + ` Direção da folha: ${folhaTodos.length} colaboradores, ${folhaNoFgts} localizados no FGTS Digital e ${folhaNoEsocial} no ${rotuloPresenca}.`
            + (folhaSemFgtsSemGuia.length ? ` Com base de FGTS na folha e sem guia complementar localizada: ${lista(folhaSemFgtsSemGuia)}.` : rescisoriosComGuia.length ? ' Os demais trabalhadores com base de FGTS na folha foram localizados na GFD mensal; há guia rescisória complementar com pagamento pendente.' : (rescisoriosPagos.length ? ' Os demais com base de FGTS na folha estão na GFD mensal; o FGTS do mês da rescisão foi recolhido em guia rescisória com pagamento comprovado.' : ' Todos os que têm base de FGTS na folha estão no FGTS Digital.'))
            + (folhaSemS5.length ? ` Sem valores de INSS identificados por empregado (cadastro não substitui a base mensal): ${folhaSemS5.length} — ${lista(folhaSemS5)}.` : '')
            + (folhaSemBase.length ? ` Só com verbas sem incidência de FGTS/INSS: ${lista(folhaSemBase)}.` : '')
            + (fora.length ? ` Fora da SEGEST: ${fora.length} (${foraCob} coberturas citadas, ${foraFer} feristas, ${foraSem.length} sem vínculo${foraSem.length ? `: ${lista(foraSem, 6)}` : ''}).` : ''));
        const coberturasPendentes = fora.filter(p => p.vinculo.startsWith('Cobertura') && ['Verificar', 'Não localizado', 'Divergente'].includes(p.situacao));
        if (coberturasPendentes.length) {
            const alertaCob = `Coberturas com pendência documental: ${lista(coberturasPendentes)} — conferir "Fora da SEGEST".`;
            ck.FGTS3.obs += ` ${alertaCob}`; ck.FGTS3.evid += ` ${alertaCob}`;
            avisos.push(alertaCob);
        }
        const contaCmp = (k) => {
            const com = segestPessoas.filter(p => p[k] !== null && p[k] !== undefined);
            return { n: com.length, div: com.filter(p => Math.abs(p[k]) > P.TOL_ARRED), arr: com.filter(p => p[k] !== 0 && Math.abs(p[k]) <= P.TOL_ARRED) };
        };
        const cb = contaCmp('difBaseInss'), ci = contaCmp('difInss'), cf = contaCmp('difFgts');
        const curto = (c, rot, gen = 'o') => `${rot} conferid${gen} para ${c.n} terceirizados: ${c.div.length ? `divergência em ${lista(c.div, 5)}` : 'sem divergência'}${c.arr.length ? ` (${c.arr.length} com diferença de até R$ ${rs(P.TOL_ARRED)})` : ''}.`;
        const longo = (c, rot) => `${rot}: ${c.n} conferidos, ${c.div.length} divergência(s)${c.div.length ? ` (${lista(c.div)})` : ''}${c.arr.length ? `, ${c.arr.length} com diferença de arredondamento (${lista(c.arr)})` : ''}.`;
        marca('FGTS4', folha && s5001 ? cb.div.length === 0 : null,
            folha && s5001 ? curto(cb, `Base de cálculo do INSS (folha × ${rotuloInss})`, 'a') + (ci.div.length ? ` Atenção: INSS descontado divergente em ${lista(ci.div, 5)}.` : '') : 'Folha ou S-5001 não juntado.',
            folha && s5001 ? `${longo(cb, `Base de cálculo do INSS por trabalhador da SEGEST: folha × ${rotuloInss}`)} ${longo(ci, `INSS descontado: folha (rubricas INSS) × ${rotuloInss}`)}` : '');
        marca('FGTS5', folha && fgts ? cf.div.length === 0 : null,
            folha && fgts ? curto(cf, 'FGTS (folha × FGTS Digital)') : 'Folha ou FGTS Digital não juntado.',
            folha && fgts ? longo(cf, 'FGTS por trabalhador da SEGEST: folha (rubricas FGTS) × "Valor FGTS na Guia" (soma de todos os tomadores)') : '');
        const conciliacoes = [];
        const conc = (documento, descricao, lido, informado, tipo = 'R$') => conciliacoes.push({ documento, descricao, lido, informado, tipo, ok: lido === informado });
        if (folha?.totalImpresso) {
            if (folha.colaboradoresOcr > 0 && !folha.totalImpressoOcr) {
                conc('Folha analítica', 'Colaboradores do trecho com texto × subtotal impresso nesse trecho', folha.colaboradoresTexto, folha.totalImpressoTexto, 'qtd');
                informacoes.push(`Folha: ${folha.colaboradoresTexto} colaboradores no trecho com texto e ${folha.colaboradoresOcr} adicionais recuperados por OCR. O subtotal impresso do trecho com texto não foi comparado ao total combinado.`);
            } else conc('Folha analítica', 'Colaboradores lidos × "Total de Colaboradores" impresso', folhaTodos.length, folha.totalImpresso + (folha.totalImpressoOcr || 0), 'qtd');
        }
        if (s5001) {
            if (s5001.totais['11'] !== undefined) conc('S-5001', 'Base de cálculo (11 + 11*) × TOTAIS do relatório', s5001.soma['11'], s5001.totais['11']);
            if (s5001.totais['19'] !== undefined) conc('S-5001', 'Base exclusiva do empregado (19) × TOTAIS do relatório', s5001.soma['19'], s5001.totais['19']);
            if (s5001.totais['21'] !== undefined) conc('S-5001', 'INSS descontado (21 + 21*) × TOTAIS do relatório', s5001.soma['21'], s5001.totais['21']);
        }
        if (fgts && g0) {
            const linhasG = fgts.linhas.filter(l => l.guia === g0.numero);
            const tTRT = fgts.tomadores.get(orgao);
            const qtdLida = new Set(linhasG.map(l => l.cpf)).size;
            const totalTRTLido = soma(linhasG.filter(l => l.tomador === orgao), 'fgts');
            const trechoTRT = tTRT && totalTRTLido === tTRT.fgts
                && ((g0.qtd > 0 && qtdLida < g0.qtd) || soma(linhasG, 'fgts') !== g0.total);
            if (trechoTRT) {
                informacoes.push(`Escopo do FGTS: o trecho contém ${qtdLida} trabalhadores lidos; a guia global informa ${g0.qtd || 'quantidade não legível'} e R$ ${rs(g0.total)} para toda a empresa. O tomador TRT foi conciliado separadamente em R$ ${rs(totalTRTLido)}. Totais de escopos diferentes não foram classificados como divergência.`);
            } else {
                if (g0.qtd > 0) conc('FGTS Digital', 'Trabalhadores lidos × "Qtd. Trabalhadores FGTS"', qtdLida, g0.qtd, 'qtd');
                if (g0.total !== null) conc('FGTS Digital', 'Soma do "Valor FGTS na Guia" × principal do FGTS no detalhe', soma(linhasG, 'fgts'), g0.principalFgts ?? g0.total);
            }
            if (tTRT) conc('FGTS Digital', 'Soma das linhas do tomador TRT × "Total do Tomador"', totalTRTLido, tTRT.fgts);
        }
        if (fgts) {
            const gfds = fgts.gfds || [];
            const correspondentes = g0 ? gfds.filter(g => P.dig(g.identificador) === P.dig(g0.numero)) : [];
            const gfd = correspondentes.length === 1 ? correspondentes[0] : gfds.length === 1 ? gfds[0] : null;
            const guiaDetalhe = gfd ? guias.find(g => P.dig(g.numero) === P.dig(gfd.identificador)) : null;
            marca('GFD1', gfd ? (gfd.empregadorRaiz && raizSeg ? gfd.empregadorRaiz === raizSeg : null) : null, gfd ? `GFD ${gfd.identificador}: ${gfd.empregadorNome} (${P.fmtRaiz(gfd.empregadorRaiz)}).` : gfds.length > 1 ? 'A verificar: várias GFDs sem identificação única da guia correspondente.' : (guias.length && fgts.comprovantes.length ? 'A verificar: detalhe da guia e comprovante identificados, mas o documento GFD não foi reconhecido separadamente; conferir a GFD original.' : 'GFD não localizada no PDF.'));
            const comps = new Set([gfd?.competencia, ...guias.flatMap(g => [...g.competencias]), s5001?.competencia, folha?.competencia, segest?.competencia].filter(Boolean));
            marca('GFD2', gfd && comps.size ? comps.size === 1 : null, `Competência ${[...comps].map(P.compTexto).join(' / ') || '?'}${comps.size > 1 ? ' — competências diferentes entre os documentos' : ''}.`,
                `Competência ${[...comps].map(P.compTexto).join(' / ') || '?'} em SEGEST, folha, ${rotuloInss}, detalhe da guia e GFD${comps.size > 1 ? ' — há competências diferentes entre os documentos' : ''}.`);
            const estab = [...fgts.estabelecimentos.values()].filter(e => guiaDetalhe && P.dig(e.guia) === P.dig(guiaDetalhe.numero));
            const totEstab = estab.length && estab.every(e => Number.isFinite(e.fgts)) ? estab.reduce((s, e) => s + e.fgts, 0) : null;
            const valorFgtsGfd = gfd?.valorFgts ?? (guiaDetalhe?.temConsignado ? null : gfd?.valor) ?? null;
            const totalGeral = guiaDetalhe?.totalFgts ?? guiaDetalhe?.total ?? null;
            const confereCom = totalGeral ?? totEstab;
            const origemTotal = totalGeral !== null ? 'total geral do FGTS no detalhe' : 'soma dos estabelecimentos identificados no detalhe';
            const numeroDiferente = !!gfd && !!g0 && !guiaDetalhe;
            const totalDocumento = guiaDetalhe?.totalDocumento ?? (guiaDetalhe?.temConsignado ? null : guiaDetalhe?.total) ?? null;
            const composicaoLida = gfd?.valorConsignado !== undefined && gfd?.valorConsignado !== null && valorFgtsGfd !== null && Number.isFinite(gfd?.valor);
            const composicaoOk = !composicaoLida || valorFgtsGfd + gfd.valorConsignado === gfd.valor;
            const pagamentoOk = totalDocumento === null || !Number.isFinite(gfd?.valor) || totalDocumento === gfd.valor;
            const gfd3 = numeroDiferente ? null : !composicaoOk || !pagamentoOk ? false
                : gfd && Number.isFinite(valorFgtsGfd) && Number.isFinite(confereCom) ? valorFgtsGfd === confereCom : null;
            marca('GFD3', gfd3, gfd ? `FGTS da GFD R$ ${rs(valorFgtsGfd)}; ${origemTotal} R$ ${rs(confereCom)}`
                + `${gfd.valorConsignado !== undefined ? `; consignado R$ ${rs(gfd.valorConsignado)}; pagamento total R$ ${rs(gfd.valor)}` : ''}`
                + `${estab.length ? `; soma de ${estab.length} estabelecimento(s) R$ ${rs(totEstab)}` : ''}`
                + `${numeroDiferente ? '; a verificar: identificador da GFD não corresponde ao número da guia no detalhe' : ''}`
                + `${!composicaoOk ? '; FGTS + consignado não fecha com o total a pagar' : ''}${!pagamentoOk ? '; total a pagar diferente do total do documento no detalhe' : ''}`
                + `${gfd3 === null && !numeroDiferente ? '; a verificar: total exclusivo do FGTS ou detalhe correspondente não identificado' : ''}.` : 'A verificar: GFD não identificada ou sem vínculo único com o detalhe; não presumir regularidade apenas pelo valor.');
            if (gfd && Number.isFinite(valorFgtsGfd) && Number.isFinite(confereCom)) conc('GFD', `FGTS da GFD × ${origemTotal}`, valorFgtsGfd, confereCom);
            if (totalGeral !== null && totEstab !== null) {
                if (totEstab === totalGeral) conc('FGTS Digital', 'Soma dos estabelecimentos identificados × total geral do FGTS', totEstab, totalGeral);
                else informacoes.push(`Estabelecimentos identificados no trecho: R$ ${rs(totEstab)}; total geral do FGTS: R$ ${rs(totalGeral)}. A soma parcial não substitui o total geral da guia.`);
            }
            if (composicaoLida) conc('GFD', 'FGTS + consignado × total a pagar da GFD', valorFgtsGfd + gfd.valorConsignado, gfd.valor);
            if (gfd && totalDocumento !== null && Number.isFinite(gfd.valor)) conc('GFD', 'Total a pagar da GFD × total do documento no detalhe', gfd.valor, totalDocumento);
            const pagamento = P.vincularPagamentoPrev(gfd, fgts.comprovantes);
            if (!fgts.comprovantes.length && fgts.comprovantesSemValor?.length) pagamento.obs = 'A verificar: página de comprovante reconhecida, mas valor pago não identificado. Conferir o documento original.';
            marca('GFD4', pagamento.sim, pagamento.obs);
            if (pagamento.cp && gfd && Number.isFinite(gfd.valor)) conc('Comprovante', 'Valor pago × total a pagar da GFD (FGTS + consignado, quando houver)', pagamento.cp.valor, gfd.valor);
            const fontesGfd = P.fontesTextoPrev([gfd, guiaDetalhe, ...estab]);
            for (const k of ['GFD1', 'GFD2', 'GFD3']) if (fontesGfd) ck[k].evid += ` Fontes: ${fontesGfd}.`;
            const fontesCp = P.fontesTextoPrev([gfd, pagamento.cp]);
            if (fontesCp) ck.GFD4.evid += ` Fontes: ${fontesCp}.`;

        }
        // A ausência de dados não pode produzir "SIM" só porque não houve comparação.
        const pendencia = (k, motivo) => marca(k, null, motivo, `${motivo} ${ck[k]?.evid || ''}`);
        // v2.5.8: vale o relatório do INSS que a empresa adota (S-5001 ou relatório da folha), desde que
        // identifique o empregado (CPF, matrícula ou nome). Só fica pendente sem documento ou sem identificação.
        const esocialIncompleto = !s5PorCpf.size && !cadPorCpf.size;
        const inssIncompleto = !s5001 || !s5PorCpf.size;
        const inssNaoJuntado = !s5001 || s5001.layout === 'S-5001 não juntado' || (!s5PorCpf.size && !(s5001.auxiliares || []).length && !(s5001.semIdentificacao || []).length && !Object.keys(s5001.totais || {}).length);
        const compIncompativel = [folha?.competencia, s5001?.competencia, ...(s5001?.competenciasFontes || []), ...guias.flatMap(g => [...g.competencias])].filter(Boolean).some(c => competencia && c !== competencia);
        const empresaDiferente = [folha?.cnpj, s5001?.cnpj, ...(s5001?.cnpjsFontes || []), ...guias.map(g => g.empregadorRaiz)].filter(Boolean).some(c => raizSeg && c.slice(0, 8) !== raizSeg);
        const motivoInss = cadPorCpf.size
            ? `Pendente: o cadastro do eSocial identifica os empregados, mas não informa a base mensal de INSS. ${s5001?.semIdentificacao?.length ? `${s5001.semIdentificacao.length} página(s) do S-5001 sem identificação individual; ` : ''}juntar relatório de INSS da competência com base de cálculo e nome, CPF ou matrícula. Não houve associação por ordem ou por valores.`
            : inssNaoJuntado
                ? 'Pendente: relatório do INSS por empregado não juntado (S-5001 ou relatório da folha com nome, CPF ou matrícula).'
                : `Pendente: o documento do INSS enviado (${s5001.layout || 'relatório'}) não identifica os empregados; pedir o S-5001 ou relatório da folha com nome, CPF ou matrícula de cada um.`;
        if (esocialIncompleto) {
            // Uma ausência de leitura do INSS não apaga uma falta de FGTS já comprovada.
            if (ck.FGTS3?.sim === 'NAO') { ck.FGTS3.obs += ` ${motivoInss}`; ck.FGTS3.evid += ` ${motivoInss}`; }
            else pendencia('FGTS3', motivoInss);
        }
        const semComparacaoInss = segestPessoas.filter(p => p.fol && !p.semBase && !p.zerado && p.difBaseInss === null);
        if (inssIncompleto) pendencia('FGTS4', motivoInss);
        else if (!cb.n || semComparacaoInss.length) {
            const afastadosSemBase = semComparacaoInss.filter(p => p.fol.afastamentoSemBasesPessoal && p.baseInssS5 === null);
            const outrosSemBase = semComparacaoInss.filter(p => !afastadosSemBase.includes(p));
            const motivo = `Pendente: base mensal do INSS não comparável para ${semComparacaoInss.length || 'um ou mais'} trabalhador(es)${semComparacaoInss.length ? ` (${lista(semComparacaoInss)})` : ''}.`
                + (afastadosSemBase.length ? ` ${lista(afastadosSemBase)}: afastamento informado na folha; bases individuais ausentes na folha e no ${rotuloInss}, não tratadas como zero. Esclarecer a ausência das bases ou apresentar demonstrativo da competência.` : '')
                + (outrosSemBase.length || !semComparacaoInss.length ? ' Juntar ou esclarecer a base mensal por empregado na competência.' : '');
            if (ck.FGTS4.sim === 'NAO') { ck.FGTS4.obs += ` ${motivo}`; ck.FGTS4.evid += ` ${motivo}`; }
            else pendencia('FGTS4', motivo);
        }
        if (!cf.div.length && (!cf.n || segestPessoas.some(p => p.fol && !p.semBase && !p.zerado && p.fg.length && p.difFgts === null))) pendencia('FGTS5', 'Pendente: FGTS não comparável para um ou mais trabalhadores.');
        if (!folhaTodos.length || !fgts?.linhas?.length) pendencia('FGTS3', 'Pendente: folha ou relação de trabalhadores do FGTS sem registros legíveis.');
        const cpfsItem3 = new Set([...folhaTodos.map(c => c.cpf), ...segestPessoas.map(p => p.cpf)].filter(Boolean));
        const fontesOcrPorItem = {
            FGTS3: [...folhaTodos, ...[...cadPorCpf.values()].filter(t => cpfsItem3.has(t.cpf)), ...[...s5PorCpf.values()].filter(t => cpfsItem3.has(t.cpf)), ...(fgts?.linhas || []).filter(l => cpfsItem3.has(l.cpf))],
            FGTS4: segestPessoas.filter(p => p.difBaseInss !== null).flatMap(p => [p.fol, p.s5]),
            FGTS5: segestPessoas.filter(p => p.difFgts !== null).flatMap(p => [p.fol, ...p.fg]),
        };
        // v2.5.19: leitura por OCR não deixa o item pendente; fica só a observação dos documentos lidos por OCR.
        for (const [k, fontes] of Object.entries(fontesOcrPorItem)) {
            if (!ck[k]) continue;
            const f = P.fontesTextoPrev((fontes || []).filter(P.viaOcrPrev));
            if (!f) continue;
            const o = ` Lido por OCR: ${f}.`;
            ck[k].obs += o; ck[k].evid += o;
        }
        const identidadesPendentes = segestPessoas.filter(p => p.identidadePendente);
        if (identidadesPendentes.length) for (const k of ['FGTS3', 'FGTS4', 'FGTS5']) if (ck[k]?.sim === 'SIM')
            pendencia(k, `Pendente: conflito de identificação em ${lista(identidadesPendentes, 5)}; conferir CPF e nomes nas fontes.`);
        informacoes.push(`${resumoQtd}. As quantidades têm escopos próprios; diferenças de contagem, isoladamente, não comprovam ausência de recolhimento.`);
        // v2.5.22: competência de cada documento, para o alerta em destaque na tela
        const compsDocs = [['folha analítica', folha?.competencia ? [folha.competencia] : []], [rotuloInss, [...new Set([s5001?.competencia, ...(s5001?.competenciasFontes || [])].filter(Boolean))]],
            ['FGTS Digital', [...new Set(guias.flatMap(g => [...g.competencias]))].sort()]].filter(([, cs]) => cs.length);
        const alertaCompetencia = compIncompativel ? { segest: competencia, docs: compsDocs.map(([doc, cs]) => ({ doc, comps: cs })) } : null;
        if (compIncompativel || empresaDiferente) {
            const compsDif = [...new Set(compsDocs.flatMap(([, cs]) => cs).filter(c => c !== competencia))].sort().map(P.compTexto).join(', ');
            const motivo = empresaDiferente ? 'CNPJ dos documentos diferente da contratada.' : `Competência da planilha da SEGEST (${P.compTexto(competencia)}) diferente da dos documentos (${compsDif}).`;
            avisos.push(motivo);
            for (const k of ['FGTS3', 'FGTS4', 'FGTS5']) pendencia(k, motivo);
            for (const p of [...segestPessoas, ...fora]) if (p.situacao === 'OK' || p.situacao === 'OK c/ obs') { p.situacao = 'Verificar'; p.texto = `${motivo} ${p.texto}`; }
        }
        // Fontes seguem na memória; o TSV preserva as mesmas linhas e colunas da macro.
        const fontesItens = {
            FGTS1: guias, FGTS2: (fgts?.linhas || []).filter(l => l.tomador === orgao),
            FGTS3: [...folhaTodos, ...cadPorCpf.values(), ...s5PorCpf.values(), ...(fgts?.linhas || [])],
            FGTS4: [...folhaTodos, ...s5PorCpf.values()], FGTS5: [...folhaTodos, ...(fgts?.linhas || [])],
        };
        for (const [k, registros] of Object.entries(fontesItens)) {
            const fontes = P.fontesTextoPrev(registros); if (ck[k] && fontes) ck[k].evid += ` Fontes: ${fontes}.`;
        }
        for (const c of conciliacoes) if (!c.ok) avisos.push(`${c.documento}: ${c.descricao} não fecha (lido ${c.tipo === 'qtd' ? c.lido : `R$ ${rs(c.lido)}`}, informado ${c.tipo === 'qtd' ? c.informado : `R$ ${rs(c.informado)}`}). Confira se alguma linha deixou de ser lida.`);
        const conta = (lst, s) => lst.filter(p => p.situacao === s).length;
        return {
            fonteInss: s5001?.layout || 'S-5001', esocialComprovavel: !esocialIncompleto, rotuloInss, rotuloPresenca, folhaNoEsocial,
            cadastroEsocial: { quantidade: cadPorCpf.size, trabalhadores: [...cadPorCpf.values()] },
            inssNaoLigados: (s5001?.naoLigados || []).filter(t => /01\.?298\.?583/.test(t.servico || '')).map(t => ({ mat: t.matFolha, nome: t.nome, base: t.b11 + t.b11x + t.b19 })),
            competencia, segestPessoas, fora, checklist: ck, avisos, informacoes, conciliacoes, inconsSegest: [...incons.values()], alertaCompetencia,
            folhaSemFgts, folhaSemS5, folhaSemBase, folhaTotal: folhaTodos.length, folhaNoFgts, folhaNoS5, emTodos: emTodos.length,
            qtd: { segest: segestPessoas.length, folha: folhaTodos.length, s5001: s5PorCpf.size, cadastroEsocial: cadPorCpf.size, fgtsTRT: qTRT, fgtsTotal: fgPorCpf.size },
            guia: g0 ? { numero: g0.numero, total: g0.total, vencimento: g0.vencimento, qtd: g0.qtd, empregador: g0.empregadorNome } : null,
            pessoas: [...segestPessoas, ...fora],
            resumo: Object.fromEntries(P.SITUACOES.map(s => [s, conta(segestPessoas, s)])), resumoFora: Object.fromEntries(P.SITUACOES.map(s => [s, conta(fora, s)])),
            textoQtd: resumoQtd,
            empresa: segest?.empresa || g0?.empregadorNome || '', cnpj: P.dig(segest?.cnpj), contrato: segest?.contrato || '',
            cnpjOrgao: orgao,
        };
    };

    // ---------- colagem na planilha (lida pela macro mConferenciaPrev v2.4.0) ----------
    // Só o que vai para o Relatório SLDST: checklist da aba do mês e candidatos à Amostragem.
    // v2.5.8 (formato v4): vão só as pessoas da SEGEST conferidas sem pendência (OK e OK c/ obs). A macro
    // escolhe a amostra do mês (20% do total da SEGEST, informado no cabeçalho), dando prioridade a quem
    // ainda não foi conferido no ano. Pendências ficam só no robô e na memória da conferência.
    P.AMOSTRA_PERCENTUAL = 0.2;
    P.gerarTsv = (res) => {
        const limpa = (v) => String(v ?? '').replace(/[\t\r\n]+/g, ' ').trim();
        const L = [];
        L.push(['#PREVFGTS', 'v4', res.competencia, limpa(res.empresa), res.cnpj, limpa(res.contrato), limpa(res.proad), res.segestPessoas.length].join('\t'));
        // v2.5.22: DARF1–DARF6 só quando a macro souber as linhas deles (P.COLAR_DARF_NA_PLANILHA)
        for (const k of ['FGTS1', 'FGTS2', 'FGTS3', 'FGTS4', 'FGTS5', 'GFD1', 'GFD2', 'GFD3', 'GFD4', ...(P.COLAR_DARF_NA_PLANILHA ? P.CHAVES_DARF : [])]) {
            const c = res.checklist[k]; if (!c) continue;
            L.push(['CHK', k, c.sim, limpa(c.obs)].join('\t'));
        }
        const [a, m] = String(res.competencia).split('-');
        const mesAbrev = a ? `${['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun', 'Jul', 'Ago', 'Set', 'Out', 'Nov', 'Dez'][Number(m) - 1]}/${a.slice(2)}` : '';
        for (const p of res.segestPessoas) {
            if (p.situacao !== 'OK' && p.situacao !== 'OK c/ obs') continue;
            const marcaMes = 'OK';
            L.push(['AMO', P.fmtCpf(p.cpf), limpa(p.seg?.nome || p.nome), limpa(p.seg?.posto), limpa(p.seg?.localidade), marcaMes, p.texto ? limpa(`${mesAbrev}: ${p.texto}`) : ''].join('\t'));
        }
        return L.join('\r\n');
    };

    // ---------- memória da conferência (v2.3.0) ----------
    // O detalhe didático da conferência, em Excel (ExcelJS) ou para imprimir/salvar em PDF.
    // As duas saídas usam o mesmo modelo (P.montarMemoria).
    P.ITENS_RELATORIO = [
        { k: 'FGTS1', secao: 'Análise FGTS Digital', n: '1', texto: 'O relatório indica a contratada como prestadora dos serviços, no campo "Nome do Empregador".', criterio: 'Raiz do CNPJ do empregador no detalhe da guia × CNPJ da contratada na planilha da SEGEST.', aba: 'Resumo' },
        { k: 'FGTS2', secao: 'Análise FGTS Digital', n: '2', texto: 'No campo "Tomador" consta o CNPJ do órgão contratante.', criterio: 'Procura o CNPJ do TRT na coluna "Tomador" do detalhe da guia e conta os trabalhadores.', aba: 'FGTS' },
        { k: 'FGTS3', secao: 'Análise FGTS Digital', n: '3', texto: 'Todos os terceirizados da folha também estão no FGTS Digital (Relação de Trabalhadores) e no eSocial.', criterio: 'Cada pessoa da planilha da SEGEST é procurada na folha, no relatório identificado do INSS ou cadastro do eSocial e no FGTS Digital. O cadastro evidencia presença; não informa base mensal. Ausência com férias, licença, afastamento, atestado ou aviso prévio nas ocorrências da SEGEST conta como justificada. Também confere se quem tem base de FGTS na folha está no FGTS Digital.', aba: 'Presença' },
        { k: 'FGTS4', secao: 'Análise FGTS Digital', n: '4', texto: 'A base de cálculo do INSS da folha é igual à do relatório eSocial (valor da base de cálculo).', criterio: 'Base da folha ("INSS Proc") × S-5001 (código 11 + 11* + 19), por pessoa da SEGEST. O INSS descontado (código 21 + 21*) também é comparado, como informação.', aba: 'INSS' },
        { k: 'FGTS5', secao: 'Análise FGTS Digital', n: '5', texto: 'Os valores de FGTS da folha são iguais aos do relatório FGTS Digital ("Valor FGTS na Guia").', criterio: 'FGTS da folha (rubricas "FGTS") × "Valor FGTS na Guia", somando todos os tomadores, por pessoa da SEGEST.', aba: 'FGTS' },
        { k: 'GFD1', secao: 'Análise da Guia do FGTS Digital - GFD', n: '1', texto: 'A GFD contém os dados da contratada (nome, CNPJ etc.).', criterio: 'Raiz do CNPJ do empregador da GFD × CNPJ da contratada.', aba: 'Resumo' },
        { k: 'GFD2', secao: 'Análise da Guia do FGTS Digital - GFD', n: '2', texto: 'A competência é idêntica à dos demais relatórios.', criterio: 'Competência da planilha da SEGEST, da folha, do S-5001, do detalhe da guia e da GFD.', aba: 'Resumo' },
        { k: 'GFD3', secao: 'Análise da Guia do FGTS Digital - GFD', n: '3', texto: 'O FGTS da GFD coincide com o total geral do FGTS no detalhe da mesma guia, com consignado separado.', criterio: 'Identificador da GFD × número da guia; FGTS da GFD × total geral do FGTS. Estabelecimentos são somados separadamente. FGTS + consignado × total a pagar, quando houver.', aba: 'Resumo' },
        { k: 'GFD4', secao: 'Análise da Guia do FGTS Digital - GFD', n: '4', texto: 'A GFD foi paga: o comprovante tem o mesmo valor do "Valor a recolher".', criterio: 'Vínculo por identificador da guia/QR Code ou por pagador, beneficiário, vencimento e valor. Confirma efetivação, valor total pago e data do pagamento × vencimento; agendamento não comprova pagamento.', aba: 'Resumo' },
    ];
    P.CORES_SIT = { OK: 'E8F5E9', 'OK c/ obs': 'F1F8E9', Verificar: 'FFF9C4', 'Não localizado (justificado)': 'FFF3E0', 'Não localizado': 'FFE0B2', Divergente: 'FFCDD2' };

    P.montarMemoria = (res, meta = {}) => {
        const tol = P.TOL_ARRED;
        const resultado = (d, falta) => d === null || d === undefined ? `Não comparado${falta ? ` (${falta})` : ''}` : d === 0 ? 'Igual' : Math.abs(d) <= tol ? 'Arredondamento' : 'Divergente';
        const faltaDe = (p, pares) => pares.filter(([v]) => v === null || v === undefined).map(([, rot]) => rot).join(' e ');
        const ord = (l) => [...l].sort((a, b) => String(a.nome).localeCompare(String(b.nome), 'pt-BR'));
        const seg = ord(res.segestPessoas);
        const presenca = seg.map(p => ({
            cpf: P.fmtCpf(p.cpf), nome: p.seg?.nome || p.nome, posto: p.seg?.posto || '', localidade: p.seg?.localidade || '',
            folha: p.naFolha ? `Sim (${p.fol.mat})` : 'Não', s5001: p.noS5 ? `Sim${p.chaveInss && p.chaveInss !== 'CPF' ? ` (por ${p.chaveInss})` : ''}` : p.cad ? 'Sim (cadastro eSocial; sem valores mensais)' : 'Não',
            fgts: p.noFgts ? (p.noFgtsTRT ? (p.fg.length > p.fg.filter(l => l.tomador === res.cnpjOrgao).length ? 'Sim (TRT e outro)' : 'Sim (TRT)') : 'Sim (outro tomador)') : 'Não',
            justificada: p.situacao === 'Não localizado (justificado)', situacao: p.situacao, texto: p.texto, ocorrencia: p.seg?.ocorrencias || '',
        }));
        const fgtsL = seg.map(p => ({ cpf: P.fmtCpf(p.cpf), nome: p.seg?.nome || p.nome, folha: p.fgtsFolha, guia: p.fgtsGuia, dif: p.difFgts,
            resultado: resultado(p.difFgts, faltaDe(p, [[p.fgtsFolha, 'folha'], [p.fgtsGuia, 'guia']])), baseFolha: p.baseFgtsFolha, baseGuia: p.baseFgtsGuia, tomadores: p.tomadores, situacao: p.situacao }));
        const inssL = seg.map(p => ({ cpf: P.fmtCpf(p.cpf), nome: p.seg?.nome || p.nome, baseFolha: p.baseInssFolha, baseS5: p.baseInssS5, difBase: p.difBaseInss,
            resBase: resultado(p.difBaseInss, faltaDe(p, [[p.baseInssFolha, 'folha'], [p.baseInssS5, 'S-5001']])), descFolha: p.inssFolha, descS5: p.inssS5, difDesc: p.difInss,
            resDesc: resultado(p.difInss, faltaDe(p, [[p.inssFolha, 'folha'], [p.inssS5, 'S-5001']])), situacao: p.situacao }));
        const foraL = [...res.fora].sort((a, b) => (P.ordemSituacao[a.situacao] - P.ordemSituacao[b.situacao]) || String(a.nome).localeCompare(String(b.nome), 'pt-BR')).map(p => ({
            situacao: p.situacao, vinculo: p.vinculo, cpf: P.fmtCpf(p.cpf) || '—', nome: p.nome, folha: p.naFolha ? `Sim (${p.fol.mat})` : 'Não', s5001: p.noS5 ? 'Sim' : p.cad ? 'Sim (cadastro eSocial; sem valores mensais)' : p.temRegistroInss ? 'Auxiliar (sem S-5001)' : 'Não',
            fgts: p.noFgts ? (p.noFgtsTRT ? 'Sim (TRT)' : 'Sim (outro tomador)') : 'Não', fgtsFolha: p.fgtsFolha, fgtsGuia: p.fgtsGuia, difFgts: p.difFgts,
            inssFolha: p.inssFolha, inssS5: p.inssS5, difInss: p.difInss, texto: p.texto }));
        const conta = (l, k, v) => l.filter(x => x[k] === v).length;
        const r = res.resumo;
        const pend = [...res.segestPessoas.filter(p => ['Divergente', 'Não localizado', 'Verificar'].includes(p.situacao)).map(p => ({ lista: 'Planilha da SEGEST', ...p })),
            ...res.fora.filter(p => ['Divergente', 'Não localizado', 'Verificar'].includes(p.situacao)).map(p => ({ lista: 'Fora da SEGEST', ...p }))]
            .map(p => ({ lista: p.lista, situacao: p.situacao, cpf: P.fmtCpf(p.cpf) || '—', nome: p.nome, texto: p.texto }));
        const placar = [
            ['Pessoas na planilha da SEGEST (lista-base)', res.qtd.segest],
            [`Localizadas na folha, no ${res.rotuloPresenca || res.rotuloInss || 'S-5001'} e no FGTS Digital`, res.emTodos],
            ['Ausências justificadas na SEGEST (férias, licença etc.)', r['Não localizado (justificado)']],
            ['Não localizadas sem justificativa', r['Não localizado']],
            ['A verificar', r.Verificar],
            ['FGTS divergente (folha × guia)', conta(fgtsL, 'resultado', 'Divergente')],
            [`Base do INSS divergente (folha × ${res.rotuloInss || 'S-5001'})`, conta(inssL, 'resBase', 'Divergente')],
            [`INSS descontado divergente (folha × ${res.rotuloInss || 'S-5001'})`, conta(inssL, 'resDesc', 'Divergente')],
            [`Diferenças de arredondamento (até R$ ${P.rs(tol)})`, conta(fgtsL, 'resultado', 'Arredondamento') + conta(inssL, 'resBase', 'Arredondamento') + conta(inssL, 'resDesc', 'Arredondamento')],
            ['CPFs citados nas ocorrências da SEGEST que não conferem com o nome', res.inconsSegest.length],
            ['Pessoas nos documentos e fora da planilha da SEGEST', res.fora.length],
            ['   — com pendência', res.fora.filter(p => ['Divergente', 'Não localizado', 'Verificar'].includes(p.situacao)).length],
        ];

        // v2.5.8: pendências agrupadas por tipo, para a memória em PDF e a aba "Pendências" do Excel.
        // Uma pessoa aparece em cada grupo em que se enquadra; quem confere sem pendência não aparece.
        const rot = res.rotuloInss || 'S-5001';
        const ehPend = (p) => ['Divergente', 'Não localizado', 'Verificar'].includes(p.situacao);
        const outroTom = (v) => /^FGTS só com outro tomador/.test(v);
        const juntar = (...ls) => ls.flat().filter(Boolean).join('; ');
        const nomeP = (p) => P.titulo(p.seg?.nome || p.nome || '');
        const postoP = (p) => [p.seg?.posto, p.seg?.localidade].filter(Boolean).join(' · ');
        const noG1 = (p) => p.situacao === 'Não localizado' || p.verif.some(outroTom);
        const g1 = res.segestPessoas.filter(noG1).map(p => ({
            cpf: P.fmtCpf(p.cpf), nome: nomeP(p), posto: postoP(p),
            falta: juntar(p.situacao === 'Não localizado' ? p.nao : [], p.verif.some(outroTom) ? ['FGTS com o tomador TRT'] : []),
            obs: juntar(p.contraFolha ? `${p.motivo ? `na SEGEST: ${p.motivo}; ` : ''}${p.contraFolha}` : '', p.verif, p.obs),
            ocorrencia: p.seg?.ocorrencias || '' }));
        const g2 = [...res.fora.filter(ehPend).map(p => ({
            cpf: P.fmtCpf(p.cpf) || '—', nome: nomeP(p), esta: p.locais, vinculo: p.vinculo,
            obs: juntar(p.div, p.situacao === 'Não localizado' ? 'não localizado(a) em nenhum documento' : '', p.verif, p.obs) })),
            ...(res.inssNaoLigados || []).map(t => ({ cpf: '—', nome: P.titulo(t.nome), esta: `${P.titulo(rot)}${t.mat ? ` (código ${t.mat})` : ''}`, vinculo: 'Não identificado',
                obs: `não foi possível ligar a um CPF pela matrícula nem pelo nome${t.base ? `; base R$ ${P.rs(t.base)}` : ''}` }))];
        const g3 = [];
        for (const [lista, ps] of [['SEGEST', res.segestPessoas], ['Fora da SEGEST', res.fora]]) for (const p of ps) {
            const add = (info, a, b, fonte) => { if (a === null || a === undefined || b === null || b === undefined || Math.abs(a - b) <= tol) return; g3.push({ cpf: P.fmtCpf(p.cpf) || '—', nome: nomeP(p), lista, info, folha: a, doc: b, fonte, dif: a - b }); };
            add('FGTS', p.fgtsFolha, p.fgtsGuia, 'guia do FGTS');
            add('Base do INSS', p.baseInssFolha, p.baseInssS5, rot);
            add('INSS descontado', p.inssFolha, p.inssS5, rot);
        }
        const g4 = res.segestPessoas.filter(p => !noG1(p) && p.verif.length).map(p => ({ cpf: P.fmtCpf(p.cpf), nome: nomeP(p), posto: postoP(p), obs: juntar(p.verif) }));
        const jaListados = new Set([...g1, ...g2].map(x => P.dig(x.cpf)).filter(Boolean));
        const porMat = new Map();
        for (const [c, tipo] of [...res.folhaSemFgts.map(c => [c, 'FGTS na folha e fora da guia do FGTS Digital']), ...res.folhaSemS5.map(c => [c, `INSS na folha e fora do ${rot}`])]) {
            if (c.cpf && jaListados.has(P.dig(c.cpf))) continue;
            const k = `${c.mat}|${c.nome}`;
            if (!porMat.has(k)) porMat.set(k, { nome: P.titulo(c.nome), mat: c.mat, cpf: P.fmtCpf(c.cpf) || '—', cc: c.ccusto || '', tipo: tipo });
            else porMat.get(k).tipo += `; ${tipo}`;
        }
        const g5 = [...porMat.values()];
        const docsK = ['FGTS1', 'FGTS2', 'GFD1', 'GFD2', 'GFD3', 'GFD4', ...P.CHAVES_DARF];
        const g6 = [...P.ITENS_RELATORIO.filter(it => { const c = res.checklist[it.k]; return c && (c.sim === '' || (c.sim === 'NAO' && docsK.includes(it.k))); })
            .map(it => ({ onde: `${it.secao.replace('Análise da Guia do FGTS Digital - GFD', 'GFD').replace('Análise FGTS Digital', 'FGTS Digital')} ${it.n}`, oque: it.texto, resultado: res.checklist[it.k].sim === 'NAO' ? 'Não' : 'Pendente', detalhe: P.CHAVES_DARF.includes(it.k) ? res.checklist[it.k].evid : res.checklist[it.k].obs })),
            ...res.conciliacoes.filter(c => !c.ok).map(c => ({ onde: c.documento, oque: c.descricao, resultado: 'Não fecha', detalhe: `lido pelo robô ${c.tipo === 'qtd' ? c.lido : `R$ ${P.rs(c.lido)}`} × informado no documento ${c.tipo === 'qtd' ? c.informado : `R$ ${P.rs(c.informado)}`}` }))];
        const g7 = res.inconsSegest.map(i => ({ citado: i.citado, cpf: i.cpf, problema: i.problema, sugestao: i.sugestao || '—', titulares: i.titulares.map(n => P.titulo(n)).join('; ') }));
        const grupos = [
            { id: 'segest', titulo: 'Na planilha da SEGEST e fora de algum documento', linhas: g1,
              explica: 'A SEGEST informa a pessoa como alocada no TRT no mês, mas ela falta em um ou mais documentos da empresa, sem justificativa, ou a justificativa não confere com a folha (que tem o valor devido). Entra também quem está no FGTS só com outro tomador.',
              pedir: 'Pedir à empresa o documento que falta ou a retificação (FGTS com o tomador TRT, relatório do INSS ou folha) ou a justificativa da ausência.',
              cols: [{ h: 'CPF', k: 'cpf', w: 9 }, { h: 'Terceirizado', k: 'nome', w: 16 }, { h: 'Posto · Localidade', k: 'posto', w: 15 }, { h: 'Falta em', k: 'falta', w: 13 }, { h: 'Observação', k: 'obs', larga: true }, { h: 'Ocorrência na SEGEST', k: 'ocorrencia', larga: true, w: 20 }] },
            { id: 'fora', titulo: 'Nos documentos e fora da planilha da SEGEST', linhas: g2,
              explica: `A pessoa aparece na folha, no ${rot} ou no FGTS com o tomador TRT, mas não está na planilha da SEGEST; ou foi citada na SEGEST como substituta e não aparece nos documentos.`,
              pedir: 'Confirmar com a SEGEST se a pessoa trabalhou no TRT no mês. Se trabalhou, pedir a inclusão na planilha; se não, pedir à empresa a correção do tomador.',
              cols: [{ h: 'CPF', k: 'cpf', w: 9 }, { h: 'Nome', k: 'nome', w: 17 }, { h: 'Está em', k: 'esta', w: 14 }, { h: 'Vínculo', k: 'vinculo', w: 16 }, { h: 'O que verificar', k: 'obs', larga: true }] },
            { id: 'valor', titulo: 'Divergência de valor', linhas: g3,
              explica: `O valor da folha é diferente do documento por mais de R$ ${P.rs(tol)}. Diferenças de até R$ ${P.rs(tol)} são arredondamento e não entram aqui.`,
              pedir: 'Pedir à empresa a explicação da diferença ou a retificação do documento.',
              cols: [{ h: 'CPF', k: 'cpf', w: 10 }, { h: 'Nome', k: 'nome', w: 22 }, { h: 'Lista', k: 'lista', w: 9 }, { h: 'Informação', k: 'info', w: 11 }, { h: 'Folha', k: 'folha', tipo: 'num', w: 10 }, { h: 'Documento', k: 'doc', tipo: 'num', w: 10 }, { h: 'Fonte', k: 'fonte', w: 14 }, { h: 'Diferença', k: 'dif', tipo: 'num' }] },
            { id: 'verificar', titulo: 'Outros pontos a verificar na planilha da SEGEST', linhas: g4,
              explica: 'A pessoa foi encontrada nos documentos, mas há algo que impede concluir a conferência: CPF repetido, rubrica ausente, leitura por OCR, desligamento sem guia rescisória e afins.',
              pedir: 'Conferir no documento original o ponto indicado.',
              cols: [{ h: 'CPF', k: 'cpf', w: 10 }, { h: 'Terceirizado', k: 'nome', w: 20 }, { h: 'Posto · Localidade', k: 'posto', w: 18 }, { h: 'O que verificar', k: 'obs', larga: true }] },
            { id: 'folha', titulo: `Na folha com FGTS ou INSS e fora da guia ou do ${rot}`, linhas: g5,
              explica: `Colaboradores da folha com base de FGTS ou de INSS que não aparecem na guia do FGTS Digital ou no ${rot}. Quem já está nos grupos acima não se repete aqui.`,
              pedir: 'Verificar pelo centro de custo se o colaborador é deste contrato; se for, pedir a inclusão na guia ou no relatório.',
              cols: [{ h: 'Colaborador', k: 'nome', w: 22 }, { h: 'Matrícula', k: 'mat', w: 8 }, { h: 'CPF', k: 'cpf', w: 10 }, { h: 'Centro de custo', k: 'cc', w: 18 }, { h: 'Ocorrência', k: 'tipo', larga: true }] },
            { id: 'docs', titulo: 'Documentos, guia e pagamento', linhas: g6,
              explica: 'Itens do checklist que não ficaram regulares por causa dos documentos e totais que não fecham com o que o próprio documento informa.',
              pedir: 'Pedir à empresa o documento que falta ou a correção indicada.',
              cols: [{ h: 'Item ou documento', k: 'onde', w: 12 }, { h: 'O que foi verificado', k: 'oque', w: 30 }, { h: 'Resultado', k: 'resultado', w: 8 }, { h: 'Detalhe', k: 'detalhe', larga: true }] },
            { id: 'cpfSegest', titulo: 'Ocorrências da SEGEST com CPF que não confere', linhas: g7,
              explica: 'CPF citado nas ocorrências (coberturas, permutas) que é de outra pessoa nos documentos, é inválido ou não aparece em nenhum documento.',
              pedir: 'Pedir à SEGEST a correção do CPF na planilha.',
              cols: [{ h: 'Citado(a)', k: 'citado', w: 15 }, { h: 'CPF citado', k: 'cpf', w: 10 }, { h: 'Problema', k: 'problema', larga: true }, { h: 'Sugestão', k: 'sugestao', larga: true }, { h: 'Na ocorrência de', k: 'titulares', w: 15 }] },
        ];
        const justifP = res.segestPessoas.filter(p => p.situacao === 'Não localizado (justificado)');
        const motivoCurto = (p) => p.motivoFolha ? 'bases zeradas na folha' : ((p.motivo || '').match(/f[ée]rias|licen[çc]a|afastad[oa]|atestado|aviso pr[ée]vio/i)?.[0] || 'outro motivo').toLowerCase();
        const motivosJ = Object.entries(justifP.reduce((g, p) => { const k = motivoCurto(p); g[k] = (g[k] || 0) + 1; return g; }, {})).map(([k, n]) => `${n} ${k}`).join(', ');
        const semPend = res.segestPessoas.filter(p => p.situacao === 'OK' || p.situacao === 'OK c/ obs').length;
        const resumoPdf = {
            total: res.qtd.segest, semPend, minimo: Math.ceil((P.AMOSTRA_PERCENTUAL || 0.2) * res.qtd.segest), percentual: Math.round((P.AMOSTRA_PERCENTUAL || 0.2) * 100),
            justif: justifP.length, motivosJ, comPend: res.segestPessoas.filter(ehPend).length,
            arred: conta(fgtsL, 'resultado', 'Arredondamento') + conta(inssL, 'resBase', 'Arredondamento') + conta(inssL, 'resDesc', 'Arredondamento'),
        };
        const g = res.guia;
        const docs = [
            ['Planilha da SEGEST', meta.arquivos?.segest || '', `${res.qtd.segest} pessoas (lista-base da conferência)`],
            ['Folha analítica', meta.arquivos?.folha || '', `${res.qtd.folha} colaboradores`],
            [String(res.fonteInss || 'S-5001 (eSocial)').replace(/\s*\(auxiliar\)/i, ''), meta.arquivos?.s5001 || '', `${res.qtd.s5001} trabalhadores com valores identificados`],
            ...(res.qtd.cadastroEsocial ? [['Cadastro contratual do eSocial (presença)', meta.arquivos?.cadastroEsocial || '', `${res.qtd.cadastroEsocial} trabalhadores identificados; sem base mensal de INSS`]] : []),
            ['FGTS Digital (detalhe, GFD e comprovante)', meta.arquivos?.fgts || '', g ? `Guia nº ${g.numero}: ${g.qtd} trabalhadores, R$ ${P.rs(g.total)}; ${res.qtd.fgtsTRT} com tomador TRT` : ''],
            // v2.5.22: DARF, DCTFWeb e PER/DCOMP
            ...(meta.arquivos?.dctf || res.dctf?.detalhe ? [['DCTFWeb, DARF e PER/DCOMP', meta.arquivos?.dctf || '',
                (() => { const z = res.dctf?.resumo; return z?.recibo ? `DCTFWeb nº ${z.recibo}${z.retificadora ? ' (retificadora)' : ''}, saldo na transmissão R$ ${P.rs(z.saldo ?? 0)}; ${z.darfs} DARF (${z.pagos} pago(s)); ${z.dcomps} PER/DCOMP${z.compensacao ? `; compensação R$ ${P.rs(z.compensacao)}` : ''}` : 'recibo da DCTFWeb não encontrado'; })()]] : []),
            // v2.5.15: documentos de rescisão lidos (guia rescisória, comprovante, extrato da conta FGTS)
            ...(meta.arquivos?.rescisorio ? [['Documentos de rescisão (FGTS rescisório)', meta.arquivos.rescisorio,
                (() => { const ps = (res.pessoas || []).filter(p => p.rescisorioComplementar?.length);
                    return ps.length ? ps.map(p => `${P.titulo(p.nome)}: guia nº ${p.rescisorioComplementar.join(', ')}, ${p.rescisorioPago ? 'pagamento comprovado' : 'pagamento não comprovado'}`).join('; ')
                        : 'nenhuma guia rescisória de pessoa desta conferência'; })()]] : []),
        ];
        const checklist = P.ITENS_RELATORIO.map(it => ({ ...it, resultado: res.checklist[it.k]?.sim === 'SIM' ? 'Sim' : res.checklist[it.k]?.sim === 'NAO' ? 'Não' : res.checklist[it.k]?.sim === 'NA' ? 'Não se aplica' : '—', evid: res.checklist[it.k]?.evid || 'Documento não juntado.', obs: res.checklist[it.k]?.obs || 'Documento não juntado.' }));
        const folhaDir = [
            ...res.folhaSemFgts.map(c => ({ tipo: 'Base de FGTS na folha e fora do FGTS Digital', mat: c.mat, nome: c.nome, cc: c.ccusto, cpf: P.fmtCpf(c.cpf) || '—' })),
            ...res.folhaSemS5.map(c => ({ tipo: 'Fora do S-5001 do TRT (INSS não conferido)', mat: c.mat, nome: c.nome, cc: c.ccusto, cpf: P.fmtCpf(c.cpf) || '—' })),
            ...res.folhaSemBase.map(c => ({ tipo: 'Só verbas sem incidência de FGTS/INSS', mat: c.mat, nome: c.nome, cc: c.ccusto, cpf: P.fmtCpf(c.cpf) || '—' })),
        ];
        return {
            fonteInss: res.fonteInss, rotuloInss: rot, rotuloPresenca: res.qtd.cadastroEsocial ? 'INSS / eSocial' : rot, grupos, resumoPdf, dctf: res.dctf?.detalhe || null,
            decisao: meta.relatorio ? P.LINHAS_RELATORIO.map(L => { const x = meta.relatorio.linhas[L.k] || {}; const r = (v) => v === 'SIM' ? 'Sim' : v === 'NAO' ? 'Não' : 'Sem marcação';
                return { linha: L.rotulo, texto: L.texto, robo: r(x.sugSim), decisao: r(x.sim), obs: x.obs || '', editado: x.editado ? 'Sim' : '' }; }) : null,
            amostraQtd: meta.relatorio ? `${meta.relatorio.qtdAmostra} de ${meta.relatorio.total}${meta.relatorio.qtdEditada ? ` (sugestão do robô: ${meta.relatorio.sugQtd})` : ''}` : '',
            titulo: 'Memória da conferência previdenciária e FGTS Digital',
            empresa: res.empresa, cnpj: P.fmtCnpj(res.cnpj), contrato: res.contrato, competencia: P.compTexto(res.competencia), competenciaIso: res.competencia,
            proad: res.proad || meta.proad || '', geradoEm: meta.geradoEm || new Date(), cnpjOrgao: P.fmtCnpj(res.cnpjOrgao), tol,
            docs, placar, checklist, conciliacoes: res.conciliacoes, pendencias: pend,
            incons: res.inconsSegest.map(i => ({ titulares: i.titulares.map(n => P.titulo(n)).join('; '), citado: i.citado, cpf: i.cpf, problema: i.problema, sugestao: i.sugestao || '—' })), presenca, fgts: fgtsL, inss: inssL, fora: foraL, folhaDir,
            folhaTotal: res.folhaTotal, folhaNoFgts: res.folhaNoFgts, folhaNoS5: res.folhaNoS5,
            comoLer: [
                ...(res.informacoes || []),
                ...(res.qtd.cadastroEsocial ? ['Cadastro contratual do eSocial: evidencia CPF, nome e matrícula para a presença. Não comprova base mensal ou recolhimento. Valores sem identificação não são associados pela sequência das páginas nem pela coincidência com a folha.'] : []),
                'A lista-base é a planilha da SEGEST: cada pessoa dela é procurada na folha analítica, no S-5001 (eSocial) e no detalhe da guia do FGTS Digital. A ligação é pelo CPF; quando a folha não tem CPF, ela é ligada pela matrícula que aparece no S-5001 ou, na falta dela, pelo nome.',
                `Diferença de até R$ ${P.rs(tol)} é tratada como arredondamento: aparece em verde-claro e não reprova o item. Acima disso, a diferença aparece em vermelho e a pessoa fica "Divergente".`,
                'Aba DCTFWeb: declaração usada (recibo e retificadora), débitos por código, DARFs e comprovantes, compensações × PER/DCOMP e a explicação de cada item DARF/DCTFWeb. No relatório vai só a observação objetiva (números, valores e datas).',
                'Aba Presença: em quais documentos cada pessoa foi encontrada (item 3). Aba FGTS: FGTS da folha × "Valor FGTS na Guia" (item 5). Aba INSS: base e desconto da folha × S-5001 (item 4). Aba Fora da SEGEST: quem está nos documentos e não está na planilha. Aba Checklist: como cada item foi conferido.',
                `Fonte dos valores de INSS: ${res.fonteInss}. Vale o relatório que a empresa adota, desde que identifique o empregado: a ligação é feita pelo CPF, pela matrícula (com nome compatível) ou pelo nome, quando ele é único. A coluna do INSS na aba Presença mostra quando a ligação não foi pelo CPF.`,
                'As colunas de diferença são fórmulas (folha − documento): dá para conferir qualquer linha refazendo a conta. A conciliação de totais mostra que a soma do que o robô leu bate com os totais impressos nos próprios documentos.',
                'Situações: OK = tudo confere; OK c/ obs = confere, com algo a registrar; Não localizado (justificado) = ausência explicada nas ocorrências da SEGEST; Não localizado = ausência sem justificativa; Verificar = precisa de análise; Divergente = valor diferente.',
            ],
        };
    };

    P.nomeArquivoMemoria = (m, ext) => {
        const [a, mm] = String(m.competenciaIso || '').split('-');
        const mes = a ? `${['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun', 'Jul', 'Ago', 'Set', 'Out', 'Nov', 'Dez'][Number(mm) - 1]}-${a.slice(2)}` : 'sem-competencia';
        const emp = String(m.empresa || '').split(/\s+/)[0] || 'empresa';
        return `Memoria Conferencia Prev-FGTS - ${P.titulo(emp)} - ${mes}.${ext}`;
    };

    // ---- Excel ----
    P.memoriaXlsx = async (m, ExcelJSLib) => {
        const wb = new ExcelJSLib.Workbook();
        wb.creator = 'Robô SIGEO - Terceirizados'; wb.created = new Date();
        const FONTE = 'Arial';
        const COR_CAB = 'FF00695C', COR_SEC = 'FFE0F2F1', COR_BORDA = 'FFCFD8DC';
        const borda = { top: { style: 'thin', color: { argb: COR_BORDA } }, left: { style: 'thin', color: { argb: COR_BORDA } }, bottom: { style: 'thin', color: { argb: COR_BORDA } }, right: { style: 'thin', color: { argb: COR_BORDA } } };
        const fill = (hex) => ({ type: 'pattern', pattern: 'solid', fgColor: { argb: hex.length === 6 ? `FF${hex}` : hex } });
        const NUM = '#,##0.00;-#,##0.00;0.00';
        const novaAba = (nome, larguras) => {
            const ws = wb.addWorksheet(nome, { properties: { defaultRowHeight: 15 }, pageSetup: { paperSize: 9, orientation: 'landscape', fitToPage: true, fitToWidth: 1, fitToHeight: 0, margins: { left: 0.4, right: 0.4, top: 0.5, bottom: 0.5, header: 0.2, footer: 0.2 } } });
            ws.columns = larguras.map(w => ({ width: w }));
            ws.headerFooter.oddFooter = `&L${m.titulo} - ${m.competencia}&RPágina &P de &N`;
            return ws;
        };
        const titulo = (ws, texto, sub, nCols) => {
            ws.mergeCells(1, 1, 1, nCols); ws.mergeCells(2, 1, 2, nCols);
            const c1 = ws.getCell(1, 1); c1.value = texto; c1.font = { name: FONTE, size: 14, bold: true, color: { argb: COR_CAB } };
            const c2 = ws.getCell(2, 1); c2.value = sub; c2.font = { name: FONTE, size: 9, color: { argb: 'FF546E7A' } };
            ws.getRow(1).height = 22;
            return 4;
        };
        const nota = (ws, linha, texto, nCols, cor = 'FF546E7A') => {
            ws.mergeCells(linha, 1, linha, nCols);
            const c = ws.getCell(linha, 1); c.value = texto; c.font = { name: FONTE, size: 9, italic: true, color: { argb: cor } };
            c.alignment = { wrapText: true, vertical: 'top' };
            ws.getRow(linha).height = Math.max(15, Math.ceil(String(texto).length / (nCols * 11)) * 13);
            return linha + 1;
        };
        const secao = (ws, linha, texto, nCols) => {
            ws.mergeCells(linha, 1, linha, nCols);
            const c = ws.getCell(linha, 1); c.value = texto; c.font = { name: FONTE, size: 11, bold: true, color: { argb: COR_CAB } };
            c.fill = fill(COR_SEC); c.border = { bottom: { style: 'thin', color: { argb: COR_CAB } } };
            ws.getRow(linha).height = 18;
            return linha + 1;
        };
        const letra = (n) => { let s = ''; while (n > 0) { const r = (n - 1) % 26; s = String.fromCharCode(65 + r) + s; n = Math.floor((n - 1) / 26); } return s; };
        // cols: { h, k, tipo: 'txt'|'num'|'dif'|'sn'|'sit'|'res', a, b (chaves dos operandos da diferença), larga }
        const tabela = (ws, linha0, cols, linhas, { filtro = false, congelar = false, totais = false } = {}) => {
            const cab = ws.getRow(linha0);
            cols.forEach((c, i) => {
                const cel = cab.getCell(i + 1); cel.value = c.h;
                cel.font = { name: FONTE, size: 9, bold: true, color: { argb: 'FFFFFFFF' } }; cel.fill = fill(COR_CAB);
                cel.alignment = { wrapText: true, vertical: 'middle', horizontal: 'center' }; cel.border = borda;
            });
            cab.height = 30;
            const idx = Object.fromEntries(cols.map((c, i) => [c.k, i + 1]));
            let ln = linha0 + 1;
            for (const r of linhas) {
                const row = ws.getRow(ln);
                cols.forEach((c, i) => {
                    const cel = row.getCell(i + 1);
                    const v = r[c.k];
                    cel.font = { name: FONTE, size: 9 }; cel.border = borda; cel.alignment = { vertical: 'top', wrapText: !!c.larga };
                    if (c.tipo === 'num') { if (v !== null && v !== undefined) { cel.value = v / 100; cel.numFmt = NUM; } else { cel.value = '—'; cel.alignment = { horizontal: 'center', vertical: 'top' }; cel.font = { name: FONTE, size: 9, color: { argb: 'FF9E9E9E' } }; } }
                    else if (c.tipo === 'dif') {
                        const a = r[c.a], b = r[c.b];
                        if (a === null || a === undefined || b === null || b === undefined) { cel.value = '—'; cel.alignment = { horizontal: 'center', vertical: 'top' }; cel.font = { name: FONTE, size: 9, color: { argb: 'FF9E9E9E' } }; }
                        else {
                            cel.value = { formula: `${letra(idx[c.a])}${ln}-${letra(idx[c.b])}${ln}`, result: (a - b) / 100 }; cel.numFmt = NUM;
                            const d = a - b;
                            if (d === 0) cel.font = { name: FONTE, size: 9, color: { argb: 'FF2E7D32' } };
                            else { cel.fill = fill(Math.abs(d) <= m.tol ? 'F1F8E9' : 'FFCDD2'); cel.font = { name: FONTE, size: 9, bold: Math.abs(d) > m.tol }; }
                        }
                    } else if (c.tipo === 'sn') {
                        cel.value = v ?? ''; cel.alignment = { horizontal: 'center', vertical: 'top' };
                        if (/^Auxiliar/.test(v)) { cel.fill = fill('FFF9C4'); cel.font = { name: FONTE, size: 9, color: { argb: 'FF795548' } }; }
                        else if (/^Sim/.test(v)) { cel.fill = fill('E8F5E9'); cel.font = { name: FONTE, size: 9, color: { argb: 'FF2E7D32' } }; }
                        else if (v === 'Não') { cel.fill = fill(r.justificada ? 'FFF3E0' : 'FFCDD2'); cel.font = { name: FONTE, size: 9, bold: true, color: { argb: r.justificada ? 'FFE65100' : 'FFB71C1C' } }; }
                    } else if (c.tipo === 'sit') { cel.value = v ?? ''; cel.fill = fill(P.CORES_SIT[v] || 'FFFFFF'); cel.font = { name: FONTE, size: 9, bold: !/^OK/.test(v || '') }; }
                    else if (c.tipo === 'res') {
                        cel.value = v ?? '';
                        if (v === 'Divergente' || v === 'Não') { cel.fill = fill('FFCDD2'); cel.font = { name: FONTE, size: 9, bold: true, color: { argb: 'FFB71C1C' } }; }
                        else if (v === 'Arredondamento') cel.fill = fill('F1F8E9');
                        else if (v === 'Igual' || v === 'Sim' || v === 'Confere') cel.font = { name: FONTE, size: 9, color: { argb: 'FF2E7D32' } };
                        else if (/^Não comparado|^—/.test(v || '')) cel.font = { name: FONTE, size: 9, color: { argb: 'FF757575' } };
                        cel.alignment = { vertical: 'top', horizontal: 'center', wrapText: true };
                    } else if (c.tipo === 'qtdOuRs') { cel.value = r.tipo === 'qtd' ? v : (v ?? 0) / 100; cel.numFmt = r.tipo === 'qtd' ? '#,##0' : NUM; }
                    else cel.value = v ?? '';
                });
                if (cols.some(c => c.larga)) {
                    const maior = Math.max(...cols.filter(c => c.larga).map(c => Math.ceil(String(r[c.k] ?? '').length / Math.max(10, (ws.getColumn(idx[c.k]).width || 30) * 1.1))));
                    row.height = Math.max(15, maior * 12);
                }
                ln++;
            }
            if (totais && linhas.length) {
                const row = ws.getRow(ln);
                row.getCell(1).value = 'Total'; row.getCell(1).font = { name: FONTE, size: 9, bold: true };
                cols.forEach((c, i) => {
                    const cel = row.getCell(i + 1); cel.border = borda; cel.fill = fill('ECEFF1');
                    if (c.tipo === 'num' || c.tipo === 'dif') {
                        const L = letra(i + 1);
                        const tot = c.tipo === 'num' ? linhas.reduce((s, r) => s + (r[c.k] || 0), 0)
                            : linhas.reduce((s, r) => s + ((r[c.a] !== null && r[c.a] !== undefined && r[c.b] !== null && r[c.b] !== undefined) ? r[c.a] - r[c.b] : 0), 0);
                        cel.value = { formula: `SUM(${L}${linha0 + 1}:${L}${ln - 1})`, result: tot / 100 }; cel.numFmt = NUM; cel.font = { name: FONTE, size: 9, bold: true };
                    }
                });
                ln++;
            }
            if (filtro && linhas.length) ws.autoFilter = { from: { row: linha0, column: 1 }, to: { row: linha0 + linhas.length, column: cols.length } };
            if (congelar) { ws.views = [{ state: 'frozen', ySplit: linha0, xSplit: 0, showGridLines: false }]; ws.pageSetup.printTitlesRow = `${linha0}:${linha0}`; }
            return ln;
        };
        const ident = `${m.empresa} · CNPJ ${m.cnpj} · Contrato ${m.contrato || '—'} · Competência ${m.competencia}${m.proad ? ` · PROAD ${m.proad}` : ''}`;
        const gerado = `Gerada pelo robô em ${m.geradoEm.toLocaleString('pt-BR')}`;

        // Resumo
        let ws = novaAba('Resumo', [46, 54, 22, 22, 12]);
        ws.views = [{ showGridLines: false }];
        let l = titulo(ws, m.titulo, `${ident} · ${gerado}`, 5);
        l = secao(ws, l, 'Documentos analisados', 5);
        l = tabela(ws, l, [{ h: 'Documento', k: 0 }, { h: 'Arquivo', k: 1, larga: true }, { h: 'O que foi lido', k: 2, larga: true }], m.docs.map(d => ({ 0: d[0], 1: d[1], 2: d[2] })));
        for (let i = -1; i < m.docs.length; i++) ws.mergeCells(`C${l - m.docs.length + i}:E${l - m.docs.length + i}`); // "O que foi lido" ocupa C:E
        l = secao(ws, l + 1, 'Resultado da conferência', 5);
        l = tabela(ws, l, [{ h: 'Indicador', k: 0 }, { h: 'Quantidade', k: 1 }], m.placar.map(p => ({ 0: p[0], 1: p[1] })));
        l = secao(ws, l + 1, 'Checklist do relatório (detalhe na aba Checklist)', 5);
        l = tabela(ws, l, [{ h: 'Item', k: 'item' }, { h: 'Verificação', k: 'texto', larga: true }, { h: 'Regular', k: 'resultado', tipo: 'res' }],
            m.checklist.map(c => ({ item: `${c.secao.replace('Análise da Guia do FGTS Digital - GFD', 'GFD').replace('Análise FGTS Digital', 'FGTS Digital')} ${c.n}`, texto: c.texto, resultado: c.resultado })));
        l = secao(ws, l + 1, 'Conciliação de totais: o que o robô leu × o que o documento informa', 5);
        l = tabela(ws, l, [{ h: 'Documento', k: 'documento' }, { h: 'Verificação', k: 'descricao', larga: true }, { h: 'Lido pelo robô', k: 'lido', tipo: 'qtdOuRs' }, { h: 'Informado no documento', k: 'informado', tipo: 'qtdOuRs' }, { h: 'Confere', k: 'conf', tipo: 'res' }],
            m.conciliacoes.map(c => ({ ...c, conf: c.ok ? 'Confere' : 'Não' })));
        l = secao(ws, l + 1, 'Pendências por grupo (detalhe na aba Pendências)', 5);
        l = tabela(ws, l, [{ h: 'Grupo', k: 'titulo' }, { h: 'Quantidade', k: 'qtd' }], m.grupos.map(g => ({ titulo: g.titulo, qtd: g.linhas.length })));
        l = secao(ws, l + 1, `CPFs citados nas ocorrências da SEGEST que não conferem (${m.incons.length})`, 5);
        if (m.incons.length) l = tabela(ws, l, [{ h: 'Citado(a)', k: 'citado' }, { h: 'Problema', k: 'problema', larga: true }, { h: 'Sugestão', k: 'sugestao', larga: true }, { h: 'Ocorrência de', k: 'titulares', larga: true }, { h: 'CPF citado', k: 'cpf' }], m.incons);
        else l = nota(ws, l, 'Todos os CPFs citados nas ocorrências conferem com os nomes.', 5, 'FF2E7D32');
        l = secao(ws, l + 1, 'Como ler esta memória', 5);
        for (const t of m.comoLer) l = nota(ws, l, `• ${t}`, 5, 'FF37474F');

        // v2.5.8: Pendências agrupadas por tipo (o mesmo conteúdo da memória em PDF)
        ws = novaAba('Pendências', [16, 30, 22, 18, 16, 16, 18, 16]);
        l = titulo(ws, 'Pendências da conferência, agrupadas por tipo', ident, 8);
        const comPend = m.grupos.filter(g => g.linhas.length);
        if (!comPend.length) l = nota(ws, l, 'Nenhuma pendência: todos os documentos e todas as pessoas da SEGEST conferem.', 8, 'FF2E7D32');
        for (const g of comPend) {
            l = secao(ws, l + 1, `${g.titulo} (${g.linhas.length})`, Math.max(g.cols.length, 5));
            l = nota(ws, l, g.explica, Math.max(g.cols.length, 5));
            l = nota(ws, l, `O que pedir: ${g.pedir}`, Math.max(g.cols.length, 5), 'FF00695C');
            l = tabela(ws, l, g.cols.map(c => ({ h: c.h, k: c.k, tipo: c.tipo, larga: c.larga || c.w >= 14 })), g.linhas);
        }

        // Checklist
        ws = novaAba('Checklist', [14, 46, 52, 10, 70, 12]);
        l = titulo(ws, 'Checklist do relatório: como cada item foi conferido', ident, 6);
        l = tabela(ws, l, [{ h: 'Item', k: 'item' }, { h: 'O que o relatório exige', k: 'texto', larga: true }, { h: 'Como o robô conferiu', k: 'criterio', larga: true }, { h: 'Regular', k: 'resultado', tipo: 'res' }, { h: 'Resultado e números', k: 'evid', larga: true }, { h: 'Detalhe na aba', k: 'aba' }],
            m.checklist.map(c => ({ ...c, item: `${c.secao.replace('Análise da Guia do FGTS Digital - GFD', 'GFD').replace('Análise FGTS Digital', 'FGTS Digital')} ${c.n}` })), { congelar: true });
        l = nota(ws, l + 1, 'Os itens de SICAF e SEFIP/RET continuam conferidos manualmente.', 6);
        // v2.5.23: o que foi para o Relatório SLDST (sugestão do robô × decisão na tela)
        if (m.decisao) {
            l = secao(ws, l + 1, 'Linhas do Relatório SLDST: sugestão do robô × o que foi copiado para a macro', 6);
            l = tabela(ws, l, [{ h: 'Linha', k: 'linha' }, { h: 'Verificação', k: 'texto', larga: true }, { h: 'Robô', k: 'robo', tipo: 'res' }, { h: 'Decisão', k: 'decisao', tipo: 'res' }, { h: 'Observação', k: 'obs', larga: true }, { h: 'Alterada na tela', k: 'editado' }], m.decisao);
            if (m.amostraQtd) l = nota(ws, l, `Amostragem do mês: ${m.amostraQtd} terceirizado(s), escolhidos pela macro entre os conferidos sem pendência, começando por quem ainda não foi conferido no ano.`, 6);
        }

        // v2.5.22: DCTFWeb, DARF e PER/DCOMP — o detalhe dos itens DARF 1 a 6
        if (m.dctf || m.checklist.some(c => c.k && /^DARF/.test(c.k))) {
            const d = m.dctf;
            ws = novaAba('DCTFWeb', [26, 34, 16, 16, 16, 16, 30, 40, 30]);
            l = titulo(ws, 'DARF, DCTFWeb e PER/DCOMP: como os itens DARF 1 a 6 foram conferidos', ident, 9);
            l = secao(ws, l, 'Itens do relatório (observação objetiva) e explicação', 9);
            l = tabela(ws, l, [{ h: 'Item', k: 'item' }, { h: 'O que o relatório exige', k: 'texto', larga: true }, { h: 'Regular', k: 'resultado', tipo: 'res' }, { h: 'Observação (vai para o relatório)', k: 'obs', larga: true }, { h: 'Explicação e o que pedir', k: 'evid', larga: true }],
                m.checklist.filter(c => /^DARF/.test(c.k || '')).map(c => ({ ...c, item: `DARF/DCTFWeb ${c.n}` })));
            if (d) {
                const dc = d.declaracao;
                l = secao(ws, l + 1, 'Declaração usada: a da competência com a transmissão mais recente', 9);
                l = tabela(ws, l, [{ h: 'Campo', k: 0 }, { h: 'Valor', k: 1, larga: true }], (dc ? [
                    ['Nº do recibo de entrega', dc.recibo], ['Retificadora', dc.retificadora === null ? 'não informado' : dc.retificadora ? 'Sim' : 'Não'],
                    ['Declaração retificada (nº)', dc.retificada || '—'], ['Transmissão', dc.dataHora || '—'], ['CNPJ', dc.cnpj || '—'], ['Período de apuração', dc.pa],
                    ['Relatórios juntados', dc.relatorios.map(x => ({ recibo: 'Recibo de entrega', debitos: 'Relatório de débitos', creditos: 'Relatório de créditos', completa: 'Declaração completa', resumoCreditos: 'Resumo de créditos', resumoDebitos: 'Resumo de débitos', creditosDocumento: 'Créditos por documento - compensação' }[x] || x)).join(', ')],
                    ['Compensação por DComp lida de', ({ completa: 'Relatório da declaração completa', creditosDocumento: 'Relatório de créditos por documento', creditos: 'Relatório de créditos' }[dc.fonteComp]) || '—'],
                    ['Transmitida com certificado de', dc.assinadoPor || '—'], ['Arquivo(s)', dc.arquivos],
                ] : [['Declaração', 'Recibo e relatórios da DCTFWeb não encontrados']]).map(x => ({ 0: x[0], 1: x[1] })));
                if (d.outrasVersoes.length) l = nota(ws, l, `Outras versões juntadas (não usadas): ${d.outrasVersoes.map(o => `nº ${o.recibo} (${o.dataHora || 'sem data'}, ${o.pa})`).join('; ')}.`, 9);
                if (d.totais.length) {
                    l = secao(ws, l + 1, 'Recibo de entrega: totalização por tributo', 9);
                    l = tabela(ws, l, [{ h: 'Tributo', k: 'rotulo' }, { h: 'Débitos apurados', k: 'debito', tipo: 'num' }, { h: 'Saldo a pagar', k: 'saldo', tipo: 'num' }],
                        [...d.totais.filter(t => t.debito || t.saldo), { rotulo: 'TOTAL', debito: d.totalDebito, saldo: d.totalSaldo }]);
                }
                if (d.debitos.length) {
                    l = secao(ws, l + 1, 'Relatório de débitos: valor original = deduções + compensação + outros + saldo a pagar', 9);
                    l = tabela(ws, l, [{ h: 'Código', k: 'codigo' }, { h: 'Descrição', k: 'descricao', larga: true }, { h: 'Grupo', k: 'grupo' }, { h: 'Valor original', k: 'original', tipo: 'num' },
                        { h: 'Deduções (retenção, sal.-família e maternidade)', k: 'deducoes', tipo: 'num' }, { h: 'Compensação', k: 'compensacao', tipo: 'num' }, { h: 'Outros (exclusão, suspensão, parcelamento, pagamentos)', k: 'outros', tipo: 'num' },
                        { h: 'Saldo a pagar', k: 'saldo', tipo: 'num' }, { h: 'Fecha', k: 'fecha', tipo: 'res' }], d.debitos, { totais: true });
                }
                if (d.fechamento.length) l = nota(ws, l, `Não fecha: ${d.fechamento.join('; ')}.`, 9, 'FFB71C1C');
                if (d.compensacoesPosteriores?.length) {
                    l = secao(ws, l + 1, 'Conciliação do saldo histórico: compensação posterior e pagamentos', 9);
                    l = tabela(ws, l, [{ h: 'Informação', k: 'info' }, { h: 'Valor', k: 'valor', tipo: 'num' }], [
                        { info: 'Saldo na transmissão da DCTFWeb', valor: d.totalSaldo },
                        { info: 'PER/DCOMP posterior conferida (principal)', valor: d.compensacaoPosterior },
                        { info: 'DARFs pagos com comprovante', valor: d.valorPago },
                        { info: 'Saldo residual documental', valor: d.saldoResidual },
                    ]);
                    l = nota(ws, l, 'Compensação já vinculada integra a declaração histórica e não é subtraída outra vez. A PER/DCOMP posterior não exige retificação da DCTFWeb apenas para vinculá-la. Valores conferidos documentalmente; homologação pela Receita é etapa distinta.', 9);
                }
                l = secao(ws, l + 1, 'DARFs e comprovantes', 9);
                if (d.darfs.length) l = tabela(ws, l, [{ h: 'DARF (nº do documento)', k: 'numero' }, { h: 'Composição', k: 'itens', larga: true }, { h: 'Competência', k: 'pa' }, { h: 'Vencimento', k: 'vencimento' },
                    { h: 'Nº do recibo citado', k: 'recibo' }, { h: 'Valor do DARF', k: 'valor', tipo: 'num' }, { h: 'Pago em', k: 'pagoEm' }, { h: 'Valor pago', k: 'valorPago', tipo: 'num' }, { h: 'Situação', k: 'situacao', larga: true }],
                    d.darfs.map(x => ({ ...x, situacao: `${x.situacao}${x.vinculo ? ` (ligado por ${x.vinculo})` : ''}. ${x.arquivo}` })));
                else l = nota(ws, l, 'Nenhum DARF juntado.', 9);
                if (d.comprovantesSoltos.length) l = nota(ws, l, `Comprovante(s) sem DARF correspondente: ${d.comprovantesSoltos.map(c => `R$ ${P.rs(c.valor)} em ${c.data || '?'} (${c.arquivo})`).join('; ')}.`, 9);
                l = secao(ws, l + 1, `Compensação × PER/DCOMP${d.compensacaoTotal ? ` (compensação na DCTFWeb: R$ ${P.rs(d.compensacaoTotal)})` : ''}`, 9);
                if (d.dcomps.length) {
                    const linhas = d.dcomps.flatMap(x => (x.grupos.length ? x.grupos : [{ grupo: '—', dctf: null, dcomp: null }]).map((g, i) => ({
                        numero: i ? '' : x.numero, juntada: i ? '' : x.juntada, grupo: g.grupo, dctf: g.dctf ?? g.saldoDctf, dcomp: g.dcomp,
                        confere: g.confere || (g.dctf === null || g.dcomp === null ? '—' : g.dctf === g.dcomp ? 'Sim' : 'Não'),
                        transmissao: i ? '' : [x.transmissao && `transmitida em ${x.transmissao}`, x.vencimento && `vencimento ${x.vencimento}`].filter(Boolean).join('; '),
                        dados: i ? '' : [x.situacao, x.cnpj && `CNPJ ${x.cnpj}`, x.citaRecibo && x.citaRecibo !== '—' && `cita o recibo nº ${x.citaRecibo}`, x.comparacaoPorSaldo ? 'Confronto com o saldo histórico por código; não exige retificadora apenas para informar compensação' : x.refletida === 'Não' && 'compensação não vinculada no documento histórico',
                            x.tipoCredito && `crédito: ${x.tipoCredito}`, x.saldoCredito !== null && x.saldoCredito !== undefined && `saldo do crédito original R$ ${P.rs(x.saldoCredito)}`, x.demonstrativo && `demonstrativo do crédito: nº ${x.demonstrativo}`,
                            /sim/i.test(x.acaoJudicial || '') && 'crédito oriundo de ação judicial', x.arquivo].filter(Boolean).join('; ') })));
                    l = tabela(ws, l, [{ h: 'DComp', k: 'numero' }, { h: 'Juntada', k: 'juntada' }, { h: 'Grupo', k: 'grupo' }, { h: 'Referência na DCTFWeb (vinculado ou saldo histórico)', k: 'dctf', tipo: 'num' }, { h: 'Débito na PER/DCOMP', k: 'dcomp', tipo: 'num' },
                        { h: 'Confere', k: 'confere', tipo: 'res' }, { h: 'Transmissão', k: 'transmissao', larga: true }, { h: 'Dados da PER/DCOMP', k: 'dados', larga: true }], linhas);
                    l = nota(ws, l, 'A compensação extingue o débito sob condição de homologação pela Receita, em até 5 anos (Lei 9.430/1996, art. 74). A situação é acompanhada pela CND federal.', 9);
                } else l = nota(ws, l, 'A DCTFWeb não indica compensação e nenhuma PER/DCOMP da competência foi juntada.', 9);
            }
        }

        // Presença
        const colsPres = [{ h: 'CPF', k: 'cpf' }, { h: 'Terceirizado (SEGEST)', k: 'nome' }, { h: 'Posto de trabalho', k: 'posto' }, { h: 'Localidade', k: 'localidade' },
            { h: 'Na folha (matrícula)', k: 'folha', tipo: 'sn' }, { h: `No ${m.rotuloPresenca || m.rotuloInss || 'S-5001'}`, k: 's5001', tipo: 'sn' }, { h: 'No FGTS Digital', k: 'fgts', tipo: 'sn' },
            { h: 'Situação', k: 'situacao', tipo: 'sit' }, { h: 'Observação', k: 'texto', larga: true }, { h: 'Ocorrência na SEGEST', k: 'ocorrencia', larga: true }];
        ws = novaAba('Presença', [15, 34, 26, 18, 14, 11, 16, 18, 60, 40]);
        l = titulo(ws, 'Item 3 — Quem está na planilha da SEGEST foi encontrado na folha, no eSocial e no FGTS Digital?', ident, colsPres.length);
        l = nota(ws, l - 1, `${m.presenca.length} pessoas da SEGEST. "Não" em laranja = ausência justificada nas ocorrências da SEGEST; em vermelho = sem justificativa.`, colsPres.length);
        l = tabela(ws, l + 1, colsPres, m.presenca, { filtro: true, congelar: true });
        l = secao(ws, l + 1, `Direção da folha: ${m.folhaTotal} colaboradores · ${m.folhaNoFgts} no FGTS Digital · ${m.folhaNoS5} no S-5001`, colsPres.length);
        if (m.folhaDir.length) tabela(ws, l, [{ h: 'Ocorrência', k: 'tipo', larga: true }, { h: 'Colaborador', k: 'nome' }, { h: 'Centro de custo', k: 'cc', larga: true }, { h: 'Matrícula', k: 'mat' }, { h: 'CPF', k: 'cpf' }], m.folhaDir);
        else nota(ws, l, 'Todos os colaboradores da folha com base de FGTS/INSS estão no FGTS Digital e no S-5001.', colsPres.length, 'FF2E7D32');

        // FGTS
        const colsF = [{ h: 'CPF', k: 'cpf' }, { h: 'Terceirizado (SEGEST)', k: 'nome' }, { h: 'FGTS na folha', k: 'folha', tipo: 'num' }, { h: 'Valor FGTS na Guia (todos os tomadores)', k: 'guia', tipo: 'num' },
            { h: 'Diferença (folha − guia)', k: 'dif', tipo: 'dif', a: 'folha', b: 'guia' }, { h: 'Resultado', k: 'resultado', tipo: 'res' }, { h: 'Base FGTS na folha', k: 'baseFolha', tipo: 'num' }, { h: 'Base FGTS na guia', k: 'baseGuia', tipo: 'num' },
            { h: 'Tomador(es) na guia', k: 'tomadores', larga: true }, { h: 'Situação da pessoa', k: 'situacao', tipo: 'sit' }];
        ws = novaAba('FGTS', [15, 34, 13, 16, 14, 16, 13, 13, 30, 18]);
        l = titulo(ws, 'Item 5 — FGTS da folha × "Valor FGTS na Guia" do FGTS Digital', ident, colsF.length);
        l = nota(ws, l - 1, `Diferença de até R$ ${P.rs(m.tol)} = arredondamento (verde-claro). "—" = não comparado, porque falta um dos lados.`, colsF.length);
        l = tabela(ws, l + 1, colsF, m.fgts, { filtro: true, congelar: true, totais: true });
        const cF = m.conciliacoes.filter(c => /FGTS|GFD|Comprovante/.test(c.documento));
        if (cF.length) { l = secao(ws, l + 1, 'Conciliação com os totais da guia', colsF.length); tabela(ws, l, [{ h: 'Documento', k: 'documento' }, { h: 'Verificação', k: 'descricao', larga: true }, { h: 'Lido', k: 'lido', tipo: 'qtdOuRs' }, { h: 'Informado', k: 'informado', tipo: 'qtdOuRs' }, { h: 'Confere', k: 'conf', tipo: 'res' }], cF.map(c => ({ ...c, conf: c.ok ? 'Confere' : 'Não' }))); }

        // INSS
        const colsI = [{ h: 'CPF', k: 'cpf' }, { h: 'Terceirizado (SEGEST)', k: 'nome' }, { h: 'Base INSS na folha ("INSS Proc")', k: 'baseFolha', tipo: 'num' }, { h: `Base no ${m.rotuloInss || 'S-5001'}`, k: 'baseS5', tipo: 'num' },
            { h: 'Diferença da base', k: 'difBase', tipo: 'dif', a: 'baseFolha', b: 'baseS5' }, { h: 'Resultado (base)', k: 'resBase', tipo: 'res' },
            { h: 'INSS descontado na folha', k: 'descFolha', tipo: 'num' }, { h: `INSS no ${m.rotuloInss || 'S-5001'}`, k: 'descS5', tipo: 'num' }, { h: 'Diferença do desconto', k: 'difDesc', tipo: 'dif', a: 'descFolha', b: 'descS5' }, { h: 'Resultado (desconto)', k: 'resDesc', tipo: 'res' }, { h: 'Situação da pessoa', k: 'situacao', tipo: 'sit' }];
        ws = novaAba('INSS', [15, 34, 15, 15, 13, 16, 13, 13, 13, 16, 18]);
        l = titulo(ws, 'Item 4 — Base de cálculo e desconto do INSS: folha × S-5001 (eSocial)', ident, colsI.length);
        l = nota(ws, l - 1, 'O item 4 é decidido pela base de cálculo. O desconto é comparado como informação adicional.', colsI.length);
        l = tabela(ws, l + 1, colsI, m.inss, { filtro: true, congelar: true, totais: true });
        const cI = m.conciliacoes.filter(c => c.documento === 'S-5001');
        if (cI.length) { l = secao(ws, l + 1, 'Conciliação com os totais do S-5001', colsI.length); tabela(ws, l, [{ h: 'Documento', k: 'documento' }, { h: 'Verificação', k: 'descricao', larga: true }, { h: 'Lido', k: 'lido', tipo: 'qtdOuRs' }, { h: 'Informado', k: 'informado', tipo: 'qtdOuRs' }, { h: 'Confere', k: 'conf', tipo: 'res' }], cI.map(c => ({ ...c, conf: c.ok ? 'Confere' : 'Não' }))); }

        // Fora da SEGEST
        const colsO = [{ h: 'Situação', k: 'situacao', tipo: 'sit' }, { h: 'Vínculo', k: 'vinculo', larga: true }, { h: 'CPF', k: 'cpf' }, { h: 'Nome', k: 'nome' }, { h: 'Na folha', k: 'folha', tipo: 'sn' }, { h: m.rotuloPresenca === 'INSS / eSocial' ? 'INSS / eSocial' : 'No S-5001', k: 's5001', tipo: 'sn' }, { h: 'No FGTS Digital', k: 'fgts', tipo: 'sn' },
            { h: 'FGTS folha', k: 'fgtsFolha', tipo: 'num' }, { h: 'FGTS guia', k: 'fgtsGuia', tipo: 'num' }, { h: 'Dif. FGTS', k: 'difFgts', tipo: 'dif', a: 'fgtsFolha', b: 'fgtsGuia' },
            { h: 'INSS folha', k: 'inssFolha', tipo: 'num' }, { h: 'INSS relatório', k: 'inssS5', tipo: 'num' }, { h: 'Dif. INSS', k: 'difInss', tipo: 'dif', a: 'inssFolha', b: 'inssS5' }, { h: 'Observação', k: 'texto', larga: true }];
        ws = novaAba('Fora da SEGEST', [18, 30, 15, 32, 14, 10, 16, 11, 11, 11, 11, 11, 11, 60]);
        l = titulo(ws, 'Nos documentos e fora da planilha da SEGEST', ident, colsO.length);
        l = nota(ws, l - 1, 'Quem está na folha, no relatório do INSS ou no FGTS com tomador TRT e não está na planilha da SEGEST, mais os substitutos citados nas ocorrências.', colsO.length);
        tabela(ws, l + 1, colsO, m.fora, { filtro: true, congelar: true });

        return wb.xlsx.writeBuffer();
    };

    // ---- página para imprimir / salvar em PDF ----
    // v2.5.8: a memória em PDF traz só as pendências, agrupadas por tipo, com o que cada grupo significa
    // e o que pedir. A conferência completa, pessoa por pessoa, fica na memória em Excel.
    P.memoriaHtml = (m) => {
        const e = (v) => String(v ?? '').replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
        const res = (v) => `<td class="res ${v === 'Não' || v === 'Não fecha' ? 'div' : v === 'Pendente' || v === '—' ? 'pend' : v === 'Não se aplica' ? 'na' : 'igual'}">${e(v === '—' ? 'Pendente' : v)}</td>`;
        const ident = `${e(m.empresa)} · CNPJ ${e(m.cnpj)} · Contrato ${e(m.contrato || '—')} · Competência ${e(m.competencia)}${m.proad ? ` · PROAD ${e(m.proad)}` : ''}`;
        const itemRot = (c) => `${c.secao.replace('Análise da Guia do FGTS Digital - GFD', 'GFD').replace('Análise FGTS Digital', 'FGTS Digital')} ${c.n}`;
        const r = m.resumoPdf;
        const comLinhas = m.grupos.filter(g => g.linhas.length);
        const celula = (c, v) => {
            if (c.tipo === 'num') {
                if (v === null || v === undefined) return '<td class="num na">—</td>';
                return `<td class="num${c.k === 'dif' ? ' div' : ''}">${P.rs(v)}</td>`;
            }
            return `<td${c.larga ? '' : ' class="curta"'}>${e(v)}</td>`;
        };
        const tabela = (g) => `<table class="fixa"><colgroup>${g.cols.map(c => `<col${c.w ? ` style="width:${c.w}%"` : ''}>`).join('')}</colgroup>
            <thead><tr>${g.cols.map(c => `<th>${e(c.h)}</th>`).join('')}</tr></thead>
            <tbody>${g.linhas.map(l => `<tr>${g.cols.map(c => celula(c, l[c.k])).join('')}</tr>`).join('')}</tbody></table>`;
        const css = `
            @page { size: A4 landscape; margin: 9mm; }
            * { box-sizing: border-box; }
            body { font-family: Arial, Helvetica, sans-serif; font-size: 8.5pt; color: #263238; margin: 0; }
            .barra { position: sticky; top: 0; background: #00695c; color: #fff; padding: 8px 14px; display: flex; gap: 12px; align-items: center; z-index: 2; }
            .barra button { font: inherit; font-weight: 700; padding: 6px 14px; border: 0; border-radius: 4px; background: #fff; color: #00695c; cursor: pointer; }
            main { padding: 10px 14px; }
            h1 { font-size: 13pt; color: #00695c; margin: 0 0 2px; }
            h2 { font-size: 10.5pt; color: #00695c; background: #e0f2f1; padding: 3px 6px; margin: 14px 0 4px; page-break-after: avoid; }
            h2 .qtd { float: right; font-weight: 700; }
            .ident { color: #546e7a; font-size: 8pt; } .nota { color: #546e7a; font-style: italic; margin: 4px 0; }
            p.explica { margin: 2px 0; page-break-after: avoid; } p.pedir { margin: 2px 0 4px; page-break-after: avoid; } p.pedir b { color: #00695c; }
            table { border-collapse: collapse; width: 100%; margin: 4px 0 8px; } thead { display: table-header-group; } tr { page-break-inside: avoid; }
            th { background: #00695c; color: #fff; font-weight: 700; padding: 3px 4px; border: 1px solid #cfd8dc; text-align: center; vertical-align: middle; -webkit-print-color-adjust: exact; print-color-adjust: exact; }
            td { padding: 2px 4px; border: 1px solid #cfd8dc; vertical-align: top; -webkit-print-color-adjust: exact; print-color-adjust: exact; }
            table.fixa { table-layout: fixed; } table.fixa td { overflow-wrap: anywhere; }
            td.num { text-align: right; white-space: nowrap; } td.res { text-align: center; white-space: nowrap; font-weight: 700; }
            .igual { color: #2e7d32; } .div { background: #ffcdd2; color: #b71c1c; font-weight: 700; } .pend { background: #fff9c4; color: #795548; } .na { color: #9e9e9e; }
            .indice td:last-child, .placar td:last-child { text-align: right; font-weight: 700; width: 110px; }
            .indice a { color: #00695c; text-decoration: none; } .zero { color: #2e7d32; }
            .ok { color: #2e7d32; font-weight: 700; }
            ul.ler li { margin: 2px 0; }
            @media print { .barra { display: none; } main { padding: 0; } }`;
        const resumo = `<header><h1>${e(m.titulo)}</h1><div class="ident">${ident}</div><p class="nota">Gerada pelo robô em ${e(m.geradoEm.toLocaleString('pt-BR'))}. Esta memória lista só as pendências; a conferência completa, pessoa por pessoa, está na memória em Excel.</p></header>
            <h2>Documentos analisados</h2><table><thead><tr><th>Documento</th><th>Arquivo</th><th>O que foi lido</th></tr></thead><tbody>${m.docs.map(d => `<tr><td>${e(d[0])}</td><td>${e(d[1])}</td><td>${e(d[2])}</td></tr>`).join('')}</tbody></table>
            <h2>Resultado da conferência</h2><table class="placar"><tbody>
                <tr><td>Pessoas na planilha da SEGEST (lista-base, conferida por inteiro)</td><td>${r.total}</td></tr>
                <tr><td>Conferidas sem pendência</td><td>${r.semPend}</td></tr>
                <tr><td>Amostragem do mês: mínimo de ${r.percentual}% da SEGEST, escolhido pela macro entre as conferidas sem pendência</td><td>${r.minimo}</td></tr>
                <tr><td>Ausências justificadas, que não são pendência${r.motivosJ ? ` (${e(r.motivosJ)})` : ''}</td><td>${r.justif}</td></tr>
                <tr><td>Diferenças só de arredondamento (até R$ ${P.rs(m.tol)}), que não são pendência</td><td>${r.arred}</td></tr>
                <tr><td>Pessoas da SEGEST com pendência</td><td>${r.comPend}</td></tr></tbody></table>
            <h2>Pendências por grupo</h2><table class="indice"><tbody>${m.grupos.map(g => `<tr><td>${g.linhas.length ? `<a href="#g-${g.id}">${e(g.titulo)}</a>` : e(g.titulo)}</td><td class="${g.linhas.length ? '' : 'zero'}">${g.linhas.length || 'nenhuma'}</td></tr>`).join('')}</tbody></table>
            <h2>Checklist do relatório</h2><table class="fixa"><colgroup><col style="width:10%"><col style="width:32%"><col style="width:8%"><col></colgroup><thead><tr><th>Item</th><th>Verificação</th><th>Regular</th><th>Observação</th></tr></thead><tbody>${m.checklist.map(c => `<tr><td>${e(itemRot(c))}</td><td>${e(c.texto)}</td>${res(c.resultado)}<td>${e(c.obs)}</td></tr>`).join('')}</tbody></table>
            <p class="nota">Os itens de SICAF e SEFIP/RET continuam conferidos manualmente. O detalhe dos itens DARF e DCTFWeb está na aba DCTFWeb da memória em Excel.</p>`;
        const blocos = comLinhas.length ? comLinhas.map(g => `<h2 id="g-${g.id}">${e(g.titulo)}<span class="qtd">${g.linhas.length}</span></h2>
            <p class="explica">${e(g.explica)}</p><p class="pedir"><b>O que pedir:</b> ${e(g.pedir)}</p>${tabela(g)}`).join('')
            : '<h2>Pendências</h2><p class="ok">Nenhuma pendência: todos os documentos e todas as pessoas da SEGEST conferem.</p>';
        const ler = `<h2>Como ler esta memória</h2><ul class="ler">
            <li>A lista-base é a planilha da SEGEST. Cada pessoa é procurada na folha, no ${e(m.rotuloInss)} e na guia do FGTS Digital pelo CPF; sem CPF, pela matrícula com nome compatível; sem os dois, pelo nome, quando ele é único.</li>
            <li>Uma pessoa aparece em cada grupo em que se enquadra. Quem confere sem pendência não aparece aqui.</li>
            <li>Diferença de até R$ ${P.rs(m.tol)} é arredondamento e não é pendência.</li>
            ${(m.comoLer || []).filter(t => /^Escopo|^Estabelecimentos/.test(t)).map(t => `<li>${e(t)}</li>`).join('')}</ul>`;
        return `<!doctype html><html lang="pt-BR"><head><meta charset="utf-8"><title>${e(P.nomeArquivoMemoria(m, 'pdf').replace(/\.pdf$/, ''))}</title><style>${css}</style></head>
            <body><div class="barra"><b>${e(m.titulo)} · ${e(m.competencia)}</b><button onclick="window.print()">🖨️ Imprimir / Salvar como PDF</button><span>No destino da impressão, escolha "Salvar como PDF". Orientação: paisagem.</span></div>
            <main>${resumo}${blocos}${ler}</main></body></html>`;
    };

    // v2.5.4 — Diagnóstico passivo: conserva texto e saídas dos leitores sem mudar cálculos.
    P.copiaDiagnostico = (v) => JSON.parse(JSON.stringify(v, (k, x) =>
        x instanceof Map ? { tipo: 'Map', entradas: [...x].map(([chave, valor]) => ({ chave, valor })) }
            : x instanceof Set ? { tipo: 'Set', valores: [...x] } : x));

    P.camposDiagnostico = (r) => {
        const out = {};
        for (const k of ['baseInss', 'baseFgts', 'inss', 'fgts', 'b11', 'b11x', 'b19', 'd21', 'd21x',
            'base13', 'inss13', 'base', 'valor', 'total', 'totalFgts', 'totalDocumento', 'valorFgts', 'valorConsignado']) {
            if (!Object.prototype.hasOwnProperty.call(r, k)) continue;
            const v = r[k];
            const ausente = v === null || v === undefined || v === ''
                || k === 'inss' && r.temInss === false || k === 'fgts' && r.temFgts === false
                || /^b(?:11|19)/.test(k) && r._semBase === true || /^d21/.test(k) && r._semDesconto === true;
            out[k] = { valorInterno: v ?? null, valorParaConferencia: ausente ? null : v,
                unidade: 'centavos de real', formatado: ausente ? null : P.rs(v),
                estado: ausente ? 'nao_identificado' : v === 0 ? 'zero_no_leitor_sem_prova_literal' : 'interpretado_pelo_leitor',
                origem: k === 'inss' && r.rubricasInss?.length ? 'soma_das_rubricas_com_sinal' : 'saida_do_leitor; pode incluir soma ou valor inicial',
            };
        }
        return out;
    };

    P.registrosDiagnostico = (lido, tipo, paginas) => {
        const registros = [];
        const indice = paginas.map(p => ({ ...p, nomeNormalizado: P.nome(p.texto),
            cpfs: new Set((p.texto.match(/\b\d{3}\.\d{3}\.\d{3}-\d{2}\b|\b\d{11}\b/g) || []).map(P.dig)) }));
        for (const colecao of ['colaboradores', 'trabalhadores', 'auxiliares', 'semIdentificacao', 'linhas', 'guias', 'tomadores', 'estabelecimentos', 'gfds', 'comprovantes']) {
            const valor = lido[colecao];
            const entradas = valor instanceof Map ? [...valor] : Array.isArray(valor) ? valor.map((v, i) => [i, v]) : [];
            for (const [chave, r] of entradas) {
                if (!r || typeof r !== 'object') continue;
                const cpf = P.cpf(r.cpf), nome = P.nome(r.nome), mat = String(r.mat || r.matFolha || '');
                const referencias = [];
                for (const p of indice) {
                    let criterio = '';
                    if (cpf && p.cpfs.has(cpf)) criterio = 'ocorrencia_do_cpf';
                    else if (nome.length >= 6 && p.nomeNormalizado.includes(nome)) {
                        const mesmaMat = /^\d+$/.test(mat) && new RegExp('(?:^|\\D)0*' + mat.replace(/^0+/, '') + '(?=\\D|$)').test(p.texto);
                        criterio = mesmaMat ? 'nome_e_matricula_na_mesma_pagina' : 'ocorrencia_do_nome';
                    } else if (r.identificador && p.texto.includes(r.identificador)) criterio = 'ocorrencia_do_identificador';
                    else if (colecao === 'guias' && r.numero && p.texto.includes(r.numero)) criterio = 'ocorrencia_do_numero_da_guia';
                    else if (colecao === 'semIdentificacao' && Number(r.pagina) === p.indiceNoGrupo) criterio = 'pagina_informada_pelo_leitor';
                    else if (colecao === 'comprovantes' && (r.indicesPaginas || [r.indicePagina]).includes(p.indiceNoGrupo - 1)) criterio = 'pagina_informada_pelo_leitor_do_comprovante';
                    if (!criterio) continue;
                    const ls = p.texto.split('\n');
                    let i = ls.findIndex(l => cpf && P.dig(l).includes(cpf) || nome.length >= 6 && P.nome(l).includes(nome)
                        || r.identificador && l.includes(r.identificador) || colecao === 'guias' && r.numero && l.includes(r.numero));
                    if (i < 0) i = 0;
                    const inicio = Math.max(0, i - 2), fim = Math.min(ls.length, i + 4);
                    referencias.push({ pagina: p.numero, criterio, metodo: p.metodo, linhaInicial: inicio + 1,
                        linhaFinal: fim, trecho: ls.slice(inicio, fim).join('\n'),
                        certeza: 'localizacao_textual; nao comprova a origem de cada valor' });
                }
                registros.push({ id: `${tipo}.${colecao}.${chave}`, colecao, chave, dados: P.copiaDiagnostico(r),
                    camposMonetarios: P.camposDiagnostico(r), referenciasTextuais: referencias,
                    rastreamento: referencias.length ? 'identificador_localizado; confirmar valores no texto integral'
                        : 'sem_localizacao_textual; conferir nas paginas do grupo',
                });
            }
        }
        return registros;
    };

    function guardarSaidaDiagnostico(doc, tipo, lido, numeros) {
        if (!doc) return;
        try {
            const paginas = numeros.map((n, i) => ({ ...doc.paginas[n - 1], indiceNoGrupo: i + 1 }));
            // Localização da evidência, sem apresentar esta referência como prova de cada campo.
            for (const registro of P.registrosDiagnostico(lido, tipo, paginas)) {
                const colecao = lido[registro.colecao];
                const item = colecao instanceof Map ? colecao.get(registro.chave) : colecao?.[registro.chave];
                if (item && !item.fontes?.length) item.fontes = registro.referenciasTextuais.map(ref => ({ arquivo: doc.arquivo, pagina: ref.pagina, metodo: ref.metodo }));
            }
            doc.extracoes.push({ tipo, paginas: numeros, dadosDoLeitor: P.copiaDiagnostico(lido),
                registros: P.registrosDiagnostico(lido, tipo, paginas) });
        } catch (e) { doc.avisos.push(`Falha ao registrar saída de ${tipo} no diagnóstico: ${e.message}`); }
    }

    function novoDocumentoDiagnostico(arquivo, tipo = 'pdf') {
        const d = { id: `doc-${EST.diagnosticos.length + 1}`, arquivo: arquivo.name, tipo,
            tamanhoBytes: arquivo.size ?? null, ultimaModificacao: arquivo.lastModified ? new Date(arquivo.lastModified).toISOString() : null,
            lidoEm: new Date().toISOString(), sha256: null, estado: 'lendo', totalPaginas: null,
            paginas: [], extracoes: [], avisos: [], erro: null };
        EST.diagnosticos.push(d); return d;
    }

    async function identificarBytesDiagnostico(doc, buf) {
        doc.tamanhoBytes = buf.byteLength;
        try {
            if (!globalThis.crypto?.subtle) throw new Error('recurso indisponível neste contexto');
            const hash = await globalThis.crypto.subtle.digest('SHA-256', buf);
            doc.sha256 = [...new Uint8Array(hash)].map(b => b.toString(16).padStart(2, '0')).join('');
        } catch (e) { doc.avisos.push(`Hash SHA-256 não calculado: ${e.message}. O texto permanece disponível.`); }
    }

    async function guardarSegestDiagnostico(arq, buf, wb, lido) {
        const d = novoDocumentoDiagnostico(arq, 'planilha');
        try {
            await identificarBytesDiagnostico(d, buf);
            // Células usadas, incluindo fórmulas e valor em cache, sem interferir na importação.
            d.abas = wb.SheetNames.map(nome => ({ nome, intervalo: wb.Sheets[nome]['!ref'] || null,
                celulas: Object.fromEntries(Object.entries(wb.Sheets[nome]).filter(([k]) => !k.startsWith('!'))
                    .map(([endereco, c]) => [endereco, { tipo: c.t ?? null, valor: c.v ?? null, texto: c.w ?? null, formula: c.f ?? null }])) }));
            d.dadosDoLeitor = P.copiaDiagnostico(lido); d.estado = 'concluido';
            EST.diagFontes.segest = d.id;
        } catch (e) { d.estado = 'erro_no_diagnostico'; d.erro = e.message; }
    }

    P.montarDiagnostico = (estado, meta = {}) => {
        const vinculado = estado.s5001 ? P.ligarAuxiliaresPrev(estado.s5001, estado.folha, estado.fgts, estado.segest) : null;
        const documentos = P.copiaDiagnostico(estado.diagnosticos || []);
        const paginas = documentos.flatMap(d => d.paginas);
        return {
            formato: 'SIGEO_DIAGNOSTICO_LEITURA', versaoFormato: 1, versaoRobo: PREV_VERSAO, geradoEm: new Date().toISOString(),
            proad: meta.proad || '', competencia: estado.segest?.competencia || estado.folha?.competencia || estado.s5001?.competencia || '',
            instrucoes: [
                'Este diagnóstico registra leitura e interpretação; não certifica que todos os campos do documento foram reconhecidos corretamente.',
                'Os PDFs originais não estão neste ZIP. O SHA-256, quando disponível, identifica os bytes usados na leitura.',
                'Texto por página = texto ordenado pelo robô ou texto reconhecido por OCR; não é uma cópia visual do PDF.',
                'Todos os registros devolvidos pelos leitores estão em documentos[].extracoes, inclusive fora da SEGEST e fontes substituídas.',
                'Mapas são representados por {tipo: Map, entradas: [{chave, valor}]}; conjuntos por {tipo: Set, valores: [...]}.',
                'Campos monetários dos leitores previdenciários estão em CENTAVOS DE REAL (15835 = R$ 158,35). Valores da SEGEST e células mantêm a unidade original.',
                'null, campo omitido e temInss/temFgts=false não equivalem a zero. Zeros internos podem ser valores iniciais do leitor, sem zero impresso.',
                'referenciasTextuais localizam identificadores na página; não comprovam a atribuição de cada valor. Consulte o texto integral e o PDF.',
                'Classificação por continuidade significa que a página herdou o tipo da anterior, sem reconhecimento direto naquele conteúdo.',
                'dadosAtivos mostra as fontes efetivamente usadas. Vínculos e comparações são derivados e ficam separados dos dados por documento.',
            ],
            resumo: { arquivos: documentos.length, paginasDeclaradas: documentos.reduce((s, d) => s + (d.totalPaginas || 0), 0),
                paginasComTextoRegistrado: paginas.filter(p => p.texto?.trim()).length,
                paginasViaOcr: paginas.filter(p => p.metodo === 'ocr').length,
                paginasSemTextoOuComErro: paginas.filter(p => !p.texto?.trim() || p.erro).length,
                paginasSemClassificacao: paginas.filter(p => !p.tipoUsado).length,
                registrosPorDocumento: documentos.map(d => ({ id: d.id, arquivo: d.arquivo, estado: d.estado,
                    extracoes: d.extracoes.map(e => ({ tipo: e.tipo, registros: e.registros.length,
                        porColecao: e.registros.reduce((a, r) => { a[r.colecao] = (a[r.colecao] || 0) + 1; return a; }, {}),
                        semReferenciaTextual: e.registros.filter(r => !r.referenciasTextuais.length).length })) })),
            },
            documentos,
            dadosAtivos: { fontes: P.copiaDiagnostico(estado.diagFontes || {}), arquivos: P.copiaDiagnostico(estado.arquivos),
                segestOrigem: estado.segestOrigem, segest: P.copiaDiagnostico(estado.segest),
                folha: P.copiaDiagnostico(estado.folha), inss: P.copiaDiagnostico(estado.s5001), documentosInss: P.copiaDiagnostico(estado.inssDocumentos || []), cadastroEsocial: P.copiaDiagnostico(estado.cadastroEsocial), fgts: P.copiaDiagnostico(estado.fgts), fgtsRescisorio: P.copiaDiagnostico(estado.fgtsRescisorio),
                notaSegest: estado.segest && !estado.diagFontes?.segest ? 'Planilha já importada: apenas dados interpretados disponíveis; reimporte neste módulo para registrar células originais.' : '',
            },
            dadosDerivados: { nota: 'Associações e resultados calculados; não são campos diretamente extraídos de um único documento.',
                inssAposVinculoComFolha: P.copiaDiagnostico(vinculado), conferencia: P.copiaDiagnostico(estado.resultado),
            },
            avisos: [...estado.erros, ...estado.errosSegest], leituras: [...estado.leituras],
        };
    };

    P.textoDiagnostico = (d) => {
        const out = ['DIAGNÓSTICO DA LEITURA — SIGEO TERCEIRIZADOS', `Robô: ${d.versaoRobo} | Gerado em: ${d.geradoEm}`,
            `Competência: ${d.competencia || 'não identificada'} | PROAD: ${d.proad || 'não informado'}`, '',
            ...d.instrucoes.map(s => '- ' + s), '', 'RESUMO', JSON.stringify(d.resumo, null, 2), '',
            'AVISOS', ...d.avisos, ''];
        for (const doc of d.documentos) {
            out.push('='.repeat(72), `ARQUIVO ${doc.id}: ${doc.arquivo}`, `Estado: ${doc.estado} | Bytes: ${doc.tamanhoBytes} | SHA-256: ${doc.sha256 || 'indisponível'}`,
                `Páginas declaradas no PDF: ${doc.totalPaginas ?? 'não se aplica'}`, ...doc.avisos, doc.erro ? `ERRO: ${doc.erro}` : '');
            for (const p of doc.paginas) out.push('', `--- PÁGINA ${p.numero} | ${p.metodo} | Tipo: ${p.tipoUsado || 'não reconhecido'} | ${p.classificacao || 'não classificada'} ---`,
                p.erro ? `ERRO: ${p.erro}` : '', p.texto || '[SEM TEXTO EXTRAÍDO]', '');
            if (doc.abas) out.push('CÉLULAS DA PLANILHA (endereço, valor, texto e fórmula)', JSON.stringify(doc.abas, null, 2));
            for (const e of doc.extracoes) out.push(`SAÍDA DO LEITOR: ${e.tipo} | Páginas: ${e.paginas.join(', ')}`,
                JSON.stringify(e.dadosDoLeitor, null, 2), 'RASTREAMENTO DOS REGISTROS', JSON.stringify(e.registros, null, 2));
            if (doc.dadosDoLeitor) out.push('DADOS INTERPRETADOS DA PLANILHA', JSON.stringify(doc.dadosDoLeitor, null, 2));
        }
        out.push('', 'DADOS ATIVOS E FONTES USADAS', JSON.stringify(d.dadosAtivos, null, 2),
            '', 'VÍNCULOS E RESULTADO DA CONFERÊNCIA (DADOS DERIVADOS)', JSON.stringify(d.dadosDerivados, null, 2));
        return out.join('\r\n');
    };

    // ZIP com compressão nativa quando disponível; fallback STORE, sem biblioteca nova.
    P.zipDiagnostico = async (arquivos) => {
        const enc = new TextEncoder(), partes = [], central = [];
        const tabela = new Uint32Array(256);
        for (let n = 0; n < 256; n++) { let c = n; for (let k = 0; k < 8; k++) c = c & 1 ? 0xedb88320 ^ (c >>> 1) : c >>> 1; tabela[n] = c >>> 0; }
        let offset = 0, centroTam = 0;
        const agora = new Date(), hora = (agora.getHours() << 11) | (agora.getMinutes() << 5) | (agora.getSeconds() >> 1),
            data = ((Math.max(1980, agora.getFullYear()) - 1980) << 9) | ((agora.getMonth() + 1) << 5) | agora.getDate();
        for (const arq of arquivos) {
            const nome = enc.encode(arq.nome), bytes = enc.encode(arq.texto);
            if (bytes.length >= 0xffffffff || offset + bytes.length >= 0xffffffff) throw new Error('Diagnóstico excede o tamanho suportado pelo ZIP.');
            let dados = bytes, metodo = 0;
            try {
                if (typeof CompressionStream !== 'undefined') {
                    const comprimido = new Uint8Array(await new Response(new Blob([bytes]).stream().pipeThrough(new CompressionStream('deflate-raw'))).arrayBuffer());
                    if (comprimido.length < bytes.length) { dados = comprimido; metodo = 8; }
                }
            } catch (e) { /* navegadores sem deflate-raw recebem ZIP sem compressão */ }
            let crc = 0xffffffff; for (const b of bytes) crc = tabela[(crc ^ b) & 255] ^ (crc >>> 8); crc = (crc ^ 0xffffffff) >>> 0;
            const h = new Uint8Array(30 + nome.length), v = new DataView(h.buffer);
            v.setUint32(0, 0x04034b50, true); v.setUint16(4, 20, true); v.setUint16(6, 0x800, true); v.setUint16(8, metodo, true);
            v.setUint16(10, hora, true); v.setUint16(12, data, true); v.setUint32(14, crc, true);
            v.setUint32(18, dados.length, true); v.setUint32(22, bytes.length, true); v.setUint16(26, nome.length, true); h.set(nome, 30);
            partes.push(h, dados);
            const c = new Uint8Array(46 + nome.length), cv = new DataView(c.buffer);
            cv.setUint32(0, 0x02014b50, true); cv.setUint16(4, 20, true); cv.setUint16(6, 20, true); cv.setUint16(8, 0x800, true); cv.setUint16(10, metodo, true);
            cv.setUint16(12, hora, true); cv.setUint16(14, data, true); cv.setUint32(16, crc, true);
            cv.setUint32(20, dados.length, true); cv.setUint32(24, bytes.length, true); cv.setUint16(28, nome.length, true);
            cv.setUint32(42, offset, true); c.set(nome, 46); central.push(c); centroTam += c.length; offset += h.length + dados.length;
        }
        const fim = new Uint8Array(22), fv = new DataView(fim.buffer); fv.setUint32(0, 0x06054b50, true);
        fv.setUint16(8, arquivos.length, true); fv.setUint16(10, arquivos.length, true);
        fv.setUint32(12, centroTam, true); fv.setUint32(16, offset, true);
        return new Blob([...partes, ...central, fim], { type: 'application/zip' });
    };

    async function baixarDiagnostico() {
        if (EST.lendo || LOCAL.carregando || !EST.diagnosticos.length && !EST.segest) return;
        const b = document.getElementById('prev-diagnostico');
        if (b) { b.disabled = true; b.textContent = '⏳ Preparando diagnóstico…'; }
        try {
            await new Promise(r => setTimeout(r, 0));
            const d = P.montarDiagnostico(EST, { proad: LOCAL.proad }),
                zip = await P.zipDiagnostico([{ nome: 'Leitura_completa.txt', texto: '\ufeff' + P.textoDiagnostico(d) },
                    { nome: 'Dados_extraidos.json', texto: JSON.stringify(d, null, 2) }]);
            const carimbo = d.geradoEm.replace(/[:.]/g, '-');
            baixarArquivo(zip, `Diagnostico_Leitura_${d.competencia || 'sem-competencia'}_${carimbo}.zip`, 'application/zip');
            mostrarSucessoSnackbar('Diagnóstico baixado: TXT com o texto das páginas e JSON com os dados e as fontes. Envie junto com os documentos para comparar.');
        } catch (e) { console.error('[SIGEO-Terceirizados] Diagnóstico da leitura:', e); mostrarErroSnackbar(`Não foi possível gerar o diagnóstico: ${e.message}`); }
        finally { if (b) { b.disabled = !!EST.lendo || !!LOCAL.carregando; b.textContent = '🔎 Baixar diagnóstico da leitura'; } }
    }


    // ---------- estado do módulo (só em memória; nada sai do navegador) ----------
    /* ====================================================================================
     * 14.1 DARF, DCTFWeb E PER/DCOMP (v2.5.22)
     * ------------------------------------------------------------------------------------
     * Seção "Análise do DARF e da DCTFWeb" do Relatório SLDST (POP_SLDST_002): os três itens do
     * POP (dados da contratada, competência, pagamento) mais o número do recibo e dois itens
     * para a compensação, que só se aplicam quando a DCTFWeb indica compensação ou quando há
     * PER/DCOMP juntada. A observação de cada item traz só identificadores (números, valores e
     * datas); a explicação e o que pedir à empresa ficam na memória da conferência (aba DCTFWeb).
     * Todos os documentos são da Receita Federal (layouts fixos): recibo e relatórios da DCTFWeb,
     * DARF gerado pelo Sicalc/DCTFWeb, recibo e extrato da PER/DCOMP e o comprovante bancário.
     * ==================================================================================== */
    // Comprovação mensal do PIS/COFINS dispensada (parecer no PROAD 9673/2026, citado no checklist de
    // pagamento dos fiscais). Com true, saldo de PIS/COFINS sem DARF não reprova o item 4.
    P.DCTF_DISPENSA_PIS_COFINS = true;
    P.DCTF_TEXTO_DISPENSA = 'comprovação mensal dispensada (parecer no PROAD 9673/2026)';
    // Os itens DARF1–DARF6 só vão na colagem para o Relatório SLDST quando a macro souber em que
    // linhas eles ficam. Até lá, aparecem na tela e na memória da conferência.
    P.COLAR_DARF_NA_PLANILHA = false;
    P.CHAVES_DARF = ['DARF1', 'DARF2', 'DARF3', 'DARF4', 'DARF5', 'DARF6'];

    const DV = PREV_VALOR;
    const RX_DCOMP = '\\d{5}\\.\\d{5}\\.\\d{6}\\.\\d\\.\\d\\.\\d{2}-\\d{4}';
    const MESES_DCTF = { janeiro: '01', fevereiro: '02', marco: '03', abril: '04', maio: '05', junho: '06', julho: '07', agosto: '08', setembro: '09', outubro: '10', novembro: '11', dezembro: '12' };
    P.reciboDctfPrev = (s) => P.dig(s).replace(/^0+/, '');
    P.dataIsoDctfPrev = (s) => { const m = String(s || '').match(/(\d{2})\/(\d{2})\/(\d{4})/); return m ? `${m[3]}${m[2]}${m[1]}` : ''; };
    P.dataHoraIsoDctfPrev = (s) => { const m = String(s || '').match(/(\d{2})\/(\d{2})\/(\d{4})\s+(\d{2}):(\d{2})(?::(\d{2}))?/); return m ? `${m[3]}${m[2]}${m[1]}${m[4]}${m[5]}${m[6] || '00'}` : ''; };
    P.paDctfPrev = (s) => {
        const t = String(s || '');
        const num = t.match(/\b(\d{2})\/(\d{4})\b/);
        const nome = P.nome(t).toLowerCase().match(/(janeiro|fevereiro|marco|abril|maio|junho|julho|agosto|setembro|outubro|novembro|dezembro)\s*(?:de\s*)?(\d{4})?/);
        if (nome) { const ano = nome[2] || t.match(/\b(20\d{2})\b/)?.[1]; if (ano) return `${ano}-${MESES_DCTF[nome[1]]}`; }
        return num ? `${num[2]}-${num[1]}` : '';
    };
    P.fmtDcompCurtoPrev = (n) => { const m = String(n || '').match(/-(\d{4})$/); return m ? `…-${m[1]}` : String(n || ''); };
    P.grupoDctfPrev = (texto, codigo) => {
        const n = P.nome(texto);
        if (/SEGURADOS/.test(n)) return 'CP Segurados';
        if (/PATRONAL/.test(n)) return 'CP Patronal';
        if (/TERCEIROS|OUTRAS ENTIDADES/.test(n)) return 'CP Terceiros';
        if (/\bCSRF\b|RETIDAS NA FONTE PELAS PJ|RET DE CONTRIBUICOES|RETENCAO PAGT PJ/.test(n)) return 'CSRF';
        if (/\bIRRF\b/.test(n)) return 'IRRF';
        if (/COFINS/.test(n)) return 'COFINS';
        if (/\bPIS\b|PASEP/.test(n)) return 'PIS';
        if (/\bCSLL\b/.test(n)) return 'CSLL';
        if (/\bIRPJ\b/.test(n)) return 'IRPJ';
        const c = String(codigo || '').slice(0, 4);
        if (/^(1082|1099)$/.test(c)) return 'CP Segurados';
        if (/^(1138|1141|1162|1646|2985|2991)$/.test(c)) return 'CP Patronal'; // v2.5.32: CPRB (2985/2991)
        if (/^(1170|1176|1181|1184|1191|1196|1200|1205|1225)$/.test(c)) return 'CP Terceiros';
        if (/^(0561|0588|1708|3208|5706)$/.test(c)) return 'IRRF';
        if (/^(5952|5960|5979|5987)$/.test(c)) return 'CSRF';
        if (/^(5856|2172)$/.test(c)) return 'COFINS';
        if (/^(6912|8109)$/.test(c)) return 'PIS';
        return n ? P.titulo(String(texto).trim()) : '';
    };
    const ehCp = (g) => /^CP /.test(g || '');

    // ---------- classificação da página ----------
    // v2.5.33: códigos de barras de arrecadação da Receita Federal (DARF) no texto: linha digitável com 4 blocos de
    // 11 dígitos + DV, ou o código de 44 dígitos. Sem os DVs dos blocos, o código traz o número do documento do DARF;
    // "0385" nas posições 16 a 19 identifica a Receita Federal (GPS, DAS e guias de FGTS usam outros códigos).
    P.codBarrasDarfPrev = (texto) => {
        const s = String(texto || ''), achados = new Set();
        for (const m of s.matchAll(/(?<!\d)(8\d{10})[ \t.-]?\d[ \t.-]+(\d{11})[ \t.-]?\d[ \t.-]+(\d{11})[ \t.-]?\d[ \t.-]+(\d{11})[ \t.-]?\d(?!\d)/g)) achados.add(m[1] + m[2] + m[3] + m[4]);
        for (const m of s.matchAll(/(?<!\d)(8\d{43})(?!\d)/g)) achados.add(m[1]);
        return [...achados].filter(c => /^8\d{14}0385/.test(c));
    };
    P.ehComprovanteDarfPrev = (texto) => {
        const s = String(texto || '');
        if (/(?:^|\n)\s*(?:De|Para|Assunto|Enviado|Cc)\s*:/.test(s)) return false; // e-mail que só cita o comprovante
        const n = P.nome(s).replace(/\s/g, '');
        // v2.5.33: o Banco do Brasil chama o DARF de "Inst. Nacional de Seguro Social": vale a linha digitável da Receita
        return /COMPROVANTE/.test(n) && (/DARF|RECEITAFEDERAL|DOCUMENTODEARRECADACAO/.test(n) || P.codBarrasDarfPrev(s).length > 0) && !/FGTS|GFD/.test(n);
    };
    P.subtipoDctfPrev = (texto) => {
        const s = String(texto || '');
        if (/RELAT[ÓO]RIO[^\n]{0,70}-\s*DCTFWeb/i.test(s)) return 'relatorio';
        if (/RECIBO DE ENTREGA DA[\s\S]{0,40}DECLARA[ÇC][ÃA]O DE COMPENSA[ÇC][ÃA]O/i.test(s)) return 'dcompRecibo';
        if (/PEDIDO DE RESTITUI[ÇC][ÃA]O, RESSARCIMENTO OU REEMBOLSO E DECLARA[ÇC][ÃA]O DE COMPENSA[ÇC][ÃA]O/i.test(s)) return 'dcompExtrato';
        if (/Recibo de Entrega da Declara[çc][ãa]o de D[ée]bitos e Cr[ée]ditos Tribut[áa]rios Federais|Recibo de Entrega da DCTFWeb|DCTFWeb recebida via Internet/i.test(s)) return 'recibo';
        if (/Documento de Arrecada[çc][ãa]o\s*\n?\s*de Receitas Federais/i.test(s) && /Composi[çc][ãa]o do Documento de Arrecada|N[úu]mero do Documento|Valor Total do Documento/i.test(s)) return 'darf';
        if (P.ehComprovanteDarfPrev(s)) return 'comprovante';
        return '';
    };
    // Continuação sem cabeçalho (linhas de débito, blocos da declaração completa ou da PER/DCOMP)
    P.continuaDctfPrev = (texto) => /^\s*(?:\d{4}-\d{2}|\d{6}\s+-)\s/m.test(String(texto || ''))
        || /D[ée]bito Apurado e Cr[ée]dito Vinculado|N[úu]mero do Processo\s+\d{5}\.|Grupo:\s|C[óo]digo da Receita\/Denomina/i.test(String(texto || ''));
    // Página com os rótulos do comprovante e sem os valores (fonte sem mapeamento de caracteres):
    // o texto existe, mas não serve; vai ao OCR (ex.: comprovante de DARF do Itaú em negrito).
    P.rotulosSemValorPrev = (texto) => {
        const s = String(texto || '');
        const rotulos = s.match(/^\s*(?:agente arrecadador|c[óo]digo de barras|data do pagamento|n[úu]mero do documento|valor total|valor do documento|autentica[çc][ãa]o|nome|ag[êe]ncia e conta|CNPJ)\s*:\s*$/gim) || [];
        return rotulos.length >= 4 && !new RegExp(DV).test(s);
    };

    // ---------- leitores ----------
    P.lerComprovanteDarfPrev = (texto, fonte) => {
        const s = String(texto || '').replace(/(?<=[A-Za-zÀ-ÿ])[ \t]+(?=[À-ÿ])/g, '').replace(/(?<=[À-ÿ])[ \t]+(?=[a-zà-ÿ])/g, '');
        const v = (re) => P.ce(s.match(re)?.[1]);
        const valor = v(new RegExp('(?:valor total|valor da transa[çc][ãa]o|valor final|valor pago|valor do pagamento|valor cobrado|valor do documento)\\s*:?\\s*(?:R\\$\\s*)?(' + DV + ')', 'i'))
            ?? v(new RegExp('^\\s*R\\$\\s*(' + DV + ')\\s*$', 'm'));
        if (valor === null || valor === undefined) return null;
        // v2.5.31: no Pix do Sicoob a data do pagamento vem em "Transferido em"; sem ela, valia a data de geração do comprovante
        const data = s.match(/(?:data d[oe] pagamento|pagamento efetuado em|pagamento realizado em|data da transa[çc][ãa]o|pago em|debitado em|data do d[ée]bito|transa[çc][ãa]o efetuada em|transferido em)\s*:?\s*(\d{2}\/\d{2}\/\d{4})/i)?.[1]
            || s.match(/^\s*(\d{2}\/\d{2}\/\d{4})\s+(?:às|as)\s+\d{2}:\d{2}/im)?.[1] || '';
        const cnpjs = [...s.matchAll(/\b\d{2}\.\d{3}\.\d{3}\/\d{4}-\d{2}\b/g)].map(m => P.dig(m[0])).filter(c => !/^00394460/.test(c));
        const pagador = P.dig(s.match(/CNPJ do (?:pagador|devedor)\s*:?\s*([\d./-]{14,18})/i)?.[1]) || cnpjs[0] || '';
        const codigos = [...new Set(s.split('\n').map(l => P.dig(l)).filter(d => d.length >= 17))];
        // v2.5.33: a linha digitável traz os DVs dos blocos no meio do número do DARF; o código de 44 dígitos não
        for (const c of P.codBarrasDarfPrev(s)) if (!codigos.includes(c)) codigos.push(c);
        const numeroDoc = s.match(/n[úu]mero do documento\s*:?\s*(\d{2}\.\d{2}\.\d{5}\.\d{7}-\d)/i)?.[1] || '';
        const cancelado = /cancelad[oa]|estornad[oa]|n[ãa]o (?:efetuad[oa]|realizad[oa])/i.test(s);
        const agendado = /agendamento|agendad[oa]|a efetivar|pendente de autoriza/i.test(s) && !/pagamento efetuado|transa[çc][ãa]o efetuada/i.test(s);
        return { valor, data, pagador, codigos, numeroDoc, efetivado: !cancelado && !agendado && !!P.dataIsoDctfPrev(data), agendado, cancelado,
            banco: /SISBB|Comprovante BB/i.test(s) ? 'Banco do Brasil' : /Ita[úu] Empresas|itau\.com\.br|Sispag|Banco Ita[úu]/i.test(s) ? 'Itaú' : '', fonte };
    };

    P.lerDarfPaginaPrev = (t) => {
        const s = String(t || '');
        const numero = s.match(/N[úu]mero:[\s—–|]*(\d{2}\.\d{2}\.\d{5}\.\d{7}-\d)/)?.[1] || s.match(/\b(\d{2}\.\d{2}\.\d{5}\.\d{7}-\d)\b/)?.[1] || '';
        const mc = s.match(/(\d{2}\.\d{3}\.\d{3}\/\d{4}-\d{2})[)\]|]*[ \t]+[(\[|]*[ \t]*([^\n]+)/);
        const linhaPa = s.match(/(?:^|\n)\s*([a-zçã]+\/\d{4})\s+(\d{2}\/\d{2}\/\d{4})\s+\d{2}\.\d{2}\./i);
        const itens = [];
        const linhas = s.split('\n');
        for (let i = 0; i < linhas.length; i++) {
            const m = linhas[i].trim().match(new RegExp('^(\\d{4})\\s+(.+?)\\s+((?:' + DV + '\\s+)*' + DV + ')$'));
            if (!m || /^\d{4}\s+(?:\d{5}|\d{1,2}\s)/.test(linhas[i].trim())) continue;
            const vals = P.valoresPrev(m[3]);
            const varia = linhas[i + 1]?.trim().match(/^([0-9O]\d)\s+(.+)$/);
            if (varia) varia[1] = varia[1].replace(/^O/, '0');
            itens.push({ codigo: varia ? `${m[1]}-${varia[1]}` : m[1], denominacao: (varia?.[2] || m[2]).trim(), principal: vals[0], total: vals[vals.length - 1],
                encargos: vals.length > 2 ? vals.slice(1, -1).reduce((a, b) => a + b, 0) : 0 });
        }
        return {
            numero, cnpj: P.dig(mc?.[1] || s.match(/CNPJ:\s*([\d./-]{18})/)?.[1]), razao: (mc?.[2] || '').trim(),
            pa: P.paDctfPrev(linhaPa?.[1] || s.match(/PA:\s*(\d{2}\/\d{4})/)?.[1] || ''),
            vencimento: linhaPa?.[2] || s.match(/Pagar at[ée]:\s*(\d{2}\/\d{2}\/\d{4})/i)?.[1] || '',
            valor: P.ce(s.match(new RegExp('(?:^|\\n)\\s*Valor:\\s*(' + DV + ')'))?.[1] || s.match(new RegExp('Valor Total do Documento\\s*\\n\\s*(' + DV + ')'))?.[1] || s.match(new RegExp('Totais\\s+(?:' + DV + '\\s+)*(' + DV + ')'))?.[1]),
            recibo: P.reciboDctfPrev(s.match(/N[ºo°]\s*Recibo Declara[çc][ãa]o:[\s|\]\[]*(\d+)/i)?.[1]),
            pagina: Number(s.match(/P[áa]gina:\s*(\d+)\s*\/\s*(\d+)/)?.[1] || 1),
            itens,
        };
    };

    P.lerDcompReciboPrev = (t) => {
        const s = String(t || '');
        const campo = (re) => s.match(re)?.[1]?.trim() || '';
        const grupos = {};
        const bloco = s.split(/DADOS DOS D[ÉE]BITOS COMPENSADOS/i)[1]?.split(/\*\s*inclusive/i)[0] || '';
        for (const l of bloco.split('\n')) {
            const m = l.trim().match(new RegExp('^(.+?)\\s+(' + DV + ')$'));
            if (m && !/^VALOR$/i.test(m[1])) { const g = P.grupoDctfPrev(m[1]); grupos[g] = (grupos[g] || 0) + P.ce(m[2]); }
        }
        return {
            numero: campo(new RegExp('N[úu]mero da Declara[çc][ãa]o:\\s*(' + RX_DCOMP + ')')),
            cnpj: P.dig(campo(/CNPJ:\s*([\d./-]{18})/)),
            tipoDocumento: campo(/Tipo de Documento:\s*([^\n]+)/),
            dataTransmissao: campo(/Data de Transmiss[ãa]o:\s*(\d{2}\/\d{2}\/\d{4})/),
            recebidoEm: (() => { const m = s.match(/em\s+(\d{2}\/\d{2}\/\d{4})\s+[àa]s\s+(\d{2}:\d{2}:\d{2})/); return m ? `${m[1]} ${m[2]}` : ''; })(),
            tipoCredito: campo(/Tipo de Cr[ée]dito:\s*([^\n]+)/),
            acaoJudicial: campo(/Oriundo de A[çc][ãa]o Judicial:\s*([^\n]+)/),
            demonstrativo: campo(new RegExp('Demonstrativo do Cr[ée]dito:\\s*(' + RX_DCOMP + ')')),
            valorUtilizado: P.ce(campo(new RegExp('Valor Utilizado nesta Declara[çc][ãa]o de Compensa[çc][ãa]o:\\s*(' + DV + ')'))),
            grupos,
        };
    };

    P.lerDcompExtratoPrev = (numero, texto) => {
        const s = String(texto || '');
        const campo = (rot) => s.match(new RegExp('(?:^|\\n)\\s*' + rot + '\\s+([^\\n]+)', 'i'))?.[1]?.trim() || '';
        const valor = (rot) => P.ce(s.match(new RegExp('(?:^|\\n)\\s*' + rot + '\\s+(' + DV + ')', 'i'))?.[1]);
        const debitos = [];
        const partes = s.split(/(?:^|\n)\s*\d{3}\.\s*D[ée]bito\s+/);
        for (const b of partes.slice(1)) {
            const c = (rot) => b.match(new RegExp('(?:^|\\n)\\s*' + rot + '\\s+([^\\n]+)', 'i'))?.[1]?.trim() || '';
            const vv = (rot) => P.ce(b.match(new RegExp('(?:^|\\n)\\s*' + rot + '\\s+(' + DV + ')'))?.[1]);
            const cod = c('C[óo]digo da Receita\\/Denomina[çc][ãa]o');
            const grupoTexto = c('Grupo de Tributo') || b.split('\n')[0];
            debitos.push({
                grupo: P.grupoDctfPrev(grupoTexto, cod), codigo: cod.match(/^(\d{4}-\d{2})/)?.[1] || '', denominacao: cod.replace(/^\d{4}-\d{2}\s*-\s*/, ''),
                pa: P.paDctfPrev(c('Per[íi]odo de Apura[çc][ãa]o')), paDctf: P.paDctfPrev(c('Per[íi]odo Apura[çc][ãa]o DCTFWeb')),
                vencimento: c('Data de Vencimento do Tributo\\/Quota').match(/\d{2}\/\d{2}\/\d{4}/)?.[0] || '',
                reciboDctf: P.reciboDctfPrev(c('N[úu]mero do Recibo de Transmiss[ãa]o DCTFWeb')),
                dataDctf: c('Data de Transmiss[ãa]o DCTFWeb').match(/\d{2}\/\d{2}\/\d{4}/)?.[0] || '',
                principal: vv('Principal') ?? 0, multa: vv('Multa') ?? 0, juros: vv('Juros') ?? 0, total: vv('Total') ?? 0,
            });
        }
        const inconst = s.match(/acima apontadas\?\s*\n\s*(Sim|N[ãa]o)\b/i)?.[1] || '';
        return {
            numero, cnpj: P.dig(s.match(/(?:^|\n)\s*CNPJ\s+([\d./-]{18})\s+\d{5}\./)?.[1]),
            dataTransmissao: campo('Data de Transmiss[ãa]o').match(/\d{2}\/\d{2}\/\d{4}/)?.[0] || '',
            tipoDocumento: campo('Tipo de Documento'), tipoCredito: campo('Tipo de Cr[ée]dito'),
            retificador: campo('PER\\/DCOMP Retificador'), acaoJudicial: campo('Cr[ée]dito Oriundo de A[çc][ãa]o Judicial'),
            inconstitucionalidade: inconst,
            informadoOutro: campo('Informado em Outro PER\\/DCOMP'), inicial: campo('N[ºo°] do PER\\/DCOMP Inicial').match(new RegExp(RX_DCOMP))?.[0] || '',
            exercicio: campo('Exerc[íi]cio'), periodoCredito: [campo('Data Inicial do Per[íi]odo'), campo('Data Final do Per[íi]odo')].filter(Boolean).join(' a '),
            saldoNegativo: valor('Valor do Saldo Negativo'), creditoOriginal: valor('Cr[ée]dito Original na Data da Entrega'),
            utilizado: valor('Total do Cr[ée]dito Original Utilizado nesta DCOMP'), saldoCredito: valor('Saldo do Cr[ée]dito Original'),
            totalDebitos: valor('Total dos d[ée]bitos desta DCOMP') ?? P.ce(s.match(new RegExp('(?:^|\\n)\\s*TOTAL\\s+(' + DV + ')'))?.[1]),
            debitos,
        };
    };

    // Lê todas as páginas classificadas como DCTFWeb/DARF/PER-DCOMP (de um ou mais arquivos).
    P.lerDctfPrev = (paginas) => {
        const fontes = paginas.fontes || [];
        const r = { declaracoes: [], darfs: [], comprovantes: [], dcomps: [], avisos: [], qtdPaginas: paginas.length };
        // 1) tipo, relatório e recibo de cada página (continuação herda da anterior do mesmo arquivo)
        const info = [], debitosOcrPendentes = [];
        let ant = null;
        paginas.forEach((pg, i) => {
            const t = String(pg || ''), fonte = fontes[i] || { arquivo: '', pagina: i + 1 };
            let sub = P.subtipoDctfPrev(t);
            const mesmoArq = ant && ant.fonte.arquivo === fonte.arquivo;
            const herdou = !sub && mesmoArq && ant.sub;
            if (herdou) sub = ant.sub;
            const x = { t, fonte, sub, rel: '', recibo: '', dcomp: '' };
            if (sub === 'relatorio') {
                const cab = t.match(/RELAT[ÓO]RIO[^\n]{0,70}-\s*DCTFWeb/i)?.[0] || '';
                // v2.5.26: tolera erro comum do OCR ("CREÉDITOS") e sujeira entre o rótulo e o número do recibo
                x.rel = !cab && herdou ? ant.rel : /RESUMO DE D[ÉE]{1,2}B[IÍ]TOS/i.test(cab) ? 'resumoDebitos' : /RESUMO DE CR[ÉE]{1,2}D[IÍ]TOS/i.test(cab) ? 'resumoCreditos'
                    : /POR DOCUMENTO/i.test(cab) ? 'creditosDocumento' : /DECLARA[ÇC][ÃA]O COMPLETA/i.test(cab) ? 'completa'
                    : /D[ÉE]{1,2}B[IÍ]TOS/i.test(cab) ? 'debitos' : /CR[ÉE]{1,2}D[IÍ]TOS/i.test(cab) ? 'creditos' : 'outro';
                const reciboSeparado = P.reciboDctfPrev(t.match(/N[úu]mero do Recibo[ \t|\/:\]\[]*(\d{10,}(?:[ \t]+\d{1,10})+)[ \t]*(?=\n|$)/i)?.[1]);
                x.recibo = (reciboSeparado.length === 14 ? reciboSeparado : '') || P.reciboDctfPrev(t.match(/N[úu]mero do Recibo[\s|\/:\]\[]*(\d{10,})/i)?.[1]) || (herdou ? ant.recibo : '');
            } else if (sub === 'recibo') {
                x.rel = 'recibo';
                x.recibo = P.reciboDctfPrev(t.match(/N[ºo°]\s*do recibo de entrega[\s|\/:\]\[]*(\d{10,})/i)?.[1]);
            } else if (sub === 'dcompExtrato') {
                x.dcomp = t.match(new RegExp('(?:^|\\n)\\s*CNPJ\\s+[\\d./-]{18}\\s+(' + RX_DCOMP + ')'))?.[1] || (herdou ? ant.dcomp : '');
            }
            info.push(x); ant = x;
        });
        // a 1ª página do recibo (totais) não tem o número: vem na página seguinte
        for (let i = info.length - 1; i >= 0; i--) {
            const x = info[i], y = info[i + 1];
            if (x.sub === 'recibo' && !x.recibo && y?.sub === 'recibo' && y.fonte.arquivo === x.fonte.arquivo) x.recibo = y.recibo;
        }
        // 2) agrupa páginas seguidas do mesmo arquivo, tipo e recibo
        const segs = [];
        for (const x of info) {
            const k = `${x.fonte.arquivo}|${x.sub}|${x.rel}|${x.recibo}|${x.dcomp}`;
            const ult = segs[segs.length - 1];
            if (ult && ult.k === k && x.sub !== 'darf' && x.sub !== 'comprovante' && x.sub !== 'dcompRecibo') { ult.textos.push(x.t); ult.fontes.push(x.fonte); }
            else segs.push({ k, sub: x.sub, rel: x.rel, recibo: x.recibo, dcomp: x.dcomp, textos: [x.t], fontes: [x.fonte] });
        }
        const decl = (recibo) => {
            let d = r.declaracoes.find(z => z.recibo === recibo);
            if (!d) { d = { recibo, retificada: '', retificadora: null, dataHora: '', cnpj: '', pa: '', relatorios: [], fontes: [], totais: [], totalDebito: null, totalSaldo: null,
                debitos: [], comp: { completa: [], creditosDocumento: [], creditos: [] }, resumoCreditos: {}, resumoDebitos: [], assinadoPor: '' }; r.declaracoes.push(d); }
            return d;
        };
        const cabecalho = (d, t) => {
            d.cnpj ||= P.dig(t.match(/CNPJ(?:\/CPF)?[\s|:\]\[]+(\d{2}\.\d{3}\.\d{3}\/\d{4}-\d{2})/)?.[1]);
            d.pa ||= P.paDctfPrev(t.match(/Per[íi]odo (?:de )?apura[çc][ãa]o[\s|:\]\[\/]+(\d{2}\/\d{4})/i)?.[1]);
            d.dataHora ||= t.match(/(\d{2}\/\d{2}\/\d{4}\s+\d{2}:\d{2}:\d{2})/)?.[1] || '';
            d.retificada ||= P.reciboDctfPrev(t.match(/N[úu]mero do Recibo da Declara[çc][ãa]o Retificada\s+(\d+)/i)?.[1]);
        };
        const RX_PA = '(\\d{2}\\/\\d{4}|\\d+\\s*[º°ª]\\s*(?:Dec[êe]ndio|Quinzena)|Anual)';
        let darfAtual = null;
        for (const sg of segs) {
            const t = sg.textos.join('\n');
            const fonte = sg.fontes[0];
            if (sg.sub === 'relatorio' || sg.sub === 'recibo') {
                if (!sg.recibo) { r.avisos.push(`${fonte.arquivo}, pág. ${fonte.pagina}: relatório da DCTFWeb sem o número do recibo; não foi usado.`); continue; }
                const d = decl(sg.recibo);
                cabecalho(d, t);
                if (!d.relatorios.includes(sg.rel)) d.relatorios.push(sg.rel);
                d.fontes.push(...sg.fontes);
                if (sg.rel === 'recibo') {
                    d.dataHora = t.match(/recebida via Internet[^\n]*?em\s+(\d{2}\/\d{2}\/\d{4}\s+\d{2}:\d{2}:\d{2})/i)?.[1] || d.dataHora;
                    const ret = t.match(/Declara[çc][ãa]o Retificadora\s+(Sim|N[ãa]o)/i)?.[1];
                    if (ret) d.retificadora = /sim/i.test(ret);
                    d.assinadoPor ||= t.match(/certificado digital por\s+([\d./-]+)/i)?.[1] || '';
                    for (const m of t.matchAll(new RegExp('^\\s*(.+?)\\s+R\\$\\s*(' + DV + ')\\s+R\\$\\s*(' + DV + ')\\s*$', 'gm'))) {
                        if (/^TOTAL$/i.test(m[1].trim())) { d.totalDebito = P.ce(m[2]); d.totalSaldo = P.ce(m[3]); continue; }
                        const grupo = P.grupoDctfPrev(m[1]);
                        if (!d.totais.some(x => x.grupo === grupo)) d.totais.push({ grupo, rotulo: m[1].trim(), debito: P.ce(m[2]), saldo: P.ce(m[3]) });
                    }
                } else if (sg.rel === 'debitos') {
                    let grupo = '', linhas = t.split('\n');
                    for (let i = 0; i < linhas.length; i++) {
                        const l = linhas[i].trim();
                        const mg = l.match(/^Grupo:\s*(.+)$/i); if (mg) { grupo = mg[1]; continue; }
                        let m = l.match(new RegExp('^(\\d{4}-\\d{2})\\s+(.*?)\\s*' + RX_PA + '\\s+((?:' + DV + '\\s+){9}' + DV + ')$'));
                        let codigoOcr = false;
                        if (!m && sg.fontes.some((f, k) => f.metodo === 'ocr' && sg.textos[k].includes(l))) {
                            m = l.match(new RegExp('^(\\d{4}-\\d{3})\\s+(.*?)\\s*' + RX_PA + '\\s+((?:' + DV + '\\s+){9}' + DV + ')$'));
                            codigoOcr = !!m;
                        }
                        if (!m) continue;
                        let desc = m[2].trim();
                        const antes = linhas[i - 1]?.trim() || '', depois = linhas[i + 1]?.trim() || '';
                        if (!desc && antes && !new RegExp(DV + '$').test(antes) && !/^(?:Fam[íi]lia|Original|C[óo]digo|Valor|Outros)/i.test(antes)) desc = antes;
                        let cnpjPrest = '';
                        if (/CNPJ Prest/i.test(desc) || /Incorp\.?\/SCP/i.test(depois)) cnpjPrest = P.dig(depois.match(/(\d{2}\.\d{3}\.\d{3}\/\d{4}-\d{2})/)?.[1]);
                        else if (/^[A-ZÀ-Ú ]+$/.test(depois) && !/^Grupo/i.test(depois) && depois.length < 40) desc = `${desc} ${depois}`.trim();
                        const v = P.valoresPrev(m[4]);
                        const deb = { codigo: m[1], descricao: desc, grupo: P.grupoDctfPrev(grupo || desc, m[1]), pa: m[3], cnpjPrest,
                            original: v[0], exclusao: v[1], suspensao: v[2], parcelamento: v[3], compensacao: v[4], sf: v[5], sm: v[6], retencoes: v[7], pagamentos: v[8], saldo: v[9],
                            fonte: sg.fontes.find((f, k) => sg.textos[k].includes(l)) || fonte };
                        if (codigoOcr) { debitosOcrPendentes.push({ d, deb }); continue; }
                        const chave = `${deb.codigo}|${deb.pa}|${deb.cnpjPrest}|${deb.original}|${deb.saldo}|${deb.compensacao}`;
                        if (!d.debitos.some(x => `${x.codigo}|${x.pa}|${x.cnpjPrest}|${x.original}|${x.saldo}|${x.compensacao}` === chave)) d.debitos.push(deb);
                    }
                } else if (sg.rel === 'completa') {
                    for (const b of t.split(/D[ée]bito Apurado e Cr[ée]dito Vinculado/i).slice(1)) {
                        // v2.5.32: no OCR os rótulos vêm colados a barras ("Descrição|CP PATRONAL", "Número do Processo|24496…",
                        // "Tipolbcomp", "Valor|1.093.807,41", "valorl597,08"); o texto do PDF continua lido igual
                        const cod = b.match(/C[óo]digo da Receita[\s|:]+(\d{4}-\d{2})/)?.[1] || '';
                        const desc = b.match(/Descri[çc][ãa]o[\s|:]+([^\n]+)/)?.[1]?.trim() || '';
                        const cnpjPrest = P.dig(b.match(/CNPJ Prest[\s\S]{0,40}?(\d{2}\.\d{3}\.\d{3}\/\d{4}-\d{2})/)?.[1]);
                        for (const m of b.matchAll(new RegExp('N[úu]mero do Processo[\\s|:]*(' + RX_DCOMP + ')[\\s|]*Tipo[\\s|]*(\\S+?)[\\s|]*[Vv]{1,2}alor[\\s|:jl]*(' + DV + ')', 'g'))) {
                            const e = { dcomp: m[1], tipo: /comp$/i.test(m[2]) ? 'DComp' : m[2], codigo: cod, cnpjPrest, grupo: P.grupoDctfPrev(desc, cod), valor: P.ce(m[3]) };
                            if (!d.comp.completa.some(x => x.dcomp === e.dcomp && x.codigo === e.codigo && x.cnpjPrest === e.cnpjPrest && x.valor === e.valor)) d.comp.completa.push(e);
                        }
                    }
                } else if (sg.rel === 'creditosDocumento') {
                    for (const b of t.split(new RegExp('(?=Documento:\\s*' + RX_DCOMP + ')')).slice(1)) {
                        const num = b.match(new RegExp('Documento:\\s*(' + RX_DCOMP + ')'))?.[1];
                        for (const m of b.matchAll(new RegExp('^\\s*(\\d{4}-\\d{2})\\s+(.+?)\\s+' + RX_PA + '\\s+(' + DV + ')\\s+(' + DV + ')\\s+(' + DV + ')\\s*$', 'gm'))) {
                            const e = { dcomp: num, codigo: m[1], grupo: P.grupoDctfPrev(m[2], m[1]), valor: P.ce(m[5]) };
                            if (!d.comp.creditosDocumento.some(x => x.dcomp === e.dcomp && x.codigo === e.codigo && x.valor === e.valor)) d.comp.creditosDocumento.push(e);
                        }
                    }
                } else if (sg.rel === 'creditos') {
                    const sec = t.split(/Relat[óo]rio por Cr[ée]dito\s*-\s*Compensa[çc][ãa]o/i).slice(1).join('\n');
                    const rx = new RegExp('(\\d{6})\\s+-\\s+(.+?)\\s+' + RX_PA + '\\s+(' + DV + ')\\s+(\\S+)\\s+(\\d{5}\\.\\d{5}\\.\\d{6}\\.\\d\\.\\d\\.\\d{2}-)(\\d{4})?\\s*(' + DV + ')\\s+(' + DV + ')\\s+(' + DV + ')(?:\\s*\\n\\s*(\\d{4})\\b)?', 'g');
                    for (const m of sec.matchAll(rx)) {
                        const num = m[6] + (m[7] || m[11] || '');
                        if (!new RegExp('^' + RX_DCOMP + '$').test(num)) continue;
                        const cod = `${m[1].slice(0, 4)}-${m[1].slice(4)}`;
                        const e = { dcomp: num, codigo: cod, grupo: P.grupoDctfPrev(m[2], cod), valor: P.ce(m[9]) };
                        if (!d.comp.creditos.some(x => x.dcomp === e.dcomp && x.codigo === e.codigo && x.valor === e.valor)) d.comp.creditos.push(e);
                    }
                } else if (sg.rel === 'resumoCreditos') {
                    const tr = (re) => { const m = t.match(re); return m ? { informado: P.ce(m[1]), vinculado: P.ce(m[2]), saldo: P.ce(m[3]) } : null; };
                    const V3 = `(${DV})\\s+(${DV})\\s+(${DV})`;
                    d.resumoCreditos.retencao ||= tr(new RegExp('Reten[çc][ãa]o Lei 9711\\/98[^\\n]*\\n?\\s*' + V3));
                    d.resumoCreditos.salarioFamilia ||= tr(new RegExp('Sal[áa]rio Fam[íi]lia\\s+' + V3));
                    d.resumoCreditos.salarioMaternidade ||= tr(new RegExp('Sal[áa]rio Maternidade\\s+' + V3));
                    d.resumoCreditos.compensacao ||= tr(new RegExp('(?:^|\\n)\\s*Compensa[çc][ãa]o\\s+' + V3));
                } else if (sg.rel === 'resumoDebitos') {
                    for (const m of t.matchAll(new RegExp('^\\s*(\\d{4}-\\d{2})\\s+(.+?)\\s+' + RX_PA + '\\s+(' + DV + ')\\s+(' + DV + ')\\s+(' + DV + ')\\s*$', 'gm'))) {
                        const e = { codigo: m[1], descricao: m[2], grupo: P.grupoDctfPrev(m[2], m[1]), original: P.ce(m[4]), vinculado: P.ce(m[5]), saldo: P.ce(m[6]) };
                        if (!d.resumoDebitos.some(x => x.codigo === e.codigo && x.descricao === e.descricao && x.original === e.original)) d.resumoDebitos.push(e);
                    }
                }
            } else if (sg.sub === 'darf') {
                const lido = P.lerDarfPaginaPrev(t);
                const cont = lido.pagina > 1 && !lido.cnpj && darfAtual && darfAtual.fontes[0].arquivo === fonte.arquivo;
                if (cont) {
                    for (const it of lido.itens) if (!darfAtual.itens.some(x => x.codigo === it.codigo && x.total === it.total)) darfAtual.itens.push(it);
                    darfAtual.valor ??= lido.valor; darfAtual.fontes.push(fonte);
                    continue;
                }
                if (!lido.numero) { r.avisos.push(`${fonte.arquivo}, pág. ${fonte.pagina}: DARF sem número do documento; não foi usado.`); continue; }
                const ja = r.darfs.find(x => x.numero === lido.numero);
                if (ja) { ja.fontes.push(fonte); darfAtual = ja; continue; }
                darfAtual = { ...lido, fontes: [fonte] };
                r.darfs.push(darfAtual);
                if (P.ehComprovanteDarfPrev(t)) { const cp = P.lerComprovanteDarfPrev(t, fonte); if (cp) r.comprovantes.push(cp); }
            } else if (sg.sub === 'comprovante') {
                const cp = P.lerComprovanteDarfPrev(t, fonte);
                if (cp && !r.comprovantes.some(x => x.valor === cp.valor && x.data === cp.data && x.codigos.join() === cp.codigos.join())) r.comprovantes.push(cp);
            } else if (sg.sub === 'dcompRecibo') {
                const rc = P.lerDcompReciboPrev(t);
                if (!rc.numero) continue;
                let dc = r.dcomps.find(x => x.numero === rc.numero);
                if (!dc) { dc = { numero: rc.numero, recibo: null, extrato: null, fontes: [] }; r.dcomps.push(dc); }
                dc.recibo ||= rc; dc.fontes.push(fonte);
            } else if (sg.sub === 'dcompExtrato') {
                if (!sg.dcomp) continue;
                // tira os cabeçalhos repetidos e o número da página, para os blocos seguirem de uma página para a outra
                const corpo = sg.textos.map(x => x.split('\n').filter(l => !/^\s*(?:Receita Federal do Brasil|PEDIDO DE RESTITUI[ÇC][ÃA]O.*PERDCOMP[\s\d.]*|\d{1,3})\s*$/i.test(l)).join('\n')).join('\n');
                let dc = r.dcomps.find(x => x.numero === sg.dcomp);
                if (!dc) { dc = { numero: sg.dcomp, recibo: null, extrato: null, fontes: [] }; r.dcomps.push(dc); }
                const ex = P.lerDcompExtratoPrev(sg.dcomp, corpo);
                // v2.5.40: o OCR pode ler 7 como / nos campos monetários. Não substituir
                // indiscriminadamente: conferir o candidato com o TOTAL do extrato e o recibo,
                // e exigir multa/juros legíveis, débito único e correspondência dos demais campos.
                if (sg.fontes.some(f => f.metodo === 'ocr') && ex.debitos.length === 1) {
                    const d = ex.debitos[0], rc = dc.recibo;
                    const blocoDebito = corpo.split(/(?:^|\n)\s*\d{3}\.\s*D[ée]bito\s+/).slice(1).join('\n');
                    const linha = rot => blocoDebito.match(new RegExp('(?:^|\\n)[ \\t]*' + rot + '[ \\t]+([^\\n]+)'))?.[1]?.trim() || '';
                    const candidato = rot => {
                        const t = linha(rot);
                        if (!/^[\d./]+,\d{2}$/.test(t) || !t.includes('/')) return null;
                        const opcoes = [t.replace(/\//g, '7'), t.replace(/\/(?=7)/g, '').replace(/\//g, '7')];
                        return opcoes.some(x => new RegExp('^' + DV + '$').test(x) && P.ce(x) === totalImpresso) ? totalImpresso : null;
                    };
                    const totalImpresso = P.ce(corpo.match(new RegExp('(?:^|\\n)[ \\t]*TOTAL[ \\t]+(' + DV + ')[ \\t]*(?:\\n|$)'))?.[1]);
                    const multa = P.ce(linha('Multa')), juros = P.ce(linha('Juros'));
                    const principal = d.principal || candidato('Principal');
                    const total = d.total || candidato('Total');
                    if ((!d.principal || !d.total) && principal > 0 && total > 0 &&
                        Number.isSafeInteger(multa) && Number.isSafeInteger(juros) && multa >= 0 && juros >= 0 &&
                        principal + multa + juros === total && total === totalImpresso && total === ex.totalDebitos &&
                        rc?.numero === ex.numero && rc.cnpj && rc.cnpj === ex.cnpj &&
                        Object.keys(rc.grupos || {}).length === 1 && rc.grupos[d.grupo] === total) {
                        d.principal = principal; d.total = total; d.multa = multa; d.juros = juros;
                        d.ocrConfirmado = 'Valor recuperado do OCR e confirmado pelo total do extrato e recibo da PER/DCOMP';
                    }
                }
                if (!dc.extrato || ex.debitos.length > dc.extrato.debitos.length) dc.extrato = ex;
                dc.fontes.push(...sg.fontes);
            }
        }
        // Linhas de código com dígito excedente por OCR só são admitidas se o
        // resumo da MESMA declaração confirmar univocamente código, valores e saldo.
        // Limitado a retenções integralmente vinculadas, sem saldo nem compensação.
        for (const d of r.declaracoes) {
            const recuperados = [];
            for (const { deb } of debitosOcrPendentes.filter(x => x.d === d)) {
                if (deb.saldo !== 0 || deb.compensacao !== 0 || deb.original <= 0 || deb.retencoes !== deb.original ||
                    [deb.exclusao, deb.suspensao, deb.parcelamento, deb.sf, deb.sm, deb.pagamentos].some(x => x !== 0)) continue;
                const refs = d.resumoDebitos.filter(x => x.codigo.slice(0, 4) === deb.codigo.slice(0, 4) && x.original === deb.original && x.vinculado === deb.retencoes && x.saldo === 0);
                if (refs.length !== 1) continue;
                const ref = refs[0];
                if (d.debitos.concat(recuperados).some(x => x.codigo === ref.codigo && x.original === deb.original && x.saldo === deb.saldo)) continue;
                recuperados.push({ ...deb, codigo: ref.codigo, descricao: ref.descricao, grupo: ref.grupo, ocrConfirmado: 'Código e valores confirmados pelo relatório-resumo da DCTFWeb; conferir identificação do prestador no PDF original' });
            }
            if (recuperados.length && Number.isSafeInteger(d.totalDebito) && Number.isSafeInteger(d.totalSaldo) &&
                d.debitos.concat(recuperados).reduce((s, x) => s + x.original, 0) === d.totalDebito &&
                d.debitos.concat(recuperados).reduce((s, x) => s + x.saldo, 0) === d.totalSaldo) d.debitos.push(...recuperados);
        }
        return r;
    };

    // v2.5.29 — Receita Federal, Perguntas e Respostas DCTFWeb, itens 1.7 e 3.6:
    // o saldo da declaração é histórico. Uma DComp posterior não exige retificação
    // apenas para ser vinculada. Concilia seus débitos com o saldo POR CÓDIGO,
    // competência, recibo e contribuinte, sem somar novamente DComp já vinculada.
    // Fonte: https://www.gov.br/receitafederal/pt-br/assuntos/orientacao-tributaria/declaracoes-e-demonstrativos/DCTFWeb/arquivos/perguntas-e-respostas-dctfweb-2025-09-23.pdf
    P.conciliarDcompsPosterioresPrev = (declaracao, dcomps, jaVinculadas, ctx = {}) => {
        const D = declaracao, porNumero = new Map(), saldos = new Map();
        const codigo = (c) => /^\d{4}-\d{2}$/.test(String(c || '')) ? String(c) : '';
        const inteiro = (v) => Number.isSafeInteger(v) && v >= 0;
        const reciboOk = (r) => r && D && [D.recibo, D.retificada].filter(Boolean).includes(P.reciboDctfPrev(r));
        for (const x of D?.debitos || []) {
            const c = codigo(x.codigo);
            if (c && inteiro(x.saldo)) saldos.set(c, (saldos.get(c) || 0) + x.saldo);
        }
        for (const dc of dcomps || []) {
            if (jaVinculadas.has(dc.numero)) continue;
            const anterior = porNumero.get(dc.numero);
            const assinatura = JSON.stringify({ recibo: dc.recibo || null, extrato: dc.extrato || null });
            if (anterior) {
                if (anterior.assinatura !== assinatura) anterior.problemas.push('documentos conflitantes com o mesmo número da DComp');
                continue;
            }
            const a = { numero: dc.numero, assinatura, sim: '', problemas: [], pendencias: [], linhas: [], valor: 0, grupos: new Map(),
                saldoPorGrupo: new Map(), trans: dc.recibo?.recebidoEm || dc.recibo?.dataTransmissao || dc.extrato?.dataTransmissao || '' };
            porNumero.set(dc.numero, a);
            const rc = dc.recibo, ex = dc.extrato;
            if (!D?.recibo || !D.pa || !saldos.size) a.pendencias.push('recibo e relatório de débitos por código da DCTFWeb não disponíveis');
            if (ctx.inconsistente) a.pendencias.push('totais da DCTFWeb não fecham; confirmar a leitura antes de abater compensações');
            if (!rc) a.pendencias.push('recibo de entrega da PER/DCOMP não juntado');
            if (!ex?.debitos?.length) a.pendencias.push('extrato da PER/DCOMP com os débitos por código, competência e recibo não juntado');
            if ([rc, ex].some(x => x?.numero && P.dig(x.numero) !== P.dig(dc.numero))) a.problemas.push('número da DComp diferente entre recibo e extrato');
            const cnpjs = [rc?.cnpj, ex?.cnpj].filter(Boolean).map(P.dig);
            if (!cnpjs.some(c => c.length === 14)) a.pendencias.push('CNPJ da PER/DCOMP não identificado');
            if (new Set(cnpjs).size > 1) a.problemas.push('CNPJ diferente entre recibo e extrato');
            if (D?.cnpj && cnpjs.some(c => c !== P.dig(D.cnpj))) a.problemas.push('CNPJ da PER/DCOMP diferente da DCTFWeb');
            if (ctx.cnpj && cnpjs.some(c => c.slice(0, 8) !== P.dig(ctx.cnpj).slice(0, 8))) a.problemas.push('PER/DCOMP de outra contratada');
            if (!D?.cnpj) a.pendencias.push('CNPJ da DCTFWeb não identificado');
            if (/cancel|pedido de restitui|pedido de ressarc/i.test([rc?.tipoDocumento, ex?.tipoDocumento, rc?.situacao, ex?.situacao].filter(Boolean).join(' '))) a.problemas.push('documento cancelado ou sem declaração de compensação');
            if (/retific/i.test(rc?.tipoDocumento || '') || /^sim$/i.test(ex?.retificador || '')) a.pendencias.push('PER/DCOMP retificadora: conferir a substituição da declaração original antes de somar os valores');
            const data = P.dataPagamentoPrev(a.trans.split(' ')[0]);
            if (!data) a.pendencias.push('data de transmissão da PER/DCOMP não identificada');
            if (rc?.dataTransmissao && ex?.dataTransmissao && P.dataIsoDctfPrev(rc.dataTransmissao) !== P.dataIsoDctfPrev(ex.dataTransmissao)) a.problemas.push('datas de transmissão diferentes entre recibo e extrato');
            const todas = ex?.debitos || [];
            const totalLido = todas.reduce((s, x) => s + (inteiro(x.total) ? x.total : 0), 0);
            if (inteiro(ex?.totalDebitos) && ex.totalDebitos !== totalLido) a.problemas.push(`soma dos débitos lidos R$ ${P.rs(totalLido)} diferente do total do extrato R$ ${P.rs(ex.totalDebitos)}`);
            const totaisRecibo = Object.entries(rc?.grupos || {});
            if (!inteiro(ex?.totalDebitos) && !totaisRecibo.length) a.pendencias.push('total de débitos não identificado no extrato ou recibo');
            if (totaisRecibo.length && todas.length) {
                const grupos = new Map();
                for (const x of todas) grupos.set(x.grupo, (grupos.get(x.grupo) || 0) + (x.total || 0));
                for (const g of new Set([...grupos.keys(), ...totaisRecibo.map(([g]) => g)])) {
                    if ((grupos.get(g) || 0) !== (rc.grupos[g] || 0)) a.problemas.push(`${g}: valores do recibo e do extrato da PER/DCOMP não fecham`);
                }
            }
            // Uma DComp pode conter outros períodos; só os débitos da declaração
            // em análise abatem seu saldo. Os totais do documento inteiro são conferidos acima.
            for (const x of todas) {
                const pa = x.paDctf || x.pa;
                if (pa && D?.pa && pa !== D.pa) continue;
                if (!pa) { a.pendencias.push('competência de débito não identificada'); continue; }
                if (!x.reciboDctf) { a.pendencias.push('número do recibo da DCTFWeb ausente no débito'); continue; }
                if (!reciboOk(x.reciboDctf)) { a.problemas.push(`débito cita outro recibo da DCTFWeb (${x.reciboDctf})`); continue; }
                const c = codigo(x.codigo);
                if (!c) { a.pendencias.push('código de receita completo não identificado no débito'); continue; }
                if (!saldos.has(c)) { a.problemas.push(`código ${c} não localizado entre os débitos da DCTFWeb`); continue; }
                if (![x.principal, x.multa, x.juros, x.total].every(inteiro) || x.principal <= 0) { a.pendencias.push(`${c}: principal e encargos não comparáveis`); continue; }
                if (x.principal + x.multa + x.juros !== x.total) { a.problemas.push(`${c}: principal + multa + juros diferente do total`); continue; }
                const venc = P.dataPagamentoPrev(x.vencimento);
                if (!venc) a.pendencias.push(`${c}: vencimento não identificado`);
                else if (data && data > venc && x.multa + x.juros === 0) a.problemas.push(`${c}: compensação transmitida após ${x.vencimento}, sem multa e juros nos débitos`);
                a.linhas.push({ codigo: c, grupo: x.grupo, principal: x.principal, saldoDctf: saldos.get(c), vencimento: x.vencimento,
                    multa: x.multa, juros: x.juros, recibo: x.reciboDctf, competencia: pa });
                a.valor += x.principal;
                a.grupos.set(x.grupo, (a.grupos.get(x.grupo) || 0) + x.principal);
            }
            for (const g of a.grupos.keys()) a.saldoPorGrupo.set(g, [...new Set(a.linhas.filter(l => l.grupo === g).map(l => l.codigo))].reduce((s, c) => s + saldos.get(c), 0));
            if (!a.linhas.length) a.pendencias.push('nenhum débito pôde ser confrontado por código, competência e recibo');
            a.problemas = [...new Set(a.problemas)]; a.pendencias = [...new Set(a.pendencias)];
        }
        // Verifica a soma de TODAS as DComp sobre cada código antes de aceitar
        // qualquer uma delas. Assim, duplicidade e excesso não dependem da ordem de leitura.
        const porCodigo = new Map();
        for (const a of porNumero.values()) if (!a.problemas.length && !a.pendencias.length) {
            for (const l of a.linhas) porCodigo.set(l.codigo, (porCodigo.get(l.codigo) || 0) + l.principal);
        }
        for (const [c, v] of porCodigo) if (v > saldos.get(c)) {
            for (const a of porNumero.values()) if (a.linhas.some(l => l.codigo === c)) a.problemas.push(`${c}: DComp somam R$ ${P.rs(v)}, acima do saldo histórico R$ ${P.rs(saldos.get(c))}; conferir duplicidade ou retificação`);
        }
        porCodigo.clear();
        let total = 0;
        for (const a of porNumero.values()) {
            a.sim = a.problemas.length ? 'NAO' : a.pendencias.length ? '' : 'SIM';
            if (a.sim !== 'SIM') continue;
            total += a.valor;
            for (const l of a.linhas) porCodigo.set(l.codigo, (porCodigo.get(l.codigo) || 0) + l.principal);
        }
        return { porNumero, porCodigo, total };
    };


    // ---------- conferência ----------
    // ctx: { cnpj (contratada), competencia (AAAA-MM) }
    P.conferirDctfPrev = (r, ctx = {}) => {
        const ck = {}, avisos = [], informacoes = [];
        const marca = (k, sim, obs, evid) => { ck[k] = { sim, obs: obs || '', evid: evid || obs || '' }; };
        const rs = (c) => `R$ ${P.rs(c || 0)}`;
        const comp = ctx.competencia || '';
        const cnpjC = P.dig(ctx.cnpj), raiz = (x) => P.dig(x).slice(0, 8);
        const nada = !r || (!r.declaracoes.length && !r.darfs.length && !r.dcomps.length && !r.comprovantes.length);
        if (nada) {
            for (const k of P.CHAVES_DARF) marca(k, '', 'Documento não juntado.', 'Nenhum DARF, recibo ou relatório da DCTFWeb ou PER/DCOMP foi reconhecido nos arquivos lidos.');
            return { checklist: ck, avisos, informacoes, detalhe: null };
        }
        const fmtComp = (iso) => iso ? P.compTexto(iso) : '?';
        // ----- declaração usada: a da competência com a transmissão mais recente -----
        const comRecibo = r.declaracoes.filter(d => d.recibo);
        const daComp = comRecibo.filter(d => !comp || !d.pa || d.pa === comp);
        const candidatas = daComp.length ? daComp : comRecibo;
        const D = [...candidatas].sort((a, b) => (P.dataHoraIsoDctfPrev(b.dataHora) || '').localeCompare(P.dataHoraIsoDctfPrev(a.dataHora) || '') || b.relatorios.length - a.relatorios.length)[0] || null;
        const outras = comRecibo.filter(d => d !== D);
        const reciboOk = (rec) => D && rec && (rec === D.recibo || rec === D.retificada);
        const textoRecibo = (rec) => rec === D?.retificada && D?.retificada ? `nº ${rec} (retificado pelo nº ${D.recibo})` : `nº ${rec}`;
        // ----- débitos, saldo e compensação da declaração -----
        const debitos = D?.debitos || [];
        const fechamento = [];
        for (const x of debitos) {
            const soma = x.exclusao + x.suspensao + x.parcelamento + x.compensacao + x.sf + x.sm + x.retencoes + x.pagamentos + x.saldo;
            if (soma !== x.original) fechamento.push(`${x.codigo}: valor original ${rs(x.original)} × soma das colunas ${rs(soma)}`);
        }
        const somaDeb = (k, filtro = () => true) => debitos.filter(filtro).reduce((s, x) => s + (x[k] || 0), 0);
        const saldo = D?.totalSaldo ?? (debitos.length ? somaDeb('saldo') : null);
        if (D && D.totalSaldo !== null && debitos.length && somaDeb('saldo') !== D.totalSaldo)
            fechamento.push(`saldo a pagar do recibo ${rs(D.totalSaldo)} × soma do relatório de débitos ${rs(somaDeb('saldo'))}`);
        if (D && D.totalDebito !== null && debitos.length && somaDeb('original') !== D.totalDebito) {
            // v2.5.50: linhas do Relatório de Débitos ilegíveis no OCR. Só deixa de ser inconsistência quando o
            // Resumo de Débitos (outro relatório da mesma declaração) fecha com o recibo e as linhas dele que
            // faltaram na leitura explicam a diferença exata, sem saldo a pagar.
            const resumo = D.resumoDebitos || [];
            const somaRes = (k) => resumo.reduce((s, x) => s + (x[k] || 0), 0);
            let explicado = null;
            if (resumo.length && somaRes('original') === D.totalDebito) {
                const livres = [...debitos];
                const faltam = [];
                for (const x of resumo) {
                    const i = livres.findIndex(y => y.codigo === x.codigo && y.original === x.original);
                    if (i >= 0) livres.splice(i, 1); else faltam.push(x);
                }
                const dif = D.totalDebito - somaDeb('original');
                if (!livres.length && faltam.length && faltam.reduce((s, x) => s + x.original, 0) === dif && faltam.every(x => (x.saldo || 0) === 0))
                    explicado = faltam;
            }
            if (explicado) informacoes.push(`DCTFWeb nº ${D.recibo}: ${explicado.length} linha(s) do Relatório de Débitos não legível(is) na leitura (${explicado.map(x => `${x.codigo} ${rs(x.original)}`).join('; ')}); conferida(s) pelo Resumo de Débitos, que fecha com os débitos apurados do recibo (${rs(D.totalDebito)}), sem saldo a pagar.`);
            else fechamento.push(`débitos apurados do recibo ${rs(D.totalDebito)} × soma do relatório de débitos ${rs(somaDeb('original'))}`);
        }
        if (fechamento.length) avisos.push(`DCTFWeb nº ${D.recibo}: ${fechamento.join('; ')}. Confira se alguma linha deixou de ser lida ou se os relatórios são de versões diferentes.`);
        const saldoGrupo = (g) => { const t = D?.totais.find(x => x.grupo === g); return t ? t.saldo : somaDeb('saldo', x => x.grupo === g); };
        // compensações por DComp, da fonte mais completa juntada
        const fonteComp = D ? (['completa', 'creditosDocumento', 'creditos'].find(k => D.comp[k].length) || '') : '';
        const compPorDcomp = new Map();
        for (const e of (fonteComp ? D.comp[fonteComp] : [])) {
            if (!compPorDcomp.has(e.dcomp)) compPorDcomp.set(e.dcomp, new Map());
            const g = compPorDcomp.get(e.dcomp); g.set(e.grupo, (g.get(e.grupo) || 0) + e.valor);
        }
        const compTotalD = D ? (D.resumoCreditos.compensacao?.vinculado ?? (debitos.length ? somaDeb('compensacao') : [...compPorDcomp.values()].reduce((s, g) => s + [...g.values()].reduce((a, b) => a + b, 0), 0))) : 0;
        // ----- DARFs e comprovantes -----
        const darfs = r.darfs;
        // os itens 3 e 4 comparam o DARF com a declaração dele; a diferença de competência fica no item 2
        const paRef = D?.pa || comp;
        // v2.5.52: DARF só de tributo que a DCTFWeb lida não declara (PIS/COFINS/IRPJ/CSLL com débito zero na
        // declaração), sem nº de recibo e sem nenhum código entre os débitos: guia de outra obrigação, fora do DARF 4.
        const debitoGrupo2552 = (g) => { const t = D?.totais.find(x => x.grupo === g); return t ? t.debito : somaDeb('original', x => x.grupo === g); };
        const outroTributo2552 = (x) => !!D && debitos.length > 0 && !x.recibo && (x.itens || []).length > 0
            && x.itens.every(it => {
                const g = P.grupoDctfPrev(it.denominacao || '', it.codigo);
                return /^(PIS|COFINS|IRPJ|CSLL)$/.test(g) && !debitoGrupo2552(g)
                    && !debitos.some(d => String(d.codigo).slice(0, 4) === String(it.codigo).replace(/\D/g, '').slice(0, 4));
            });
        const darfsOutroTributo = darfs.filter(outroTributo2552);
        const darfsComp = darfs.filter(x => (!paRef || !x.pa || x.pa === paRef) && !darfsOutroTributo.includes(x));
        if (darfsOutroTributo.length) informacoes.push(`DARF de tributo não declarado nesta DCTFWeb (${darfsOutroTributo.map(x => `${x.numero}: ${(x.itens || []).map(it => it.codigo).join(', ')} — ${rs(x.valor)}`).join('; ')}): guia de outra obrigação (ex.: PIS/COFINS), sem nº de recibo; fora da conferência do saldo (DARF 3 e 4).`);
        const usados = new Set();
        const valorUnico = (v) => darfs.filter(x => x.valor === v).length === 1;
        for (const x of darfs) {
            const num = P.dig(x.numero);
            let cp = r.comprovantes.find(c => !usados.has(c) && num && c.codigos.some(k => k.includes(num)));
            x.vinculo = cp ? 'número do documento' : '';
            if (!cp) {
                cp = r.comprovantes.find(c => !usados.has(c) && c.valor === x.valor && valorUnico(x.valor) && (!c.pagador || !x.cnpj || raiz(c.pagador) === raiz(x.cnpj))
                    && (!c.data || !x.vencimento || P.dataIsoDctfPrev(c.data) <= P.dataIsoDctfPrev(x.vencimento)));
                if (cp) x.vinculo = 'valor e data (comprovante sem o número do documento)';
            }
            if (cp) usados.add(cp);
            x.comprovante = cp || null;
            x.atrasado = !!(cp && cp.data && x.vencimento && P.dataIsoDctfPrev(cp.data) > P.dataIsoDctfPrev(x.vencimento));
            x.pago = !!(cp && cp.efetivado && cp.valor === x.valor && !x.atrasado);
            // DARF sem comprovante cujos débitos foram quitados por compensação: guia substituída
            x.substituido = !x.pago && x.itens.length > 0 && x.itens.every(it => debitos.some(dd => dd.codigo.slice(0, 4) === String(it.codigo).slice(0, 4) && dd.compensacao > 0 && dd.saldo === 0));
        }
        const pagos = darfsComp.filter(x => x.pago);
        const valorPago = pagos.reduce((s, x) => s + x.valor, 0);
        const comprovantesSoltos = r.comprovantes.filter(c => !usados.has(c));
        // ----- PER/DCOMP -----
        const dcompDaComp = (dc) => {
            const pas = (dc.extrato?.debitos || []).map(x => x.paDctf || x.pa).filter(Boolean);
            return pas.length ? pas.some(p => !paRef || p === paRef) : null;
        };
        const citados = [...compPorDcomp.keys()];
        const anexos = r.dcomps.filter(dc => citados.includes(dc.numero) || dcompDaComp(dc) !== false
            || (dc.extrato?.debitos || []).some(x => reciboOk(x.reciboDctf)));
        const anexosForaDaComp = r.dcomps.filter(dc => !anexos.includes(dc));
        const gatilho = compTotalD > 0 || anexos.length > 0;
        const gruposDcomp = (dc) => {
            const g = new Map();
            if (dc.extrato?.debitos.length) for (const x of dc.extrato.debitos) g.set(x.grupo, (g.get(x.grupo) || 0) + x.principal);
            else for (const [k, v] of Object.entries(dc.recibo?.grupos || {})) g.set(k, v);
            return g;
        };
        const encargosDcomp = (dc) => dc.extrato?.debitos.length ? dc.extrato.debitos.reduce((s, x) => s + x.multa + x.juros, 0) : null;
        const recibosCitados = (dc) => [...new Set((dc.extrato?.debitos || []).filter(x => !paRef || !(x.paDctf || x.pa) || (x.paDctf || x.pa) === paRef).map(x => x.reciboDctf).filter(Boolean))];
        const cnpjDcomp = (dc) => dc.extrato?.cnpj || dc.recibo?.cnpj || '';
        const transmissao = (dc) => dc.extrato?.dataTransmissao || dc.recibo?.dataTransmissao || '';
        const vencimentoDcomp = (dc) => {
            const vs = (dc.extrato?.debitos || []).map(x => x.vencimento).filter(Boolean).sort((a, b) => P.dataIsoDctfPrev(a).localeCompare(P.dataIsoDctfPrev(b)));
            return vs[0] || darfsComp.find(x => x.vencimento)?.vencimento || '';
        };
        const listaPagos = pagos.map(x => `DARF ${x.numero} pago em ${x.comprovante.data}`);
        const cnpjTxt = (c) => c.length === 14 ? P.fmtCnpj(c) : P.fmtRaiz(c);
        const posteriores = P.conciliarDcompsPosterioresPrev(D, anexos, compPorDcomp, { cnpj: cnpjC, competencia: comp, inconsistente: fechamento.length > 0 });
        const compPosterior = posteriores.total;
        const saldoResidual = saldo === null ? null : saldo - compPosterior - valorPago;
        const todoSaldoCompensado = saldo !== null && saldo > 0 && compPosterior === saldo;
        for (const x of darfs) {
            x.cobertoPorCompensacaoPosterior = !!(todoSaldoCompensado && !x.pago && x.valor === saldo && x.pa === D?.pa
                && reciboOk(x.recibo) && P.dig(x.cnpj) === P.dig(D?.cnpj));
            if (x.cobertoPorCompensacaoPosterior) x.substituido = true;
        }
        if (posteriores.porNumero.size) informacoes.push('O saldo da DCTFWeb é histórico. Compensação posterior transmitida pelo PER/DCOMP não exige retificar a DCTFWeb apenas para vinculá-la. O abatimento usa os débitos comprovados por código, competência, contribuinte e recibo; compensação já vinculada não é abatida novamente.');

        // ===== Item 1 — O DARF contém os dados da contratada =====
        if (!darfs.length) {
            if (D && (saldo === 0 || todoSaldoCompensado)) marca('DARF1', 'NA', todoSaldoCompensado ? 'N/A: débitos cobertos por PER/DCOMP' : 'N/A: sem DARF (saldo a pagar zero)', todoSaldoCompensado ? `Saldo histórico de ${rs(saldo)} coberto pelos débitos das PER/DCOMP conferidas; não é necessário comprovante de pagamento de DARF para os mesmos débitos.` : `A DCTFWeb nº ${D.recibo} não tem saldo a pagar; não há DARF a conferir.`);
            else if (D) marca('DARF1', 'NAO', 'DARF não juntado', `A DCTFWeb nº ${D.recibo} tem saldo a pagar de ${rs(saldo)} e nenhum DARF foi juntado. Pedir o DARF e o comprovante de pagamento.`);
            else marca('DARF1', '', 'Documento não juntado.');
        } else {
            const outros = cnpjC ? darfs.filter(x => x.cnpj && raiz(x.cnpj) !== raiz(cnpjC)) : [];
            const ref = cnpjC || D?.cnpj || darfs[0].cnpj;
            if (outros.length) marca('DARF1', 'NAO', `CNPJ do DARF ${outros.map(x => cnpjTxt(x.cnpj)).join('; ')}`,
                `DARF ${outros.map(x => `${x.numero} (CNPJ ${cnpjTxt(x.cnpj)}, ${x.razao})`).join('; ')} não é da contratada (CNPJ ${cnpjTxt(cnpjC)}). Pedir o DARF correto.`);
            else marca('DARF1', 'SIM', `CNPJ ${cnpjTxt(darfs.find(x => x.cnpj)?.cnpj || ref)}`,
                `${darfs.length} DARF lido(s): ${darfs.map(x => `${x.numero} (${x.razao || 'razão social não lida'})`).join('; ')}.${cnpjC ? '' : ' CNPJ da contratada não informado na planilha da SEGEST; comparado com a DCTFWeb.'}`);
        }
        // ===== Item 2 — Competência idêntica à dos demais relatórios =====
        {
            const ref = comp || D?.pa || '';
            const difDarf = darfs.filter(x => x.pa && ref && x.pa !== ref);
            const difDctf = D?.pa && ref && D.pa !== ref;
            if (!darfs.length && !D) marca('DARF2', '', 'Documento não juntado.');
            else if (difDarf.length || difDctf) {
                const partes = [...new Set(difDarf.map(x => `DARF ${fmtComp(x.pa)}`)), ...(difDctf ? [`DCTFWeb ${fmtComp(D.pa)}`] : [])];
                marca('DARF2', 'NAO', `${partes.join('; ')} × relatórios ${fmtComp(ref)}`, `Competência dos demais relatórios: ${fmtComp(ref)}. ${partes.join('; ')}. Pedir os documentos da competência correta.`);
            } else marca('DARF2', 'SIM', `Competência ${fmtComp(ref)}`, `DARF ${darfs.map(x => fmtComp(x.pa)).join(', ') || '—'}; DCTFWeb ${fmtComp(D?.pa)}; planilha da SEGEST ${fmtComp(comp)}.`);
        }
        // ===== Item 3 — Número do recibo indicado no DARF =====
        {
            const comNumero = darfsComp.filter(x => x.recibo);
            if (!D) marca('DARF3', '', 'DCTFWeb não juntada', 'Sem o recibo ou os relatórios da DCTFWeb, o número indicado no DARF não pode ser conferido.');
            else if (!comNumero.length) marca('DARF3', 'NA', darfsComp.length ? 'N/A: DARF sem nº de recibo' : 'N/A: sem DARF',
                darfsComp.length ? `DARF ${darfsComp.map(x => x.numero).join('; ')} sem o campo "Nº Recibo Declaração" (DARF avulso ou de outro sistema); vale a conferência pelo valor (item 4).` : 'Nenhum DARF da competência foi juntado.');
            else {
                const errados = comNumero.filter(x => !reciboOk(x.recibo));
                if (errados.length) marca('DARF3', 'NAO', `DARF cita o recibo nº ${[...new Set(errados.map(x => x.recibo))].join('; ')} × DCTFWeb nº ${D.recibo}`,
                    `O DARF ${errados.map(x => x.numero).join('; ')} indica o recibo nº ${[...new Set(errados.map(x => x.recibo))].join('; ')}, que não é o da DCTFWeb apresentada (nº ${D.recibo}${D.retificada ? `, que retificou o nº ${D.retificada}` : ''}). Pode ser uma versão mais antiga da declaração: pedir a DCTFWeb correspondente ao DARF ou confirmar que os valores não mudaram.${D.retificadora && !D.retificada ? ' A DCTFWeb apresentada é retificadora, mas o número da declaração retificada só aparece no Relatório da Declaração Completa, que não foi juntado: com ele, o DARF da versão anterior pode ser ligado.' : ''}`);
                else {
                    const recs = [...new Set(comNumero.map(x => x.recibo))];
                    marca('DARF3', 'SIM', `Recibo ${recs.map(textoRecibo).join('; ')}`,
                        `DARF ${comNumero.map(x => `${x.numero} → recibo nº ${x.recibo}`).join('; ')}. DCTFWeb apresentada: nº ${D.recibo}${D.retificadora ? ' (retificadora)' : ''}${D.retificada ? `, que retificou o nº ${D.retificada}` : ''}.${darfsComp.length > comNumero.length ? ` DARF sem nº de recibo: ${darfsComp.filter(x => !x.recibo).map(x => x.numero).join('; ')}.` : ''}`);
                }
            }
        }
        // ===== Item 4 — Saldo histórico = compensações posteriores + pagamentos =====
        {
            const explicaDarfs = darfsComp.map(x => x.pago
                ? `DARF ${x.numero}: ${rs(x.valor)}, pago em ${x.comprovante.data} (ligado por ${x.vinculo}).`
                : x.cobertoPorCompensacaoPosterior
                    ? `DARF ${x.numero}: guia do saldo histórico; seus débitos foram cobertos pelas PER/DCOMP conferidas, sem exigir pagamento em duplicidade.`
                    : x.comprovante ? `DARF ${x.numero}: comprovante não aceito (${x.atrasado ? `pago em ${x.comprovante.data}, depois do vencimento ${x.vencimento}` : x.comprovante.valor !== x.valor ? `valor do comprovante ${rs(x.comprovante.valor)}` : 'pagamento não efetivado'}).`
                        : `DARF ${x.numero}: ${rs(x.valor)}, sem comprovante${x.substituido ? ' — compensação já vinculada à DCTFWeb; não abate o saldo outra vez' : ''}.`);
            const extra = [
                ...(comprovantesSoltos.length ? [`Comprovante(s) sem DARF correspondente: ${comprovantesSoltos.map(c => `${rs(c.valor)} em ${c.data || '?'}`).join('; ')}.`] : []),
                ...(darfs.filter(x => !darfsComp.includes(x) && !darfsOutroTributo.includes(x)).length ? [`DARF de outra competência não considerado: ${darfs.filter(x => !darfsComp.includes(x) && !darfsOutroTributo.includes(x)).map(x => `${x.numero} (${fmtComp(x.pa)})`).join('; ')}.`] : []),
                ...(darfsOutroTributo.length ? [`DARF de outro tributo, fora da soma: ${darfsOutroTributo.map(x => `${x.numero} (${(x.itens || []).map(it => it.codigo).join(', ')}, ${rs(x.valor)}${x.pago ? `, pago em ${x.comprovante.data}` : ''})`).join('; ')}.`] : []),
            ];
            const compTexto = [...posteriores.porNumero.values()].filter(a => a.sim === 'SIM').map(a => `DComp nº ${a.numero}: ${rs(a.valor)}, ${a.linhas.length} débito(s) conferido(s), transmitida em ${a.trans}`).join('; ');
            const ev = [`Saldo histórico do recibo nº ${D?.recibo || '?'}: ${rs(saldo)}.`,
                compPosterior ? `Compensação posterior comprovada: ${rs(compPosterior)} (${compTexto}).` : '',
                `DARFs pagos: ${rs(valorPago)}.`, ...explicaDarfs, ...extra].filter(Boolean).join(' ');
            const problemasPag = [], pendenciasPag = [], porCodigoPago = new Map();
            // Na quitação mista, coincidência do total não basta: pagamento e
            // compensação não podem cobrir o mesmo código e deixar outro em aberto.
            if (compPosterior && pagos.length) {
                for (const x of pagos) {
                    if (!x.itens.length || x.itens.reduce((s, it) => s + (it.total || 0), 0) !== x.valor) {
                        pendenciasPag.push(`DARF ${x.numero}: composição por código incompleta`); continue;
                    }
                    for (const it of x.itens) {
                        const candidatos = debitos.filter(d => /^\d{4}-\d{2}$/.test(String(it.codigo)) ? d.codigo === it.codigo : d.codigo.slice(0, 4) === String(it.codigo));
                        if (candidatos.length !== 1 || !Number.isSafeInteger(it.principal)) { pendenciasPag.push(`DARF ${x.numero}: código ${it.codigo} não associado de forma única`); continue; }
                        const c = candidatos[0].codigo;
                        porCodigoPago.set(c, (porCodigoPago.get(c) || 0) + it.principal);
                    }
                }
                for (const [c, pago] of porCodigoPago) {
                    const saldoCod = debitos.filter(x => x.codigo === c).reduce((s, x) => s + x.saldo, 0);
                    if (pago + (posteriores.porCodigo.get(c) || 0) > saldoCod) problemasPag.push(`${c}: pagamento e compensação superam o saldo do código`);
                }
            }
            if (saldo === null) marca('DARF4', '', 'Recibo da DCTFWeb não juntado', 'Sem o recibo ou relatório de débitos não há saldo histórico a confrontar com pagamentos e compensações.');
            else if (problemasPag.length) marca('DARF4', 'NAO', problemasPag.join('; '), `${ev} Conferir sobreposição entre DARF e PER/DCOMP.`);
            else if (pendenciasPag.length) marca('DARF4', '', `Pendente: ${pendenciasPag.join('; ')}`, `${ev} Conferir a composição do DARF antes de concluir a quitação mista.`);
            else if (saldo === 0 && !pagos.length) marca('DARF4', 'NA', 'N/A: saldo a pagar zero', ev);
            else {
                const dif = saldoResidual;
                const pisCofins = saldoGrupo('PIS') + saldoGrupo('COFINS') - [...posteriores.porNumero.values()].filter(a => a.sim === 'SIM').reduce((s, a) => s + (a.grupos.get('PIS') || 0) + (a.grupos.get('COFINS') || 0), 0);
                const pagoPisCofins = pagos.some(x => x.itens.some(it => /^(PIS|COFINS)$/.test(P.grupoDctfPrev(it.denominacao, it.codigo))));
                const txtPagos = pagos.length === 1 ? `${rs(valorPago)}, ${listaPagos[0]}` : `${rs(valorPago)}${pagos.length ? `: ${listaPagos.join('; ')}` : ''}`;
                const pendentes = [...posteriores.porNumero.values()].filter(a => a.sim === '');
                if (dif === 0) marca('DARF4', 'SIM', compPosterior
                    ? `Saldo histórico ${rs(saldo)} = PER/DCOMP ${rs(compPosterior)}${valorPago ? ` + DARF pago ${rs(valorPago)}` : ''}; saldo residual ${rs(0)}` : txtPagos,
                    `${ev}${compPosterior ? ' Saldo integralmente conciliado. A compensação posterior não exige retificação apenas para vinculá-la.' : ''}`);
                else if (dif > 0 && P.DCTF_DISPENSA_PIS_COFINS && pisCofins > 0 && dif === pisCofins && !pagoPisCofins)
                    marca('DARF4', 'SIM', `${compPosterior ? `PER/DCOMP ${rs(compPosterior)}; ` : ''}${txtPagos}; PIS/COFINS ${rs(pisCofins)} sem DARF`, `${ev} PIS/COFINS ${rs(pisCofins)}: ${P.DCTF_TEXTO_DISPENSA}.`);
                else if (dif > 0 && pendentes.length) marca('DARF4', '', `Pendente: PER/DCOMP não comparável; saldo ainda sem conciliação ${rs(dif)}`,
                    `${ev} ${pendentes.map(a => `DComp nº ${a.numero}: ${a.pendencias.join('; ')}`).join('. ')}. Não foi presumida ausência de pagamento nem exigida retificadora apenas para registrar compensação.`);
                else marca('DARF4', 'NAO', compPosterior
                    ? `Saldo histórico ${rs(saldo)}; PER/DCOMP ${rs(compPosterior)}; pago ${rs(valorPago)}; diferença ${rs(dif)}` : `Saldo ${rs(saldo)} × pago ${rs(valorPago)}`,
                    `${ev} ${dif > 0 ? `Falta comprovar a quitação residual de ${rs(dif)} por pagamento ou PER/DCOMP que identifique os débitos.` : `Pagamentos e compensações superam o saldo histórico em ${rs(-dif)}; conferir eventual duplicidade.`}`);
            }
        }
        // ===== Itens 5 e 6 — Compensação × PER/DCOMP =====
        const linhasDcomp = [];
        if (!gatilho) {
            const ev = `A DCTFWeb${D ? ` nº ${D.recibo}` : ''} não indica compensação e nenhuma PER/DCOMP da competência foi juntada.${anexosForaDaComp.length ? ` PER/DCOMP juntada de outra competência: ${anexosForaDaComp.map(dc => dc.numero).join('; ')}.` : ''}`;
            marca('DARF5', 'NA', 'N/A: sem compensação', ev);
            marca('DARF6', 'NA', 'N/A: sem compensação', ev);
        } else {
            // ----- item 5 -----
            const docDe = (n) => r.dcomps.find(dc => dc.numero === n) || null;
            const faltam = citados.filter(n => !docDe(n));
            const faltamCp = faltam.filter(n => [...compPorDcomp.get(n).keys()].some(ehCp));
            const faltamOutros = faltam.filter(n => !faltamCp.includes(n));
            const deOutroCnpj = anexos.filter(dc => cnpjC && cnpjDcomp(dc) && raiz(cnpjDcomp(dc)) !== raiz(cnpjC));
            const citamOutro = anexos.filter(dc => recibosCitados(dc).some(rc => !reciboOk(rc)));
            const semRecibo = anexos.filter(dc => !dc.recibo);
            const info5 = [
                ...(faltamOutros.length ? [`DComp citada na DCTFWeb e não juntada, só de ${[...new Set(faltamOutros.flatMap(n => [...compPorDcomp.get(n).keys()]))].join('/')} (sem contribuição previdenciária; apenas informação): ${faltamOutros.map(n => `nº ${n}`).join('; ')}.`] : []),
                ...(semRecibo.length ? [`Juntado só o extrato, sem o recibo de entrega: ${semRecibo.map(dc => `nº ${dc.numero}`).join('; ')}.`] : []),
                ...(anexosForaDaComp.length ? [`PER/DCOMP juntada sem relação com a competência: ${anexosForaDaComp.map(dc => `nº ${dc.numero}`).join('; ')}.`] : []),
            ];
            if (compTotalD > 0 && !citados.length) marca('DARF5', 'NAO', `Compensação ${rs(compTotalD)} sem nº da DComp`,
                `A DCTFWeb nº ${D.recibo} indica compensação de ${rs(compTotalD)}, mas os relatórios juntados não trazem o número da DComp. Pedir o Relatório da Declaração Completa (ou o de Créditos) e a PER/DCOMP.`);
            else if (faltamCp.length) marca('DARF5', 'NAO', `DComp ${faltamCp.map(n => `nº ${n}`).join('; ')} não juntada`,
                [`A DCTFWeb nº ${D.recibo} cita a DComp ${faltamCp.map(n => `nº ${n} (${[...compPorDcomp.get(n)].map(([g, v]) => `${g} ${rs(v)}`).join(', ')})`).join('; ')}, que não foi juntada. Pedir o recibo de entrega e o extrato da PER/DCOMP.`, ...info5].join(' '));
            else if (deOutroCnpj.length) marca('DARF5', 'NAO', `DComp ${deOutroCnpj.map(dc => `nº ${dc.numero} do CNPJ ${cnpjTxt(cnpjDcomp(dc))}`).join('; ')}`,
                [`PER/DCOMP de outro CNPJ (contratada: ${cnpjTxt(cnpjC)}). Pedir a PER/DCOMP da contratada.`, ...info5].join(' '));
            else if (citamOutro.length) marca('DARF5', 'NAO', citamOutro.map(dc => `DComp nº ${dc.numero} cita o recibo nº ${recibosCitados(dc).filter(rc => !reciboOk(rc)).join(', ')}`).join('; '),
                [`A DComp deveria citar a DCTFWeb apresentada (nº ${D?.recibo || '?'}) ou a que ela retificou${D?.retificada ? ` (nº ${D.retificada})` : ''}. Pedir a DCTFWeb citada pela DComp ou esclarecimento.`, ...info5].join(' '));
            else {
                const comRec = anexos.filter(dc => recibosCitados(dc).length), semRec = anexos.filter(dc => !recibosCitados(dc).length);
                const recs = [...new Set(comRec.flatMap(recibosCitados))];
                const partes = [];
                if (comRec.length) partes.push(`${comRec.map(dc => `nº ${dc.numero}`).join('; ')}, ${comRec.length > 1 ? 'citam' : 'cita'} o recibo ${recs.map(textoRecibo).join('; ')}`);
                if (semRec.length) partes.push(semRec.map(dc => `nº ${dc.numero}`).join('; '));
                marca('DARF5', 'SIM', `DComp ${partes.join('; ')}`,
                    [`${anexos.length} PER/DCOMP da competência juntada(s), da contratada${cnpjC ? ` (CNPJ ${cnpjTxt(cnpjC)})` : ''}.${semRec.length ? ` Só o recibo de entrega (sem extrato), que não traz o recibo da DCTFWeb: ${semRec.map(dc => `nº ${dc.numero}`).join('; ')}.` : ''}`, ...info5].join(' '));
            }
            // ----- item 6 -----
            const problemas = [], okTxt = [], explica6 = [], pendencias6 = [];
            for (const dc of anexos) {
                const gD = compPorDcomp.get(dc.numero), gC = gruposDcomp(dc);
                const trans = transmissao(dc), venc = vencimentoDcomp(dc), enc = encargosDcomp(dc);
                const totD = gD ? [...gD.values()].reduce((a, b) => a + b, 0) : 0;
                const totC = [...gC.values()].reduce((a, b) => a + b, 0);
                const posterior = !gD ? posteriores.porNumero.get(dc.numero) : null;
                const gRef = posterior ? posterior.grupos : gC;
                const linhaG = [...new Set([...(gD?.keys() || []), ...gRef.keys()])].map(g => ({ grupo: g, dctf: gD?.get(g) ?? null, dcomp: gRef.get(g) ?? null,
                    saldoDctf: posterior?.saldoPorGrupo.get(g) ?? null, confere: posterior ? posterior.sim === 'SIM' ? 'Sim' : posterior.sim === 'NAO' ? 'Não' : '—' : '' }));
                linhasDcomp.push({ dc, linhaG, trans, venc, enc, totD, totC, refletida: !!gD });
                const atrasada = trans && venc && P.dataIsoDctfPrev(trans) > P.dataIsoDctfPrev(venc);
                const encRecibo = !dc.extrato?.debitos.length && totD && totC > totD; // recibo inclui multa e juros
                if (!gD) {
                    if (posterior?.sim === 'SIM') {
                        okTxt.push({ dc, totD: posterior.valor, trans, atrasada });
                        explica6.push(`DComp nº ${dc.numero}: ${rs(posterior.valor)} em ${posterior.linhas.length} débito(s), confrontados com o saldo histórico por código, competência, CNPJ e recibo. Transmitida em ${posterior.trans}; não exige retificar a DCTFWeb apenas para vincular a compensação.`);
                    } else if (posterior?.sim === 'NAO') {
                        problemas.push(`DComp nº ${P.fmtDcompCurtoPrev(dc.numero)}: ${posterior.problemas.join('; ')}`);
                        explica6.push(`DComp nº ${dc.numero}: ${[...posterior.problemas, ...posterior.pendencias].join('; ')}. Não abatida do saldo histórico.`);
                    } else pendencias6.push(`DComp nº ${P.fmtDcompCurtoPrev(dc.numero)}: ${posterior?.pendencias.join('; ') || 'documentos não comparáveis'}`);
                    continue;
                }
                const difs = linhaG.filter(x => (x.dctf ?? 0) !== (x.dcomp ?? 0));
                if (difs.length) { problemas.push(`DComp nº ${P.fmtDcompCurtoPrev(dc.numero)}: ${difs.map(x => `${x.grupo} ${rs(x.dctf)} na DCTFWeb × ${rs(x.dcomp)} na DComp`).join('; ')}`); explica6.push(`Valores diferentes entre a DCTFWeb e a DComp nº ${dc.numero}. Pedir esclarecimento ou retificação.`); continue; }
                if (atrasada && !(enc > 0) && !encRecibo) { problemas.push(`DComp nº ${P.fmtDcompCurtoPrev(dc.numero)} transmitida em ${trans}, após o vencimento ${venc}`); explica6.push(`A DComp nº ${dc.numero} foi transmitida depois do vencimento (${venc}) sem multa e juros nos débitos. Pedir esclarecimento.`); continue; }
                okTxt.push({ dc, totD, trans, atrasada });
                explica6.push(`DComp nº ${dc.numero}: ${linhaG.map(x => `${x.grupo} ${rs(x.dctf)}`).join(', ')}, iguais na DCTFWeb e na DComp; transmitida em ${trans || '?'}${venc ? ` (vencimento ${venc})` : ' (vencimento não informado nos documentos)'}${atrasada ? ', depois do vencimento, com multa e juros' : ''}.`);
            }
            const credito = anexos.map(dc => {
                const x = dc.extrato, rc = dc.recibo;
                const partes = [`Crédito da DComp nº ${dc.numero}: ${x?.tipoCredito || rc?.tipoCredito || 'tipo não informado'}`];
                if (x?.saldoCredito !== null && x?.saldoCredito !== undefined) partes.push(`saldo do crédito original após a DComp ${rs(x.saldoCredito)}`);
                if (x?.inicial || rc?.demonstrativo) partes.push(`PER/DCOMP com o demonstrativo do crédito: nº ${x?.inicial || rc?.demonstrativo}`);
                if (/sim/i.test(x?.acaoJudicial || rc?.acaoJudicial || '')) partes.push('ATENÇÃO: crédito oriundo de ação judicial');
                if (/sim/i.test(x?.inconstitucionalidade || '')) partes.push('ATENÇÃO: crédito fundado em inconstitucionalidade de lei');
                if (x?.saldoCredito < 0) partes.push('ATENÇÃO: saldo do crédito negativo');
                return `${partes.join('; ')}.`;
            });
            const homolog = 'A compensação extingue o débito sob condição de homologação pela Receita, em até 5 anos; a CND federal acompanha a situação.';
            const faltaDoc = citados.filter(n => !docDe(n));
            if (problemas.length) marca('DARF6', 'NAO', problemas.join('; '), [...explica6, ...credito, homolog].join(' '));
            else if (pendencias6.length) marca('DARF6', '', `Pendente: ${pendencias6.join('; ')}`, [...explica6, ...pendencias6, ...credito, homolog].join(' '));
            else if (!okTxt.length) marca('DARF6', '', 'PER/DCOMP não juntada', `Sem a PER/DCOMP, os valores compensados não podem ser conferidos.${faltaDoc.length ? ` DComp citada(s): ${faltaDoc.join('; ')}.` : ''}`);
            else {
                const txt = okTxt.length === 1 ? `${rs(okTxt[0].totD)}, transmitida em ${okTxt[0].trans || '?'}`
                    : okTxt.map(o => `${rs(o.totD)} em ${o.trans || '?'} (nº ${P.fmtDcompCurtoPrev(o.dc.numero)})`).join('; ');
                marca('DARF6', 'SIM', txt, [...explica6, ...(faltaDoc.length ? [`Não conferida(s), por não ter(em) sido juntada(s): ${faltaDoc.map(n => `nº ${n}`).join('; ')}.`] : []), ...credito, homolog].join(' '));
            }
        }
        if (comp && D?.pa && D.pa !== comp) avisos.push(`A DCTFWeb lida é da competência ${fmtComp(D.pa)}; a planilha da SEGEST é de ${fmtComp(comp)}.`);
        for (const a of r.avisos || []) avisos.push(a);
        // ----- detalhe para a memória (aba DCTFWeb) -----
        const detalhe = {
            declaracao: D ? { recibo: D.recibo, retificada: D.retificada, retificadora: D.retificadora, dataHora: D.dataHora, cnpj: D.cnpj ? cnpjTxt(D.cnpj) : '', pa: fmtComp(D.pa),
                relatorios: D.relatorios, arquivos: [...new Set(D.fontes.map(f => f.arquivo))].join(', '), assinadoPor: D.assinadoPor, fonteComp } : null,
            outrasVersoes: outras.map(d => ({ recibo: d.recibo, dataHora: d.dataHora, pa: fmtComp(d.pa), retificada: d.retificada })),
            totais: D?.totais || [], totalDebito: D?.totalDebito ?? null, totalSaldo: saldo,
            debitos: debitos.map(x => ({ ...x, deducoes: x.sf + x.sm + x.retencoes, outros: x.exclusao + x.suspensao + x.parcelamento + x.pagamentos,
                fecha: (x.exclusao + x.suspensao + x.parcelamento + x.compensacao + x.sf + x.sm + x.retencoes + x.pagamentos + x.saldo) === x.original ? 'Sim' : 'Não' })),
            resumoCreditos: D?.resumoCreditos || {},
            darfs: darfs.map(x => ({ numero: x.numero, pa: fmtComp(x.pa), vencimento: x.vencimento, recibo: x.recibo || '—', reciboConfere: x.recibo ? (reciboOk(x.recibo) ? 'Sim' : 'Não') : '—',
                valor: x.valor, pagoEm: x.comprovante?.data || '', valorPago: x.comprovante?.valor ?? null, vinculo: x.vinculo || '',
                situacao: x.pago ? 'Pago' : x.cobertoPorCompensacaoPosterior ? 'Débitos cobertos por PER/DCOMP posterior conferida' : x.substituido ? 'Sem comprovante (substituído por compensação)' : x.comprovante ? 'Comprovante não aceito' : 'Sem comprovante',
                itens: x.itens.map(it => `${it.codigo} ${rs(it.total)}`).join('; '), arquivo: [...new Set(x.fontes.map(f => `${f.arquivo}, pág. ${f.pagina}`))].join('; ') })),
            comprovantesSoltos: comprovantesSoltos.map(c => ({ valor: c.valor, data: c.data, arquivo: `${c.fonte?.arquivo || ''}, pág. ${c.fonte?.pagina || '?'}` })),
            compensacaoTotal: compTotalD, compensacaoPosterior: compPosterior, valorPago, saldoResidual,
            compensacoesPosteriores: [...posteriores.porNumero.values()].map(a => ({ numero: a.numero, sim: a.sim, valor: a.valor,
                transmissao: a.trans, problemas: a.problemas, pendencias: a.pendencias, debitos: a.linhas })),
            dcomps: [...anexos, ...citados.filter(n => !r.dcomps.some(dc => dc.numero === n)).map(n => ({ numero: n, ausente: true }))].map(dc => {
                if (dc.ausente) return { numero: dc.numero, juntada: 'Não juntada', grupos: [...compPorDcomp.get(dc.numero)].map(([g, v]) => ({ grupo: g, dctf: v, dcomp: null })), situacao: 'Citada na DCTFWeb e não juntada' };
                const l = linhasDcomp.find(x => x.dc === dc) || { linhaG: [], trans: transmissao(dc), venc: vencimentoDcomp(dc) };
                return { numero: dc.numero, juntada: dc.recibo && dc.extrato ? 'Recibo e extrato' : dc.recibo ? 'Só o recibo' : 'Só o extrato',
                    cnpj: cnpjDcomp(dc) ? cnpjTxt(cnpjDcomp(dc)) : '', transmissao: l.trans, vencimento: l.venc, citaRecibo: recibosCitados(dc).join(', ') || '—',
                    tipoCredito: dc.extrato?.tipoCredito || dc.recibo?.tipoCredito || '', saldoCredito: dc.extrato?.saldoCredito ?? null,
                    demonstrativo: dc.extrato?.inicial || dc.recibo?.demonstrativo || '', acaoJudicial: dc.extrato?.acaoJudicial || dc.recibo?.acaoJudicial || '',
                    grupos: l.linhaG, comparacaoPorSaldo: posteriores.porNumero.has(dc.numero), conferidoSemVinculacao: posteriores.porNumero.get(dc.numero)?.sim === 'SIM',
                    refletida: compPorDcomp.has(dc.numero) ? 'Sim' : 'Não', arquivo: [...new Set(dc.fontes.map(f => f.arquivo))].join('; ') };
            }),
            fechamento,
        };
        return { checklist: ck, avisos, informacoes, detalhe, resumo: { recibo: D?.recibo || '', retificadora: D?.retificadora, saldo, darfs: darfs.length, pagos: pagos.length, dcomps: anexos.length, compensacao: compTotalD + compPosterior, compensacaoVinculada: compTotalD, compensacaoPosterior: compPosterior, saldoResidual } };
    };

    P.ITENS_RELATORIO.push(
        { k: 'DARF1', secao: 'DARF e DCTFWeb', n: '1', texto: 'O DARF contém os dados da contratada (nome, CNPJ).', criterio: 'CNPJ do DARF × CNPJ da contratada na planilha da SEGEST.', aba: 'DCTFWeb' },
        { k: 'DARF2', secao: 'DARF e DCTFWeb', n: '2', texto: 'A competência do DARF e da DCTFWeb é idêntica à dos demais relatórios.', criterio: 'Período de apuração do DARF e da DCTFWeb × competência da planilha da SEGEST.', aba: 'DCTFWeb' },
        { k: 'DARF3', secao: 'DARF e DCTFWeb', n: '3', texto: 'O número do recibo indicado no DARF é o da DCTFWeb apresentada ou o da declaração que ela retificou.', criterio: '"Nº Recibo Declaração" do DARF × "Nº do recibo de entrega" da DCTFWeb de transmissão mais recente e "Número do Recibo da Declaração Retificada". DARF sem o campo: não se aplica.', aba: 'DCTFWeb' },
        { k: 'DARF4', secao: 'DARF e DCTFWeb', n: '4', texto: 'O saldo histórico da DCTFWeb é conciliado com DARFs pagos e compensações posteriores comprovadas.', criterio: 'Saldo histórico do recibo menos principal de PER/DCOMP posterior conferida por CNPJ, recibo, competência e código, menos DARFs efetivamente pagos. Compensação já vinculada não abate novamente o saldo. Na quitação mista, confere a cobertura por código. Saldo residual deve ser zero.', aba: 'DCTFWeb' },
        { k: 'DARF5', secao: 'DARF e DCTFWeb', n: '5', texto: 'Havendo compensação na DCTFWeb, a PER/DCOMP de cada compensação foi juntada, é da contratada e cita a DCTFWeb apresentada ou a declaração que ela retificou.', criterio: 'Cada DComp citada na DCTFWeb (relatório da declaração completa, de créditos por documento ou de créditos) × recibo ou extrato da PER/DCOMP com o mesmo número; CNPJ; "Número do Recibo de Transmissão DCTFWeb" do extrato. Sem compensação e sem PER/DCOMP da competência: não se aplica.', aba: 'DCTFWeb' },
        { k: 'DARF6', secao: 'DARF e DCTFWeb', n: '6', texto: 'Os valores da PER/DCOMP correspondem às compensações vinculadas ou aos saldos históricos dos débitos da DCTFWeb, com transmissão e vencimento conferidos.', criterio: 'DComp já vinculada: valor da DCTFWeb × principal do extrato ou recibo, preservando a conferência anterior. DComp posterior: recibo e extrato, mesmos CNPJ, recibo da DCTFWeb, competência e código; totais fecham e não excedem os saldos. Transmissão × vencimento. Não exige retificadora apenas para informar compensação.', aba: 'DCTFWeb' },
    );

    // v2.5.22: páginas da DCTFWeb, do DARF, do comprovante do DARF e da PER/DCOMP têm tipo próprio
    // ('dctf'), reconhecido antes dos demais. Antes, a "Declaração Completa - DCTFWeb" caía no
    // leitor do S-5001 só para gerar um aviso.
    const tipoPaginaAnteriorDctf = P.tipoPaginaPrev;
    P.tipoPaginaPrev = (t) => (P.subtipoDctfPrev(t) ? 'dctf' : '') || tipoPaginaAnteriorDctf(t);
    const continuaTipoAnteriorDctf = P.continuaTipoPrev;
    P.continuaTipoPrev = (texto, tipo) => tipo === 'dctf'
        ? !/(?:^|\n)\s*(?:De|Para|Assunto|Enviado|Cc)\s*:/i.test(String(texto || '')) && P.continuaDctfPrev(texto)
        : continuaTipoAnteriorDctf(texto, tipo);

    /* ====================================================================================
     * 14.2 LINHAS DO RELATÓRIO SLDST, EDITÁVEIS ANTES DE COPIAR (v2.5.23)
     * ------------------------------------------------------------------------------------
     * A tela mostra exatamente as linhas que a macro preenche na aba do mês do Relatório SLDST
     * (FGTS Digital 1 a 5, DARF 1 a 3 e GFD 1 a 4), já com o resultado do robô e a observação no
     * padrão do relatório. Tudo é editável (Sim/Não e observação); a colagem leva o que estiver na
     * tela. A amostragem é sempre por amostra (20% do total da SEGEST, arredondado para cima, com a
     * quantidade editável); quem recebe o "OK" é escolhido pela macro, que vê o histórico do ano e
     * começa por quem ainda não foi conferido nos meses anteriores.
     * ==================================================================================== */
    P.LINHAS_RELATORIO = [
        { k: 'FGTS1', secao: 'FGTS', titulo: 'Análise FGTS Digital (Detalhe da Guia Emitida)', rotulo: 'FGTS Digital 1', robo: ['FGTS1'], texto: 'O relatório indica a contratada como prestadora dos serviços, no campo "Nome do Empregador".' },
        { k: 'FGTS2', secao: 'FGTS', rotulo: 'FGTS Digital 2', robo: ['FGTS2'], texto: 'No campo "Tomador" consta o CNPJ do órgão contratante.' },
        { k: 'FGTS3', secao: 'FGTS', rotulo: 'FGTS Digital 3', robo: ['FGTS3'], texto: 'Todos os terceirizados da folha de pagamento também estão no FGTS Digital e no eSocial.' },
        { k: 'FGTS4', secao: 'FGTS', rotulo: 'FGTS Digital 4', robo: ['FGTS4'], texto: 'A base de cálculo do INSS da folha é igual à do relatório eSocial.' },
        { k: 'FGTS5', secao: 'FGTS', rotulo: 'FGTS Digital 5', robo: ['FGTS5'], texto: 'O FGTS da folha é igual ao do FGTS Digital ("Valor FGTS na Guia").' },
        { k: 'DARF1', secao: 'DARF', titulo: 'Análise do DARF', rotulo: 'DARF 1', robo: ['DARF1'], texto: 'O DARF contém os dados da contratada (nome, CNPJ etc.).' },
        { k: 'DARF2', secao: 'DARF', rotulo: 'DARF 2', robo: ['DARF2'], texto: 'A competência é idêntica à dos demais relatórios da DCTFWeb.' },
        { k: 'DARF3', secao: 'DARF', rotulo: 'DARF 3', robo: ['DARF3', 'DARF4', 'DARF5', 'DARF6'], texto: 'O DARF foi pago: o valor do recibo da DCTFWeb é o do comprovante (e a compensação confere com a PER/DCOMP, quando houver).' },
        { k: 'GFD1', secao: 'GFD', titulo: 'Análise da Guia do FGTS Digital - GFD', rotulo: 'GFD 1', robo: ['GFD1'], texto: 'A GFD contém os dados da contratada (nome, CNPJ etc.).' },
        { k: 'GFD2', secao: 'GFD', rotulo: 'GFD 2', robo: ['GFD2'], texto: 'A competência é idêntica à dos demais relatórios do FGTS Digital.' },
        { k: 'GFD3', secao: 'GFD', rotulo: 'GFD 3', robo: ['GFD3'], texto: 'O "Valor a recolher" da GFD coincide com o "Total do estabelecimento" do FGTS Digital.' },
        { k: 'GFD4', secao: 'GFD', rotulo: 'GFD 4', robo: ['GFD4'], texto: 'A GFD foi paga: o "Valor a recolher" é o do comprovante de pagamento.' },
    ];
    P.ROTULO_ROBO_DARF = { DARF1: 'DARF/DCTFWeb 1 (dados da contratada)', DARF2: 'DARF/DCTFWeb 2 (competência)', DARF3: 'DARF/DCTFWeb 3 (nº do recibo)', DARF4: 'DARF/DCTFWeb 4 (saldo histórico × pagamento e compensação)', DARF5: 'DARF/DCTFWeb 5 (PER/DCOMP juntada)', DARF6: 'DARF/DCTFWeb 6 (valores compensados)' };

    // Nº do documento no PROAD pelo nome do arquivo: "FAT.SET.26-10- DARF ... .pdf" → "10"
    P.numDocProadPrev = (nome) => {
        const m = String(nome || '').match(/^\s*FAT\.[A-ZÇ]{3}\.\d{2}\s*-\s*(\d{1,3})\b/i) || String(nome || '').match(/^\s*(\d{1,3})\s*[-–.]\s/);
        return m ? m[1].padStart(2, '0') : '';
    };

    // Sugestão do robô para cada linha do relatório: { sim: 'SIM' | 'NAO' | '', obs, explicacao }
    P.sugestaoRelatorioPrev = (res, ctx = {}) => {
        const ck = res.checklist || {};
        const ano = String(res.competencia || '').slice(0, 4);
        const proad = String(ctx.proad ?? res.proad ?? '').trim();
        const det = res.dctf?.detalhe;
        // compensação na DCTFWeb ou PER/DCOMP da competência juntada (mesmo que a DCTFWeb ainda não a mostre)
        const compensado = (res.dctf?.resumo?.compensacao || 0) > 0;
        const parcelado = (det?.debitos || []).reduce((s, x) => s + (x.parcelamento || 0), 0) > 0;
        const arqDcomp = (det?.dcomps || []).map(x => x.arquivo).filter(Boolean)[0] || '';
        const doc = P.numDocProadPrev(arqDcomp.split(';')[0]) || P.numDocProadPrev((ctx.arquivosDctf || [])[0]);
        const refDoc = proad ? `doc. PROAD ${proad}${doc ? `-${doc}` : ''}` : 'documento juntado ao PROAD';
        const rotSim = { SIM: 'Sim', NAO: 'Não', NA: 'Não se aplica', '': 'Pendente' };
        const linhas = {};
        for (const L of P.LINHAS_RELATORIO) {
            const itens = L.robo.map(k => ({ k, c: ck[k] })).filter(x => x.c);
            const sim = !itens.length ? '' : itens.some(x => x.c.sim === 'NAO') ? 'NAO' : itens.some(x => x.c.sim === '') ? '' : 'SIM';
            // observação: só o que precisa constar (problema ou pendência) + os textos de praxe do relatório
            let obs = itens.filter(x => x.c.sim === 'NAO' || x.c.sim === '').map(x => x.c.obs).filter(Boolean);
            obs = [...new Set(obs)].join('; ');
            if (L.k === 'FGTS3') obs = [`Utilizada a tabela "Amostragem ${ano}".`, obs].filter(Boolean).join(' ');
            if (L.k === 'DARF1') {
                const valorPago = det?.valorPago || 0;
                const textoCompensacao = compensado && valorPago > 0
                    ? `Compensação de R$ ${P.rs(res.dctf.resumo.compensacao)} e pagamento de DARF de R$ ${P.rs(valorPago)}, conforme ${refDoc}.`
                    : compensado ? `Os valores foram compensados, conforme ${refDoc}.` : '';
                obs = [textoCompensacao, parcelado ? `Os valores foram parcelados, conforme ${refDoc}.` : '', obs].filter(Boolean).join(' ');
            }
            const explicacao = itens.map(x => `${L.secao === 'DARF' ? P.ROTULO_ROBO_DARF[x.k] : L.rotulo}: ${rotSim[x.c.sim] ?? x.c.sim} — ${x.c.evid || x.c.obs || ''}`).join('\n') || 'Item não avaliado pelo robô.';
            linhas[L.k] = { sim, obs, explicacao };
        }
        const total = (res.segestPessoas || []).length;
        const ok = (res.segestPessoas || []).filter(p => p.situacao === 'OK' || p.situacao === 'OK c/ obs').length;
        return { linhas, total, ok, qtd: total ? Math.max(1, Math.ceil((P.AMOSTRA_PERCENTUAL || 0.2) * total)) : 0 };
    };

    // Estado editável: refeito a cada conferência. Uma linha editada é mantida enquanto a sugestão
    // do robô para ela não mudar; se mudar (documentos diferentes), volta à nova sugestão.
    P.estadoRelatorioPrev = (res, anterior, ctx) => {
        const sug = P.sugestaoRelatorioPrev(res, ctx);
        const chave = `${res.cnpj}|${res.competencia}`;
        const mesmo = anterior && anterior.chave === chave;
        const linhas = {};
        let refeitas = 0;
        for (const L of P.LINHAS_RELATORIO) {
            const s = sug.linhas[L.k], a = mesmo ? anterior.linhas[L.k] : null;
            if (a && a.editado && a.sugSim === s.sim && a.sugObs === s.obs) linhas[L.k] = { ...a, explicacao: s.explicacao };
            else {
                if (a?.editado) refeitas++;
                linhas[L.k] = { sim: s.sim, obs: s.obs, sugSim: s.sim, sugObs: s.obs, explicacao: s.explicacao, editado: false };
            }
        }
        const manterQtd = mesmo && anterior.qtdEditada && anterior.sugQtd === sug.qtd && anterior.total === sug.total;
        return { chave, linhas, total: sug.total, ok: sug.ok, sugQtd: sug.qtd, qtdAmostra: manterQtd ? anterior.qtdAmostra : sug.qtd, qtdEditada: !!manterQtd, refeitas };
    };
    P.marcarEditadoPrev = (x) => { x.editado = x.sim !== x.sugSim || String(x.obs).trim() !== String(x.sugObs).trim(); };

    // v2.5.53: PROAD a partir do nome de uma pasta. "PROAD_35775-2026", "PROAD-36104_2026_10030-2024" e
    // "PROAD 36140 2026" trazem o ano; em "PROAD 36140 22SR062" ou "PROAD 35103 10031 2025" o número que
    // vem depois não é ano (antes virava "35103/1003"), e o ano fica para ser sugerido pela competência.
    P.proadDoNomePrev = (nome) => {
        const t = String(nome || '');
        let m = t.match(/PROAD\D{0,6}?(\d{3,6})\s*[\/\-_.]?\s*(20\d{2})(?!\d)/i);
        if (m) return { numero: m[1], ano: m[2] };
        m = t.match(/PROAD\D{0,6}?(\d{3,6})(?!\d)/i);
        return m ? { numero: m[1], ano: '' } : null;
    };
    // Ano sugerido: o PROAD de pagamento é aberto no mês seguinte ao da competência.
    P.anoProadSugeridoPrev = (competencia) => {
        const m = String(competencia || '').match(/^(\d{4})-(\d{2})/);
        if (!m) return '';
        return String(Number(m[2]) === 12 ? Number(m[1]) + 1 : Number(m[1]));
    };

    // ---------- colagem para a macro mConferenciaPrev v3.0.0 (formato v5) ----------
    // #PREVFGTS v5 | competência | empresa | CNPJ | contrato | PROAD | total da SEGEST | quantidade da amostra
    // CHK  | linha (FGTS1–5, DARF1–3, GFD1–4) | SIM, NAO ou vazio | observação
    // PES  | CPF | nome | posto | localidade | OK (conferido sem pendência) ou PENDENTE
    P.gerarTsvV5 = (res, rel) => {
        const limpa = (v) => String(v ?? '').replace(/[\t\r\n]+/g, ' ').trim();
        const L = [['#PREVFGTS', 'v5', res.competencia, limpa(res.empresa), res.cnpj, limpa(res.contrato), limpa(res.proad), rel.total, rel.qtdAmostra].join('\t')];
        for (const x of P.LINHAS_RELATORIO) { const v = rel.linhas[x.k]; L.push(['CHK', x.k, v.sim, limpa(v.obs)].join('\t')); }
        for (const p of res.segestPessoas) {
            const ok = p.situacao === 'OK' || p.situacao === 'OK c/ obs';
            L.push(['PES', P.fmtCpf(p.cpf), limpa(p.seg?.nome || p.nome), limpa(p.seg?.posto), limpa(p.seg?.localidade), ok ? 'OK' : 'PENDENTE'].join('\t'));
        }
        return L.join('\r\n');
    };

    const EST = { segest: null, segestOrigem: '', s5001: null, inssDocumentos: [], cadastroEsocial: null, cadastroEsocialPaginas: [], folha: null, fgtsPaginas: [], fgts: null, dctfPaginas: [], dctf: null, relatorio: null, fgtsRescisorio: { linhas: [], guias: new Map(), gfds: [], comprovantes: [], extratos: [], linhasDetalhe: [] }, hashesLidos: new Map(), fgtsViaOcr: false, arquivos: { s5001: '', cadastroEsocial: [], folha: '', fgts: [], dctf: [] }, lendo: '', resultado: null, filtro: 'pend', aba: 'checklist', erros: [], errosSegest: [], leituras: [], diagnosticos: [], diagFontes: { folha: null, s5001: null, cadastroEsocial: [], fgts: [], segest: null } };
    const NOMES_DOC = { folha: 'folha analítica', s5001: 'S-5001/relatório do INSS', cadastroEsocial: 'cadastro contratual do eSocial', fgts: 'FGTS Digital', dctf: 'DARF/DCTFWeb/PER-DCOMP' };

    const ITENS_CHECKLIST = [
        ['FGTS1', 'FGTS Digital 1', 'O relatório indica a contratada no campo "Nome do Empregador"'],
        ['FGTS2', 'FGTS Digital 2', 'O campo "Tomador" indica o CNPJ do TRT'],
        ['FGTS3', 'FGTS Digital 3', 'Todos os terceirizados da folha estão no FGTS Digital e no eSocial'],
        ['FGTS4', 'FGTS Digital 4', 'Base de cálculo do INSS da folha = eSocial (S-5001)'],
        ['FGTS5', 'FGTS Digital 5', 'FGTS da folha = FGTS Digital'],
        ['GFD1', 'GFD 1', 'A GFD contém os dados da contratada'],
        ['GFD2', 'GFD 2', 'Competência igual à dos demais relatórios'],
        ['GFD3', 'GFD 3', 'FGTS da GFD = total geral do FGTS da mesma guia (consignado separado)'],
        ['GFD4', 'GFD 4', 'Pagamento efetivado e vinculado à GFD, com valor e data conferidos'],
        // v2.5.22: seção "Análise do DARF e da DCTFWeb" (POP_SLDST_002)
        ['DARF1', 'DARF/DCTFWeb 1', 'O DARF contém os dados da contratada (nome, CNPJ)'],
        ['DARF2', 'DARF/DCTFWeb 2', 'Competência do DARF e da DCTFWeb igual à dos demais relatórios'],
        ['DARF3', 'DARF/DCTFWeb 3', 'Nº do recibo no DARF = DCTFWeb apresentada ou a que ela retificou'],
        ['DARF4', 'DARF/DCTFWeb 4', 'Saldo a pagar do recibo da DCTFWeb = DARFs pagos, com comprovante'],
        ['DARF5', 'DARF/DCTFWeb 5', 'Havendo compensação, a PER/DCOMP foi juntada, é da contratada e cita a DCTFWeb'],
        ['DARF6', 'DARF/DCTFWeb 6', 'Valores compensados na DCTFWeb = débitos da PER/DCOMP, transmitida até o vencimento'],
    ];

    // Cada página é classificada pelo conteúdo: dá para juntar os PDFs separados ou um PDF único.
    function tipoDaPagina(t) { return P.tipoPaginaPrev(t); }

    // v2.5.15: em documento de rescisão (TRCT, fichas, GFD, comprovante, extrato) a página só é girada e
    // relida se o texto da orientação original não for legível; antes eram até 4 leituras por página.
    P.legivelOcrPrev = (t) => new Set((String(t || '').match(/\b(?:FGTS|GUIA|CAIXA|PAGAMENTO|PAGO|EMPREGADOR|EMPREGADO|TRABALHADOR|RESCIS\w*|CONTRATO|NOME|DATA|VALOR|TOTAL|CPF|CNPJ|SALDO|DEP[OÓ]SITO|COMPROVANTE|EMPRESA|ADMISS\w*|SAL[AÁ]RIO|AVISO|F[EÉ]RIAS|TERMO|QUITA\w*|CATEGORIA|COMPET[EÊ]NCIA|VENCIMENTO|BANCO|AG[EÊ]NCIA|CONTA)\b/gi) || []).map(x => x.toUpperCase())).size >= 4;
    P.pontuarOcrPrev = (t) => (/EXTRATO MENSAL|FOLHA ANAL[IÍ]TICA|S-?5001|FGTS Digital|Colaborador/i.test(t) ? 20 : 0)
        + Math.min(20, (t.match(/\d{3}\.\d{3}\.\d{3}-\d{2}/g) || []).length * 5)
        + Math.min(15, (t.match(/\d+,\d{2}/g) || []).length) + (P.legivelOcrPrev(t) ? 12 : 0);
    P.ocrConfiavelPrev = (t) => P.pontuarOcrPrev(String(t || '')) >= 25 || P.legivelOcrPrev(t);
    // v2.5.26: confiança média do Tesseract (0 a 100); página lida de lado ou de cabeça para baixo fica bem abaixo de 50.
    P.ocrConfiantePrev = (r) => !!r && r.conf >= 70 && String(r.texto || '').replace(/\s/g, '').length >= 20;
    // Entre duas leituras da mesma página em orientações diferentes: diferença grande de confiança decide; senão, a
    // pontuação (CPF, valores, palavras conhecidas); empate, a confiança. Antes, no empate ganhava o texto mais
    // comprido, e uma leitura de lado (lixo) vencia a certa em página com pouco texto (recibo da DCTFWeb).
    P.ocrMelhorPrev = (a, b) => {
        if (!b) return true;
        if (a.conf >= b.conf + 25) return true;
        if (b.conf >= a.conf + 25) return false;
        const sa = P.pontuarOcrPrev(a.texto), sb = P.pontuarOcrPrev(b.texto);
        return sa !== sb ? sa > sb : a.conf > b.conf + 5;
    };
    // ---------- v2.5.26: linhas de tabela fora da imagem antes do OCR ----------
    // Bordas de tabela viram caracteres no OCR ("Número do Recibo/5000…", "1646-01 |CP…") e, nas tabelas largas
    // (relatório de débitos da DCTFWeb), embaralham as colunas. Apaga só traços longos e finos: horizontais com pelo
    // menos 4% da largura e verticais com 3% da altura, de até ~2 pt de espessura. Faixas escuras (fundo de
    // cabeçalho), letras, logotipos e carimbos ficam como estão.
    P.semLinhasDadosPrev = (px, w, h) => {
        const n = w * h; if (!n || px.length < n * 4) return 0;
        const minH = Math.max(60, Math.round(w * 0.04)), minV = Math.max(60, Math.round(h * 0.03));
        const maxEsp = Math.max(4, Math.round(Math.min(w, h) / 300));
        const esc = new Uint8Array(n);
        for (let i = 0, j = 0; i < n; i++, j += 4) {
            if (px[j + 3] < 128) continue; // transparente = branco
            if (px[j] * 299 + px[j + 1] * 587 + px[j + 2] * 114 < 200000) esc[i] = 1;
        }
        const hor = new Uint8Array(n), ver = new Uint8Array(n);
        for (let y = 0; y < h; y++) { // traços horizontais longos
            const b = y * w;
            for (let x = 0; x < w;) {
                if (!esc[b + x]) { x++; continue; }
                const x0 = x; while (x < w && esc[b + x]) x++;
                if (x - x0 >= minH) hor.fill(1, b + x0, b + x);
            }
        }
        for (let x = 0; x < w; x++) { // traços verticais longos
            for (let y = 0; y < h;) {
                if (!esc[y * w + x]) { y++; continue; }
                const y0 = y; while (y < h && esc[y * w + x]) y++;
                if (y - y0 >= minV) for (let k = y0; k < y; k++) ver[k * w + x] = 1;
            }
        }
        for (let x = 0; x < w; x++) { // mais grosso que uma linha é faixa (fundo escuro), não borda
            for (let y = 0; y < h;) {
                if (!hor[y * w + x]) { y++; continue; }
                const y0 = y; while (y < h && hor[y * w + x]) y++;
                if (y - y0 > maxEsp) for (let k = y0; k < y; k++) hor[k * w + x] = 0;
            }
        }
        for (let y = 0; y < h; y++) {
            const b = y * w;
            for (let x = 0; x < w;) {
                if (!ver[b + x]) { x++; continue; }
                const x0 = x; while (x < w && ver[b + x]) x++;
                if (x - x0 > maxEsp) ver.fill(0, b + x0, b + x);
            }
        }
        let apagados = 0; // apaga a linha e 1 pixel em volta (a borda cinza do antisserrilhado)
        for (let y = 0; y < h; y++) {
            const b = y * w;
            for (let x = 0; x < w; x++) {
                const i = b + x;
                if (!(hor[i] || ver[i] || (x > 0 && (hor[i - 1] || ver[i - 1])) || (x < w - 1 && (hor[i + 1] || ver[i + 1]))
                    || (y > 0 && (hor[i - w] || ver[i - w])) || (y < h - 1 && (hor[i + w] || ver[i + w])))) continue;
                const j = i * 4;
                if (px[j] !== 255 || px[j + 1] !== 255 || px[j + 2] !== 255) { px[j] = px[j + 1] = px[j + 2] = 255; apagados++; }
                px[j + 3] = 255;
            }
        }
        return apagados;
    };
    P.semLinhasCanvasPrev = (canvas) => {
        const ctx = canvas.getContext('2d');
        const img = ctx.getImageData(0, 0, canvas.width, canvas.height);
        const n = P.semLinhasDadosPrev(img.data, canvas.width, canvas.height);
        if (n) ctx.putImageData(img, 0, 0);
        return n;
    };
    async function ocrPaginaPrev(page, rapido = false) {
        // v2.5.5: modo "bloco único" (PSM 6) mantém cada linha da folha inteira, com o valor ao lado do
        // rótulo; no modo automático o Tesseract separa as colunas e os valores perdem o rótulo.
        const w0 = await OCR.obterWorker();
        try { await w0.setParameters({ tessedit_pageseg_mode: '6', preserve_interword_spaces: '1' }); } catch (e) { /* segue no modo padrão */ }
        try { return await ocrPaginaPrevInterno(page, rapido); }
        finally { try { await w0.setParameters({ tessedit_pageseg_mode: '3', preserve_interword_spaces: '0' }); } catch (e) { /* ignora */ } }
    }

    async function ocrPaginaPrevInterno(page, rapido = false) {
        const score = t => (/EXTRATO MENSAL|FOLHA ANAL[IÍ]TICA|S-?5001|FGTS Digital|Colaborador/i.test(t) ? 20 : 0)
            + Math.min(20, (t.match(/\d{3}\.\d{3}\.\d{3}-\d{2}/g) || []).length * 5)
            + Math.min(15, (t.match(/\d+,\d{2}/g) || []).length);
        let melhor = await ocrPaginaPDF(page);
        if (score(melhor) >= 25) return melhor;
        if (rapido && P.legivelOcrPrev(melhor)) return melhor;
        // Páginas impressas lateralmente sem uma rotação declarada no PDF.
        const viewport = page.getViewport({ scale: 4 });
        const original = document.createElement('canvas'); original.width = viewport.width; original.height = viewport.height;
        try {
            await page.render({ canvasContext: original.getContext('2d'), viewport }).promise;
            const worker = await OCR.obterWorker();
            for (const sentido of [1, -1, 2]) {
                const canvas = document.createElement('canvas');
                const lateral = Math.abs(sentido) % 2 === 1;
                canvas.width = lateral ? original.height : original.width;
                canvas.height = lateral ? original.width : original.height;
                try {
                    const ctx = canvas.getContext('2d'); ctx.translate(canvas.width / 2, canvas.height / 2); ctx.rotate(sentido * Math.PI / 2);
                    ctx.drawImage(original, -original.width / 2, -original.height / 2);
                    const { data } = await worker.recognize(canvas); const texto = data?.text || '';
                    if (score(texto) > score(melhor)) melhor = texto;
                    if (score(melhor) >= 25) break;
                } finally { canvas.width = canvas.height = 0; }
            }
        } finally { original.width = original.height = 0; }
        return melhor;
    }

    // ---------- v2.5.16: OCR em paralelo e guardado pelo conteúdo do arquivo ----------
    // Por que há OCR: página de PDF sem camada de texto (documento digitalizado ou "impresso como imagem").
    // O texto dessas páginas só sai por OCR, que é lento. Para reduzir a espera:
    //  1) várias páginas são lidas ao mesmo tempo, cada uma num leitor (worker) do Tesseract;
    //  2) o texto lido fica guardado no Tampermonkey pelo SHA-256 do arquivo: o mesmo PDF (mesmo com outro
    //     nome ou em outra pasta) não passa de novo pelo OCR, inclusive em outro dia;
    //  3) a página só é girada e relida se a primeira leitura não for legível;
    //  4) o OCR pode ser interrompido; as páginas já lidas ficam guardadas e a próxima leitura continua delas.
    const PREV_OCR_VERSAO = 'v2|por|psm6|x4|semLinhas'; // v2.5.26: OCR sem as linhas das tabelas; o guardado da v1 é refeito
    const PREV_OCR_INDICE = 'prevOcrIndice';
    const PREV_OCR_MAX_ARQUIVOS = 60, PREV_OCR_MAX_CARACTERES = 12000000;
    const prevOcrPool = { workers: [], criando: null };
    function prevOcrLeitores() {
        const nucleos = Number(globalThis.navigator?.hardwareConcurrency) || 2;
        return Math.max(1, Math.min(4, nucleos - 1));
    }
    async function prevOcrWorkers(n) {
        while (prevOcrPool.workers.length < n) {
            const w = await Tesseract.createWorker('por');
            try { await w.setParameters({ tessedit_pageseg_mode: '6', preserve_interword_spaces: '1' }); } catch (e) { /* segue no modo padrão */ }
            prevOcrPool.workers.push(w);
        }
        return prevOcrPool.workers.slice(0, n);
    }
    function prevOcrCacheLer(hash) {
        if (!hash || typeof GM_getValue !== 'function') return null;
        try { const v = GM_getValue(`prevOcr:${hash}`, null); const o = typeof v === 'string' ? JSON.parse(v) : v; return o && o.versao === PREV_OCR_VERSAO ? o : null; }
        catch (e) { return null; }
    }
    function prevOcrCacheGravar(hash, nome, paginasOcr) {
        if (!hash || typeof GM_setValue !== 'function' || !Object.keys(paginasOcr).length) return;
        try {
            const anterior = prevOcrCacheLer(hash);
            const paginas = { ...(anterior?.paginas || {}), ...paginasOcr };
            const caracteres = Object.values(paginas).reduce((n, t) => n + String(t || '').length, 0);
            const orientacaoV2 = { ...(anterior?.orientacaoV2 || {}), ...Object.fromEntries(Object.keys(paginasOcr).map(p => [p, true])) };
            GM_setValue(`prevOcr:${hash}`, JSON.stringify({ versao: PREV_OCR_VERSAO, nome, gravadoEm: Date.now(), paginas, orientacaoV2 }));
            let indice = []; try { indice = JSON.parse(GM_getValue(PREV_OCR_INDICE, '[]')) || []; } catch (e) { indice = []; }
            indice = indice.filter(x => x.hash !== hash); indice.push({ hash, nome, caracteres, t: Date.now() });
            // limite: os mais antigos saem primeiro
            while (indice.length > PREV_OCR_MAX_ARQUIVOS || indice.reduce((n, x) => n + (x.caracteres || 0), 0) > PREV_OCR_MAX_CARACTERES) {
                const velho = indice.shift(); if (!velho) break;
                try { if (typeof GM_deleteValue === 'function') GM_deleteValue(`prevOcr:${velho.hash}`); else GM_setValue(`prevOcr:${velho.hash}`, null); } catch (e) { /* ignora */ }
            }
            GM_setValue(PREV_OCR_INDICE, JSON.stringify(indice));
        } catch (e) { console.warn('[SIGEO-Terceirizados] Texto do OCR não guardado:', e.message); }
    }
    // Uma página com um leitor: renderiza a página uma vez só (escala 4 ≈ 288 dpi).
    // v2.5.26: antes do OCR, apaga as linhas das tabelas; a orientação é escolhida pela confiança do OCR.
    async function prevOcrPagina(page, worker, metadados = {}) {
        metadados.ocrTentativas = 0; metadados.ocrRotacao = 0;
        metadados.ocrVersaoOrientacao = 3;
        const reconhecer = async (canvas) => {
            metadados.ocrTentativas++;
            const d = (await worker.recognize(canvas)).data || {};
            return { texto: d.text || '', conf: Number(d.confidence) || 0 };
        };
        const pronto = (r) => P.ocrConfiavelPrev(r.texto) || P.ocrConfiantePrev(r);
        const viewport = page.getViewport({ scale: 4 });
        const original = document.createElement('canvas'); original.width = viewport.width; original.height = viewport.height;
        try {
            // v2.5.27: intent 'print' desenha a página sem esperar o navegador pintar a tela (requestAnimationFrame),
            // que fica parado com a aba em segundo plano: o OCR seguia parado até a aba voltar a ficar visível.
            await page.render({ canvasContext: original.getContext('2d'), viewport, intent: 'print' }).promise;
            try { metadados.ocrLinhasApagadas = P.semLinhasCanvasPrev(original); }
            catch (e) { metadados.ocrLinhasApagadas = null; /* segue com a imagem como veio */ }
            let melhor = await reconhecer(original);
            if (!pronto(melhor)) {
                // Pouco texto ou confiança baixa também podem significar página de lado/de cabeça para baixo (impressa
                // lateralmente sem rotação declarada no PDF). Não confundir essa falha de reconhecimento com página vazia.
                for (const sentido of [1, -1, 2]) {
                    const canvas = document.createElement('canvas');
                    const lateral = Math.abs(sentido) % 2 === 1;
                    canvas.width = lateral ? original.height : original.width;
                    canvas.height = lateral ? original.width : original.height;
                    try {
                        const ctx = canvas.getContext('2d'); ctx.translate(canvas.width / 2, canvas.height / 2); ctx.rotate(sentido * Math.PI / 2);
                        ctx.drawImage(original, -original.width / 2, -original.height / 2);
                        const lido = await reconhecer(canvas);
                        if (P.ocrMelhorPrev(lido, melhor)) { melhor = lido; metadados.ocrRotacao = sentido * 90; }
                        if (pronto(melhor)) break;
                    } finally { canvas.width = canvas.height = 0; }
                }
            }
            metadados.ocrConfianca = Math.round(melhor.conf);
            return melhor.texto;
        } finally { original.width = original.height = 0; }
    }
    async function prevOcrEmParalelo(doc, pendentes, rotulo, arquivo, aoLer) {
        const workers = await prevOcrWorkers(Math.min(prevOcrLeitores(), pendentes.length));
        let proxima = 0, feitas = 0;
        const inicio = performance.now();
        const progresso = () => {
            const resta = feitas ? (performance.now() - inicio) / feitas * (pendentes.length - feitas) / 60000 : null;
            EST.lendo = `${rotulo}: OCR de ${feitas} de ${pendentes.length} página(s) sem texto${resta === null ? '' : ` · cerca de ${resta < 1 ? 'menos de 1 min' : `${Math.ceil(resta)} min`} restante(s)`} · ${workers.length} leitura(s) em paralelo`;
            desenhar();
        };
        EST.ocrEmAndamento = true; progresso();
        try {
            await Promise.all(workers.map(async (w) => {
                while (proxima < pendentes.length && !EST.cancelarOcr) {
                    const item = pendentes[proxima++];
                    const inicioOcr = performance.now();
                    let page;
                    try { page = await doc.getPage(item.p); aoLer(item, P.normalizarOcrPrev(await prevOcrPagina(page, w, item.dp)), null); }
                    catch (e) { aoLer(item, '', e); }
                    finally {
                        item.dp.duracaoOcrMs = Math.round(performance.now() - inicioOcr);
                        item.dp.duracaoMs = (item.dp.duracaoTextoMs || 0) + item.dp.duracaoOcrMs;
                        page?.cleanup(); feitas++; progresso();
                    }
                }
            }));
        } finally { EST.ocrEmAndamento = false; }
    }

    // v2.5.11: cache de sessão por identidade real do File. Reutiliza somente texto e
    // metadados lidos deste MESMO objeto; jamais mistura arquivos com nomes iguais.
    // Não reaproveita uma leitura com falha de OCR, para permitir nova tentativa.
    const prevCachePdf = new WeakMap();
    const prevClonarPaginas = (entrada) => {
        const saida = Array.from(entrada, x => x);
        saida.ocr = [...(entrada.ocr || [])];
        saida.falhasOcr = [...(entrada.falhasOcr || [])];
        saida.digitalizado = !!entrada.digitalizado;
        return saida;
    };

    async function lerPaginasPdf(arquivo, rotulo, diagnostico) {
        if (typeof pdfjsLib === 'undefined') throw new Error('o pdf.js não carregou (confira o @require do robô).');
        const inicioLeitura = performance.now();
        const cache = prevCachePdf.get(arquivo);
        if (cache && !cache.paginas.falhasOcr.length) {
            const paginas = prevClonarPaginas(cache.paginas);
            if (diagnostico) {
                diagnostico.totalPaginas = paginas.length;
                diagnostico.paginas.push(...cache.diagnosticos.map(x => ({ ...x, avisos: [...(x.avisos || [])],
                    duracaoOriginalMs: x.duracaoMs, duracaoMs: 0, duracaoTextoMs: 0, duracaoOcrMs: 0, cacheSessao: true })));
                diagnostico.cacheReutilizado = true;
                diagnostico.ocrLidasAgora = 0; diagnostico.ocrDoCache = paginas.ocr.length; diagnostico.duracaoOcrMs = 0;
                diagnostico.duracaoMs = Math.round(performance.now() - inicioLeitura);
            }
            console.log(`[SIGEO-Terceirizados] PDF reutilizado do cache: ${rotulo} (${paginas.length} páginas).`);
            return paginas;
        }
        const bytes = await arquivo.arrayBuffer();
        if (diagnostico) await identificarBytesDiagnostico(diagnostico, bytes);
        let hashOcr = ''; try { hashOcr = await hashConteudoPrev(bytes); } catch (e) { /* sem cache persistente */ }
        const guardado = prevOcrCacheLer(hashOcr);
        const doc = await pdfjsLib.getDocument({ data: new Uint8Array(bytes) }).promise;
        if (diagnostico) diagnostico.totalPaginas = doc.numPages;
        const paginas = [], ocr = [], falhas = [], pendentes = [], lidasAgora = {};
        try {
            for (let p = 1; p <= doc.numPages; p++) {
                if (p % 10 === 1) { EST.lendo = `${rotulo}: página ${p} de ${doc.numPages}…`; desenhar(); await new Promise(r => setTimeout(r, 0)); }
                const inicioPagina = performance.now();
                const dp = { numero: p, metodo: 'texto_pdf', rotacaoPdf: null, texto: '', caracteres: 0, erro: null, avisos: [] };
                if (diagnostico) diagnostico.paginas.push(dp);
                let page;
                try {
                page = await doc.getPage(p); dp.rotacaoPdf = page.rotate ?? null;
                const c = await page.getTextContent();
                let texto = P.linhasDaPagina(c.items, page.getViewport({ scale: 1 }), pdfjsLib.Util);
                // v2.5.19: texto "de controle" (fonte sem mapeamento de caracteres) é ilegível: vai ao OCR também
                // v2.5.22: comprovante com os rótulos e sem os valores (fonte sem mapeamento) também vai ao OCR
                const semTexto = texto.replace(/\s/g, '').length < 50 || P.textoIlegivelPrev(texto) || P.rotulosSemValorPrev(texto);
                dp.textoAntesDoOcr = semTexto ? texto : null;
                if (semTexto) {
                    // v2.5.16: OCR depois da leitura do texto, em paralelo; ou o texto já guardado deste arquivo
                    dp.metodo = 'ocr';
                    const salvo = guardado?.paginas?.[String(p)];
                    // O cache anterior é mantido para leituras legíveis. Textos
                    // curtos/ilegíveis da regra antiga ganham nova tentativa de orientação.
                    if (typeof salvo === 'string' && (guardado?.orientacaoV2?.[String(p)] || P.ocrConfiavelPrev(salvo))) {
                        texto = P.normalizarOcrPrev(salvo); ocr.push(p); dp.ocrGuardado = true; dp.duracaoOcrMs = 0;
                    } else pendentes.push({ p, dp, indice: p - 1 });
                    // v2.5.26: o motivo registrado no diagnóstico diz qual das três regras mandou a página ao OCR
                    dp.motivoOcr = (dp.textoAntesDoOcr || '').replace(/\s/g, '').length < 50 ? 'Página com menos de 50 caracteres úteis na camada de texto do PDF'
                        : P.rotulosSemValorPrev(dp.textoAntesDoOcr) ? 'Camada de texto com os rótulos e sem os valores (fonte sem mapeamento)'
                            : 'Camada de texto ilegível (fonte sem mapeamento ou com as letras embaralhadas)';
                }
                dp.texto = texto; dp.caracteres = texto.length;
                if (!texto.trim()) dp.avisos.push('Página sem texto extraído.');
                paginas.push(texto);
                } catch (e) { dp.erro = e.message; dp.metodo = 'erro_na_leitura'; throw e; }
                finally { dp.duracaoTextoMs = Math.round(performance.now() - inicioPagina); dp.duracaoMs = dp.duracaoTextoMs; page?.cleanup(); }
            }
            if (pendentes.length && EST.cancelarOcr) {
                for (const it of pendentes) { it.dp.erro = 'OCR interrompido pelo usuário'; it.dp.metodo = 'texto_pdf_apos_falha_ocr'; falhas.push(`página ${it.p}: OCR interrompido pelo usuário`); }
            } else if (pendentes.length) {
                const lidos = new Set();
                const inicioOcrDocumento = performance.now();
                try {
                    await prevOcrEmParalelo(doc, pendentes, rotulo, arquivo, (it, texto, erro) => {
                        lidos.add(it.p);
                        if (erro) { it.dp.erro = `OCR indisponível (${erro.message})`; it.dp.metodo = 'texto_pdf_apos_falha_ocr'; falhas.push(`página ${it.p}: OCR indisponível (${erro.message})`); return; }
                        paginas[it.indice] = texto; it.dp.texto = texto; it.dp.caracteres = texto.length;
                        it.dp.avisos = it.dp.avisos.filter(a => a !== 'Página sem texto extraído.');
                        if (!texto.trim()) it.dp.avisos.push('Página sem texto extraído.');
                        ocr.push(it.p); lidasAgora[String(it.p)] = texto;
                    });
                } catch (e) {
                    for (const it of pendentes) if (!lidos.has(it.p)) { lidos.add(it.p); it.dp.erro = `OCR indisponível (${e.message})`; it.dp.metodo = 'texto_pdf_apos_falha_ocr'; falhas.push(`página ${it.p}: OCR indisponível (${e.message})`); }
                }
                for (const it of pendentes) if (!lidos.has(it.p)) { it.dp.erro = 'OCR interrompido pelo usuário'; it.dp.metodo = 'texto_pdf_apos_falha_ocr'; falhas.push(`página ${it.p}: OCR interrompido pelo usuário`); }
                prevOcrCacheGravar(hashOcr, rotulo, lidasAgora); // também guarda o que foi lido antes de uma interrupção
                if (diagnostico) diagnostico.duracaoOcrMs = Math.round(performance.now() - inicioOcrDocumento);
            }
        } finally { await doc.destroy(); }
        ocr.sort((a, b) => a - b);
        paginas.ocr = ocr; paginas.falhasOcr = falhas;
        if (ocr.length && ocr.length >= Math.max(3, paginas.length * 0.5)) paginas.digitalizado = true;
        if (diagnostico) diagnostico.duracaoMs = Math.round(performance.now() - inicioLeitura);
        if (diagnostico) { diagnostico.ocrLidasAgora = Object.keys(lidasAgora).length; diagnostico.ocrDoCache = ocr.length - diagnostico.ocrLidasAgora; }
        if (!falhas.length) prevCachePdf.set(arquivo, {
            paginas: prevClonarPaginas(paginas),
            diagnosticos: (diagnostico?.paginas || []).map(x => ({ ...x, avisos: [...(x.avisos || [])] })),
        });
        console.log(`[SIGEO-Terceirizados] Leitura PDF: ${rotulo} — ${paginas.length} páginas, ${ocr.length} por OCR (${Object.keys(lidasAgora).length} lidas agora, ${ocr.length - Object.keys(lidasAgora).length} do texto guardado), ${Math.round(performance.now() - inicioLeitura)} ms.`);
        return paginas;
    }

    // v2.5.14: SHA-256 do conteúdo, para não ler o mesmo PDF duas vezes (mesmo com outro nome).
    async function hashConteudoPrev(buf) {
        if (!globalThis.crypto?.subtle) return '';
        const h = await globalThis.crypto.subtle.digest('SHA-256', buf);
        return [...new Uint8Array(h)].map(b => b.toString(16).padStart(2, '0')).join('');
    }

    async function juntarPdfs(arquivos) {
        EST.erros = [];
        EST.cancelarOcr = false;
        EST.hashesLidos ||= new Map();
        for (const arq of arquivos) {
            let hashArquivo = '';
            try { hashArquivo = await hashConteudoPrev(await arq.arrayBuffer()); } catch (e) { /* sem hash: lê normalmente */ }
            const chaveHashArquivo = P.chaveHashArquivoPrev(hashArquivo, arq.name);
            if (chaveHashArquivo && EST.hashesLidos.has(chaveHashArquivo)) {
                EST.leituras.push(`${arq.name}: mesmo conteúdo e identificação de "${EST.hashesLidos.get(chaveHashArquivo)}"; não foi lido de novo.`);
                continue;
            }
            const diagnostico = novoDocumentoDiagnostico(arq);
            try {
                const paginas = await lerPaginasPdf(arq, arq.name, diagnostico);
                diagnostico.estado = 'texto_lido';
                for (const falha of (paginas.falhasOcr || []).filter(f => !/OCR interrompido/.test(f))) EST.erros.push(`${arq.name}: ${falha}. Conferência manual necessária.`);
                {   // v2.5.16: páginas com OCR interrompido viram um aviso só
                    const interrompidas = (paginas.falhasOcr || []).filter(f => /OCR interrompido/.test(f)).map(f => f.match(/página (\d+)/)?.[1]).filter(Boolean);
                    if (interrompidas.length) EST.erros.push(`${arq.name}: OCR interrompido; ${interrompidas.length} página(s) sem leitura (${interrompidas.length > 12 ? `${interrompidas.slice(0, 12).join(', ')}…` : interrompidas.join(', ')}). As páginas já lidas ficaram guardadas: conferir de novo continua de onde parou.`);
                }
                if (paginas.digitalizado) EST.leituras.push(`${arq.name}: PDF digitalizado (imagem, sem texto) — ${paginas.ocr.length} de ${paginas.length} páginas lidas por OCR. O PDF gerado pelo sistema (com texto) é lido em segundos; vale pedir esse formato à empresa.`);
                if (paginas.join('').replace(/\s/g, '').length < 50) { EST.erros.push(`"${arq.name}" é um PDF de imagem (sem texto); não foi possível obter texto nem por OCR; confira manualmente.`); continue; }
                const grupos = { s5001: [], cadastroEsocial: [], folha: [], fgts: [], dctf: [] };
                for (const grupo of Object.values(grupos)) grupo.fontes = [];
                const numeros = { s5001: [], cadastroEsocial: [], folha: [], fgts: [], dctf: [] };
                let ultimo = '';
                for (const [idx, pg] of paginas.entries()) {
                    const tipo = tipoDaPagina(pg);
                    if (tipo === 'ignorar') {
                        Object.assign(diagnostico.paginas[idx], { tipoReconhecido: 'ignorar', tipoUsado: null, classificacao: 'ignorada_aviso_recibo_ou_comprovante' });
                        ultimo = ''; continue;
                    }
                    // v2.5.14: só herda o tipo da página anterior o que parecer continuação dela
                    const direto = tipo, herda = !direto && !!ultimo && P.continuaTipoPrev(pg, ultimo), t = direto || (herda ? ultimo : '');
                    Object.assign(diagnostico.paginas[idx], { tipoReconhecido: direto || null, tipoUsado: t || null,
                        classificacao: direto ? 'conteudo' : t ? 'continuidade_da_pagina_anterior' : 'nao_reconhecida' });
                    if (t) {
                        numeros[t].push(idx + 1);
                        if ((paginas.ocr || []).includes(idx + 1)) { grupos[t].ocr ||= []; grupos[t].ocr.push(grupos[t].length); }
                        grupos[t].push(pg);
                        grupos[t].fontes.push({ arquivo: arq.name, pagina: idx + 1, metodo: diagnostico.paginas[idx].metodo });
                    }
                    if (tipoDaPagina(pg)) ultimo = tipoDaPagina(pg);
                    else if (!herda) ultimo = '';
                }
                const achados = Object.entries(grupos).filter(([, v]) => v.length).map(([k]) => k);
                const entrada = LOCAL.arquivos.find(a => a.nome === arq.name);
                if (entrada && entrada.papel !== 'rescisorio') entrada.papel = ['s5001', 'cadastroEsocial', 'folha', 'fgts', 'dctf'].find(k => achados.includes(k)) || entrada.papel;
                console.log(`[SIGEO-Terceirizados] Conferência previdenciária: "${arq.name}" — ${paginas.length} pág.; ${achados.map(k => `${k}: ${grupos[k].length}`).join(', ') || 'nada reconhecido'}`);
                EST.leituras.push(`${arq.name}: ${paginas.length} pág. — ${achados.length ? achados.map(k => `${NOMES_DOC[k]} (${grupos[k].length} pág.)`).join(', ') : 'nada reconhecido'}${Number.isFinite(diagnostico.duracaoMs) ? ` — leitura ${(diagnostico.duracaoMs / 1000).toFixed(1)} s` : ''}`);
                // v2.5.14: documento de rescisão (nome, papel na pasta, TRCT/extrato no conteúdo ou detalhe só rescisório)
                let complementar = P.ehDocumentoRescisorioPrev(arq.name, paginas, arq.papel);
                if (!complementar && grupos.fgts.length) { try { complementar = P.soDetalheRescisorioPrev(P.lerFgts(grupos.fgts)); } catch (e) { /* segue como antes */ } }
                if (!achados.length && complementar) EST.leituras.push(`${arq.name}: documento de rescisão sem folha, S-5001 ou guia reconhecidos; procurados comprovante e extrato da conta FGTS.`);
                if (!achados.length && !complementar) { EST.erros.push(`"${arq.name}": não reconheci folha analítica, relatório do INSS, cadastro eSocial, FGTS Digital, DARF, DCTFWeb nem PER/DCOMP. Início do texto: "${paginas.join(' ').slice(0, 140).replace(/\s+/g, ' ')}"`); continue; }
                // v2.5.14: em documento de rescisão, páginas parecidas com folha/S-5001 (TRCT, fichas) não
                // substituem a folha e o S-5001 já lidos de documentos próprios.
                if (complementar && grupos.s5001.length && EST.s5001) { EST.leituras.push(`${arq.name}: páginas com aparência de relatório do INSS ignoradas (documento de rescisão; mantido ${EST.arquivos.s5001}).`); grupos.s5001.length = 0; }
                if (complementar && grupos.folha.length && EST.folha) { EST.leituras.push(`${arq.name}: páginas com aparência de folha ignoradas (documento de rescisão; mantida ${EST.arquivos.folha}).`); grupos.folha.length = 0; }
                if (grupos.cadastroEsocial.length) {
                    const lido = P.lerCadastroEsocialPrev(grupos.cadastroEsocial);
                    guardarSaidaDiagnostico(diagnostico, 'cadastroEsocial', lido, numeros.cadastroEsocial);
                    EST.cadastroEsocialPaginas.fontes ||= [];
                    const inicio = EST.cadastroEsocialPaginas.length;
                    EST.cadastroEsocialPaginas.ocr ||= [];
                    EST.cadastroEsocialPaginas.ocr.push(...(grupos.cadastroEsocial.ocr || []).map(i => inicio + i));
                    EST.cadastroEsocialPaginas.fontes.push(...grupos.cadastroEsocial.fontes);
                    EST.cadastroEsocialPaginas.push(...grupos.cadastroEsocial);
                    EST.cadastroEsocial = P.lerCadastroEsocialPrev(EST.cadastroEsocialPaginas);
                    if (!EST.arquivos.cadastroEsocial.includes(arq.name)) EST.arquivos.cadastroEsocial.push(arq.name);
                    EST.diagFontes.cadastroEsocial.push(diagnostico.id);
                }
                if (grupos.s5001.length) {
                    const lido = P.lerInssDeArquivoPrev(grupos.s5001, arq.name);
                    guardarSaidaDiagnostico(diagnostico, 's5001', lido, numeros.s5001);
                    if (lido.viaOcr) (lido.informacoes ||= []).push('Relatório com registros lidos por OCR.'); // v2.5.20: informação, não alerta
                    const existente = EST.inssDocumentos.findIndex(d => d.arquivo === arq.name);
                    const fonteInss = { arquivo: arq.name, id: diagnostico.id, dados: lido };
                    if (existente >= 0) EST.inssDocumentos[existente] = fonteInss; else EST.inssDocumentos.push(fonteInss);
                    EST.s5001 = P.combinarRelatoriosInssPrev(EST.inssDocumentos);
                    EST.arquivos.s5001 = EST.inssDocumentos.map(d => d.arquivo).join('; ');
                    EST.diagFontes.s5001 = EST.inssDocumentos.length === 1 ? diagnostico.id : EST.inssDocumentos.map(d => d.id);
                }

                if (grupos.dctf.length) {
                    // v2.5.22: DCTFWeb, DARF, comprovante do DARF e PER/DCOMP de todos os arquivos, lidos juntos
                    try { guardarSaidaDiagnostico(diagnostico, 'dctf', P.lerDctfPrev(Object.assign([...grupos.dctf], { fontes: grupos.dctf.fontes })), numeros.dctf); }
                    catch (e) { diagnostico.avisos.push(`Saída individual da DCTFWeb indisponível: ${e.message}`); }
                    EST.dctfPaginas.fontes ||= []; EST.dctfPaginas.fontes.push(...grupos.dctf.fontes);
                    EST.dctfPaginas.push(...grupos.dctf);
                    EST.dctf = P.lerDctfPrev(EST.dctfPaginas);
                    if (!EST.arquivos.dctf.includes(arq.name)) EST.arquivos.dctf.push(arq.name);
                }
                if (grupos.folha.length) {
                    EST.folha = P.lerFolha(grupos.folha); EST.arquivos.folha = arq.name; EST.diagFontes.folha = diagnostico.id;
                    guardarSaidaDiagnostico(diagnostico, 'folha', EST.folha, numeros.folha);
                    if (grupos.folha.ocr?.length) EST.folha.viaOcr = EST.folha.colaboradores.some(c => c.viaOcr);
                }
                if (complementar && grupos.fgts.length) {
                    // Complementar: mantém guias rescisórias fora do cálculo e dos totais MENSAIS.
                    // Apenas evidencia CPF/tomador/guia para uma pendência já detectada.
                    const rx = P.lerFgts(grupos.fgts);
                    const raizSeg = P.dig(EST.segest?.cnpj).slice(0, 8);
                    // Fallback restrito quando o detalhe da guia rescisória tem colunas
                    // quebradas e o leitor regular não reconhece a linha individual.
                    // Exige CPF formatado, tomador TRT e número da guia NA MESMA PÁGINA.
                    // Somente registra presença documental; nunca extrai/aprova valor nem pagamento.
                    grupos.fgts.forEach((pg, ix) => {
                        if (!/Detalhe da Guia Emitida/i.test(pg) || !/Rela[çc][ãa]o de Trabalhadores/i.test(pg)) return;
                        const num = pg.match(/N[úu]mero da Guia:\s*([\d-]+)/)?.[1];
                        const g = num && rx.guias.get(num);
                        if (!g || (raizSeg && P.dig(g.empregadorRaiz).slice(0, 8) !== raizSeg)) return;
                        const cnpjTomador = P.dig(CONFIG.cnpjOrgao);
                        if (!new RegExp(`Tomador:\\s*${cnpjTomador.slice(0,2)}[.\\s]*${cnpjTomador.slice(2,5)}[.\\s]*${cnpjTomador.slice(5,8)}[/\\s]*${cnpjTomador.slice(8,12)}[-\\s]*${cnpjTomador.slice(12)}`).test(pg)) return;
                        for (const m of pg.matchAll(/\b(\d{3}\.\d{3}\.\d{3}-\d{2})\b/g)) {
                            const cpf = P.cpf(m[1]);
                            if (!cpf || EST.fgtsRescisorio.linhas.some(x => x.cpf === cpf && x.numeroGuia === num)) continue;
                            // O CPF deve constar em linha de trabalhador, não no cabeçalho.
                            const linha = pg.slice(pg.lastIndexOf('\n', m.index) + 1, pg.indexOf('\n', m.index) < 0 ? pg.length : pg.indexOf('\n', m.index));
                            if (!/\b\d{2}\/\d{4}\b/.test(linha)) continue;
                            EST.fgtsRescisorio.linhas.push({ cpf, guia: num, numeroGuia: num, tomador: cnpjTomador,
                                fonte: { arquivo: arq.name, pagina: numeros.fgts[ix] }, leituraLimitada: true });
                        }
                    });
                    for (const l of rx.linhas || []) {
                        const num = String(l.numeroGuia || l.guia || '');
                        const g = rx.guias.get(num);
                        if (!num || !g || (raizSeg && P.dig(g.empregadorRaiz).slice(0, 8) !== raizSeg)) continue;
                        if (!EST.fgtsRescisorio.linhas.some(x => x.cpf === l.cpf && x.numeroGuia === num && x.tomador === l.tomador))
                            EST.fgtsRescisorio.linhas.push({ ...l, numeroGuia: num });
                        EST.fgtsRescisorio.guias.set(num, g);
                    }
                    // v2.5.14: linhas do detalhe rescisório com valores (rescisório, verbas, multa), para conferir com o extrato da conta FGTS
                    EST.fgtsRescisorio.linhasDetalhe ||= [];
                    for (const l of rx.linhas || []) {
                        if (!l.cpf || !Number.isFinite(l.fgts)) continue;
                        if (EST.fgtsRescisorio.linhasDetalhe.some(x => x.cpf === l.cpf && x.guia === l.guia && x.tipo === l.tipo && x.fgts === l.fgts && x.tomador === l.tomador)) continue;
                        EST.fgtsRescisorio.linhasDetalhe.push(l);
                    }
                    guardarSaidaDiagnostico(diagnostico, 'fgts_rescisorio_complementar', rx, numeros.fgts);
                    EST.leituras.push(`${arq.name}: detalhe de FGTS complementar isolado (${EST.fgtsRescisorio.linhas.length} registros); não integrado à guia mensal.`);
                }
                if (complementar) {
                    EST.arquivos.rescisorio ||= []; if (!EST.arquivos.rescisorio.includes(arq.name)) EST.arquivos.rescisorio.push(arq.name); // v2.5.15: memória
                    // v2.5.14: GFDs, comprovantes e extratos da conta FGTS do documento de rescisão, procurados em
                    // todas as páginas. Ficam só como evidência da guia rescisória; nunca entram na GFD mensal.
                    const R = EST.fgtsRescisorio;
                    R.gfds ||= []; R.comprovantes ||= []; R.extratos ||= [];
                    const todas = paginas.map(x => x);
                    todas.fontes = paginas.map((_, i) => ({ arquivo: arq.name, pagina: i + 1, metodo: diagnostico.paginas[i]?.metodo }));
                    const ev = P.lerFgts(todas);
                    let nGfd = 0, nCp = 0, nEx = 0;
                    for (const g of ev.gfds || []) {
                        if (!g.identificador || R.gfds.some(x => P.dig(x.identificador) === P.dig(g.identificador) && x.valor === g.valor)) continue;
                        R.gfds.push(g); nGfd++;
                    }
                    for (const cp of ev.comprovantes || []) {
                        const mesmo = (x) => (cp.transacao && x.transacao === cp.transacao) || (cp.qrCode && x.qrCode === cp.qrCode)
                            || (x.valor === cp.valor && x.data === cp.data && x.pagador === cp.pagador && x.identificador === cp.identificador);
                        if (R.comprovantes.some(mesmo)) continue;
                        R.comprovantes.push(cp); nCp++;
                    }
                    paginas.forEach((pg, i) => {
                        const ex = P.lerExtratoContaFgtsPrev(pg, { arquivo: arq.name, pagina: i + 1, metodo: diagnostico.paginas[i]?.metodo });
                        if (!ex || R.extratos.some(x => P.nome(x.nome) === P.nome(ex.nome) && x.lancamentos.length === ex.lancamentos.length && x.lancamentos.every((l, k) => l.valor === ex.lancamentos[k].valor && l.data === ex.lancamentos[k].data))) return;
                        R.extratos.push(ex); nEx++;
                    });
                    guardarSaidaDiagnostico(diagnostico, 'fgts_rescisorio_pagamento', { gfds: ev.gfds, comprovantes: ev.comprovantes, extratos: R.extratos.filter(x => x.fontes?.[0]?.arquivo === arq.name) }, []);
                    if (nGfd || nCp || nEx) EST.leituras.push(`${arq.name}: evidência de pagamento rescisório — ${nGfd} GFD, ${nCp} comprovante(s), ${nEx} extrato(s) da conta FGTS; não integrados à guia mensal.`);
                } else if (grupos.fgts.length) {
                    try { guardarSaidaDiagnostico(diagnostico, 'fgts', P.lerFgts(grupos.fgts), numeros.fgts); }
                    catch (e) { diagnostico.avisos.push(`Saída individual do FGTS indisponível: ${e.message}`); }
                    EST.diagFontes.fgts.push(diagnostico.id);
                    EST.fgtsPaginas.fontes ||= []; EST.fgtsPaginas.fontes.push(...grupos.fgts.fontes);
                    EST.fgtsPaginas.push(...grupos.fgts); EST.fgts = P.lerFgts(EST.fgtsPaginas); EST.fgtsViaOcr = EST.fgts.viaOcr; if (!EST.arquivos.fgts.includes(arq.name)) EST.arquivos.fgts.push(arq.name); }
                diagnostico.estado = 'concluido';
                if (hashArquivo && !paginas.falhasOcr?.length) EST.hashesLidos.set(chaveHashArquivo, arq.name);
            } catch (e) {
                console.error('[SIGEO-Terceirizados] Conferência previdenciária: erro ao ler', arq.name, e);
                EST.erros.push(`"${arq.name}": ${e.message}`);
                EST.leituras.push(`${arq.name}: ERRO na leitura — ${e.message}`);
                diagnostico.estado = 'erro'; diagnostico.erro = e.message;
            } finally {
                if (diagnostico.estado === 'texto_lido') diagnostico.estado = 'sem_tipo_reconhecido';
                for (const pg of diagnostico.paginas) if (!pg.classificacao) { pg.tipoReconhecido = null; pg.tipoUsado = null; pg.classificacao = 'nao_classificada'; }
            }
        }
        EST.lendo = '';
        recalcular();
    }

    function escolherPdfs() {
        const input = document.createElement('input');
        input.type = 'file'; input.accept = '.pdf'; input.multiple = true; input.style.display = 'none';
        input.onchange = async () => { const fs = [...(input.files || [])]; input.remove(); if (fs.length) { const entradas = adicionarArquivosLocaisPrev(fs); desenhar(); await juntarPdfs(entradas.map(arquivoParaLeituraPrev)); } };
        document.body.appendChild(input); input.click();
    }

    function escolherSegest() {
        if (typeof XLSX === 'undefined') { mostrarErroSnackbar('A biblioteca de planilhas não carregou.'); return; }
        const input = document.createElement('input');
        input.type = 'file'; input.accept = '.xlsx,.xlsm,.xls'; input.style.display = 'none';
        input.onchange = async () => {
            const arq = input.files?.[0]; input.remove(); if (!arq) return;
            const entradaSegest = adicionarArquivosLocaisPrev([arq])[0]; if (entradaSegest) entradaSegest.papel = 'segest';
            try {
                const buf = await arq.arrayBuffer(), wb = XLSX.read(new Uint8Array(buf), { type: 'array' });
                const lido = lerPlanilhaSegest(wb, arq.name);
                if (!lido.linhas.length) throw new Error('nenhuma aba de faturamento encontrada');
                EST.segest = lido; EST.segestOrigem = arq.name;
                await guardarSegestDiagnostico(arq, buf, wb, lido);
                EST.errosSegest = []; // v2.3.0: o aviso da tentativa anterior não vale mais
                recalcular();
            } catch (e) { mostrarErroSnackbar(`Não foi possível ler a planilha: ${e.message}`); }
        };
        document.body.appendChild(input); input.click();
    }

    function recalcular() {
        // usa a SEGEST já importada na Liquidação, se o usuário não juntou outra aqui
        if (!EST.segest && SEGEST.linhas.length) { EST.segest = SEGEST; EST.segestOrigem = `${SEGEST.nomeArquivo || 'planilha'} (já importada na Liquidação)`; }
        const pronto = EST.segest && (EST.fgts || EST.s5001 || EST.folha || EST.cadastroEsocial);
        const inssParaConferir = EST.s5001 || P.novoS5Prev('', 'S-5001 não juntado', false);
        try {
            EST.resultado = pronto ? P.conferir({ segest: EST.segest, s5001: inssParaConferir, cadastroEsocial: EST.cadastroEsocial, folha: EST.folha, fgts: EST.fgts, rescisorio: EST.fgtsRescisorio, cnpjOrgao: CONFIG.cnpjOrgao }) : null;
            if (EST.resultado) {
                // v2.5.53: digitado na tela > nome da pasta (com o ano sugerido pela competência, se faltar)
                const info = LOCAL.proadInfo, anoSug = P.anoProadSugeridoPrev(EST.resultado.competencia);
                if (String(EST.proadManual || '').trim()) { EST.resultado.proad = String(EST.proadManual).trim(); EST.resultado.proadOrigem = 'digitado na tela'; }
                else if (info && info.ano) { EST.resultado.proad = `${info.numero}/${info.ano}`; EST.resultado.proadOrigem = 'nome da pasta'; }
                else if (info && anoSug) { EST.resultado.proad = `${info.numero}/${anoSug}`; EST.resultado.proadOrigem = `nome da pasta; ano ${anoSug} sugerido pela competência, confira`; }
                else { EST.resultado.proad = LOCAL.proad || ''; EST.resultado.proadOrigem = LOCAL.proad ? 'nome da pasta' : ''; }
            }
            if (EST.resultado) {
                // v2.5.22: seção "Análise do DARF e da DCTFWeb"
                const cd = P.conferirDctfPrev(EST.dctf, { cnpj: EST.resultado.cnpj, competencia: EST.resultado.competencia });
                Object.assign(EST.resultado.checklist, cd.checklist);
                EST.resultado.dctf = cd;
                const paDctf = cd.detalhe?.declaracao?.pa ? P.compDe(cd.detalhe.declaracao.pa) : '';
                const res0 = EST.resultado;
                if (paDctf && res0.competencia && paDctf !== res0.competencia) {
                    res0.alertaCompetencia ||= { segest: res0.competencia, docs: [] };
                    res0.alertaCompetencia.docs.push({ doc: 'DCTFWeb', comps: [paDctf] });
                }
                res0.avisos.push(...cd.avisos.filter(a => !(res0.alertaCompetencia && /^A DCTFWeb lida é da competência/.test(a))));
            }
            // v2.5.23: linhas do Relatório SLDST, editáveis na tela antes de copiar
            if (EST.resultado) EST.relatorio = P.estadoRelatorioPrev(EST.resultado, EST.relatorio, { proad: EST.resultado.proad, arquivosDctf: EST.arquivos.dctf });
            if (EST.resultado && EST.segest?.cnpj && EST.fgts?.guias?.size) {
                const g = [...EST.fgts.guias.values()][0];
                if (g.empregadorRaiz && g.empregadorRaiz.slice(0, 8) !== P.dig(EST.segest.cnpj).slice(0, 8)) EST.erros.push(`A guia do FGTS é do CNPJ ${P.fmtRaiz(g.empregadorRaiz)} e a planilha da SEGEST é de ${P.fmtCnpj(P.dig(EST.segest.cnpj))}. Confira se os arquivos são do mesmo contrato.`);
            }
        } catch (e) {
            console.error('[SIGEO-Terceirizados] Conferência previdenciária: erro na conferência', e);
            EST.resultado = null; EST.erros.push(`Erro na conferência: ${e.message}`);
        }
        desenhar();
    }

    function limpar() {
        Object.assign(EST, { proadManual: '', segest: null, segestOrigem: '', s5001: null, inssDocumentos: [], cadastroEsocial: null, cadastroEsocialPaginas: [], folha: null, fgtsPaginas: [], fgts: null, dctfPaginas: [], dctf: null, relatorio: null, fgtsRescisorio: { linhas: [], guias: new Map(), gfds: [], comprovantes: [], extratos: [], linhasDetalhe: [] }, hashesLidos: new Map(), fgtsViaOcr: false, arquivos: { s5001: '', cadastroEsocial: [], folha: '', fgts: [], dctf: [] }, resultado: null, erros: [], errosSegest: [], leituras: [], diagnosticos: [], diagFontes: { folha: null, s5001: null, cadastroEsocial: [], fgts: [], segest: null } });
        recalcular();
    }

    // ---------- desenho ----------
    const esc = (v) => escaparXml(v ?? '');

    function htmlCartoes() {
        const cartao = (n, titulo, st, corpo, botao = '') => `
            <div class="ter-etapa ter-${st}">
                <div class="ter-etapa-cab"><span class="ter-num">${n}</span><span>${titulo}</span><span class="ter-st">${{ ok: '✅', atencao: '⚠️', erro: '⛔', pendente: '' }[st]}</span></div>
                <div class="ter-etapa-corpo">${corpo}</div>${botao ? `<div class="ter-etapa-acao">${botao}</div>` : ''}
            </div>`;
        const sg = EST.segest;
        const c1 = sg ? `<b>${sg.linhas.length}</b> postos · ${esc(P.compTexto(sg.competencia))}<div class="ter-mini">${esc(EST.segestOrigem)}</div>` : 'Marque a planilha de faturamento do mês na lista de arquivos da pasta, ou importe-a na Liquidação.';
        const fo = EST.folha;
        const c2 = fo ? `<b>${fo.colaboradores.length}</b> colaboradores · ${esc(P.compTexto(fo.competencia))}<div class="ter-mini">${esc(EST.arquivos.folha)}${fo.paginasIgnoradas ? ` · ${fo.paginasIgnoradas} pág. sem folha ignoradas` : ''}</div>${(fo.informacoes || []).map(a => `<div class="ter-mini" style="color:#546e7a;">ℹ️ ${esc(a)}</div>`).join('')}${fo.avisos.map(a => `<div class="ter-mini" style="color:#b71c1c;">⚠️ ${esc(a)}</div>`).join('')}` : 'Fonte do INSS e do FGTS de cada trabalhador.';
        const s5 = P.ligarAuxiliaresPrev(EST.s5001, fo, EST.fgts, EST.segest);
        const porChave = (k) => [...(s5?.trabalhadores?.values() || [])].filter(t => (t.chave || 'CPF') === k).length;
        const qtdInss = s5?.arquivosIdentificados?.length
            ? `<b>${s5.trabalhadores.size}</b> trabalhadores identificados<div class="ter-mini">${s5.arquivosIdentificados.length} PDF(s) individual(is); matrícula/nome do arquivo cruzados com os identificadores da folha</div>`
            : s5?.auxiliares?.length
            ? `<b>${s5.trabalhadores.size}</b> trabalhadores identificados<div class="ter-mini">${s5.auxiliares.length.toLocaleString('pt-BR')} linhas no relatório (todos os serviços da empresa) · ligação ${[['CPF', 'pelo CPF'], ['matrícula', 'pela matrícula'], ['nome', 'pelo nome']].filter(([k]) => porChave(k)).map(([k, t]) => `${porChave(k)} ${t}`).join(', ')}</div>`
            : s5?.semIdentificacao?.length
                ? `<b>${s5.semIdentificacao.length}</b> páginas de valores sem identificação individual<div class="ter-mini">Não é possível associar os valores a trabalhadores.</div>`
                : `<b>${s5?.trabalhadores?.size || 0}</b> trabalhadores`;

        const cadastro = EST.cadastroEsocial;
        const cadastroHtml = cadastro ? `<div class="ter-mini" style="margin-top:6px;"><b>${cadastro.trabalhadores.size}</b> trabalhadores no cadastro contratual do eSocial · presença no item 3; sem base mensal para o item 4<div>${esc(EST.arquivos.cadastroEsocial.join(', '))}</div>${cadastro.avisos.map(a => `<div style="color:#b71c1c;">⚠️ ${esc(a)}</div>`).join('')}</div>` : '';
        const inssFontesHtml = EST.inssDocumentos.length > 1 ? `<details class="ter-mini"><summary>${EST.inssDocumentos.length} arquivos de INSS (ver fontes)</summary>${EST.inssDocumentos.map(d => `<div>${esc(d.arquivo)}</div>`).join('')}</details>` : esc(EST.arquivos.s5001);
        const c3 = s5 ? `${qtdInss} · ${esc(P.compTexto(s5.competencia))}<div class="ter-mini">${inssFontesHtml}</div>${(s5.informacoes || []).map(a => `<div class="ter-mini" style="color:#546e7a;">ℹ️ ${esc(a)}</div>`).join('')}${s5.avisos.map(a => `<div class="ter-mini" style="color:#b71c1c;">⚠️ ${esc(a)}</div>`).join('')}` : 'Relatório do INSS por trabalhador (S-5001 ou relatório da folha com nome, CPF ou matrícula e base mensal).';
        const fg = EST.fgts;
        const g = fg ? [...fg.guias.values()][0] : null;
        const c4 = fg ? `${g ? `Guia ${esc(g.numero)} · R$ ${P.rs(g.total)}` : 'Detalhe da guia não encontrado'}<div class="ter-mini">${new Set(fg.linhas.filter(l => l.tomador === P.dig(CONFIG.cnpjOrgao)).map(l => l.cpf)).size} trabalhadores com tomador TRT · GFD ${fg.gfds.length ? '✓' : '—'} · comprovante ${fg.comprovantes.length ? '✓' : '—'}</div><div class="ter-mini">${esc(EST.arquivos.fgts.join(', '))}</div>` : 'Detalhe da guia (Relação de Trabalhadores), GFD e comprovante.';
        const stFg = !fg ? 'pendente' : (!fg.linhas.length || !fg.gfds.length || !fg.comprovantes.length) ? 'atencao' : 'ok';
        const acSeg = EST.resultado?.alertaCompetencia;
        return cartao(1, 'Planilha da SEGEST', !sg ? 'pendente' : acSeg ? 'erro' : 'ok', c1 + (acSeg ? `<div class="ter-mini" style="color:#b71c1c;">⛔ Competência diferente dos documentos (${esc([...new Set(acSeg.docs.flatMap(d => d.comps).filter(c => c !== acSeg.segest))].map(P.compTexto).join(', '))})</div>` : ''))
            + cartao(2, 'Folha analítica', fo ? (fo.avisos.length ? 'atencao' : fo.colaboradores.length ? 'ok' : 'erro') : 'pendente', c2)
            + cartao(3, 'Relatório do INSS / eSocial', s5 ? (s5.avisos.length || !s5.trabalhadores.size ? 'atencao' : 'ok') : cadastro ? 'atencao' : 'pendente', c3 + cadastroHtml)
            + cartao(4, 'FGTS Digital', stFg, c4)
            + (() => { // v2.5.22
                const d = EST.dctf, cd = EST.resultado?.dctf;
                if (!d) return cartao(5, 'DARF, DCTFWeb e PER/DCOMP', 'pendente', 'Recibo e relatórios da DCTFWeb, DARF com comprovante e, se houver compensação, a PER/DCOMP (recibo e extrato).');
                const decl = [...d.declaracoes].sort((a, b) => (P.dataHoraIsoDctfPrev(b.dataHora) || '').localeCompare(P.dataHoraIsoDctfPrev(a.dataHora) || ''))[0];
                const sit = cd ? P.CHAVES_DARF.map(k => cd.checklist[k]?.sim) : [];
                const st = !cd ? 'atencao' : sit.includes('NAO') ? 'erro' : sit.includes('') ? 'atencao' : 'ok';
                const corpo = `${decl ? `DCTFWeb nº <b>${esc(decl.recibo)}</b>${decl.retificadora ? ' (retificadora)' : ''} · saldo na transmissão R$ ${P.rs(decl.totalSaldo ?? 0)}` : 'Recibo da DCTFWeb não encontrado'}
                    <div class="ter-mini">${d.darfs.length} DARF · ${d.comprovantes.length} comprovante(s) · ${d.dcomps.length} PER/DCOMP${cd?.resumo?.compensacao ? ` · compensação R$ ${P.rs(cd.resumo.compensacao)}` : ''}</div>
                    ${cd?.resumo?.compensacaoPosterior ? `<div class="ter-mini">PER/DCOMP posterior conferida: R$ ${P.rs(cd.resumo.compensacaoPosterior)} · saldo residual documental: R$ ${P.rs(cd.resumo.saldoResidual)}</div>` : ''}
                    <div class="ter-mini">${esc(EST.arquivos.dctf.join(', '))}</div>${(d.avisos || []).map(a => `<div class="ter-mini" style="color:#b71c1c;">⚠️ ${esc(a)}</div>`).join('')}
                    ${cd ? P.CHAVES_DARF.map((k, i) => ({ k, n: i + 1, c: cd.checklist[k] })).filter(x => x.c && (x.c.sim === 'NAO' || x.c.sim === '')).map(x => `<div class="ter-mini" style="color:${x.c.sim === 'NAO' ? '#b71c1c' : '#795548'};">${x.c.sim === 'NAO' ? '⛔' : '⚠️'} Item ${x.n}${/^DARF2$/.test(x.k) && EST.resultado?.alertaCompetencia ? ' (competência)' : ''}: ${esc(x.c.obs)}</div>`).join('') : ''}`;
                return cartao(5, 'DARF, DCTFWeb e PER/DCOMP', st, corpo);
            })();
    }

    // v2.5.23: as linhas do Relatório SLDST, editáveis. O detalhe dos itens internos do robô fica abaixo.
    function htmlChecklistRobo(res) {
        const linhas = ITENS_CHECKLIST.map(([k, rot, desc]) => {
            const c = res.checklist[k];
            const sim = c?.sim === 'SIM', nao = c?.sim === 'NAO', na = c?.sim === 'NA';
            const bg = sim ? CORES.VERDE_CLARO : nao ? CORES.VERMELHO_CLARO : na ? '#eceff1' : CORES.AMARELO_CLARO;
            return `<tr><td><b>${rot}</b></td><td class="ter-quebra" style="max-width:300px;">${esc(desc)}</td>
                <td style="background:${bg};text-align:center;font-weight:600;">${sim ? 'Sim' : nao ? 'Não' : na ? 'N/A' : '—'}</td>
                <td class="ter-quebra" style="max-width:720px;">${esc(c?.obs || 'Documento não juntado.')}${c?.evid && c.evid !== c.obs ? `<div class="ter-mini" style="color:#607d8b;margin-top:3px;">${esc(c.evid)}</div>` : ''}</td></tr>`;
        }).join('');
        return `<div style="overflow-x:auto;"><table class="sigeo-ter-table mat-table" style="border-collapse:collapse;width:100%;">
            <thead><tr><th>Item do robô</th><th>Verificação</th><th>Resultado</th><th>Observação e explicação</th></tr></thead><tbody>${linhas}</tbody></table></div>`;
    }
    function htmlChecklist(res) {
        const rel = EST.relatorio;
        if (!rel) return htmlChecklistRobo(res);
        const corSug = { SIM: CORES.VERDE_CLARO, NAO: CORES.VERMELHO_CLARO, '': CORES.AMARELO_CLARO };
        const rotSug = { SIM: 'Sim', NAO: 'Não', '': 'Pendente' };
        let secaoAnt = '';
        const linhas = P.LINHAS_RELATORIO.map(L => {
            const x = rel.linhas[L.k];
            const cab = L.secao !== secaoAnt ? `<tr><td colspan="5" style="background:#eceff1;font-weight:700;">${esc(L.titulo || L.secao)}</td></tr>` : '';
            secaoAnt = L.secao;
            const bt = (v, txt, cor) => `<button class="ter-btn ${x.sim === v ? '' : 'ter-sec'}" data-rel-sim="${L.k}" data-valor="${v}" title="${v === '' ? 'Sem marcação: a macro deixa Sim e Não em branco' : txt}"
                style="padding:3px 12px;margin:0 2px;${x.sim === v ? `background:${cor};border-color:${cor};color:#fff;` : ''}">${txt}</button>`;
            return cab + `<tr>
                <td style="white-space:nowrap;"><b>${esc(L.rotulo)}</b></td>
                <td class="ter-quebra" style="max-width:260px;">${esc(L.texto)}</td>
                <td style="text-align:center;background:${corSug[x.sugSim]};font-weight:600;" title="Resultado do robô">${rotSug[x.sugSim]}</td>
                <td style="white-space:nowrap;">${bt('SIM', 'Sim', '#2e7d32')}${bt('NAO', 'Não', '#c62828')}${bt('', '—', '#757575')}
                    <div class="ter-mini" data-rel-tag="${L.k}" style="color:#6a1b9a;margin-top:3px;${x.editado ? '' : 'display:none;'}">✎ alterada na tela</div></td>
                <td style="min-width:340px;"><textarea data-rel-obs="${L.k}" rows="2" style="width:100%;box-sizing:border-box;font:inherit;font-size:12px;resize:vertical;">${esc(x.obs)}</textarea>
                    <details class="ter-mini"><summary style="cursor:pointer;color:#607d8b;">O que o robô viu</summary><div style="white-space:pre-wrap;color:#455a64;margin-top:3px;">${esc(x.explicacao)}</div></details></td></tr>`;
        }).join('');
        const editadas = P.LINHAS_RELATORIO.filter(L => rel.linhas[L.k].editado).length;
        const avisoQtd = rel.qtdAmostra > rel.ok ? `<div class="ter-mini" style="color:#b71c1c;">Só ${rel.ok} terceirizado(s) foram conferidos sem pendência: a amostra vai ficar com ${rel.ok}.</div>` : '';
        return `<div class="ter-faixa ter-faixa-atencao" style="margin-bottom:8px;">O que estiver nesta tela é o que vai para o Relatório SLDST: clique em Sim, Não ou — (sem marcação) e edite as observações. A coluna "Robô" mostra o resultado da conferência; "O que o robô viu" explica cada linha.${rel.refeitas ? ` <b>${rel.refeitas} linha(s) alterada(s) voltaram à sugestão do robô, porque a nova leitura mudou o resultado delas.</b>` : ''}</div>
            <div style="overflow-x:auto;"><table class="sigeo-ter-table mat-table" style="border-collapse:collapse;width:100%;">
            <thead><tr><th>Linha</th><th>Verificação</th><th>Robô</th><th>Vai para o relatório</th><th>Observação (vai para o relatório)</th></tr></thead><tbody>${linhas}</tbody></table></div>
            <div class="ter-exportar" style="align-items:center;gap:10px;margin-top:10px;">
                <b>PROAD:</b>
                <input type="text" data-rel-proad value="${esc(res.proad || '')}" placeholder="ex.: 36140/2026" style="width:110px;padding:4px;">
                <span class="ter-mini" style="color:${res.proad ? '#546e7a' : '#b71c1c'};">${res.proad ? esc(res.proadOrigem || '') : 'não identificado no nome da pasta: digite (vai para a aba do mês e para a Amostragem)'}</span>
            </div>
            <div class="ter-exportar" style="align-items:center;gap:10px;margin-top:6px;">
                <b>Amostragem do mês:</b>
                <input type="number" data-rel-qtd min="0" max="${rel.total}" value="${rel.qtdAmostra}" style="width:70px;padding:4px;"> de ${rel.total} terceirizado(s)
                <span class="ter-mini" style="color:#546e7a;">sugestão: ${rel.sugQtd} (20%, arredondado para cima) · ${rel.ok} conferido(s) sem pendência podem ser escolhidos · a macro começa por quem ainda não foi conferido no ano</span>
                <button class="ter-btn ter-sec" data-rel-restaurar ${editadas || rel.qtdEditada ? '' : 'disabled'}>↺ Restaurar sugestões do robô</button>
            </div>${avisoQtd}
            <div class="ter-dica">SICAF e SEFIP/RET não vão na colagem: a macro mantém o que estava na aba do mês anterior.</div>
            <details style="margin-top:10px;"><summary style="cursor:pointer;color:#546e7a;">Itens internos do robô (detalhe de cada conferência)</summary>${htmlChecklistRobo(res)}</details>`;
    }

    const corSit = { OK: CORES.VERDE_CLARO, 'OK c/ obs': '#f1f8e9', Verificar: CORES.AMARELO_CLARO, 'Não localizado (justificado)': '#fff3e0', 'Não localizado': '#ffe0b2', Divergente: CORES.VERMELHO_CLARO };
    const iconeSit = { OK: '✅', 'OK c/ obs': '✅', Verificar: '⚠️', 'Não localizado (justificado)': '🔎', 'Não localizado': '🔎', Divergente: '⛔' };
    const ehPend = (p) => p.situacao !== 'OK' && p.situacao !== 'OK c/ obs';
    const vv = (c) => (c === null || c === undefined) ? '' : P.rs(c);
    const celDif = (d) => d === null || d === undefined ? '<td style="color:#999;">—</td>'
        : d === 0 ? '<td style="color:#2e7d32;">0,00</td>'
        : `<td style="background:${Math.abs(d) <= P.TOL_ARRED ? '#f1f8e9' : CORES.VERMELHO_CLARO};font-weight:600;">${P.rs(d)}</td>`;

    function botoesFiltro(lista, rotulo) {
        const pend = lista.filter(ehPend).length, obs = lista.filter(p => p.situacao !== 'OK').length;
        const bt = (f, rot) => `<button class="ter-btn ${EST.filtro === f ? '' : 'ter-sec'}" data-prev-filtro="${f}">${rot}</button>`;
        return `<div class="ter-exportar">${bt('pend', `Pendências (${pend})`)}${bt('obs', `Com observação (${obs})`)}${bt('todos', `Todos (${lista.length})`)}<span class="ter-dica" style="margin:6px 0 0 8px;">${rotulo}</span></div>`;
    }
    function filtrar(lista) {
        const ord = [...lista].sort((a, b) => (P.ordemSituacao[a.situacao] - P.ordemSituacao[b.situacao]) || String(a.nome).localeCompare(String(b.nome)));
        return EST.filtro === 'pend' ? ord.filter(ehPend) : EST.filtro === 'obs' ? ord.filter(p => p.situacao !== 'OK') : ord;
    }
    const cabValores = '<th>FGTS folha</th><th>FGTS guia</th><th>Dif. FGTS</th><th>Base INSS folha</th><th>Base relatório INSS</th><th>Dif. base</th><th>INSS folha</th><th>INSS relatório</th><th>Dif. INSS</th>';
    const celValores = (p) => `<td>${vv(p.fgtsFolha)}</td><td>${vv(p.fgtsGuia)}</td>${celDif(p.difFgts)}<td>${vv(p.baseInssFolha)}</td><td>${vv(p.baseInssS5)}</td>${celDif(p.difBaseInss)}<td>${vv(p.inssFolha)}</td><td>${vv(p.inssS5)}</td>${celDif(p.difInss)}`;

    function htmlSegest(res) {
        const linhas = filtrar(res.segestPessoas).map(p => `<tr>
                <td style="background:${corSit[p.situacao]};">${iconeSit[p.situacao]} ${p.situacao}</td>
                <td>${P.fmtCpf(p.cpf)}</td><td>${esc(p.nome)}</td>
                <td class="ter-quebra" style="min-width:150px;max-width:220px;">${esc([p.seg?.posto, p.seg?.localidade].filter(Boolean).join(' · '))}</td>
                <td>${esc(p.locais)}</td>${celValores(p)}
                <td class="ter-quebra" style="min-width:280px;max-width:520px;">${esc(p.texto)}</td></tr>`).join('');
        return botoesFiltro(res.segestPessoas, 'Uma linha por pessoa da planilha da SEGEST.')
            + `<div style="overflow-x:auto;"><table class="sigeo-ter-table mat-table" style="width:max-content;border-collapse:collapse;">
            <thead><tr><th>Situação</th><th>CPF</th><th>Nome</th><th>Posto · Localidade</th><th>Localizado em</th>${cabValores}<th>Observação</th></tr></thead>
            <tbody>${linhas || '<tr><td colspan="16" style="color:#2e7d32;">Nenhum registro neste filtro.</td></tr>'}</tbody></table></div>
            <div class="ter-dica">FGTS: folha analítica × "Valor FGTS na Guia" (soma de todos os tomadores) — item 5. Base do INSS: "INSS Proc" da folha × relatório do INSS (S-5001: código 11 + 11* + 19; ou o relatório da folha da empresa) — item 4. INSS descontado: rubricas de INSS da folha × relatório do INSS (S-5001: código 21 + 21*), como informação. Diferença de até R$ ${P.rs(P.TOL_ARRED)} é tratada como arredondamento (observação).</div>`;
    }

    function htmlFora(res) {
        const linhas = filtrar(res.fora).map(p => `<tr>
                <td style="background:${corSit[p.situacao]};">${iconeSit[p.situacao]} ${p.situacao}</td>
                <td class="ter-quebra" style="min-width:160px;max-width:240px;">${esc(p.vinculo)}</td>
                <td>${P.fmtCpf(p.cpf) || '—'}</td><td>${esc(p.nome)}</td><td>${esc(p.locais)}</td>${celValores(p)}
                <td class="ter-quebra" style="min-width:280px;max-width:520px;">${esc(p.texto)}</td></tr>`).join('');
        return botoesFiltro(res.fora, 'Quem está na folha, no relatório do INSS ou no FGTS com tomador TRT e não está na planilha da SEGEST, mais os substitutos citados nas ocorrências.')
            + `<div style="overflow-x:auto;"><table class="sigeo-ter-table mat-table" style="width:max-content;border-collapse:collapse;">
            <thead><tr><th>Situação</th><th>Vínculo</th><th>CPF</th><th>Nome</th><th>Localizado em</th>${cabValores}<th>Observação</th></tr></thead>
            <tbody>${linhas || '<tr><td colspan="16" style="color:#2e7d32;">Nenhum registro neste filtro.</td></tr>'}</tbody></table></div>`;
    }

    function desenhar() {
        const modal = document.getElementById('sigeo-prev-modal');
        if (!modal) return;
        const res = EST.resultado;
        modal.querySelector('#prev-sub').textContent = res ? `Competência ${P.compTexto(res.competencia)} · ${res.empresa}` : 'Junte a planilha da SEGEST e os PDFs do mês.';
        modal.querySelector('#prev-pasta').innerHTML = htmlPasta();
        modal.querySelectorAll('[data-prev-arq]').forEach(cb => cb.onchange = () => { const a = LOCAL.arquivos[Number(cb.dataset.prevArq)]; a.marcado = cb.checked; a.tocado = true; });
        modal.querySelector('#prev-etapas').innerHTML = htmlCartoes()
            + (EST.leituras.length ? `<details style="grid-column:1/-1;font-size:12px;color:#546e7a;"><summary style="cursor:pointer;">Documentos lidos (${EST.leituras.length})</summary><ul style="margin:4px 0 0;padding-left:18px;">${EST.leituras.map(l => `<li>${esc(l)}</li>`).join('')}</ul></details>` : '');
        const ac = res?.alertaCompetencia;
        const avisos = [...EST.errosSegest, ...EST.erros, ...(res?.avisos || []).filter(a => !(ac && /^Competência da planilha da SEGEST/.test(a)))];
        let faixa = '';
        // v2.5.22: competência diferente entre a SEGEST e os documentos é o primeiro alerta, em destaque
        const faixaComp = ac ? `<div class="ter-faixa ter-faixa-erro" style="font-size:14px;"><b>⛔ Competências diferentes: planilha da SEGEST ${esc(P.compTexto(ac.segest))} × documentos ${esc([...new Set(ac.docs.flatMap(d => d.comps).filter(c => c !== ac.segest))].sort().map(P.compTexto).join(', '))}</b>
            <ul style="margin:6px 0 0;">${ac.docs.map(d => `<li>${esc(d.doc)}: ${esc(d.comps.map(P.compTexto).join(', '))}${d.comps.every(c => c === ac.segest) ? ' ✓' : ''}</li>`).join('')}<li>Planilha da SEGEST (campo "Período Referência"): ${esc(P.compTexto(ac.segest))}</li></ul>
            <div style="margin-top:6px;">Confira se a planilha é do mês certo ou se o "Período Referência" não foi atualizado. Enquanto as competências não baterem, os itens FGTS Digital 3 a 5 ficam pendentes e GFD 2 e DARF/DCTFWeb 2 ficam "Não".</div></div>` : '';
        if (EST.lendo) faixa = `<div class="ter-faixa ter-faixa-atencao"><span class="ter-girando"></span> Lendo ${esc(EST.lendo)}${EST.ocrEmAndamento && !EST.cancelarOcr ? ' <button class="ter-btn ter-sec" data-prev="cancelar-ocr" style="margin-left:12px;">⏹ Interromper OCR</button>' : ''}</div>`;
        else { faixa = faixaComp; if (avisos.length) faixa += `<div class="ter-faixa ter-faixa-erro"><b>⚠️ Atenção</b><ul>${avisos.map(a => `<li>${esc(a)}</li>`).join('')}</ul></div>`; }
        if (res) {
            const r = res.resumo, f = res.resumoFora;
            const nl = r['Não localizado'], nj = r['Não localizado (justificado)'];
            const cls = r.Divergente ? 'ter-faixa-erro' : (nl || r.Verificar) ? 'ter-faixa-atencao' : 'ter-faixa-ok';
            const fp = res.fora.filter(ehPend).length;
            faixa += `<div class="ter-faixa ${cls}"><b>Planilha da SEGEST: ${r.Divergente ? `⛔ ${r.Divergente} divergente(s) · ` : ''}${nl ? `🔎 ${nl} não localizado(s) · ` : ''}${r.Verificar ? `⚠️ ${r.Verificar} a verificar · ` : ''}${nj ? `🔎 ${nj} não localizado(s) com justificativa · ` : ''}✅ ${r.OK + r['OK c/ obs']} conferidos (${r['OK c/ obs']} com observação)</b>
                <div style="margin-top:3px;">Fora da SEGEST: ${res.fora.length} pessoa(s)${fp ? `, ${fp} com pendência` : ''}. ${esc(res.textoQtd)}.</div></div>`;
        }
        if (res?.informacoes?.length) faixa += `<div class="ter-dica">${res.informacoes.map(a => `<p>${esc(a)}</p>`).join('')}</div>`;
        modal.querySelector('#prev-faixa').innerHTML = faixa;
        modal.querySelector('#prev-copiar').disabled = !res;
        modal.querySelector('#prev-mem-xlsx').disabled = !res;
        modal.querySelector('#prev-mem-pdf').disabled = !res;
        modal.querySelector('#prev-diagnostico').disabled = !!EST.lendo || !!LOCAL.carregando || !EST.diagnosticos.length && !EST.segest;
        const corpo = modal.querySelector('#prev-corpo');
        if (!res) {
            const falta = [!EST.segest && 'planilha da SEGEST', !EST.folha && 'folha analítica', !EST.s5001 && 'relatório do INSS (S-5001 ou da folha)', !EST.fgts && 'guia do FGTS Digital'].filter(Boolean);
            corpo.innerHTML = `<div class="ter-dica">${falta.length ? `Falta: ${falta.join(', ')}.` : ''} ${LOCAL.pasta ? 'Marque os arquivos da pasta acima e clique em "Conferir os marcados", ou junte' : 'Pode juntar'} todos os PDFs de uma vez (folha, relatório do INSS, guia do FGTS e comprovante): o robô identifica cada um pelo conteúdo. A leitura é feita no navegador, os arquivos não saem do seu computador.</div>`;
            return;
        }
        modal.querySelectorAll('[data-prev-aba]').forEach(b => b.classList.toggle('ativa', b.dataset.prevAba === EST.aba));
        const abaSeg = modal.querySelector('[data-prev-aba="segest"]'), abaFora = modal.querySelector('[data-prev-aba="fora"]');
        if (abaSeg) abaSeg.textContent = `Planilha da SEGEST (${res.segestPessoas.length})`;
        if (abaFora) abaFora.textContent = `Fora da SEGEST (${res.fora.length})`;
        corpo.innerHTML = EST.aba === 'checklist' ? htmlChecklist(res) : EST.aba === 'fora' ? htmlFora(res) : htmlSegest(res);
        corpo.querySelectorAll('[data-prev-filtro]').forEach(b => b.onclick = () => { EST.filtro = b.dataset.prevFiltro; desenhar(); });
        // v2.5.23: edição das linhas do relatório
        const rel = EST.relatorio;
        if (rel && EST.aba === 'checklist') {
            corpo.querySelectorAll('[data-rel-sim]').forEach(b => b.onclick = () => { const x = rel.linhas[b.dataset.relSim]; x.sim = b.dataset.valor; P.marcarEditadoPrev(x); desenhar(); });
            corpo.querySelectorAll('[data-rel-obs]').forEach(t => t.oninput = () => {
                const x = rel.linhas[t.dataset.relObs]; x.obs = t.value; P.marcarEditadoPrev(x);
                const tag = corpo.querySelector(`[data-rel-tag="${t.dataset.relObs}"]`); if (tag) tag.style.display = x.editado ? '' : 'none';
                const rb = corpo.querySelector('[data-rel-restaurar]'); if (rb) rb.disabled = !(rel.qtdEditada || P.LINHAS_RELATORIO.some(L => rel.linhas[L.k].editado));
            });
            const pr = corpo.querySelector('[data-rel-proad]');
            if (pr) pr.onchange = () => { const v = pr.value.trim(); EST.proadManual = v; if (EST.resultado) { EST.resultado.proad = v; EST.resultado.proadOrigem = v ? 'digitado na tela' : ''; } desenhar(); };
            const q = corpo.querySelector('[data-rel-qtd]');
            if (q) q.onchange = () => { const v = Math.max(0, Math.min(rel.total, parseInt(q.value, 10) || 0)); rel.qtdAmostra = v; rel.qtdEditada = v !== rel.sugQtd; desenhar(); };
            const rb = corpo.querySelector('[data-rel-restaurar]');
            if (rb) rb.onclick = () => {
                if (!window.confirm('Voltar todas as linhas e a quantidade da amostragem para a sugestão do robô? As alterações feitas na tela se perdem.')) return;
                for (const L of P.LINHAS_RELATORIO) { const x = rel.linhas[L.k]; x.sim = x.sugSim; x.obs = x.sugObs; x.editado = false; }
                rel.qtdAmostra = rel.sugQtd; rel.qtdEditada = false; rel.refeitas = 0; desenhar();
            };
        }
    }

    function copiarParaPlanilha() {
        const res = EST.resultado, rel = EST.relatorio; if (!res || !rel) return;
        const rotulos = (f) => P.LINHAS_RELATORIO.filter(L => f(rel.linhas[L.k])).map(L => L.rotulo);
        const nao = rotulos(x => x.sim === 'NAO'), vazias = rotulos(x => x.sim === ''), editadas = rotulos(x => x.editado);
        const qtd = Math.min(rel.qtdAmostra, rel.ok);
        // v2.5.25: competência diferente só gera alerta (a decisão de copiar é de quem confere)
        const ac = res.alertaCompetencia;
        const alertaComp = ac ? `⛔ ATENÇÃO: a planilha da SEGEST é de ${P.compTexto(ac.segest)} e os documentos são de ${[...new Set(ac.docs.flatMap(d => d.comps).filter(c => c !== ac.segest))].sort().map(P.compTexto).join(', ')}. A macro vai preencher a aba de ${P.compTexto(ac.segest)} do relatório (se ela já existir, as marcações dela serão substituídas), e nenhum terceirizado entra na amostra, porque todos ficam "Verificar". O certo é corrigir o "Período Referência" da planilha da SEGEST e conferir de novo.\n` : '';
        const linhas = [
            `Linhas "Sim": ${P.LINHAS_RELATORIO.length - nao.length - vazias.length} de ${P.LINHAS_RELATORIO.length}.`,
            ...(nao.length ? [`Linhas "Não": ${nao.join(', ')}.`] : []),
            ...(vazias.length ? [`Linhas sem marcação (Sim e Não ficam em branco): ${vazias.join(', ')}.`] : []),
            ...(editadas.length ? [`Alteradas na tela em relação ao robô: ${editadas.join(', ')}.`] : []),
            `Amostragem: ${qtd} de ${rel.total} terceirizado(s)${qtd < rel.qtdAmostra ? ` (pedidos ${rel.qtdAmostra}, mas só ${rel.ok} sem pendência)` : ''}, escolhidos pela macro começando por quem ainda não foi conferido no ano.`,
            res.proad ? `PROAD: ${res.proad}${res.proadOrigem ? ` (${res.proadOrigem})` : ''}.` : '⚠️ PROAD não informado: digite no campo "PROAD" da aba Checklist do relatório, ou a macro vai pedir.',
        ];
        if (!window.confirm(`${alertaComp}Copiar para o Relatório SLDST?\n\n${linhas.join('\n')}\n\nDepois, no Relatório SLDST da empresa, rode a macro ColarConferenciaPrevidenciaria.`)) return;
        const tsv = P.gerarTsvV5(res, rel);
        if (typeof GM_setClipboard === 'function') GM_setClipboard(tsv, 'text'); else copiarClipboard(tsv);
        mostrarSucessoSnackbar(`Copiado (${P.LINHAS_RELATORIO.length} linhas do relatório e ${rel.total} terceirizados). No Relatório SLDST, rode a macro ColarConferenciaPrevidenciaria.`);
    }

    // v2.3.0: memória da conferência (substitui o CSV por trabalhador)
    function metaMemoria() {
        return { relatorio: EST.relatorio, arquivos: { segest: EST.segestOrigem, folha: EST.arquivos.folha, s5001: EST.arquivos.s5001, cadastroEsocial: EST.arquivos.cadastroEsocial.join(', '), fgts: EST.arquivos.fgts.join(', '), rescisorio: (EST.arquivos.rescisorio || []).join(', '), dctf: (EST.arquivos.dctf || []).join(', ') }, proad: EST.resultado?.proad || LOCAL.proad || '', geradoEm: new Date() };
    }

    async function gerarMemoriaXlsx() {
        const res = EST.resultado; if (!res) return;
        if (typeof ExcelJS === 'undefined') { mostrarErroSnackbar('A biblioteca do Excel (ExcelJS) não carregou. Use "Memória (PDF)" ou confira o @require do robô.'); return; }
        const b = document.getElementById('prev-mem-xlsx');
        if (b) { b.disabled = true; b.textContent = '⏳ Gerando…'; }
        try {
            const m = P.montarMemoria(res, metaMemoria());
            const buf = await P.memoriaXlsx(m, ExcelJS);
            baixarArquivo(buf, P.nomeArquivoMemoria(m, 'xlsx'), 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
            mostrarSucessoSnackbar('Memória da conferência baixada em Excel. Guarde na pasta do mês.');
        } catch (e) {
            console.error('[SIGEO-Terceirizados] Memória (Excel):', e);
            mostrarErroSnackbar(`Não foi possível gerar a memória em Excel: ${e.message}`);
        } finally { if (b) { b.disabled = !EST.resultado; b.textContent = '📊 Memória (Excel)'; } }
    }

    function gerarMemoriaPdf() {
        const res = EST.resultado; if (!res) return;
        try {
            const m = P.montarMemoria(res, metaMemoria());
            const html = P.memoriaHtml(m);
            const janela = window.open('', '_blank');
            if (!janela) {
                baixarArquivo(html, P.nomeArquivoMemoria(m, 'html'), 'text/html;charset=utf-8');
                mostrarSucessoSnackbar('O navegador bloqueou a nova aba: a memória foi baixada em HTML. Abra o arquivo e use Imprimir > Salvar como PDF.');
                return;
            }
            janela.document.open(); janela.document.write(html); janela.document.close();
            setTimeout(() => { try { janela.focus(); janela.print(); } catch (e) { /* o botão da página continua disponível */ } }, 700);
        } catch (e) {
            console.error('[SIGEO-Terceirizados] Memória (PDF):', e);
            mostrarErroSnackbar(`Não foi possível gerar a memória para PDF: ${e.message}`);
        }
    }

    function abrir() {
        document.getElementById('sigeo-prev-modal')?.remove();
        const modal = document.createElement('div');
        modal.id = 'sigeo-prev-modal';
        modal.innerHTML = `
            <div class="caixa ter-caixa">
                <header class="ter-topo">
                    <div><h2>🧾 Conferência Previdenciária e FGTS</h2><div class="ter-sub" id="prev-sub"></div></div>
                    <button class="ter-fechar" id="prev-fechar" title="Fechar">✕</button>
                </header>
                <div class="ter-exportar">
                    <button class="ter-btn" data-prev="pdfs">📎 Juntar PDFs (folha, INSS, FGTS Digital)</button>
                    <button class="ter-btn ter-sec" data-prev="pasta-juntar" title="Seleciona uma pasta e seus relatórios em subpastas; extraia o ZIP antes">📂 Juntar pasta</button>
                    <button class="ter-btn ter-princ" id="prev-copiar" disabled>📋 Copiar para a planilha</button>
                    <button class="ter-btn ter-sec" id="prev-mem-xlsx" disabled title="Memória da conferência em Excel: Resumo, Checklist, Presença, FGTS, INSS e Fora da SEGEST">📊 Memória (Excel)</button>
                    <button class="ter-btn ter-sec" id="prev-mem-pdf" disabled title="Memória da conferência para imprimir ou salvar em PDF (para juntar ao PROAD)">🖨️ Memória (PDF)</button>
                    <button class="ter-btn ter-sec" id="prev-diagnostico" disabled title="Baixa um ZIP com TXT por página e JSON de todos os dados interpretados, fontes e avisos; funciona mesmo sem a SEGEST">🔎 Baixar diagnóstico da leitura</button>
                    <button class="ter-btn ter-sec" data-prev="limpar" style="margin-left:auto;">🗑️ Recomeçar</button>
                </div>
                <div id="prev-pasta"></div>
                <div id="prev-etapas" class="ter-etapas prev-etapas"></div>
                <div id="prev-faixa"></div>
                <nav class="ter-abas"><button data-prev-aba="checklist" class="ativa">Checklist do relatório</button><button data-prev-aba="segest">Planilha da SEGEST</button><button data-prev-aba="fora">Fora da SEGEST</button></nav>
                <section id="prev-corpo"></section>
            </div>`;
        document.body.appendChild(modal);
        modal.querySelector('#prev-fechar').onclick = () => modal.remove();
        modal.querySelector('#prev-copiar').onclick = copiarParaPlanilha;
        modal.querySelector('#prev-mem-xlsx').onclick = gerarMemoriaXlsx;
        modal.querySelector('#prev-mem-pdf').onclick = gerarMemoriaPdf;
        modal.querySelector('#prev-diagnostico').onclick = baixarDiagnostico;
        modal.addEventListener('click', (e) => {
            const b = e.target.closest('[data-prev]'); if (b) {
                if (b.dataset.prev === 'pdfs') escolherPdfs();
                else if (b.dataset.prev === 'segest') escolherSegest();
                else if (b.dataset.prev === 'limpar') limpar();
                else if (b.dataset.prev === 'pasta-conferir') conferirDaPasta();
                else if (b.dataset.prev === 'pasta-juntar') escolherPastaPrev();
                else if (['pasta-marcar-reconhecidos', 'pasta-marcar-inss', 'pasta-desmarcar'].includes(b.dataset.prev)) {
                    for (const a of LOCAL.arquivos) {
                        if (b.dataset.prev === 'pasta-desmarcar') { a.marcado = false; a.tocado = true; }
                        else if (b.dataset.prev === 'pasta-marcar-reconhecidos' && a.papel || b.dataset.prev === 'pasta-marcar-inss' && a.papel === 's5001') { a.marcado = true; a.tocado = true; }
                    }
                    desenhar();
                }
                else if (b.dataset.prev === 'cancelar-ocr') { EST.cancelarOcr = true; EST.lendo = 'interrompendo o OCR (as páginas já lidas ficam guardadas)…'; desenhar(); }
            }
            const a = e.target.closest('[data-prev-aba]'); if (a) { EST.aba = a.dataset.prevAba; EST.filtro = 'pend'; desenhar(); }
        });
        recalcular();
    }

    function garantirBotao() {
        if (document.getElementById('sigeo-prev-botao')) return;
        const ancora = document.getElementById('sigeo-ter-botao-segest') || document.getElementById('sigeo-ter-botao-processar');
        if (!ancora?.parentElement) return;
        const botao = document.createElement('button');
        botao.id = 'sigeo-prev-botao';
        botao.className = 'mat-focus-indicator mat-button mat-button-base';
        botao.style.cssText = 'background-color:#00695c;color:#fff;margin-left:4px;';
        botao.title = 'Conferência previdenciária e FGTS (folha, relatório do INSS, FGTS Digital e SEGEST)';
        botao.onclick = (e) => { e.preventDefault(); abrir(); };
        botao.innerHTML = '<span class="mat-button-wrapper">🧾 Prev./FGTS</span>';
        ancora.parentElement.insertBefore(botao, ancora.nextSibling);
    }

    // ---------- v2.1.0: abertura a partir de um PDF do computador (pasta do mês) ----------
    // O Chrome deixa o Tampermonkey rodar na página do PDF local (com "Permitir acesso a URLs de
    // arquivo" e, no Tampermonkey, "Todos os arquivos locais"). O robô lê a página 1 do PDF
    // aberto; se for folha analítica, S-5001 ou FGTS Digital, oferece os arquivos da mesma pasta.
    const LOCAL = { pasta: '', nomePasta: '', arquivos: [], proad: '', aberto: '', tipoAberto: '', bufAberto: null, carregando: false };
    const NOMES_TIPO = { folha: 'Folha analítica', s5001: 'Relatório do INSS', cadastroEsocial: 'Consulta cadastral do eSocial', fgts: 'Guia do FGTS Digital', dctf: 'DARF/DCTFWeb' };

    function gmGet(url) {
        return new Promise((ok, falha) => {
            GM_xmlhttpRequest({
                method: 'GET', url, responseType: 'arraybuffer',
                onload: (r) => (r.response && r.response.byteLength) ? ok(r.response) : falha(new Error(`arquivo vazio ou inacessível (status ${r.status})`)),
                onerror: (e) => falha(new Error(e?.error || 'acesso negado. No Tampermonkey: Configurações > Segurança > arquivos locais = "Todos os arquivos locais"')),
            });
        });
    }

    // v2.5.30: seleção manual e leitura por file:// usam a mesma lista de fontes.
    // Arquivos escolhidos pelo usuário permanecem acessíveis pelo objeto File,
    // inclusive quando o navegador não permite listar a pasta pelo Tampermonkey.
    function adicionarArquivosLocaisPrev(arquivos, dePasta = false) {
        const entradas = [];
        if (dePasta) {
            try {
                const pastas = [];
                for (const arquivo of arquivos) {
                    const partes = String(arquivo.webkitRelativePath || '').replace(/\\/g, '/').split('/').slice(0, -1);
                    partes.forEach((p, i) => { if (!pastas.some(x => x.p === p)) pastas.push({ p, i }); });
                }
                pastas.sort((a, b) => a.i - b.i);
                const achado = pastas.map(x => P.proadDoNomePrev(x.p)).find(Boolean);
                if (achado) {
                    const novo = achado.ano ? `${achado.numero}/${achado.ano}` : achado.numero;
                    if (novo !== LOCAL.proad) EST.proadManual = '';
                    LOCAL.proadInfo = achado; LOCAL.proad = novo;
                }
            } catch (e) { /* PROAD é opcional */ }
        }
        for (const arquivo of arquivos) {
            if (!/\.(pdf|xlsx?|xlsm)$/i.test(arquivo.name || '')) continue;
            let nome = String(arquivo.webkitRelativePath || arquivo.name).replace(/\\/g, '/');
            const raiz = nome.includes('/') ? nome.split('/')[0] : '';
            if (dePasta && raiz && raiz === LOCAL.nomePasta) nome = nome.slice(raiz.length + 1);
            let a = LOCAL.arquivos.find(x => x.nome === nome);
            if (!a) { a = { nome, papel: papelPeloNome(nome), marcado: false, tocado: false }; LOCAL.arquivos.push(a); }
            a.arquivoLocal = arquivo; a.tamanho = arquivo.size; a.origem = 'selecao_manual';
            if (!dePasta || !a.tocado) a.marcado = dePasta ? !!a.papel : true;
            if (!dePasta) a.tocado = true;
            entradas.push(a);
        }
        return entradas;
    }
    async function lerArquivoDaPastaPrev(a) {
        if (a.arquivoLocal?.arrayBuffer) return a.arquivoLocal.arrayBuffer();
        if (a.url) return gmGet(a.url);
        throw new Error('arquivo sem fonte disponível; selecione-o novamente por Juntar PDFs ou Juntar pasta');
    }
    function arquivoParaLeituraPrev(a) {
        return { name: a.nome, papel: a.papel || '', size: a.tamanho ?? a.arquivoLocal?.size,
            lastModified: a.arquivoLocal?.lastModified, arrayBuffer: () => lerArquivoDaPastaPrev(a) };
    }
    function escolherPastaPrev() {
        if (LOCAL.carregando || LOCAL.identificando || EST.lendo) { mostrarErroSnackbar('Aguarde a leitura atual terminar antes de juntar outra pasta.'); return; }
        const input = document.createElement('input');
        input.type = 'file'; input.multiple = true; input.webkitdirectory = true; input.setAttribute('webkitdirectory', '');
        input.style.display = 'none';
        input.onchange = async () => {
            const arquivos = [...(input.files || [])]; input.remove();
            if (!arquivos.length) return;
            try {
                const entradas = adicionarArquivosLocaisPrev(arquivos, true);
                if (!entradas.length) { mostrarErroSnackbar('A pasta selecionada não contém PDFs ou planilhas compatíveis. Extraia o ZIP antes de selecionar a pasta.'); return; }
                desenhar();
                await identificarArquivosDaPasta();
                if (!entradas.some(a => a.marcado)) { mostrarErroSnackbar('Arquivos adicionados à lista. Marque os documentos que deseja conferir.'); return; }
                await conferirDaPasta({ reiniciar: false, arquivos: entradas });
            } catch (e) { EST.erros.push(`Não foi possível juntar a pasta: ${e.message}`); desenhar(); }
        };
        input.addEventListener('cancel', () => input.remove(), { once: true });
        document.body.appendChild(input); input.click();
    }

    async function listarPasta(pastaUrl) {
        const raiz = new URL(pastaUrl); if (!raiz.pathname.endsWith('/')) raiz.pathname += '/';
        const fila = [{ url: raiz.href, nivel: 0 }], visitadas = new Set(), arquivos = new Map(), avisos = [];
        while (fila.length) {
            if (visitadas.size >= 200 || arquivos.size >= 5000) { avisos.push('Limite da listagem atingido; use Juntar pasta na subpasta dos relatórios para incluir os restantes.'); break; }
            const atual = fila.shift(); if (visitadas.has(atual.url)) continue; visitadas.add(atual.url);
            let html;
            try { html = new TextDecoder('utf-8').decode(await gmGet(atual.url)); }
            catch (e) {
                if (atual.url === raiz.href) throw e;
                avisos.push(`Não foi possível listar ${decodeURIComponent(new URL(atual.url).pathname.slice(raiz.pathname.length))}: ${e.message}. Use Juntar pasta para incluir essa subpasta.`);
                continue;
            }
            for (const m of html.matchAll(/addRow\("((?:[^"\\]|\\.)*)","((?:[^"\\]|\\.)*)",\s*(\d)(?:\s*,\s*(\d+))?/g)) {
                let nome = m[1], rel = m[2];
                try { nome = JSON.parse(`"${m[1]}"`); rel = JSON.parse(`"${m[2]}"`); } catch (e) { /* mantém os dados da listagem */ }
                if (!nome || nome === '.' || nome === '..' || /^\.\.?\/?$/.test(rel)) continue;
                let url; try { url = new URL(rel, atual.url); } catch (e) { continue; }
                // Nunca segue o pai, outro volume, origem ou endereço fora da pasta escolhida.
                if (url.protocol !== raiz.protocol || url.host !== raiz.host || !url.pathname.startsWith(raiz.pathname)) continue;
                if (m[3] === '1') {
                    if (!url.pathname.endsWith('/')) url.pathname += '/';
                    if (atual.nivel >= 12) { avisos.push('Subpastas muito profundas não foram listadas; selecione-as diretamente em Juntar pasta.'); continue; }
                    if (!visitadas.has(url.href)) fila.push({ url: url.href, nivel: atual.nivel + 1 });
                    continue;
                }
                if (!/\.(pdf|xlsx?|xlsm)$/i.test(nome)) continue;
                let caminho; try { caminho = decodeURIComponent(url.pathname.slice(raiz.pathname.length)); } catch (e) { caminho = nome; }
                const tamanho = m[4] === undefined ? null : Number(m[4]);
                arquivos.set(url.href, { nome: caminho, url: url.href, tamanho: Number.isFinite(tamanho) ? tamanho : null });
            }
        }
        const out = [...arquivos.values()].sort((a, b) => a.nome.localeCompare(b.nome, 'pt-BR', { numeric: true }));
        out.avisos = [...new Set(avisos)];
        return out;
    }


    // Pré-seleção pelo nome do arquivo; o tipo de verdade é confirmado pelo conteúdo na leitura.
    // v2.5.14: arquivos que nunca entram nesta conferência, mesmo citando FGTS ou rescisão no nome.
    const RX_FORA_DA_CONFERENCIA = /\bTR[DP]\b|Termo de Recebimento|\bIMR\b|Checklist|Certid|\bCRF\b|Consulta Consolidada|Nota Fiscal|\bNFs?\b|Vale[- ]?Transporte|\bVT\b|Vale[- ]?Alimenta|Aux[ií]lio[- ]?Alimenta|\bVA\b|Aposentadoria Especial/i;
    function papelPeloNome(nome) {
        if (/\.(xlsx?|xlsm)$/i.test(nome)) return /faturamento|segest/i.test(nome) ? 'segest' : '';
        if (/S-?5001|e[- ]?social/i.test(nome) && !/DCTF/i.test(nome)) return 's5001';
        // Relatórios de verbas rescisórias podem conter a GFD individual dezenas de páginas adiante.
        if (/RELAT[ÓO]RIO.*CONFER[ÊE]NCIA.*RESCIS[ÓO]RI/i.test(nome)) return 'rescisorio';
        if (RX_FORA_DA_CONFERENCIA.test(nome)) return '';
        // v2.5.22: DCTFWeb, DARF e PER/DCOMP têm papel próprio (antes a DCTFWeb ia como relatório do INSS)
        if (/DCTF|\bDARF\b|PER\s*\/?\s*DCOMP|Guia de Recolhimento (?:do )?INSS/i.test(nome)) return 'dctf';
        // v2.5.14: TRCT, conferência da SCFPT e demais documentos de rescisão (guia rescisória, comprovante, extrato)
        if (P.RX_NOME_RESCISORIO.test(nome)) return 'rescisorio';
        if (/FGTS|\bGFD\b/i.test(nome) && !/certid|CRF|trabalhista|tribut/i.test(nome)) return 'fgts';
        if (/folha/i.test(nome) && !/comprovante|confer[êe]ncia|resumo/i.test(nome)) return 'folha'; // v2.3.0: "Relatório de Conferência de Folha" não é a folha analítica
        return '';
    }

    // v2.5.14: identificação dos arquivos da pasta pelo CONTEÚDO, para pré-marcar o que a conferência usa:
    // a planilha da SEGEST (a que o leitor aceita), PDFs sem papel pelo nome que tenham folha, S-5001,
    // guia/GFD/comprovante do FGTS ou documentos de rescisão; e desmarca cópias com o mesmo conteúdo.
    // Só lê o texto das primeiras páginas (sem OCR). Escolhas feitas à mão pelo usuário são preservadas.
    const LIMITE_SONDAGEM_BYTES = 30 * 1024 * 1024;
    async function papelPeloConteudoPdf(buf, nomeArquivo = '') {
        const doc = await pdfjsLib.getDocument({ data: new Uint8Array(buf) }).promise;
        try {
            const textos = [];
            for (let p = 1; p <= Math.min(doc.numPages, 3); p++) {
                const page = await doc.getPage(p);
                try { textos.push(P.linhasDaPagina((await page.getTextContent()).items, page.getViewport({ scale: 1 }), pdfjsLib.Util)); }
                finally { page.cleanup(); }
            }
            // e-mails só CITAM documentos ("S-5001", "TRCT"); não são o documento
            const ehEmail = (t) => /(?:^|\n)\s*(?:De|Para|Assunto|Enviado|Cc)\s*:/i.test(t) || /\d+\s+mensage(?:m|ns)\b/i.test(t);
            const docs = textos.filter(t => !ehEmail(t));
            if (docs.some(t => P.RX_CONTEUDO_RESCISORIO.test(t) || /Termo de Quita[çc][ãa]o de Rescis/i.test(t))) return { papel: 'rescisorio', motivo: 'rescisão identificada pelo conteúdo' };
            // o tipo da página só vale se o leitor correspondente extrair dados de verdade
            const doTipo = (k) => docs.filter(t => tipoDaPagina(t) === k);
            const tenta = (f) => { try { return f(); } catch (e) { return false; } };
            if (doTipo('cadastroEsocial').length && tenta(() => P.lerCadastroEsocialPrev(doTipo('cadastroEsocial')).trabalhadores.size > 0)) return { papel: 'cadastroEsocial', motivo: 'cadastro eSocial identificado pelo conteúdo; sem base mensal de INSS' };
            if (doTipo('s5001').length && tenta(() => { const r = P.lerInssDeArquivoPrev(doTipo('s5001'), nomeArquivo); return (r?.trabalhadores?.size || 0) + (r?.auxiliares?.length || 0) > 0; })) return { papel: 's5001', motivo: 'identificado pelo conteúdo' };
            if (doTipo('folha').length && tenta(() => (P.lerFolha(doTipo('folha'))?.colaboradores?.length || 0) > 0)) return { papel: 'folha', motivo: 'identificado pelo conteúdo' };
            if (doTipo('fgts').length && tenta(() => {
                const r = P.lerFgts(doTipo('fgts'));
                // v2.5.21: só a Caixa Econômica (FGTS) conta; "CAIXA CARTOES PRE-PAGOS" (vale-alimentação) não
                const cpCaixa = (r.comprovantes || []).some(cp => /^(?:CEF|CAIXAECONOMICA)/.test(P.nome(cp.recebedorNome).replace(/\s/g, '')) || cp.recebedor === '00360305000104' || /^\d{16}-?\d$/.test(cp.identificador || ''));
                return (r.linhas || []).length > 0 || (r.gfds || []).some(g => g.identificador) || cpCaixa;
            })) return { papel: 'fgts', motivo: 'identificado pelo conteúdo' };
            if (doTipo('dctf').length) return { papel: 'dctf', motivo: 'DARF, DCTFWeb ou PER/DCOMP identificado pelo conteúdo' }; // v2.5.22
            return { papel: '' };
        } finally { await doc.destroy(); }
    }
    async function identificarArquivosDaPasta() {
        const arquivos = LOCAL.arquivos;
        if (!arquivos.length) return;
        LOCAL.identificando = true; desenhar();
        const auto = (a) => !a.tocado && a.nome !== LOCAL.aberto;
        try {
            // 1) planilha da SEGEST: a que o leitor aceita (CPF, Posto de Trabalho e Valor Total)
            const planilhas = arquivos.filter(a => /\.(xlsx?|xlsm)$/i.test(a.nome));
            const aceitas = [];
            for (const a of planilhas) {
                try {
                    const buf = await lerArquivoDaPastaPrev(a);
                    const lido = lerPlanilhaSegest(XLSX.read(new Uint8Array(buf.slice(0)), { type: 'array' }), a.nome);
                    if (lido.linhas.length) aceitas.push({ a, n: lido.linhas.length, contrato: lido.contrato || '' });
                    else if (auto(a) && a.papel === 'segest') { a.marcado = false; a.nota = 'não tem a aba de faturamento da SEGEST'; }
                } catch (e) { if (auto(a) && a.papel === 'segest') { a.marcado = false; a.nota = `não lida como planilha da SEGEST (${e.message})`; } }
            }
            if (aceitas.length) {
                aceitas.sort((x, y) => (Number(/faturamento|segest/i.test(y.a.nome)) - Number(/faturamento|segest/i.test(x.a.nome))) || (y.n - x.n));
                aceitas.forEach(({ a, n }, i) => {
                    a.papel = 'segest';
                    if (!auto(a)) return;
                    a.marcado = i === 0;
                    a.nota = i === 0 ? `${n} linha(s) de faturamento` : `também parece planilha da SEGEST; usada "${aceitas[0].a.nome}"`;
                });
            }
            // 2) PDFs sem papel pelo nome: primeiras páginas
            for (const a of arquivos) {
                if (!/\.pdf$/i.test(a.nome) || a.papel || !auto(a) || RX_FORA_DA_CONFERENCIA.test(a.nome)) continue;
                if (a.tamanho && a.tamanho > LIMITE_SONDAGEM_BYTES) continue;
                try {
                    EST.lendo = `identificando ${a.nome}`; desenhar();
                    const r = await papelPeloConteudoPdf(await lerArquivoDaPastaPrev(a), a.nome);
                    if (r.papel) { a.papel = r.papel; a.marcado = true; a.nota = r.motivo; }
                } catch (e) { console.warn('[SIGEO-Terceirizados] Identificação pelo conteúdo:', a.nome, e.message); }
            }
            // 3) cópias: mesmo tamanho e mesmo SHA-256; fica marcado o nome no padrão da pasta
            const marcados = arquivos.filter(a => a.marcado);
            const prefixo = (n) => n.slice(0, 6).toUpperCase();
            const freq = new Map(); for (const a of arquivos) freq.set(prefixo(a.nome), (freq.get(prefixo(a.nome)) || 0) + 1);
            const porTamanho = new Map();
            for (const a of marcados) { const k = a.tamanho ?? `?${a.nome}`; if (!porTamanho.has(k)) porTamanho.set(k, []); porTamanho.get(k).push(a); }
            const candidatos = [...porTamanho.values()].filter(g => g.length > 1 || marcados.some(a => a.tamanho === null || a.tamanho === undefined)).flat();
            if (candidatos.length > 1) {
                const porHash = new Map();
                for (const a of candidatos) {
                    try { const h = P.chaveHashArquivoPrev(await hashConteudoPrev(await lerArquivoDaPastaPrev(a)), a.nome); if (!h) continue; if (!porHash.has(h)) porHash.set(h, []); porHash.get(h).push(a); }
                    catch (e) { /* sem hash: fica como está */ }
                }
                for (const grupo of porHash.values()) {
                    if (grupo.length < 2) continue;
                    grupo.sort((x, y) => (Number(y.nome === LOCAL.aberto) - Number(x.nome === LOCAL.aberto)) || (Number(!!y.tocado) - Number(!!x.tocado))
                        || ((freq.get(prefixo(y.nome)) || 0) - (freq.get(prefixo(x.nome)) || 0)) || x.nome.localeCompare(y.nome, 'pt-BR', { numeric: true }));
                    for (const a of grupo.slice(1)) if (auto(a)) { a.marcado = false; a.nota = `mesmo conteúdo de "${grupo[0].nome}"`; }
                }
            }
        } finally {
            EST.lendo = ''; LOCAL.identificando = false; desenhar();
        }
    }

    async function detectarPdfLocal() {
        let buf;
        try { buf = await gmGet(location.href); } catch (e) { console.warn('[SIGEO-Terceirizados] PDF local não lido:', e.message); return; }
        let tipo = '', pag1 = '';
        try {
            const doc = await pdfjsLib.getDocument({ data: new Uint8Array(buf.slice(0)) }).promise;
            const page = await doc.getPage(1);
            pag1 = P.linhasDaPagina((await page.getTextContent()).items, page.getViewport({ scale: 1 }), pdfjsLib.Util);
            tipo = tipoDaPagina(pag1);
        } catch (e) { console.warn('[SIGEO-Terceirizados] PDF local: falha ao ler a 1ª página:', e); return; }
        if (!tipo && /folha/i.test(decodeURIComponent(location.pathname))) tipo = 'folha';
        if (!tipo) return; // não é documento da conferência: o robô fica quieto
        const caminho = decodeURIComponent(location.pathname);
        LOCAL.aberto = caminho.split('/').pop();
        LOCAL.tipoAberto = tipo;
        LOCAL.bufAberto = buf;
        LOCAL.pasta = location.href.replace(/[^/]*$/, '');
        LOCAL.nomePasta = caminho.split('/').slice(-2, -1)[0] || '';
        LOCAL.proadInfo = P.proadDoNomePrev(LOCAL.nomePasta);
        LOCAL.proad = LOCAL.proadInfo ? (LOCAL.proadInfo.ano ? `${LOCAL.proadInfo.numero}/${LOCAL.proadInfo.ano}` : LOCAL.proadInfo.numero) : '';
        const empresa = (pag1.match(/^\d{4}\s+(.+?)\s+P[áa]g\.?:/m)?.[1] || pag1.match(/Nome Empregador:\s*(.+?)\s+Qtd\./)?.[1] || pag1.match(/^0001\s*-\s*(.+?)\s+P[áa]g/m)?.[1] || '').trim();
        const per = pag1.match(/Per[ií]odo:\s*\d{2}\/(\d{2}\/\d{4})/)?.[1] || pag1.match(/(\d{2}\/\d{4})/)?.[1] || '';
        mostrarAvisoLocal(tipo, empresa, per);
        listarPasta(LOCAL.pasta).then(async l => {
            LOCAL.avisosPasta = l.avisos || [];
            LOCAL.arquivos = l.map(a => ({ ...a, papel: a.nome === LOCAL.aberto ? tipo : papelPeloNome(a.nome) })).map(a => ({ ...a, marcado: !!a.papel }));
            if (!LOCAL.arquivos.length) LOCAL.erroPasta = 'nenhum PDF ou planilha encontrado na pasta.';
            desenhar();
            if (LOCAL.arquivos.length) await identificarArquivosDaPasta();
        }).catch(e => { LOCAL.erroPasta = e.message; console.warn('[SIGEO-Terceirizados] Pasta não listada:', e.message); desenhar(); });
    }

    function mostrarAvisoLocal(tipo, empresa, per) {
        document.getElementById('sigeo-prev-local')?.remove();
        const el = document.createElement('div');
        el.id = 'sigeo-prev-local';
        el.innerHTML = `<div style="font-weight:600;font-size:14px;margin-bottom:4px;">🧾 ${NOMES_TIPO[tipo]} reconhecida</div>
            <div style="font-size:12px;color:#455a64;margin-bottom:10px;">${esc([empresa, per].filter(Boolean).join(' · '))}${LOCAL.proad ? `<br>PROAD ${esc(LOCAL.proad)} (nome da pasta)` : ''}</div>
            <button class="ter-btn ter-princ" id="prev-local-abrir">Conferência previdenciária e FGTS</button>
            <button class="ter-btn ter-sec" id="prev-local-fechar" title="Fechar" style="margin-left:6px;">✕</button>`;
        (document.body || document.documentElement).appendChild(el);
        el.querySelector('#prev-local-fechar').onclick = () => el.remove();
        el.querySelector('#prev-local-abrir').onclick = () => { el.remove(); abrir(); };
    }

    function htmlPasta() {
        if (!LOCAL.pasta && !LOCAL.arquivos.length) return '';
        if (LOCAL.erroPasta && !LOCAL.arquivos.length) return `<div class="ter-faixa ter-faixa-erro">Não consegui listar a pasta: ${esc(LOCAL.erroPasta)} Use "📂 Juntar pasta" ou "📎 Juntar PDFs".</div>`;
        if (!LOCAL.arquivos.length) return '<div class="ter-dica"><span class="ter-girando"></span> Lendo a pasta…</div>';
        const rot = { folha: 'folha', s5001: 'Relatório INSS/eSocial', cadastroEsocial: 'cadastro eSocial', fgts: 'FGTS Digital', segest: 'SEGEST', rescisorio: 'rescisão (FGTS)', dctf: 'DARF/DCTFWeb' };
        const item = (a, i) => `<label style="display:flex;gap:8px;align-items:center;padding:3px 0;font-size:13px;cursor:pointer;">
                <input type="checkbox" data-prev-arq="${i}" ${a.marcado ? 'checked' : ''}>
                <span>${esc(a.nome)}</span>${a.papel ? `<span style="font-size:11px;background:#e0f2f1;color:#00695c;border-radius:10px;padding:1px 8px;">${rot[a.papel]}</span>` : ''}${a.nome === LOCAL.aberto ? '<span style="font-size:11px;color:#78909c;">(aberto)</span>' : ''}${a.nota ? `<span style="font-size:11px;color:#78909c;">${esc(a.nota)}</span>` : ''}</label>`;
        const principais = LOCAL.arquivos.map((a, i) => [a, i]).filter(([a]) => a.papel || a.marcado && a.origem === 'selecao_manual');
        const outros = LOCAL.arquivos.map((a, i) => [a, i]).filter(([a]) => !a.papel && !(a.marcado && a.origem === 'selecao_manual'));
        return `<div class="ter-etapa" style="margin-bottom:12px;">
            <div class="ter-etapa-cab">📁 ${LOCAL.pasta ? 'Arquivos da pasta e fontes adicionadas' : 'Arquivos selecionados'} <span class="ter-mini" style="font-weight:400;margin:0 0 0 6px;">${esc(LOCAL.nomePasta)} · ${LOCAL.arquivos.filter(a => a.marcado).length} marcado(s) de ${LOCAL.arquivos.length}</span></div>
            ${(LOCAL.avisosPasta || []).map(a => `<div class="ter-dica">⚠️ ${esc(a)}</div>`).join('')}
            <div class="ter-etapa-acao"><button class="ter-btn ter-sec" data-prev="pasta-marcar-reconhecidos">Marcar reconhecidos</button><button class="ter-btn ter-sec" data-prev="pasta-marcar-inss">Marcar INSS / S-5001</button><button class="ter-btn ter-sec" data-prev="pasta-desmarcar">Desmarcar todos</button></div>
            <div>${principais.map(([a, i]) => item(a, i)).join('') || '<div class="ter-dica">Nenhum arquivo reconhecido pelo nome; marque abaixo.</div>'}</div>
            ${outros.length ? `<details><summary style="cursor:pointer;font-size:12px;color:#607d8b;">Outros arquivos da pasta (${outros.length})</summary>${outros.map(([a, i]) => item(a, i)).join('')}</details>` : ''}
            ${LOCAL.identificando ? '<div class="ter-dica"><span class="ter-girando"></span> Identificando os arquivos da conferência pelo conteúdo (planilha da SEGEST, guias e documentos de rescisão)…</div>' : ''}
            <div class="ter-etapa-acao"><button class="ter-btn ter-princ" data-prev="pasta-conferir" ${LOCAL.carregando || LOCAL.identificando ? 'disabled' : ''}>${LOCAL.carregando ? 'Lendo…' : LOCAL.identificando ? 'Identificando…' : '✔ Conferir os marcados'}</button></div>
        </div>`;
    }

    async function conferirDaPasta(opcoes = {}) {
        if (LOCAL.identificando) { mostrarErroSnackbar('Aguarde a identificação dos arquivos da pasta.'); return; }
        const marcados = (opcoes.arquivos || LOCAL.arquivos).filter(a => a.marcado);
        if (!marcados.length) { mostrarErroSnackbar('Marque ao menos um arquivo da pasta.'); return; }
        LOCAL.carregando = true;
        if (opcoes.reiniciar !== false) Object.assign(EST, { segest: null, segestOrigem: '', s5001: null, inssDocumentos: [], cadastroEsocial: null, cadastroEsocialPaginas: [], folha: null, fgtsPaginas: [], fgts: null, dctfPaginas: [], dctf: null, fgtsRescisorio: { linhas: [], guias: new Map(), gfds: [], comprovantes: [], extratos: [], linhasDetalhe: [] }, hashesLidos: new Map(), fgtsViaOcr: false, arquivos: { s5001: '', cadastroEsocial: [], folha: '', fgts: [], dctf: [] }, resultado: null, erros: [], errosSegest: [], leituras: [], diagnosticos: [], diagFontes: { folha: null, s5001: null, cadastroEsocial: [], fgts: [], segest: null } });
        desenhar();
        const pdfs = [];
        for (const a of marcados) {
            try {
                EST.lendo = a.nome; desenhar();
                const buf = !a.arquivoLocal && a.nome === LOCAL.aberto && LOCAL.bufAberto ? LOCAL.bufAberto : await lerArquivoDaPastaPrev(a);
                if (/\.(xlsx?|xlsm)$/i.test(a.nome)) {
                    // v2.3.0: o arquivo chega pelo Tampermonkey num ArrayBuffer de outro contexto, que a
                    // biblioteca de planilhas não reconhece; como Uint8Array ela lê normalmente.
                    const wb = XLSX.read(new Uint8Array(buf.slice(0)), { type: 'array' }), lido = lerPlanilhaSegest(wb, a.nome);
                    if (lido.linhas.length) { EST.segest = lido; EST.segestOrigem = a.nome; await guardarSegestDiagnostico({ name: a.nome }, buf, wb, lido); }
                    else EST.errosSegest.push(`"${a.nome}": não é a planilha de faturamento da SEGEST (sem aba com CPF, Posto de Trabalho e Valor Total ou layout completo Valor Total a Faturar). Junte a planilha pelo botão "Juntar planilha da SEGEST".`);
                } else pdfs.push({ name: a.nome, papel: a.papel || '', arrayBuffer: async () => buf.slice(0) });
            } catch (e) { EST.erros.push(`"${a.nome}": ${e.message}`); }
        }
        const erros = [...EST.erros];
        LOCAL.carregando = false;
        // v2.5.14: documentos de rescisão por último, depois da folha, do S-5001 e da guia mensal (demais na ordem da pasta)
        pdfs.sort((x, y) => Number(x.papel === 'rescisorio') - Number(y.papel === 'rescisorio'));
        await juntarPdfs(pdfs);
        EST.erros.unshift(...erros.filter(x => !EST.erros.includes(x)));
        desenhar();
    }


    // ===================== v2.5.49: layouts da MFC (10/2026) =====================
    // Regra comum: cada leitor novo só entra quando os leitores anteriores não reconhecem a página
    // ou não leem nenhum registro. O que já é lido segue exatamente pelo mesmo caminho.
    P.ehFolhaCodNomePrev = (t) => /Folha de Pagamento/i.test(t) && /(?:^|\n)\s*C[óo]d:\s*\d+\s+Nome:/i.test(t) && /Base INSS Funcion[áa]rio\s*:/i.test(t);
    P.ehResumoFolhaCodNomePrev = (t) => /Folha de Pagamento/i.test(t) && /R\s*E\s*S\s*U\s*M\s*O\s+Local\s*:/i.test(t);
    P.ehS5001DemonstrativoPrev = (t) => /DEMONSTRATIVO\s+eSOCIAL\s*[–-]\s*EVENTO\s+S-?5001/i.test(t) && /Trabalhador\s+CPF\s+Matr[íi]cula/i.test(t);
    P.ehGfdOcrPrev = (t) => /Informa[çc][õo]es de recolhimentos do FGTS/i.test(t) && /Total da Guia\s*:/i.test(t) && /Pagar este documento at/i.test(t);
    const tipoPaginaAnterior2549 = P.tipoPaginaPrev;
    P.tipoPaginaPrev = (t) => {
        const tipo = tipoPaginaAnterior2549(t);
        if (tipo) return tipo;
        if (P.ehFolhaCodNomePrev(t) || P.ehResumoFolhaCodNomePrev(t)) return 'folha';
        if (P.ehGfdOcrPrev(t)) return 'fgts';
        return '';
    };

    // Folha "Folha de Pagamento" (MFC): blocos "Cód: 214 Nome: ... Função: ...", sem CPF. A página
    // "R E S U M O" é total coletivo e não entra nos empregados. Base e INSS somam salário e 13º
    // (inclusive da rescisão), porque a conferência compara com o S-5001 somando mensal e 13º (11 + 11*, 21 + 21*).
    P.lerFolhaCodNomePrev = (paginas) => {
        const limpas = paginas.map(pg => String(pg || '').split('\n').filter(l => !/^\s*(?:Folha de Pagamento\s+\d{2}\/\d{2}\/\d{4}|Apelido\s*:|CNPJ\/CEI\s*:|Endere[çc]o\s*:)/i.test(l)).join('\n'));
        const textoTodo = paginas.join('\n');
        const corte = limpas.join('\n').split(/R\s*E\s*S\s*U\s*M\s*O\s+Local\s*:/i)[0];
        const r = { competencia: '', colaboradores: [], avisos: [], informacoes: [], paginasIgnoradas: 0, totalImpresso: null, layout: 'Folha de Pagamento (Cód/Nome)' };
        const per = textoTodo.match(/Per[íi]odo de\s*:\s*\d{2}\/(\d{2})\/(\d{4})/i);
        r.competencia = per ? `${per[2]}-${per[1]}` : '';
        const tot = textoTodo.match(/Total de Funcion[áa]rios\s*:\s*(\d+)/i); if (tot) r.totalImpresso = Number(tot[1]);
        const V = '(' + PREV_VALOR + ')';
        let local = '';
        for (const bloco of corte.split(/(?=^\s*(?:Local\s*:|C[óo]d:\s*\d+\s+Nome:))/mi)) {
            const ml = bloco.match(/^\s*Local\s*:\s*([^\n]+)/i);
            if (ml) { local = ml[1].trim(); continue; }
            const m = bloco.match(/^\s*C[óo]d:\s*(\d+)\s+Nome:\s*(.+?)\s+Fun[çc][ãa]o:/i);
            if (!m) continue;
            const c = P.novoColabPrev(m[1], m[2]);
            c.admissao = bloco.match(/Admiss[ãa]o\s*:\s*(\d{2}\/\d{2}\/\d{4})/i)?.[1] || '';
            c.situacao = (bloco.match(/Situa[çc][ãa]o\s*:\s*(.+?)(?=\s+(?:Data|Ocorr[êe]ncia|Sal[áa]rio)\s*:|\n|$)/i)?.[1] || '').trim();
            const dataSit = bloco.match(/Situa[çc][ãa]o\s*:[^\n]*?\bData\s*:\s*(\d{2}\/\d{2}\/\d{4})/i)?.[1];
            if (dataSit) c.situacao += ` (${dataSit})`;
            c.ccusto = local;
            const bi = P.ce(bloco.match(new RegExp('Base INSS Funcion[áa]rio\\s*:\\s*' + V, 'i'))?.[1]);
            const bi13 = P.ce(bloco.match(new RegExp('Base INSS Func\\.\\s*13o\\.\\s*Sal[áa]rio\\s*:\\s*' + V, 'i'))?.[1]);
            c.baseInss = bi === null || bi === undefined ? null : bi + (bi13 || 0);
            const bf = P.ce(bloco.match(new RegExp('Base F\\.G\\.T\\.S\\.\\s*:\\s*' + V, 'i'))?.[1]);
            const bf13 = P.ce(bloco.match(new RegExp('Base F\\.G\\.T\\.S\\.\\s*13o\\.\\s*:\\s*' + V, 'i'))?.[1]);
            c.baseFgts = bf === null || bf === undefined ? null : bf + (bf13 || 0); // o F.G.T.S. impresso inclui o do 13º
            const f = bloco.match(new RegExp('(?:^|[^e]\\s)F\\.G\\.T\\.S\\.\\s*:\\s*' + V, 'im'));
            if (f) { c.fgts = P.ce(f[1]); c.temFgts = true; }
            c.rubricasInss = [];
            for (const mi of bloco.matchAll(new RegExp('(?:^|\\s)(\\d+)\\s+(INSS Sobre (?:Sal[áa]rio|13º Sal\\.?)(?:\\s*\\(Rescis[ãa]o\\))?)\\s+(?:\\d{1,3},\\d{2}\\s+)?' + V + '(?=\\s|$)', 'gi'))) {
                const valor = P.ce(mi[3]); c.inss += valor; c.temInss = true;
                c.rubricasInss.push({ codigo: mi[1], texto: mi[0].trim(), natureza: 'D', valor });
            }
            if (c.baseInss === 0 && !c.temInss) c.temInss = true;
            r.colaboradores.push(c);
        }
        if (r.colaboradores.length) r.informacoes.push('Folha sem CPF: cada empregado é ligado pelo nome (e pela matrícula, quando o outro documento a traz).');
        return P.finalizaFolhaPrev(r, textoTodo);
    };
    const lerFolhaAnterior2549 = P.lerFolha;
    P.lerFolha = (paginas) => {
        const anterior = lerFolhaAnterior2549(paginas);
        if (anterior?.colaboradores?.length || !P.ehFolhaCodNomePrev(paginas.join('\n'))) return anterior;
        const r = P.lerFolhaCodNomePrev(paginas);
        if (!r.colaboradores.length) return anterior;
        r.paginasIgnoradas = paginas.filter(pg => P.ehResumoFolhaCodNomePrev(pg) && !P.ehFolhaCodNomePrev(pg)).length;
        return P.anotarFontesRegistrosPrev(r, paginas);
    };

    // "Demonstrativo eSocial – Evento S-5001" (gerado do XML do S-5001), um trabalhador por bloco,
    // que pode continuar na página seguinte. Usa só o quadro infoBaseCS (por categoria); o quadro
    // "por período de referência" repete os mesmos valores. Códigos 11, 19 e 21; 13º salário em 11*/21*.
    P.lerS5001DemonstrativoPrev = (paginas) => {
        const texto = paginas.join('\n');
        const r = P.novoS5Prev(texto, 'S-5001 (demonstrativo por trabalhador)');
        r.cnpj ||= P.dig(texto.match(/\b(\d{2}\.\d{3}\.\d{3}\/\d{4}-\d{2})\b/)?.[1]);
        const meses = { JANEIRO: '01', FEVEREIRO: '02', MARCO: '03', ABRIL: '04', MAIO: '05', JUNHO: '06', JULHO: '07', AGOSTO: '08', SETEMBRO: '09', OUTUBRO: '10', NOVEMBRO: '11', DEZEMBRO: '12' };
        const mp = texto.match(/Per[íi]odo de apura[çc][ãa]o[^\n]*\n[^\n]*?\b([A-Za-zçÇ]+)\/(\d{4})\b/i);
        if (mp && meses[P.nome(mp[1])]) r.competencia = `${mp[2]}-${meses[P.nome(mp[1])]}`;
        const V = '(' + PREV_VALOR + ')';
        const ignorados = new Set();
        for (const bloco of texto.split(/(?=DEMONSTRATIVO\s+eSOCIAL\s*[–-]\s*EVENTO\s+S-?5001)/i).filter(b => /^DEMONSTRATIVO/i.test(b))) {
            const id = bloco.match(/Trabalhador\s+CPF\s+Matr[íi]cula\s*\n\s*(.+?)\s+(\d{3}\.\d{3}\.\d{3}-\d{2})\s+(\S+)\s*(?:\n|$)/i);
            const cpf = P.cpf(id?.[2]);
            if (!id || !cpf || !P.cpfValidoPrev(cpf)) { r.avisos.push('S-5001 (demonstrativo): bloco sem CPF legível; não associado a trabalhador.'); continue; }
            const t = P.registroS5Prev({ cpf, nome: id[1].trim(), matEsocial: id[3], categoria: bloco.match(/\n\s*(\d{3})\s*[–-]\s*Empregado/i)?.[1] || '', _semBase: true, _semDesconto: true });
            const quadro = (bloco.split(/BASES DE C[ÁA]LCULO E VALORES POR CATEGORIA/i)[1] || '').split(/DETALHAMENTO POR PER[ÍI]ODO/i)[0]
                .replace(/^[^\n]*Tipo de valor \(tpValor\)[^\n]*\n/i, '');
            for (const u of quadro.split(/(?=(?:^|\n)\s*(?:Compet[êe]ncia|D[ée]cimo terceiro)(?=\s|$))/i)) {
                const mc = u.match(/(?:^|\s)(\d{2})\s*[–-]\s/); const mv = u.match(new RegExp('R\\$\\s*' + V));
                if (!mc || !mv) continue;
                const decimo = /D[ée]cimo terceiro/i.test(u), cod = mc[1], v = P.ce(mv[1]);
                if (!['11', '19', '21'].includes(cod)) { ignorados.add(cod); continue; }
                if (decimo && cod === '19') { ignorados.add('19 (13º)'); continue; }
                P._s5Soma(t, decimo ? `${cod}*` : cod, v);
                if (!decimo) { if (cod === '21') t._semDesconto = false; else t._semBase = false; }
            }
            if (r.trabalhadores.has(cpf)) { r.avisos.push(`S-5001 (demonstrativo): CPF ${P.fmtCpf(cpf)} aparece mais de uma vez; vale o primeiro. Conferir.`); continue; }
            r.trabalhadores.set(cpf, t);
            if (t._semBase) r.avisos.push(`S-5001 (demonstrativo): ${t.nome} sem base de cálculo mensal (tipo 11); não tratada como zero.`);
        }
        r.informacoes.push(`Demonstrativo do S-5001 por trabalhador: ${r.trabalhadores.size} trabalhador(es) lidos.${ignorados.size ? ` Códigos não usados na conferência: ${[...ignorados].join(', ')}.` : ''}`);
        return P.somaS5Prev(r);
    };
    const lerS5001Anterior2549 = P.lerS5001;
    P.lerS5001 = (paginas) => {
        const anterior = lerS5001Anterior2549(paginas);
        if (anterior?.trabalhadores?.size || anterior?.auxiliares?.length || !P.ehS5001DemonstrativoPrev(paginas.join('\n'))) return anterior;
        const r = P.lerS5001DemonstrativoPrev(paginas);
        return r.trabalhadores.size ? r : anterior;
    };

    // GFD escaneada: o OCR estraga o título ("GFD - Guia do FGTS Digital") e às vezes um dígito do
    // identificador ("01261111/2193296-1"). Só aceita a guia quando há um único detalhe de guia lido e
    // conferem: raiz do empregador, competência, total da guia (FGTS + consignado) e o identificador
    // (dígitos legíveis iguais; no máximo 2 caracteres ilegíveis; dígito verificador igual).
    P.recuperarGfdOcrPrev = (r, paginas) => {
        if (r.gfds?.length || !r.guias?.size) return;
        const idx = paginas.map((pg, i) => i).filter(i => !/GFD\s*-\s*Guia do FGTS Digital/i.test(paginas[i]) && P.ehGfdOcrPrev(paginas[i]));
        if (idx.length !== 1 || r.guias.size !== 1) return;
        const i = idx[0], pg = P.rotulosFgtsPrev(String(paginas[i]));
        const g = [...r.guias.values()][0];
        const valor = P.ce(pg.match(/Total da Guia\s*:\s*((?:\d{1,3}(?:\.\d{3})+|\d+),\d{2})/i)?.[1]);
        const competencia = P.compDe(pg.match(/^\s*(\d{2}\/\d{4})\s+\d+\s+[\d.,]+/m)?.[1]);
        const raiz = P.dig(pg.match(/\b(\d{2}\.\d{3}\.\d{3})\b/)?.[1]);
        const totalDetalhe = P.ce(r.textoTotalGuiaPrev?.get?.(g.numero));
        const [num16, dv] = String(g.numero).split('-');
        let idOk = false;
        for (const m of pg.matchAll(/(?:^|[^\d])([\d\/|lIO]{16})\s*-\s*(\d)(?!\d)/g)) {
            const tok = m[1]; if (!num16 || tok.length !== 16 || m[2] !== dv) continue;
            let ruins = 0, ok = true;
            for (let k = 0; k < 16; k++) { if (/\d/.test(tok[k])) { if (tok[k] !== num16[k]) { ok = false; break; } } else ruins++; }
            if (ok && ruins <= 2) { idOk = true; break; }
        }
        const confere = idOk && raiz && raiz === g.empregadorRaiz && competencia && g.competencias?.has?.(competencia)
            && valor !== null && valor !== undefined && totalDetalhe !== null && totalDetalhe !== undefined && valor === totalDetalhe;
        if (!confere) { (r.avisos ||= []).push('Página com aparência de GFD lida por OCR, mas empregador, competência, total ou número da guia não conferem com o detalhe; GFD não reconhecida.'); return; }
        const fonte = paginas.fontes?.[i] || { pagina: i + 1 };
        const gfd = { identificador: g.numero, vencimento: g.vencimento || '', valor, competencia, empregadorRaiz: raiz, empregadorNome: g.empregadorNome || '',
            valorFgts: P.totalLinhaFgtsPrev(pg, 'Total FGTS'), valorConsignado: /Total Consignado/i.test(pg) ? P.totalLinhaFgtsPrev(pg, 'Total Consignado') : null,
            fontes: [{ ...fonte, metodo: fonte.metodo || 'ocr' }], viaOcr: true, reconhecidaPorOcr: true };
        r.gfds.push(gfd);
        (r.informacoes ||= []).push(`GFD ${g.numero} lida por OCR: o número da guia, a competência, o empregador e o total de R$ ${P.rs(valor)} conferem com o detalhe da guia; vencimento ${gfd.vencimento || '?'} tirado do detalhe.`);
        if (gfd.valorFgts !== null && gfd.valorConsignado) r.informacoes.push(`GFD ${g.numero}: pagamento R$ ${P.rs(valor)} inclui FGTS R$ ${P.rs(gfd.valorFgts)} e consignado R$ ${P.rs(gfd.valorConsignado)}.`);
    };
    const lerFgtsAnterior2549 = P.lerFgts;
    P.lerFgts = (paginas) => {
        const r = lerFgtsAnterior2549(paginas);
        try {
            if (!r.gfds?.length && r.guias?.size === 1 && paginas.some(P.ehGfdOcrPrev)) {
                r.textoTotalGuiaPrev = new Map();
                for (const pg of paginas) {
                    const t = P.rotulosFgtsPrev(String(pg));
                    const num = t.match(/N[úu]mero da Guia:\s*([\d-]+)/)?.[1];
                    const tot = t.match(/Total da Guia \(FGTS \+ Consignado\)\s*:\s*([\d.,]+)/i)?.[1] || t.match(/Total da Guia \(FGTS\)\s*:\s*([\d.,]+)/i)?.[1];
                    if (num && tot && !r.textoTotalGuiaPrev.has(num)) r.textoTotalGuiaPrev.set(num, tot);
                }
                P.recuperarGfdOcrPrev(r, paginas);
                delete r.textoTotalGuiaPrev;
            }
        } catch (e) { (r.avisos ||= []).push(`GFD lida por OCR não interpretada: ${e.message}`); }
        return r;
    };
    // ===================== v2.5.51: outro serviço/lotação do TRT no relatório do INSS =====================
    // Quem está fora da SEGEST e aparece no relatório do INSS em um serviço do TRT diferente do de todos os
    // terceirizados da SEGEST provavelmente é de outro contrato com o TRT. Só acrescenta a observação; a
    // situação ("Verificar") e as contagens não mudam.
    const conferirAnterior2551 = P.conferir;
    P.conferir = (args) => {
        const r = conferirAnterior2551(args);
        try {
            const cod = (p) => String(p?.s5?.servico || '').match(/Servi[cç]o\s*:?\s*(\d+)/i)?.[1] || '';
            const daSegest = new Set((r?.segestPessoas || []).map(cod).filter(Boolean));
            if (daSegest.size) for (const p of (r.fora || [])) {
                const c = cod(p);
                if (!c || daSegest.has(c) || p.fol || p.situacao !== 'Verificar') continue;
                const nota = `no relatório do INSS está no serviço ${c} do TRT, diferente do serviço dos terceirizados da SEGEST (${[...daSegest].join(', ')}): provavelmente outro contrato com o TRT`;
                (p.obs ||= []).push(nota);
                p.texto = [p.texto, nota].filter(Boolean).join('; ');
            }
        } catch (e) { /* observação opcional: nunca interrompe a conferência */ }
        return r;
    };
    // ===================== v2.5.52: "Detalhe da Guia a Ser Emitida" (prévia do FGTS Digital) =====================
    // Mesmo layout do "Detalhe da Guia Emitida", impresso antes da emissão (sem número da guia). Passa a ser lido
    // como detalhe; o vínculo com a GFD continua dependendo dos totais (GFD3). Sem esse título, nada muda.
    const RE_GUIA_A_SER_EMITIDA_2552 = /D\s*e\s*t\s*a\s*l\s*h\s*e\s+d\s*a\s+G\s*u\s*i\s*a\s+a\s+S\s*e\s*r\s+E\s*m\s*i\s*t\s*i\s*d\s*a/gi;
    const rotulosFgtsAnterior2552 = P.rotulosFgtsPrev;
    P.rotulosFgtsPrev = (pg) => {
        let t = String(pg ?? '');
        if (!/Detalhe da Guia Emitida \(prévia: a ser emitida\)/.test(t)) t = t.replace(RE_GUIA_A_SER_EMITIDA_2552, 'Detalhe da Guia Emitida (prévia: a ser emitida)');
        return rotulosFgtsAnterior2552(t);
    };
    const lerFgtsAnterior2552 = P.lerFgts;
    P.lerFgts = (paginas) => {
        const r = lerFgtsAnterior2552(paginas);
        try {
            const previas = (paginas || []).filter(pg => { const t = String(pg ?? ''); RE_GUIA_A_SER_EMITIDA_2552.lastIndex = 0; return RE_GUIA_A_SER_EMITIDA_2552.test(t) || /\(prévia: a ser emitida\)/.test(t); }).length;
            RE_GUIA_A_SER_EMITIDA_2552.lastIndex = 0;
            if (previas) {
                // Prévia sem número: liga à GFD só se houver uma única guia sem número e uma única GFD, com o mesmo
                // empregador, a mesma competência, o mesmo vencimento e o mesmo "Total da Guia" impresso.
                const semNumero = [...r.guias.entries()].filter(([k]) => !/\d/.test(String(k || '')));
                const gfd = (r.gfds || []).length === 1 ? r.gfds[0] : null;
                let ligada = false;
                if (gfd && semNumero.length === 1 && r.guias.size === 1 && gfd.identificador) {
                    const [chave, g] = semNumero[0];
                    const textos = (paginas || []).map(pg => P.rotulosFgtsPrev(String(pg ?? ''))).filter(t => /\(prévia: a ser emitida\)/.test(t));
                    const comCons = textos.map(t => t.match(/Total da Guia \(FGTS \+ Consignado\)\s*:\s*([\d.,]+)/i)?.[1]).filter(Boolean);
                    const soFgts = textos.map(t => t.match(/Total da Guia \(FGTS\)\s*:\s*([\d.,]+)/i)?.[1]).filter(Boolean);
                    const totais = new Set([...comCons, ...soFgts].map(v => P.ce(v)));
                    const totalGuia = totais.size === 1 ? [...totais][0] : null;
                    const comps = new Set([...(g.competencias || [])]);
                    if (Number.isFinite(totalGuia) && totalGuia === gfd.valor && g.empregadorRaiz && g.empregadorRaiz === gfd.empregadorRaiz
                        && g.vencimento && g.vencimento === gfd.vencimento && gfd.competencia && comps.size === 1 && comps.has(gfd.competencia)) {
                        const num = gfd.identificador;
                        g.numero = num; r.guias.delete(chave); r.guias.set(num, g);
                        for (const l of r.linhas || []) if (l.guia === chave) l.guia = num;
                        for (const e of r.estabelecimentos.values()) if (e.guia === chave) e.guia = num;
                        if (g.totalDocumento === undefined || g.totalDocumento === null) g.totalDocumento = totalGuia;
                        if (comCons.length) { g.temConsignado = true; if (g.totalFgts !== null && g.totalFgts !== undefined) g.total = g.totalFgts; }
                        ligada = true;
                        (r.informacoes ||= []).push(`Detalhe do FGTS Digital juntado é o "Detalhe da Guia a Ser Emitida" (prévia, sem número da guia; ${previas} página(s)): ligado à GFD ${num} porque empregador, competência, vencimento (${g.vencimento}) e total da guia (R$ ${P.rs(totalGuia)}) são os mesmos; o FGTS continua conferido no GFD3.`);
                    }
                }
                if (!ligada) (r.informacoes ||= []).push(`Detalhe do FGTS Digital juntado é o "Detalhe da Guia a Ser Emitida" (prévia, sem número da guia; ${previas} página(s)): lido como o detalhe da guia; sem vínculo seguro com uma GFD (empregador, competência, vencimento e total da guia precisam ser os mesmos).`);
            }
        } catch (e) { /* só informação */ }
        return r;
    };
    // v2.5.52: nas ocorrências, o CPF formatado pode vir seguido de ponto final e da linha seguinte começando
    // por número ("CPF 092.878.236-00.\n31/10-Feriado"); a captura levava os dígitos seguintes e o CPF virava
    // inválido. Só corrige quando o texto começa por um CPF completo no formato 000.000.000-00.
    // Também: "por Fulano Cpf 000.000.000-00" (CPF com inicial maiúscula) entrava no nome ("Fulano Cpf") e o CPF
    // se perdia; tira o "Cpf" do fim do nome e lê o CPF que vem logo depois dele na ocorrência.
    const ajustarCpfCitado2552 = (lista, ocorrencia) => (lista || []).map(c => {
        if (!c || c.cpf) return c;
        const m = String(c.cpfTexto || '').match(/^(\d{3}\.\d{3}\.\d{3}-\d{2})(?!\d)/);
        if (m) return { ...c, cpf: P.dig(m[1]), cpfTexto: m[1] };
        if (/\s+CPF$/i.test(c.nome || '') && !c.cpfTexto) {
            const nome = c.nome.replace(/\s+CPF$/i, '').trim();
            const t = String(ocorrencia || '').replace(/\s+/g, ' ');
            const esc = nome.replace(/[.*+?^${}()|[\]\\]/g, '\\$&').replace(/ /g, '\\s+');
            const mc = t.match(new RegExp(esc + '\\s+CPF\\s*:?\\s*(\\d{3}\\.\\d{3}\\.\\d{3}-\\d{2})(?!\\d)', 'i'));
            return mc ? { ...c, nome, cpf: P.dig(mc[1]), cpfTexto: mc[1] } : { ...c, nome };
        }
        return c;
    });
    const coberturasAnterior2552 = P.coberturas;
    P.coberturas = (ocorrencia) => ajustarCpfCitado2552(coberturasAnterior2552(ocorrencia), ocorrencia);
    const citacoesCpfAnterior2552 = P.citacoesCpf;
    P.citacoesCpf = (ocorrencia) => ajustarCpfCitado2552(citacoesCpfAnterior2552(ocorrencia), ocorrencia);
    // ===================== fim v2.5.49 =====================

    return { abrir, garantirBotao, detectarPdfLocal, P, EST, LOCAL };

    }

    function iniciarNoArquivoLocal() {
        if (!MODULO_PREV_ATIVO || window !== window.top) return;
        const ehPdf = /\.pdf$/i.test(decodeURIComponent(location.pathname)) || document.contentType === 'application/pdf';
        if (!ehPdf) return;
        const vai = () => { try { moduloPrev().detectarPdfLocal(); } catch (e) { console.warn('[SIGEO-Terceirizados] Conferência previdenciária (PDF local):', e); } };
        if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', vai, { once: true }); else vai();
    }
    if (EH_ARQUIVO_LOCAL) { iniciarNoArquivoLocal(); return; }

    window.addEventListener('_sigeoTerTabelaAtualizada', iniciarNaTelaDeDocumentosFiscais);
    window.addEventListener('load', iniciarNaTelaDeDocumentosFiscais, { once: true });
    window.addEventListener('popstate', iniciarNaTelaDeDocumentosFiscais);
    garantirObservadorEstruturaPagina();

    // Se o script for injetado depois que a tabela já carregou nesta sessão
    if (Array.isArray(window._sigeoTerUltimosDadosTabela) && window._sigeoTerUltimosDadosTabela.length > 0) {
        dadosConsultaTabelaDocsFiscais = window._sigeoTerUltimosDadosTabela;
    }

    // Tentativas iniciais cobrem tanto carregamento normal quanto navegação interna da SPA.
    iniciarNaTelaDeDocumentosFiscais();
    setTimeout(iniciarNaTelaDeDocumentosFiscais, 500);
    setTimeout(iniciarNaTelaDeDocumentosFiscais, 1500);

    console.log('[SIGEO-Terceirizados] Robô carregado (v2.5.21 — TRD em segundo plano desde a primeira nota, conciliação SEGEST, colagem na Liquidação e conferência previdenciária).');
})();
