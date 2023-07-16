import React from 'react'
import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'
import interactionPlugin from "@fullcalendar/interaction"
import './calendario.css'
export default function Calendario() {

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

    return (
        <main className='main-calendario'>
            <div className="container container-calendario">
                <h1 className="mt-5 mb-5"><br /></h1>
                <div className="col-md-12">
                    <div className="mb-3 mt-3">
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
