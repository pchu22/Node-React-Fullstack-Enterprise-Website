import 'bootstrap/dist/css/bootstrap.min.css';

const Barra_Titulo = ({ nomeImg, titulo, subtitulo }) => {

    const imagem = (require(`../img/${nomeImg}.png`))
    return (
        <div className="text-white py-5" style={{
            backgroundImage: `url(${imagem})`,
            backgroundRepeat: "no-repeat",
            backgroundSize: "cover",
        }}>
            <div className="container">
                <div className="d-flex justify-content-start align-items-center">
                    <div>
                        <h1 className='font-weight-bold '>{titulo}</h1>
                        {subtitulo}
                    </div>
                </div>
            </div>
        </div>
    );


};


export default Barra_Titulo;