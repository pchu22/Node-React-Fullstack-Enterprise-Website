import 'bootstrap/dist/css/bootstrap.min.css';
import { useState, React } from "react";
import Swal from "sweetalert2"


const FormAdicionarIdeia = () => {

    const [Titulo, setTitulo] = useState("");
    const [Descricao, setDescricao] = useState("");
    const [Tipo, setTipo] = useState("");

    const Send = () => {
        if (Tipo === "") {
            Swal.fire({
                title: "Escolha uma categoria!",
                confirmButtonColor: '#00B8E0',
                icon: "warning",
            });
        } else if (Titulo === "") {
            Swal.fire({
                title: "Insira um título!",
                confirmButtonColor: '#00B8E0',
                icon: "warning",
            });
        } else if (Descricao === "") {
            Swal.fire({
                title: "Insira uma descrição!",
                confirmButtonColor: '#00B8E0',
                icon: "warning",
            });
        } else if (!document.getElementById("checkTermos").checked) {
            Swal.fire({
                title: "É necessário concordar com os termos de utilização!",
                confirmButtonColor: '#00B8E0',
                icon: "warning",
            });

        } else {
            Swal.fire({
                title: "Tem a certeza?",
                text: "Deseja sugerir esta Ideia",
                showCancelButton: true,
                confirmButtonText: "Sim, sugerir!",
                confirmButtonColor: '#00B8E0',
                cancelButtonText: "Não, voltar atrás",
                icon: "question"

            }).then((result) => {
                if (result.value) {
                    //Adicionar código de registo da Ideia
                    Swal.fire({
                        icon: "success",
                        title: 'Ideia submitida com sucesso!',
                        html: 'Será redirecionado para a mesma página',
                        timer: 5000,
                        timerProgressBar: true,
                        confirmButtonColor: '#00B8E0',
                    }).then(() => {
                        window.location.href = window.location.href;
                    })
                } else if (result.dismiss === Swal.DismissReason.cancel) {
                    Swal.fire({ title: "Cancelado", text: "A ideia não foi adicionada!", icon: "error", confirmButtonColor: '#00B8E0', });
                }
            });
        }
    };
    return (
        <div>
            <div className="container-fluid d-flex align-items-center justify-content-center py-5" style={{ backgroundColor: '#D9D9D9', }}>
                <div className="rounded p-4 bg-light my-3" style={{ width: '85%' }}>
                    <div class="col-md-4 form-group pt-2 px-5 mx-auto pb-3">
                        <label class="d-flex align-items-center justify-content-center pb-1" for="inputTipo">Categoria</label>
                        <select id="inputTipo" class="form-select shadow-none " value={Tipo}
                            onChange={(event) => setTipo(event.target.value)}>
                            <option value="" selected>Escolha uma categoria:</option>
                            <option value="Sugestão">Sugestão</option>
                            <option value="Ideia">Ideia</option>
                            <option value="Opinião">Opinião</option>
                        </select>
                    </div>
                    <div class="form-group px-5 " >
                        <label class="d-flex align-items-center justify-content-center pb-1" for="inputTitulo ">Título</label>
                        <input type="text" class="form-control shadow-none mb-2" id="inputTitulo" placeholder="Título" value={Titulo}
                            onChange={(event) => setTitulo(event.target.value)} />
                    </div>
                    <div class="form-group pt-2 pb-4 px-5">
                        <label class="d-flex align-items-center justify-content-center pb-1" for="textAreaDescricao ">Descrição</label>
                        <textarea class="form-control shadow-none" id="textAreaDescricao" rows="10" placeholder="Descrição" value={Descricao}
                            onChange={(event) => setDescricao(event.target.value)} />
                    </div>

                    <hr className=' pb-5' />
                    <div class='row pb-4'>
                        <div class="col-md-6 form-check px-5 d-flex align-items-center justify-content-center">
                            <input class="form-check-input mx-1 shadow-none" type="checkbox" id="checkTermos"/>
                            <label class="form-check-label" for="checkTermos">
                                Concordo com as políticas de privacidade da Softinsa
                            </label>
                        </div>
                        <div className='col-md-6 form-group px-5 d-flex align-items-center justify-content-center'>
                            <button type="submit" class="btn btn-secondary btn-lg text-white px-5 py-3" onClick={Send} >ENVIAR</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );


};



export default FormAdicionarIdeia;

