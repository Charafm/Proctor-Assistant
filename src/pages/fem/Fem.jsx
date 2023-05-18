import './fem.scss';
import Sidebar from '../../components/sidebar/Sidebar';
import Navbar from '../../components/navbar/Navbar';
import Widget from '../../components/widget/Widget';
import FileUploader from '../../components/dragdrop/FileUploader';
const Fem = () => {
	return (
		<div className="fem">
			<Sidebar />
			<div className="femContainer">
				<Navbar />
				<div className="widgets">
					<Widget />
				</div>
				<div className="FileUploader">
					<FileUploader />
				</div>
			</div>
		</div>
	);
};

export default Fem;
