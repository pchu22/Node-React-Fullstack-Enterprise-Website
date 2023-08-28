import React, { useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import './App.css';

import Welcome from './views/welcome'

import Homepage from './views/homepage';

import Login from './views/login';
import PrimeiroLogin from "./views/primeiroLogin";
import Signup from './views/signup';
import AtivarConta from "./components/auth/verificarEmail";
import RecoverAccount from "./views/recoverAccount";
import ResetPassword from "./views/resetPassword";
import Perfil from "./views/perfil";

import AreaAdministrativa from './views/area-administrativa/list'
import UpdateUser from './views/area-administrativa/users/updateUser'
import CreateUser from "./views/area-administrativa/users/createUser";
import CreateFilial from "./views/area-administrativa/filiais/createFilial";
import UpdateFilial from "./views/area-administrativa/filiais/updateFilial";
import CreateDepartamento from "./views/area-administrativa/departamentos/createDepartamento";
import UpdateDepartamento from "./views/area-administrativa/departamentos/updateDepartamento";

import TipoProjeto from './views/tipos-projeto/listTipoProjeto';
import CreateTipoProjeto from './views/tipos-projeto/createTipoProjeto';
import UpdateTipoProjeto from './views/tipos-projeto/updateTipoProjeto';

import AreaNegocio from './views/areas-negocio/listAreaNegocio';
import CreateAreaNegocio from './views/areas-negocio/createAreaNegocio';
import UpdateAreaNegocio from './views/areas-negocio/updateAreaNegocio';

import Reporting from "./views/reporting";

import Vagas from './views/vagas/listVaga'
import CreateVaga from "./views/vagas/createVaga";
import UpdateVaga from "./views/vagas/updateVaga";

import Candidaturas from "./views/candidaturas/listCandidatura";
import Candidatar from "./views/candidaturas/candidatar";
import Referenciar from "./views/candidaturas/referenciar";
import UpdateCandidatura from "./views/candidaturas/updateCandidatura";

import Beneficios from './views/beneficios/listBeneficio'
import CreateBeneficio from "./views/beneficios/createBeneficio";
import UpdateBeneficio from "./views/beneficios/updateBeneficio";

import Ideias from './views/ideias/listIdeia'
import CreateIdeia from "./views/ideias/createIdeia";
import UpdateIdeia from "./views/ideias/updateIdeia";

import Oportunidade from "./views/oportunidades/listOportunidade"

import CreateInvestimento from "./views/oportunidades/investimentos/createInvestimento"
import UpdateInvestimento from "./views/oportunidades/investimentos/updateInvestimento"

import CreateNegocio from "./views/oportunidades/negocios/createNegocio"
import UpdateNegocio from "./views/oportunidades/negocios/updateNegocio"

import CreateParceria from "./views/oportunidades/parcerias/createParceria"
import UpdateParceria from "./views/oportunidades/parcerias/updateParceria"

import CreateProjeto from "./views/oportunidades/projetos/createProjeto"
import UpdateProjeto from "./views/oportunidades/projetos/updateProjeto"

import Calendario from "./views/calendario/calendario";
import CreateEvento from "./views/calendario/createEvento";
import UpdateEvento from "./views/calendario/updateEvento";

const App = () => {

  return (
      <Router>
        <Routes>
          <Route path="/" element={<Welcome/>} />

          <Route path="/login" element={<Login />} />
          <Route path="/primeiro-login/:userId" element={<PrimeiroLogin />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/recover" element={<RecoverAccount />} />
          <Route path='/ativacao/:verificationToken' element={<AtivarConta />} />
          <Route path="/forgot-password" element={<RecoverAccount />} />
          <Route path="/recuperacao/:recoverToken" element={<ResetPassword />} />
          <Route path="/perfil" element={<Perfil/>} />

          <Route path="/reporting" element={<Reporting />} />

          <Route path="/homepage" element={<Homepage />} />

          <Route path='/area-administrativa' element={<AreaAdministrativa />} />
          <Route path='/user/update/:userId' element={<UpdateUser />} />
          <Route path='/user/create' element={<CreateUser />} />
          <Route path='/filial/create' element={<CreateFilial />} />
          <Route path='/filial/update/:filialId' element={<UpdateFilial />} />
          <Route path='/departamento/create' element={<CreateDepartamento />} />
          <Route path='/departamento/update/:departamentoId' element={<UpdateDepartamento />} />

          <Route path='/tipo-projeto' element={<TipoProjeto />} />
          <Route path='/tipo-projeto/create' element={<CreateTipoProjeto />} />
          <Route path='/tipo-projeto/update/:tipoProjetoId' element={<UpdateTipoProjeto />} />

          <Route path='/area-negocio' element={<AreaNegocio />} />
          <Route path='/area-negocio/create' element={<CreateAreaNegocio />} />
          <Route path='/area-negocio/update/:areaNegocioId' element={<UpdateAreaNegocio />} />

          <Route path='/vaga' element={<Vagas />} />
          <Route path='/vaga/create' element={<CreateVaga />} />
          <Route path='/vaga/update/:vagaId' element={<UpdateVaga />} />

          <Route path='/candidatura' element={<Candidaturas />} />
          <Route path='/candidatura/update/:candidaturaId' element={<UpdateCandidatura />} />
          <Route path='/candidatar/:vagaId' element={<Candidatar />} />
          <Route path='/referenciar/:vagaId' element={<Referenciar />} />

          <Route path='/beneficio' element={<Beneficios />} />
          <Route path='/beneficio/create' element={<CreateBeneficio />} />
          <Route path='/beneficio/update/:beneficioId' element={<UpdateBeneficio />} />

          <Route path='/ideia' element={<Ideias />} />
          <Route path='/ideia/create' element={<CreateIdeia />} />
          <Route path='/ideia/update/:ideiaId' element={<UpdateIdeia />} />

          <Route path='/oportunidade' element={<Oportunidade />} />

          <Route path='/oportunidade/investimento/create' element={<CreateInvestimento />} />
          <Route path='/oportunidade/investimento/update/:investimentoId' element={<UpdateInvestimento />} />

          <Route path='/oportunidade/negocio/create' element={<CreateNegocio />} />
          <Route path='/oportunidade/negocio/update/:negocioId' element={<UpdateNegocio />} />

          <Route path='/oportunidade/parceria/create' element={<CreateParceria />} />
          <Route path='/oportunidade/parceria/update/:parceriaId' element={<UpdateParceria />} />

          <Route path='/oportunidade/projeto/create' element={<CreateProjeto />} />
          <Route path='/oportunidade/projeto/update/:projetoId' element={<UpdateProjeto />} />

          <Route path='/calendario' element={<Calendario />} />
          <Route path='/evento/create/:dataSelecionada?/:userIdCriador?' element={<CreateEvento />} />
          <Route path='/evento/update/:eventoId' element={<UpdateEvento />} />

        </Routes>
      </Router>
  );
}

export default App;