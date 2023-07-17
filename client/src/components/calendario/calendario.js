import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';
import { Link } from 'react-router-dom';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from "@fullcalendar/interaction";
import './calendario.css';

const baseURL = 'https://softinsa-web-app-carreiras01.onrender.com';

export default function Calendario() {
    const [cargo, setCargo] = useState('');
    const [eventos, setEventos] = useState([]);
    const calendarRef = useRef(null);

    useEffect(() => {
        loadUserCargo();
        loadEventos();
    }, [cargo]);

    function loadUserCargo() {
        const userId = localStorage.getItem('userId');
        const urlCargo = baseURL + '/user/get/' + userId;

        axios.get(urlCargo)
            .then((res) => {
                if (res.data.success) {
                    console.log(res.data.data.cargo.cargoId);
                    setCargo(res.data.data.cargo.cargoId);
                } else {
                    Swal.fire({
                        icon: 'error',
                        title: 'Error Web Service',
                        text: 'Erro ao carregar o cargo do utilizador!'
                    });
                }
            }).catch((err) => {
                alert('Error: ' + err.message);
            });
    }

    function loadEventos() {
        const urlEventos = baseURL + '/evento/list';

        axios.get(urlEventos)
            .then((res) => {
                if (res.data.success) {
                    const data = res.data.data;
                    console.log(data);

                    const transformedEvento = data.map((evento) => {
                        console.log(evento.eventoId); // Log the eventoId property
                        return {
                            title: evento.titulo,
                            start: evento.dataInicio,
                            extendedProps: {
                                descricao: evento.descricao,
                                tipo: evento.tipo,
                                notas: evento.notas,
                                eventoId: evento.eventoId
                            }
                        };
                    });
                    setEventos(transformedEvento);
                } else {
                    Swal.fire({
                        icon: 'error',
                        title: 'Error Web Service',
                        text: 'Erro ao carregar a lista de eventos!'
                    });
                }
            }).catch((err) => {
                alert('Error: ' + err.message);
            });
    }

    const handleEventClick = (eventClickInfo) => {
        const { event } = eventClickInfo;

        Swal.fire({
            title: event.title,
            html: `
                <strong>Descrição:</strong> ${event.extendedProps.descricao}<br/>
                <strong>Tipo de evento:</strong> ${event.extendedProps.tipo}<br/>
                <strong>Hora de Início:</strong> ${convertHora(event.start)}<br/>
                <strong>Hora de Término:</strong> ${convertHora(event.end)}<br/>
                <strong>Notas adicionais:</strong> ${event.extendedProps.notas ? event.extendedProps.notas : 'Não existem apontamentos acerca deste evento'}
            `,
            showCancelButton: true,
            confirmButtonText: 'Apagar',
            confirmButtonColor: '#ff0000',
            cancelButtonText: 'Fechar',
            showLoaderOnConfirm: true,
            preConfirm: () => {
                const deleteURL = baseURL + '/evento/delete';
                const datapost = {
                    eventoId: event.extendedProps.eventoId
                };
                console.log("axios: ", datapost)
                return axios.post(deleteURL, datapost)
                    .then((res) => {
                        if (res.data.success) {
                            Swal.fire({
                                icon: 'success',
                                title: 'Ação executada com sucesso!',
                                text: 'O evento foi apagado com sucesso!'
                            });
                            return Promise.resolve();
                        } else {
                            Swal.fire({
                                icon: 'error',
                                title: 'Error Web Service',
                                text: 'Erro ao apagar o evento!'
                            });
                            return Promise.reject();
                        }
                    })
                    .catch((err) => {
                        alert('Error: ' + err);
                    });
            }
        }).then((result) => {
            if (result.isConfirmed) {
                event.remove();
                Swal.fire({
                    icon: 'success',
                    title: 'Ação executada com sucesso',
                    text: 'O evento foi apagado.'
                });
            }
        });
    };

    function convertHora(fulldate) {
        const data = new Date(fulldate);
        const timeString = data.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
        return timeString;
    }

    return (
        <main className='main-calendario'>
            <div className="container container-calendario">
                <div className="col-md-12">
                    <div className="mb-3 mt-3">
                        {cargo === 1 ? (
                            <Link to="/evento/create" className="btn btn-outline-success" style={{ marginBottom: "10px" }}>
                                <span className='bi bi-plus-circle' />
                            </Link>
                        ) : null}
                        <div className='calendario-bg'>
                            <FullCalendar
                                className="calendario"
                                plugins={[dayGridPlugin, interactionPlugin]}
                                initialView="dayGridMonth"
                                editable={true}
                                headerToolbar={{
                                    left: 'prev,next today',
                                    center: 'title',
                                    right: 'dayGridMonth,dayGridWeek,dayGridDay'
                                }}
                                events={eventos}
                                eventClick={handleEventClick}
                            />
                        </div>
                    </div>
                </div>
            </div>
        </main>
    );
}
