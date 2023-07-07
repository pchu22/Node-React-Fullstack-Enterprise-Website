import 'bootstrap/dist/css/bootstrap.min.css';
import { useState, React } from "react";
import Swal from "sweetalert2"

{/*TO-DO Fazer isto*/}
const FormAdicionarParceria = () => {

    const [Titulo, setTitulo] = useState("");
    const [Descricao, setDescricao] = useState("");
    const [Beneficios, setBeneficios] = useState("");
    const [Requisitos, setRequisitos] = useState("");

    const Send = () => {
        if (Titulo === "") {
            Swal.fire({
                title: "Insira um título!",
                confirmButtonColor: '#00B8E0',
            });
        } else if (Descricao === "") {
            Swal.fire({
                title: "Insira uma descrição!",
                confirmButtonColor: '#00B8E0',
            });
        } else if (Beneficios === "") {
            Swal.fire({
                title: "Insira beneficios da parceria!",
                confirmButtonColor: '#00B8E0',
            });
        } else if (Requisitos === "") {
            Swal.fire({
                title: "Insira requisitos da parceria!",
                confirmButtonColor: '#00B8E0',
            });
        } else if (!document.getElementById("checkTermos").checked) {
            Swal.fire({
                title: "É necessário concordar com os termos de utilização!",
                confirmButtonColor: '#00B8E0',
            });

        } else {
            Swal.fire({
                title: "Tem a certeza?",
                text: "Deseja adicionar este negócio",
                showCancelButton: true,
                confirmButtonText: "Sim, adicionar!",
                confirmButtonColor: '#00B8E0',
                cancelButtonText: "Não, voltar atrás",
                icon: "question"

            }).then((result) => {
                if (result.value) {
                    //Adicionar código de registo da Oportunidade
                    Swal.fire({
                        icon: "success",
                        title: 'Negócio adicionado com sucesso!',
                        html: 'Será redirecionado para a página deste.',
                        timer: 5000,
                        timerProgressBar: true,
                        confirmButtonColor: '#00B8E0',
                    }).then(() => {
                        //Dar redirect para a página do negócio 
                    })
                } else if (result.dismiss === Swal.DismissReason.cancel) {
                    Swal.fire({ title: "Cancelado", text: "O negócio não foi adicionado!", icon: "error", confirmButtonColor: '#00B8E0', });
                }
            });
        }
    };
    return (
        <div>
            <div className="container-fluid d-flex align-items-center justify-content-center py-5" style={{ backgroundColor: '#D9D9D9', }}>
                <div className="rounded p-4 bg-light my-3" style={{ width: '85%' }}>
                    <div class="form-group px-5 " >
                        <label class="d-flex align-items-center justify-content-center pb-1" for="inputTitulo ">Título</label>
                        <input type="text" class="form-control shadow-none mb-2" id="inputTitulo" placeholder="Título" value={Titulo}
                            onChange={(event) => setTitulo(event.target.value)} />
                    </div>
                    <div class="form-group pt-2 px-5">
                        <label class="d-flex align-items-center justify-content-center pb-1" for="textAreaDescricao ">Descrição</label>
                        <textarea class="form-control shadow-none" id="textAreaDescricao" rows="10" placeholder="Descrição" value={Descricao}
                            onChange={(event) => setDescricao(event.target.value)} />
                    </div>
                    <div class='row pt-3'>
                        <div class="col-md-6 form-group pt-2 px-5">

                        </div>
                    </div>
                    <div className='mx-auto pb-3 pt-2' style={{ width: '50%' }}>
                        <label for="formFile" class="form-label d-flex align-items-center justify-content-center pt-3">Anexar material relevante (fotos, esquemas, documentos)</label>
                        <input class="form-control shadow-none" id="formFile" type="file" />
                    </div>
                    <hr className=' pb-5' />
                    <div class='row pb-4'>

                        <div class="col-md-6 form-check px-5 d-flex align-items-center justify-content-center">
                            <input class="form-check-input bg-secondary mx-1 shadow-none" type="checkbox" id="checkTermos" />
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



export default FormAdicionarParceria;