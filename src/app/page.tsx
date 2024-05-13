"use client"
// @ts-ignore: Object is possibly 'null'.
import Image from "next/image";
import styles from "./page.module.css";
import {  GetAnimesQuery, Media, useGetAnimesQuery } from "@/api/__generated__/graphql";
import { useEffect, useState } from "react";
import specialStyles from "./special.module.css"

export default function Home() {
  const [Data, setData] = useState<GetAnimesQuery | undefined | null>(undefined)
  const [Date, setDate] = useState<string>("")
  
  

  const {loading, error, data, refetch} =  useGetAnimesQuery({onCompleted:(data)=>{console.log(data?.Page?.media[0]?.startDate); setDate("2020-05-01")}, variables:{date:20200501}})


  const handleDateChange = (e:React.ChangeEvent<HTMLInputElement>) =>{
    // console.log("The Date", e.target.value )
    //format date
    const formatted = e.target.value.split("-").join("")
    // console.log("The Formatted Date",+formatted )
    refetch({date:formatted})
    

  }

  const headerKeys = ["id", "title", "genres", "average score", "Date Released" ]


  return (
    <main className={styles.main}>
      <h1>List of Animes</h1>

      <div className={styles.DateWrapper}>
      <p>Pick a release date</p>
      <input className={styles.DatePicker} aria-label="Date" type="date" value={Date} onChange={(e)=>handleDateChange(e)}  />
      </div>
{ loading? <p>Loading...</p> : 
<div className={styles.Wrapper}>
<table className={styles.Table}>
  {/* <caption>The Great Anime Table</caption> */}
  <thead>
    <tr className={styles.Table__Header__Row}>
    {headerKeys.map((header, idx)=>{
        return(
         
      <th key={idx} className={styles.Table__Header}>
        {header}
        </th>
        )
      })}
      
    

    </tr>
  </thead>
  <tbody>
    { data?.Page?.media.map((entry, index)=>{
      return(
        <tr key={index} className={styles.Table__Data__Row}>
        {<>
          <td>{entry?.id}</td>
          <td>{entry?.title?.userPreferred}</td>
          <td>{entry?.genres?.join(", ")}.</td>
          <td>{entry?.averageScore}</td>
          <td>{entry?.startDate?.year},{entry?.startDate?.month}</td>
          </>
        }
      </tr>

      )
    })

   
}
  </tbody>
</table>
</div>

}


      {/* {loading? <p>Loading...</p> : } */}
    </main>
  );
}
