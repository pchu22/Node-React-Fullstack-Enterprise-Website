import 'bootstrap/dist/css/bootstrap.min.css';
import { useState, React } from "react";
import Swal from "sweetalert2"


const emailRegex = /^\S+@\S+\.\S+$/;
const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,24}$/;


const FormMinhaConta = () => {

    const [Email, setEmail] = useState("");
    const [Telefone, setTelefone] = useState("");
    const [Morada, setMorada] = useState("");
    const [Localidade, setLocalidade] = useState("");

    const Send = () => {
        if (Email === "") {
            Swal.fire({
                title: "Tem que inserir um email!",
                confirmButtonColor: '#00B8E0',
                icon: "warning",
            });
        } else if (Telefone === "") {
            Swal.fire({
                title: "Tem que inserir um Nº de telemóvel!",
                confirmButtonColor: '#00B8E0',
                icon: "warning",
            });
        } else if (Morada === "") {
            Swal.fire({
                title: "Tem que inserir uma morada!",
                confirmButtonColor: '#00B8E0',
                icon: "warning",
            });

        } else {
            Swal.fire({
                title: "Tem a certeza?",
                text: "Deseja confirmar estas alterações?",
                showCancelButton: true,
                confirmButtonText: "Sim, alterar!",
                confirmButtonColor: '#00B8E0',
                cancelButtonText: "Não, voltar atrás",
                cancelButtonColor: "#C51616",
                icon: "question"

            }).then((result) => {
                if (result.value) {
                    //Adicionar código de alterações da conta
                    Swal.fire({
                        icon: "success",
                        title: 'Alterações aplicadas com sucesso!',
                        html: 'Será redirecionado para a mesma página',
                        timer: 5000,
                        timerProgressBar: true,
                        confirmButtonColor: '#00B8E0',
                    }).then(() => {
                        window.location.href = window.location.href;
                    })
                } else if (result.dismiss === Swal.DismissReason.cancel) {
                    Swal.fire({ title: "Cancelado", text: "As alterações não foram aplicadas!", icon: "error", confirmButtonColor: '#00B8E0', });
                }
            });
        }
    };

    const Alterar = () => {
        Swal.fire({
            title: 'Alterar Password',
            html: `<input type="password" id="passwordAntinga" class="swal2-input" placeholder="Password Antiga">
            <input type="password" id="passwordNova" class="swal2-input" placeholder="Password Nova">`,
            confirmButtonText: 'Alterar',
            confirmButtonColor: '#39C516',
            focusConfirm: false,
            preConfirm: () => {
                const passwordAntinga = Swal.getPopup().querySelector('#passwordAntinga').value
                const passwordNova = Swal.getPopup().querySelector('#passwordNova').value
                if (!passwordAntinga) {
                    Swal.showValidationMessage(`Introduza a sua password antiga!`)
                }
                else if
                    (!passwordNova) {
                    Swal.showValidationMessage(`Introduza a sua password nova!`)
                }
                return { passwordAntinga: passwordAntinga, passwordNova: passwordNova }

            }
        }).then((result) => {
            //Efetuar alteração na BD, está só a mostrar a passagem dos dados
            Swal.fire(`
              Antiga: ${result.value.passwordAntinga}
              Nova: ${result.value.passwordNova}
            `.trim())
        })
    }
    const Eliminar = () => {
        Swal.fire({
            title: "Tem a certeza que deseja eliminar a sua conta ?",
            text: "Esta ação NÃO é regressível!",
            showCancelButton: true,
            confirmButtonText: "Sim",
            cancelButtonColor: "#C51616",
            confirmButtonColor: '#39C516',
            cancelButtonText: "Não",
            icon: "warning"
        }).then((result) => {
            if (result.value) {
                Swal.fire({
                    title: 'Confirme a eliminação da sua conta',
                    html: `<label> Escreva em letras maiúsculas <b>“CONFIRMO”<b> </label>
                    <input type="text" id="confirmacao" class="swal2-input" placeholder="Password Antiga">`,
                    confirmButtonText: 'Confirmar',
                    cancelButtonText: "Cancelar",
                    cancelButtonColor: "#C51616",
                    confirmButtonColor: '#39C516',
                    focusConfirm: false,
                    preConfirm: () => {
                        const confirmacao = Swal.getPopup().querySelector('#confirmacao').value
                        if (!confirmacao || confirmacao != "CONFIRMO") {
                            Swal.showValidationMessage(`Tem que introduzir a palavra corretamente`)
                        }
                        return { confirmacao: confirmacao }

                    }
                }).then((result) => {
                    if (result.value) {
                        //Efetuar alteração na BD

                    }

                    else if (result.dismiss === Swal.DismissReason.cancel) {
                        Swal.fire({ title: "Cancelada", text: "Eliminação Abortada!", icon: "error", confirmButtonColor: '#00B8E0', });
                    }

                })
            } else if (result.dismiss === Swal.DismissReason.cancel) {
                Swal.fire({ title: "Cancelada", text: "Eliminação Abortada!", icon: "error", confirmButtonColor: '#00B8E0', });
            }
        });
    }

    return (
        <div>
            <div className="container-fluid d-flex align-items-center justify-content-center py-5" style={{ backgroundColor: '#D9D9D9', }}>
                <div className="rounded p-4 bg-light my-3" style={{ width: '85%' }}>
                    <div class='row pt-3'>
                        <div class="col-md-6 form-group pt-2 px-5">
                            <label class="d-flex align-items-center justify-content-center pb-1" for="inputNome">Primeiro e Último Nome</label>
                            <input class="form-control shadow-none " id="inputNome" placeholder="O seu nome" disabled></input>
                        </div>
                        <div class="col-md-6 form-group pt-2 px-5">
                            <label class="d-flex align-items-center justify-content-center pb-1" for="inputData">Data de Nascimento</label>
                            <input class="form-control shadow-none " id="inputData" placeholder="A sua data de nascimento" disabled></input>
                        </div>
                        <div class="col-md-6 form-group pt-4 px-5">
                            <label class="d-flex align-items-center justify-content-center pb-1" for="inputData">Email</label>
                            <input class="form-control shadow-none " id="inputEmail" placeholder="O seu email" value={Email}
                                onChange={(event) => setEmail(event.target.value)}></input>
                        </div>
                        <div class="col-md-6 form-group pt-4 px-5">
                            <label class="d-flex align-items-center justify-content-center pb-1" for="inputData">Telemóvel</label>
                            <input class="form-control shadow-none " id="inputTelemovel" placeholder="O seu Nº de Telemóvel" value={Telefone}
                                onChange={(event) => setTelefone(event.target.value)}></input>
                        </div>
                        <div class="col-md-6 form-group pt-4 px-5">
                            <label class="d-flex align-items-center justify-content-center pb-1" for="inputData">Morada</label>
                            <input class="form-control shadow-none " id="inputTelemovel" placeholder="A sua Morada" value={Morada}
                                onChange={(event) => setMorada(event.target.value)}></input>
                        </div>
                        <div class="col-md-6 form-group pt-4 px-5">
                            <label class="d-flex align-items-center justify-content-center pb-1" for="inputLocalidade">Localidade</label>
                            <select id="inputLocalidade" class="form-select shadow-none " value={Localidade}
                                onChange={(event) => setLocalidade(event.target.value)}>
                                    //TO-DO: Ir buscar as localidades de forma dinamica
                                <option value="Web">Viseu</option>
                                <option value="Cloud">Lisboa</option>
                            </select>
                        </div>
                    </div>
                    <div class='row pt-3'>
                        <div class="py-3 px-5 text-center d-flex justify-content-center">
                            <div className='col '>
                                <button type="submit" class="btn btn-success btn-block btn-lg text-white px-5 py-3" onClick={Send}>Confirmar Alterações</button>
                            </div>
                            <div className='col '>
                                <button type="button" class="btn btn-secondary btn-block btn-lg text-white px-5 py-3" onClick={Alterar}>Alterar Password</button>
                            </div>
                            <div className='col '>
                                <button type="button" class="btn btn-danger btn-lg btn-block text-white px-5 py-3" onClick={Eliminar}>Eliminar a minha Conta</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );


};



export default FormMinhaConta;

