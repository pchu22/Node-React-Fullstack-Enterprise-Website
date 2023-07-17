import React, { useState, useEffect } from 'react'

import axios from 'axios';
import Swal from 'sweetalert2';
import { Link } from 'react-router-dom';

import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'
import interactionPlugin from "@fullcalendar/interaction"

import './calendario.css'

const baseURL = 'https://softinsa-web-app-carreiras01.onrender.com';

export default function Calendario() {
    const [cargo, setCargo] = useState('');

    useEffect(() => {
        loadUserCargo();
    }, [cargo]);

    const handleDateClick = (arg) => {
        alert(arg.dateStr);
    }

    function renderEventContent(eventInfo) {
        return (
            <>
                <b>{eventInfo.timeText}</b>
                <i>{eventInfo.event.title}</i>
            </>
        )
    }


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

    return (
        <main className='main-calendario'>
            <div className="container container-calendario">
                <h1 className="mt-5 mb-5"><br /></h1>
                <div className="col-md-12">
                    <div className="mb-3 mt-3">
                        {cargo === 1 ? (
                            <Link to="/evento/create" className="btn btn-outline-success">
                                <span className='bi bi-plus-circle' />
                            </Link>
                        ) : null}
                        <div className='calendario-bg'>
                            <FullCalendar
                                plugins={[dayGridPlugin, interactionPlugin]}
                                dateClick={handleDateClick}
                                initialView="dayGridMonth"
                                weekends={false}
                                eventContent={renderEventContent}
                            />
                        </div>
                    </div>
                </div>
            </div>
        </main>
    );
}
