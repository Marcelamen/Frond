import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Login } from '../pages/login';
import { UserConfig } from '../pages/UserConfig';
import { Layout } from '../pages/Layout';
import { ChangePwByMail } from "../components/LoginComponent/ChangePwByMail";
import { Dashboard } from '../pages/Dashboard';
import { ChangeImage } from '../components/EditUser/ChangeImage';

const MyRoutes = () => {
	return(
		<BrowserRouter>
			<Routes>
				<Route path="login" element={ <Login /> } />
				<Route path='/' element={ <Layout/> }>
				<Route path='tablero' element={ <Dashboard/> }/>
					
					<Route path='editar_perfil' element={ <UserConfig/> }/>
					<Route path='actualizar_avatar' element={<ChangeImage/>}/>
				</Route>
				<Route path="forgotPw/:token/:id" element={<ChangePwByMail/>}/>
			</Routes>
		</BrowserRouter>
	);
};


export { MyRoutes };