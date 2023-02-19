
import {useHttp} from '../../hooks/http.hook';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { heroesFetching, heroesFetched, heroesFetchingError, heroDelete } from '../../actions';
import HeroesListItem from "../heroesListItem/HeroesListItem";
import Spinner from '../spinner/Spinner';

const HeroesList = () => {
    const {heroes, heroesLoadingStatus} = useSelector(state => state);
    const dispatch = useDispatch();
    const {serverComm} = useHttp();

    useEffect(() => {
        dispatch(heroesFetching());
        serverComm(`http://localHost:3001/heroes`, 'GET')
            .then(data => dispatch(heroesFetched(data)))
            .catch(() => dispatch(heroesFetchingError()))

        // eslint-disable-next-line
    }, []);

    if (heroesLoadingStatus === "loading") {
        return <Spinner/>;
    } else if (heroesLoadingStatus === "error") {
        return <h5 className="text-center mt-5">Ошибка загрузки</h5>
    }

    const onDelete = id => { 
        serverComm(`http://localHost:3001/heroes/${id}`, 'DELETE')
        .then(dispatch(heroDelete(id)))
        
    }

    const renderHeroesList = (arr) => {
        if (arr.length === 0) {
            return <h5 className="text-center mt-5">Героев пока нет</h5>
        }

        return arr.map(({id, ...props}) => {
            return <HeroesListItem key={id} onDelete={() => onDelete(id)} {...props} />
        })
    }

    const elements = renderHeroesList(heroes);
    return (
        <ul         
        className="maincontent"> 
            {elements}
        </ul>
    )
}

export default HeroesList;