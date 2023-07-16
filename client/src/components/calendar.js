import React from 'react'
import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'
import interactionPlugin from "@fullcalendar/interaction"

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
        <main className='main-beneficios'>
            <div style={{ width: "800px" }}>
                <FullCalendar
                    plugins={[dayGridPlugin, interactionPlugin]}
                    dateClick={handleDateClick}
                    initialView="dayGridMonth"
                    weekends={false}
                    eventContent={renderEventContent}
                />
            </div>
        </main>
    );
}
