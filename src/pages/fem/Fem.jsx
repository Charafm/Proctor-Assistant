import './fem.scss';
import Sidebar from '../../components/sidebar/Sidebar';

import Widget from '../../components/widget/Widget';

const Fem = () => {
	return (
		<div className="fem">
			<Sidebar />

			<div className="femContainer">
				<div className="widgets">
					<Widget />
				</div>
			</div>
		</div>
	);
};

export default Fem;
