import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import { Link } from 'react-router-dom';

const Item = ({ icon, text, desc }) => {
    return (
        <div className="row d-flex align-text-bottom my-4">
            <div className="col-md-2 rounded-circle bg-primary d-flex justify-content-center align-items-center m-1 " style={{ width: '65px', height: '65px' }}>
                <i className={`bi ${icon} text-white`} style={{ fontSize: '48px' }}></i>
            </div>
            <div className="col-md-10 ">
                <h2 className='font-weight-bold text-primary '>{text}</h2>
                <p className=''>{desc}</p>
            </div>
        </div>
    );
};

const ItemsList = () => {
    const items = [
        { icon: 'bi bi-briefcase-fill', text: 'Oportunidades', desc: 'Inserir e consultar as suas oportunidades de negócio', link: '/oportunidade' },
        { icon: 'bi bi-search', text: 'Vagas/Ofertas', desc: 'Conheça todas as nossas ofertas de recrutamento', link: '/vaga' },
        { icon: 'bi bi-lightbulb-fill', text: 'Ideias', desc: 'Envie-nos a suas ideias e/ou sugestões', link: '/ideia' },
        { icon: 'bi bi-plus-circle-fill', text: 'Benefícios', desc: 'Consulte as vantagens de trabalhar na Softinsa', link: '/beneficio' },
        { icon: 'bi bi-calendar2-week-fill', text: 'Calendário', desc: 'Veja os seus próximos eventos/reuniões', link: '/calendario' },
        { icon: 'bi bi-person-fill', text: 'Os meus dados', desc: 'Alterar os seus dados pessoais', link: '/perfil' },
    ];

    return (
        <div className="container" >
            <div className="row ">
                {items.map((item, index) => (
                    <div className="col-md-4" key={index}>
                        <Link to={item.link} className="text-decoration-none " style={{ color: 'inherit' }}>
                            <Item icon={item.icon} text={item.text} desc={item.desc} />
                        </Link>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default ItemsList;
