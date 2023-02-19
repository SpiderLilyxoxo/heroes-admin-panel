import { useState, useEffect } from 'react';
import {useHttp} from '../../hooks/http.hook';
import { useDispatch } from 'react-redux';
import { heroAdd } from '../../actions';

import { useSelector } from 'react-redux';

import { elementsFetched } from '../../actions';

const HeroesAddForm = () => {
    const { serverComm } = useHttp();
    const {filters} = useSelector(state => state);
    let heroID = crypto.randomUUID()
    const [info, setInfo] = useState({
        id: heroID,
        name: "",
        description: "",
        element: ""
    })

    useEffect(() => {
        serverComm(`http://localHost:3001/filters`, 'GET')
            .then(elems => dispatch(elementsFetched(elems)))
            .catch(() => console.log("error"))

        // eslint-disable-next-line
    }, []);


    const dispatch = useDispatch();

    const onValueChange = (e) => {
        setInfo({
            ...info,
            [e.target.name]: e.target.value
        })
    }
    
    const  handleSubmit = (e) => {
        e.preventDefault()

        setInfo({
            ...info,
            id: heroID
        })

        serverComm(`http://localhost:3001/heroes/`, 'POST', JSON.stringify(info))
        .then(dispatch(heroAdd(info)))
    }

    const renderElements = (arr) => {

        return arr.map(item => {
            const itemValue = (item) => {
                switch (item) {
                    case "all":
                        return "Без элемента"
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

            const itemNames = itemValue(item)
            return <option value={item} key={item}>{itemNames}</option>
        })
    }

    const elements = renderElements(filters);

    return (
        <form className="border p-4 shadow-lg rounded" onSubmit={handleSubmit}>
            <div className="mb-3">
                <label htmlFor="name" className="form-label fs-4" >Имя нового героя</label>
                <input 
                    required
                    type="text" 
                    name="name" 
                    className="form-control" 
                    id="name" 
                    placeholder="Как меня зовут?"
                    onChange={onValueChange}
                    />
            </div>

            <div className="mb-3">
                <label htmlFor="text" className="form-label fs-4" >Описание</label>
                <textarea
                    required
                    name="description" 
                    className="form-control" 
                    id="text" 
                    placeholder="Что я умею?"
                    style={{"height": '130px'}}
                    onChange={onValueChange}
                    />
            </div>

            <div className="mb-3">
                <label htmlFor="element" className="form-label" >Выбрать элемент героя</label>
                <select 
                    required
                    className="form-select" 
                    id="element" 
                    name="element"
                    onChange={onValueChange}>
                    {elements}
                </select>
            </div>

            <button type="submit" className="btn btn-primary">Создать</button>
        </form>
    )
}

export default HeroesAddForm;