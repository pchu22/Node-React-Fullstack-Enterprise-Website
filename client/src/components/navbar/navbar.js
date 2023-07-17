import './navbar.css'

const Navbar = ({ sidebarOpen, openSidebar }) => {
    const currentPage = getCurrentPage();

    function getCurrentPage() {
        const { pathname } = window.location;
        if (pathname === '/oportunidade') {
            return 'oportunidade';
        } else if (pathname === '/vaga') {
            return 'vaga';
        } else if (pathname === '/ideia') {
            return 'ideia';
        } else if (pathname === '/beneficio') {
            return 'beneficio';
        } else {
            return '';
        }
    }

    return (
        <nav className="navbar">
            <div className="nav-icon" onClick={openSidebar}>
                {!sidebarOpen && (
                    <span className="bi bi-list" aria-hidden="true" />
                )}
            </div>
            <div className="navbar-left">
                <a href="/oportunidade" className={currentPage === 'oportunidade' ? 'active-link' : ''}>Oportunidades</a>
                <a href="/vaga" className={currentPage === 'vaga' ? 'active-link' : ''}>Vagas/Ofertas</a>
                <a href="/ideia" className={currentPage === 'ideia' ? 'active-link' : ''}>Ideias</a>
                <a href="/beneficio" className={currentPage === 'beneficio' ? 'active-link' : ''}>Benefícios</a>
            </div>
            {/*<div className="navbar-right">
                <a href="/">
                    <span className="bi bi-bell-fill" />
                </a>
                <a href="/">
                    <span className="bi bi-search" />
                </a>
                <a href="/">
                    <img width="30" src="" alt="Avatar"></img>
                </a>
            </div*/}
        </nav>
    )
}

export default Navbar