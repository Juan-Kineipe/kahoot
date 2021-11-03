const questions = {
  1: {
    question: 'Escolha a característica correta em relação ao protocolo de transporte UDP',
    responses: {
      a: 'Transferência de dados não confiável entre processo emissor e receptor.',
      b: 'Exige preparação entre processos cliente e servidor',
      c: 'Oferece controle de congestionamento.',
      d: 'Oferece garantias de vazão.',
    },
    correctResponse: 'a',
  },
  2: {
    question: 'Na hierarquia de servidores DNS, qual é o servidor responsável por saber todas as informações sobre o domínio?',
    responses: {
      a: 'Servidor DNS raiz',
      b: 'Servidor Top Level',
      c: 'Servidor Autoridade',
      d: 'Servidor DNS primário',
    },
    correctResponse: 'c',
  },
  3: {
    question: 'Sobre a arquitetura de roteador e suas funções, defina a opção correta:',
    responses: {
      a: 'O roteador não pode estar conectados em várias sub redes',
      b: 'O Roteador não necessita de um endereço no caso do DHCP (Dynamic Host Configuration Protocol)',
      c: 'O roteador não tem participação nenhuma na camada de redes',
      d: 'Uma das principais funções do roteador é repassar datagramas do enlace de entrada para saída',
    },
    correctResponse: 'd',
  },
  4: {
    question: 'Sobre os 4 tipos de registros de servidores DNS, o responsável por obter o nome canônico do servidor de correio é:',
    responses: {
      a: 'A',
      b: 'NS',
      c: 'MX',
      d: 'CNAME',
    },
    correctResponse: 'c',
  },
  5: {
    question: 'Sobre os fundamentos de programação de socket, assinale a alternativa correta:',
    responses: {
      a: 'O cliente não precisa de um socket para comunicação com o servidor',
      b: 'Não é necessário o cliente saber o endereço IP do servidor ou o número de porta do socket',
      c: 'O servidor deve ter um socket(porta) apenas para receber segmentos',
      d: 'O socket é identificado localmente com um número de porta',
    },
    correctResponse: 'd',
  },
  6: {
    question: 'Sobre o protocolo TCP, é INCORRETO afirmar que:',
    responses: {
      a: 'Garante a entrega, sequência não duplicação e não corrompimento.',
      b: 'Permite que as duas máquinas envolvidas transmitam e recebam ao mesmo tempo.',
      c: 'Garante equilíbrio no envio dos dados sem causar sobrecarga na rede.',
      d: 'Usa a comutação por circuitos para mandar dados na rede.',
    },
    correctResponse: 'd',
  },
  7: {
    question: 'Sobre o protocolo de segurança Go Back N, é correto afirmar que:',
    responses: {
      a: 'Ambos, remetente e destinatário tem um buffer.',
      b: 'O lado remetente tem um timer para o pacote mais antigo da janela sem o retorno ACK.',
      c: 'Para cada pacote que o destinatário receber, ele obrigatoriamente terá que mandar o ACK respectivo para o remetente.',
      d: 'O destinatário pode receber pacotes fora de ordem.',
    },
    correctResponse: 'b',
  },
  8: {
    question: 'Sobre o protocolo de segurança Repetição Seletiva, é correto afirmar que:',
    responses: {
      a: 'No remetente, cada pacote tem um timer.',
      b: 'Apenas o destinatário tem um buffer.',
      c: 'No destinatário, ele apenas recebe os pacotes que estão dentro da sequência.',
      d: 'Se der timeout, o remetente manda todo a sequência de pacotes a partir do pacote que deu timeout.',
    },
    correctResponse: 'a',
  },
  9: {
    question: 'Sobre o controle de fluxo/congestionamento feita pelo TCP é correto afirmar que:',
    responses: {
      a: 'O protocolo TCP não tem protocolo de tratamento de congestionamento',
      b: 'Na técnica  FIM a FIM, o remetente não recebe nenhum feedback dos roteadores',
      c: 'O congestionamento da rede depende somente dos remetentes, os roteadores não têm papel sobre o congestionamento',
      d: 'Diferente do TCP, o UDP tem protocolos de controle de congestionamento',
    },
    correctResponse: 'b',
  },
  10: {
    question: 'Sobre a apresentação de 3 vias é INCORRETO afirmar',
    responses: {
      a: 'Apresentação de 3 vias ocorre em 3 etapas, por isso do nome.',
      b: 'É o cliente que inicia a apresentação de 3 vias.',
      c: 'O servidor recebe do cliente a primeira via com o SYN valendo 1,  e devolve um TCP com o SYN 1 e com o ACK valendo 1',
      d: 'O servidor recebe do cliente a primeira via com o SYN valendo 1,  e devolve um TCP com o SYN 1 e com o ACK valendo 0',
    },
    correctResponse: 'd',
  },
}

module.exports = questions