export default class initAnimaNumeros {
  constructor(numeros, observeTarget, observerClass) {
    this.numeros = document.querySelectorAll(numeros);
    this.observeTarget = document.querySelector(observeTarget);
    this.observerClass = observerClass;

    // bind o this do obj ao callback da mutacao
    this.handleMutation = this.handleMutation.bind(this);
  }

  // Recebe um elemento do dom, com numero em seu texto
  // incrementa a partie de 0  ate o numero final
  static incrementoNumero(numero) {
    const total = +numero.innerText;
    const incremento = Math.floor(total / 100);

    let start = 0;
    const timer = setInterval(() => {
      start += incremento;
      numero.innerText = start;
      if (start > total) {
        numero.innerText = total;
        clearInterval(timer);
      }
    }, 25 * Math.random());
  }

  // Ativa incrementar numero para cada numero selecionado do dom
  animaNumeros() {
    this.numeros.forEach((numero) => this.constructor.incrementoNumero(numero));
  }

  // funcao que ocorre quando a mutacao ocorrer
  handleMutation(mutation) {
    if (mutation[0].target.classList.contains(this.observerClass)) {
      this.observer.disconnect();
      this.animaNumeros();
    }
  }

  // Add o MutationObserver para verificar quando a classe ativo é add ao elemento target
  addMutationObserver() {
    this.observer = new MutationObserver(this.handleMutation);
    this.observer.observe(this.observeTarget, { attributes: true });
  }
  init() {
    if (this.numeros.length && this.observeTarget) {
      this.addMutationObserver();
    }
    return this;
  }
}
