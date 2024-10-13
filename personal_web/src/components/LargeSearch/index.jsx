import './largesearch.css';
import { useNavigate } from 'react-router-dom';
import { createSearchParams } from 'react-router-dom';

function LargeSearch() {
    const navigate = useNavigate();

    const onEnter = (e) => {
        if (e.key === 'Enter') {
            navigate({
                pathname: '/' + e.target.value
            });
        }
    }

    return (
    <div id="largesearch">
        <input 
            type="text" 
            id="largesearch_input" 
            placeholder="Translation..."
            onKeyDown={onEnter}
            maxLength={255}
        />
    </div>

    );
}

export default LargeSearch;