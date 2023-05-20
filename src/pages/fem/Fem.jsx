import './fem.scss';
import Sidebar from '../../components/sidebar/Sidebar';
import Navbar from '../../components/navbar/Navbar';
import Widget from '../../components/widget/Widget';

const Fem = () => {
	return (
		<div className="fem">
			<Sidebar />

			<div className="femContainer">
				<Navbar />
				<div className="widgets">
					<Widget />
				</div>
			</div>
		</div>
	);
};

export default Fem;
