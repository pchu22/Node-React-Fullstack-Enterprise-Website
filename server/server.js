const express = require('express');
const app = express();
const cors = require('cors');
const keys = require('./src/config/secret')
const cookieSession = require('cookie-session')
const passport = require('passport')
const passportSetup = require('./src/config/passport-setup');
//Configurações
app.set('port', process.env.PORT || 8080);

//Middlewares
app.use(express.json());
app.use(express.urlencoded({extended:false}));
app.use(cors());
app.use(cookieSession({
  maxAge: 24 * 60 * 60 * 1000,
  keys:[keys.session.cookieKey]
}));

//initialize passport
app.use(passport.initialize());
app.use(passport.session());

//Rotas
const userRoute = require('./src/routes/userRoute');
const authRoute = require('./src/routes/authRoute');
const cargoRoute = require('./src/routes/cargoRoute');
const departamentoRoute = require('./src/routes/departmentoRoute');
const filialRoute = require('./src/routes/filialRoute');
const vagaRoute = require('./src/routes/vagaRoute');
const candidaturaRoute = require('./src/routes/candidaturaRoute');
const beneficioRoute = require('./src/routes/beneficioRoute');
const ideiaRoute = require('./src/routes/ideiaRoute');
const areaNegocioRoute = require('./src/routes/area-negocioRoute');
const negocioRoute = require('./src/routes/negocioRoute');
const investimentoRoute = require('./src/routes/investimentoRoute');
const parceriaRoute = require('./src/routes/parceriaRoute');
const tipoProjetoRoute = require('./src/routes/tipo-projetoRoute');
const projetoRoute = require('./src/routes/projetoRoute');
const estadoRoute = require('./src/routes/estadoRoute');

app.use('/user', userRoute);
app.use('/auth', authRoute);
app.use('/cargo', cargoRoute);
app.use('/departamento', departamentoRoute);
app.use('/filial', filialRoute);
app.use('/vaga', vagaRoute);
app.use('/candidatura', candidaturaRoute);
app.use('/beneficio', beneficioRoute);
app.use('/ideia', ideiaRoute);
app.use('/area-negocio', areaNegocioRoute);
app.use('/negocio', negocioRoute);
app.use('/investimento', investimentoRoute);
app.use('/parceria', parceriaRoute)
app.use('/tipo-projeto', tipoProjetoRoute)
app.use('/projeto', projetoRoute)
app.use('/estado', estadoRoute);

app.use('/',(req,res)=>{
    res.send("Hello World!");
});

const sequelize = require('./src/models/database');
const cargoController = require('./src/controllers/cargoController');
const estadoController = require('./src/controllers/estadoController')

sequelize.sync()
.then(async () => {
  try{
    const cargoExists = await cargoController.cargosDefault();
    const estadoExists = await estadoController.estadosDefault();

    if(cargoExists && estadoExists){
      app.listen(app.get('port'), () => {
        console.log("Server running on port " + app.get('port'));
      }); 
    } else {
      console.log("Impossível iniciar o servidor, os cargos \"default\" não foram criados...");
      console.log("Impossível iniciar o servidor, os estados \"default\" não foram criados...");

    }
  } catch (err) {
    console.error("Erro ao criar os cargos \"default\": ", err);
    console.error("Erro ao criar os estados \"default\": ", err);
  }
}) .catch((err) => {
  console.error("Erro ao sincronizar os modelos sequelize: ", err);
});