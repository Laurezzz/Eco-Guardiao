const abrirBotaoModal = document.querySelector(".abrirModal");
const fecharBotaoModal = document.querySelector("#fecharModal");
const modal = document.querySelector("#modal");
const fundoModal = document.querySelector("#fundoModal")

const toggleModal = () => {
    modal.classList.toggle("hide");
    fundoModal.classList.toggle("hide");
}

[abrirBotaoModal, fecharBotaoModal, fundoModal].forEach((el) => {
    el.addEventListener("click", () => toggleModal());
});

//------------------MODAL 2---------------------//

const abrirBotaoModal2 = document.querySelector(".abrirModal2");
const fecharBotaoModal2 = document.querySelector("#fecharModal2");
const modal2 = document.querySelector("#modal2");
const fundoModal2 = document.querySelector("#fundoModal2")

const toggleModal2 = () => {
    modal2.classList.toggle("hide");
    fundoModal2.classList.toggle("hide");
}

[abrirBotaoModal2, fecharBotaoModal2, fundoModal2].forEach((el) => {
    el.addEventListener("click", () => toggleModal2());
});