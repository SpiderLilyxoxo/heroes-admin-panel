import { useSelector, useDispatch } from 'react-redux';
import { elementsFilter, heroesFetched } from '../../actions';
import { useEffect } from 'react';
import {useHttp} from '../../hooks/http.hook';
import classNames from 'classnames';
// Задача для этого компонента:
// Фильтры должны формироваться на основании загруженных данных
// Фильтры должны отображать только нужных героев при выборе
// Активный фильтр имеет класс active
// Изменять json-файл для удобства МОЖНО!
// Представьте, что вы попросили бэкенд-разработчика об этом

const HeroesFilters = () => {
    const { serverComm } = useHttp();
    const {filters, filterElements } = useSelector(state => state);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(elementsFilter());
        serverComm(`http://localHost:3001/filterElements`, 'GET')
            .then(dispatch(elementsFilter("all")))
            .catch(() => console.log("error"))

        // eslint-disable-next-line
    }, []);

    const renderElements = (arr) => {

        return arr.map(item => {
            const itemValue = (item) => {
                switch (item) {
                    case "all":
                        return "Все "
                    case "fire":
                        return "Огонь"
                    case "water":
                        return "Вода"
                    case "wind":
                        return "Воздух"
                    case "earth":
                        return "Земля"
                    default: return item
                }
            }

            const activeBtn = filters.filter(item => item === filterElements);

            const itemNames = itemValue(item)
            let btnClass = classNames('btn', 
                {
                    "btn-outline-dark": item === "all",
                    "btn-danger": item === "fire",
                    "btn-primary": item === "water",
                    "btn-secondary": item === "wind",
                    "btn-success": item === "earth",
                });

            return <button  className={`${btnClass} ${activeBtn == item ? "active" : ""}`} value={item} key={item} onClick={() => filterByElement(item)}>{itemNames}</button>
        })
    }

    const filterByElement = async (value) => {
        await serverComm(`http://localHost:3001/heroes`, 'GET')
                .then(data => dispatch(heroesFetched(data)))
                .catch(() => console.log("error"))

        switch (value) {
            case "all": 
                dispatch(elementsFilter("all"));
                break
            case "fire":
                dispatch(elementsFilter("fire"));
                break
            case "water":
                dispatch(elementsFilter("water"));
                break
            case "wind":
                dispatch(elementsFilter("wind"));
                break
            case "earth":
                dispatch(elementsFilter("earth"));
                break
            default:
                return filters
        }
    }
    
    const elements = renderElements(filters);

    return (
        <div className="card shadow-lg mt-4">
            <div className="card-body">
                <p className="card-text">Отфильтруйте героев по элементам</p>
                <div className="btn-group">
                    {elements}
                </div>
            </div>
        </div>
    )
}

export default HeroesFilters;