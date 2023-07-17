import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';
import { Link } from 'react-router-dom';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';
import './calendario.css';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import bootstrap5Plugin from '@fullcalendar/bootstrap5';

const baseURL = 'https://softinsa-web-app-carreiras01.onrender.com';

export default function Calendario() {
    const [cargo, setCargo] = useState('');
    const [eventos, setEventos] = useState([]);
    const calendarRef = useRef(null);
    const loggedInUser = localStorage.getItem('userId')

    useEffect(() => {
        loadUserCargo();
        loadEventos();
    }, [cargo]);

    function loadUserCargo() {
        const userId = localStorage.getItem('userId');
        const urlCargo = baseURL + '/user/get/' + userId;

        axios
            .get(urlCargo)
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
            })
            .catch((err) => {
                alert('Error: ' + err.message);
            });
    }

    function loadEventos() {
        const urlEventos = baseURL + '/evento/list';

        axios
            .get(urlEventos)
            .then((res) => {
                if (res.data.success) {
                    const data = res.data.data;
                    console.log(data);

                    const transformedEvento = data.map((evento) => {
                        return {
                            title: evento.titulo,
                            start: evento.dataInicio,
                            end: evento.dataFim,
                            extendedProps: {
                                descricao: evento.descricao,
                                tipo: evento.tipo,
                                notas: evento.notas,
                                eventoId: evento.eventoId,
                            },
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
            })
            .catch((err) => {
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
                <strong>Hora de Início:</strong> ${formattedDate(
                event.start
            )}<br/>
                <strong>Hora de Término:</strong> ${formattedDate(
                event.end
            )}<br/>
                <strong>Notas adicionais:</strong> ${event.extendedProps.notas
                    ? event.extendedProps.notas
                    : 'Não existem apontamentos acerca deste evento'
                }
            `,
            showCancelButton: true,
            confirmButtonText: 'Apagar',
            confirmButtonColor: '#ff0000',
            cancelButtonText: 'Fechar',
            showLoaderOnConfirm: true,
            preConfirm: () => {
                const deleteURL = baseURL + '/evento/delete';
                const datapost = {
                    eventoId: event.extendedProps.eventoId,
                };
                console.log('axios: ', datapost);
                return axios
                    .post(deleteURL, datapost)
                    .then((res) => {
                        if (res.data.success) {
                            Swal.fire({
                                icon: 'success',
                                title: 'Ação executada com sucesso!',
                                text: 'O evento foi apagado com sucesso!',
                            });
                            return Promise.resolve();
                        } else {
                            Swal.fire({
                                icon: 'error',
                                title: 'Error Web Service',
                                text: 'Erro ao apagar o evento!',
                            });
                            return Promise.reject();
                        }
                    })
                    .catch((err) => {
                        alert('Error: ' + err);
                    });
            },
            footer: cargo === 1 || loggedInUser ? `
                <a href="/evento/update/${event.extendedProps.eventoId}" class="btn btn-outline-warning">Editar</a>
            ` : '',
        }).then((result) => {
            if (result.isConfirmed) {
                event.remove();
                Swal.fire({
                    icon: 'success',
                    title: 'Ação executada com sucesso',
                    text: 'O evento foi apagado.',
                });
            }
        });
    };

    function formattedDate(fulldatetime) {
        const formattedHour = new Date(fulldatetime).toLocaleTimeString([], {
            hour: '2-digit',
            minute: '2-digit',
        });
        const formattedDate = new Date(fulldatetime).toLocaleDateString([], {
            day: '2-digit',
            month: '2-digit',
            year: 'numeric',
        });
        return `${formattedDate}, ${formattedHour}`;
    }

    const eventRender = ({ event }) => {
        const popoverContent = `
            <strong>${event.title}</strong><br/>
            ${formattedDate(event.start)} - ${formattedDate(event.end)}<br/>
            <strong>Descrição:</strong> ${event.extendedProps.descricao}<br/>
            <strong>Tipo de evento:</strong> ${event.extendedProps.tipo}<br/>
            <strong>Notas adicionais:</strong> ${event.extendedProps.notas
                ? event.extendedProps.notas
                : 'Não existem apontamentos acerca deste evento'
            }
        `;

        return {
            ...event,
            title: event.title.length > 20 ? event.title.substring(0, 20) + '...' : event.title,
            extendedProps: {
                ...event.extendedProps,
                popoverContent,
            },
        };
    };

    const eventDidMount = ({ el, event }) => {
        if (event.title.length > 20) {
            const popoverContent = event.extendedProps.popoverContent;
            el.setAttribute('data-bs-toggle', 'popover');
            el.setAttribute('data-bs-trigger', 'hover');
            el.setAttribute('data-bs-html', 'true');
            el.setAttribute('data-bs-content', popoverContent);
        }
    };

    useEffect(() => {
        if (calendarRef.current) {
            const calendarApi = calendarRef.current.getApi();
            calendarApi.setOption('height', 650);
        }
    }, []);

    const dayCellContent = (arg) => {
        return {
            html: `<div class="fc-day-number">${arg.dayNumber}</div>`
        };
    };


    return (
        <main className="main-calendario">
            <div className="container container-calendario">
                <div className="col-md-12">
                    <div
                        className="mb-3 mt-3"
                        style={{
                            alignContent: "center",
                            display: "flex",
                            flexDirection: "column",
                            alignItems: "center"
                        }}
                    >
                        {cargo === 1 ? (
                            <Link
                                to="/evento/create"
                                className="btn btn-outline-success"
                                style={{ marginBottom: "10px" }}
                            >
                                <span className="bi bi-plus-circle" />
                            </Link>
                        ) : null}
                        <div className="calendario-bg">
                            <FullCalendar
                                className="calendario"
                                plugins={[bootstrap5Plugin, dayGridPlugin, interactionPlugin]}
                                initialView="dayGridMonth"
                                themeSystem="bootstrap5"
                                editable={true}
                                headerToolbar={{
                                    left: "prev,next today",
                                    center: "title",
                                    right: "dayGridMonth,dayGridWeek,dayGridDay"
                                }}
                                events={eventos}
                                eventClick={handleEventClick}
                                eventDidMount={eventDidMount}
                                eventRender={eventRender}
                                dayMaxEvents={true}
                                dayMaxEventRows={3}
                                height={650}
                                ref={calendarRef}
                            />
                        </div>
                    </div>
                </div>
            </div>
        </main>
    );
}