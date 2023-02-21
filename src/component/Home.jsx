

import React, { useEffect, useState } from 'react'
import Table from 'react-bootstrap/Table';
import axios from "axios"
import Spinner from 'react-bootstrap/Spinner';
import Pagination from 'react-bootstrap/Pagination';

const Home = () => {
    const [data,setData] =useState([]);

    const [pageData,setPageData]=useState([]);
    const [page,setPage]=useState(1);
    const [pageCount,setPageCount]=useState(0);
   
    const getdata = async()=>{
        const responce = await axios.get("https://dummyjson.com/products");
        
        setData(responce.data.products)
    }
    //handlenext
    const handlenext= ()=>{
        if (page === pageCount)
        return page;
        setPage(page + 1)
    }
    const handleprev = ()=>{
         if (page === 1)
         return page;
         setPage(page - 1)
    }

    useEffect(()=>{
        getdata()
    },[page])

    //it is for how many data i want to show in one page 

    useEffect(()=>{
        const pagedatacount = Math.ceil(data.length/5);
        setPageCount(pagedatacount);

        

//when in slice we put "0,skip" then when we click the next arrow button then next 5 content it going to show

// when page is same as 1 then the starting index is 0 and end index is skip..
        if(page){
            const LIMIT = 5; //in one page what is the amount of data we want to show
            const skip = LIMIT * page // 5 *1 = 5
            const dataskip = data.slice(page === 1 ? 0 : skip - LIMIT,skip);
            setPageData(dataskip);

        }
    },[data])
  return (
    <>
      <div className="container">
        <h1>User Data</h1>

        <div className="table_div" mt-3>
        <Table striped bordered hover>
      <thead>
        <tr>
          <th>Id</th>
          <th>Price</th>
          <th>Title</th>
          <th>Body</th>
        </tr>
      </thead>
      <tbody>
        {
            pageData.length > 0 ?
            pageData.map((element,index)=>{
                return(
                    <>
                     <tr>
                        <td>{element.id}</td>
                        <td>{element.price}</td>
                        <td>{element.title}</td>
                        <td> <img src={element.thumbnail} style={{width:68,height:60}} alt="" /> </td>
                    </tr>
                    </>
                )
            }):<div className='d-flex justify-content-center mt-4'>
                Loading.... <Spinner animation="border" variant='danger'/>;
                </div>
        }
       
            </tbody>
            </Table>
        </div>
        <div className="d-flex justify-content-end">
        <Pagination>
           
            <Pagination.Prev onClick={handleprev} disabled = {page === 1} />
            {
                Array(pageCount).fill(null).map((ele,index)=>{
                    return (
                        <>
                       <Pagination.Item active={page === index + 1 ? true : false} onClick={() => setPage(index + 1)}>{index + 1}</Pagination.Item>
                        </>
                    )
                })
            }
                   
                    
            <Pagination.Next onClick={handlenext} disabled={page === pageCount} />
           
        </Pagination>
        </div>
      </div>
    </>
  )
}

export default Home
