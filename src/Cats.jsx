import React, { useState, useEffect } from 'react'
import styled from 'styled-components'
import axios from 'axios'

function CountryBox(props) {
    let result = props.amount ? `(${props.amount})` : ``
    return (
        <Box onClick={props.onClick}>
            <CatName>{`${props.value} ${result}`}</CatName>
        </Box>
    )
}

export default function Cats() {
    const [myData, setMyData] = useState([])
    const [filteredData, setFilteredData] = useState([])
    const url = 'https://api.thecatapi.com/v1/breeds'
    useEffect(() => {
        axios
            .get(url)
            .then((response) => {
                setMyData(response.data)
                setFilteredData(response.data)
            })
            .catch((error) => {
                console.log(error)
            })
    }, [])
    
    const count = {}
    for (const element of myData) {
        if(count[element.origin] ){
            count[element.origin] += 1
        } else{
            count[element.origin] = 1
        }
        
    }
    const arr = Object.entries(count)
    console.log(filteredData);
    return (
        <div>
            <Header>
                <div>
                    <CatH1>Cats Paradise</CatH1>
                    <CatH2>There are {myData.length} cat breeds</CatH2>
                </div>
            </Header>
            <BoxContainer>
                {arr.map((v, i) => {
                    return (
                        <CountryBox key={i} value={v[0]} amount={v[1]} onClick={() => setFilteredData(myData.filter(data => data.origin === v[0]))}/>
                    )
                })}
                <CountryBox value={'All'} onClick={()=> setFilteredData(myData)}/> 
            </BoxContainer>
            <CardContainer>
                {filteredData.map((val, index) => {
                    return (
                        <CatCard key={index}>
                            <CatCardImg>
                                <CatImg src={val.image?.url} alt="" />
                            </CatCardImg>
                            <CatCardBody>
                                <CatName>
                                    {val.name}
                                </CatName>
                                <CatOrigin>
                                    {val.origin}
                                </CatOrigin>
                                <TextField>
                                    <Description>Temperament:</Description>
                                    <CatText>{val.temperament}</CatText>
                                </TextField>
                                <TextField>
                                    <Description>Life Span:</Description>
                                    <CatText>{`${val.life_span} years`}</CatText>
                                </TextField>
                                <TextField>
                                    <Description>Weight:</Description>
                                    <CatText>{`${val.weight.metric} Kg`}</CatText>
                                </TextField>
                                <Description>Description:</Description>
                                <CatText>{val.description}</CatText>
                            </CatCardBody>
                        </CatCard>
                    )
                }
                )}
            </CardContainer>
        </div>
    )
}


const Header = styled.div`
    background: linear-gradient(90deg, #8e54e9, #4776e6);
    text-align: center;

    margin-bottom: 24px;
`

const CatH1 = styled.h1`
`

const CatH2 = styled.p`

`

const Description = styled.p`
    font-size:24px;
    font-weight:600;
    margin-right:8px;
`
const CatText = styled.p`
    font-size:24px;
`
const TextField = styled.div`
    display:flex;
`

const CardContainer = styled.div`
    display: flex;
    justify-content: center;
    flex-direction:column;
`

const CatCard = styled.div`
    justify-content: center;
    margin: 24px 325px;
    box-shadow: 5px 5px 20px  black;
`
const CatCardImg = styled.div`
    overflow:hidden;
`

const CatImg = styled.img`
    float: left;
    width:  100%;
    height: 100%;
    background-size: cover;
    transition: transform 1s;
    &:hover {
        transform: scale(1.2, 1.2)
    }
`

const CatCardBody = styled.div`
    padding: 10px 10px;
`
const CatName = styled.h1`
    font-size: 28px;
    font-family: "Merriweather";
`
const CatOrigin = styled.p`
    font-size: 28px;
    font-weight: 800;
`

const BoxContainer = styled.div`
    display: flex;
    flex-wrap: wrap;
    margin: 24px 325px;
`

const Box = styled.div`
    border: 1px solid black;
    padding: 5px 5px;
    margin-left: 12px;
    margin-bottom: 12px;
    &:hover {
        cursor: pointer;
    }
`
