import { Link } from 'react-router-dom';
import "./buttons.css"

interface PrimaryButtonProps {
    to: string;
    value: string;
    onSubmit?: () => void;
  }

const PrimaryButton: React.FC<PrimaryButtonProps> = ({value, to, onSubmit}) => {
    return (
        <div className="">
            <Link to={to} onSubmit={onSubmit} className="primary-button" >
                {value}
            </Link>
        </div>
    );
};

const SecondaryButton: React.FC = () => {
    return (
        <div className="">
            <div className="">
                <Link to="/add-book">
                    <p>secondary button</p>
                </Link>
            </div>
        </div>
    );
};

const TertiaryButton: React.FC = () => {
    return (
        <div className="">
            <div className="">
                <Link to="/add-book">
                    <p>tertiary button</p>
                </Link>
            </div>
        </div>
    );
};

export { PrimaryButton, SecondaryButton, TertiaryButton };
