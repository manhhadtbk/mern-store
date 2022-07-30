import axios from 'axios';
import React, { useState } from 'react'
import { useReducer } from 'react';
import { useEffect } from 'react';
import { Link } from 'react-router-dom';

// const slides = []
// const reducer = (state, action) => {
//   switch(action.type){

//   }
// }

const SlideShow = () => {
  // const [{slides }, dispatch] = useReducer(reducer, {
  //   slides: []
  // })

  const [slides, setSlides] = useState([])
  const [current, setCurrent] = useState(0)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data } = await axios.get(
          `api/products/search?category=all&query=all&price=all&rating=all&order=newest&page=1`
        )

        setSlides(
          [
            {
              image: data.products[0].image,
              slug: data.products[0].slug
            },
            {
              image: data.products[1].image,
              slug: data.products[1].slug
            },
            {
              image: data.products[2].image,
              slug: data.products[2].slug
            },
          ]
        )


      } catch (error) {
        console.log(error);
      }
    }
    fetchData()

  }, [])

  const length = slides.length;

  const nextSlide = () => {
    setCurrent(current === length - 1 ? 0 : current + 1);
  };

  const prevSlide = () => {
    setCurrent(current === 0 ? length - 1 : current - 1);
  };


  if (!Array.isArray(slides) || slides.length <= 0) {
    return null;
  }




  // const slides = [
  //   {
  //     image: data.products[0].image,
  //   },
  //   {
  //     image: data.products[1].image,
  //   },
  //   {
  //     image: data.products[2].image,
  //   },
  // ];




  return (
    <div>
      <section
        style={{
          display: 'flex',
          position: 'relative',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <div onClick={prevSlide} >
          <span>
            <i
              className='fa fa-angle-left'
              style={{
                color: '#928f77',
                fontSize: '6vw',
              }}
            />
          </span>
        </div>


        {slides.map((slide, index) => {
          return (
            <div
              className={index === current ? 'slide active' : 'slide'}
              key={index}
            >
              {index === current && (
                <Link
                  to={`product/${slide.slug}`}
                >
                  <img src={slide.image} alt='imamge'
                    style={{

                      width: '40vw',
                      maxHeight: '35vh',
                      objectFit: 'contain',
                    }}
                  />
                </Link>
              )}
            </div>
          );
        })}

        <div onClick={nextSlide} >
          <span>
            <i
              className='fa fa-angle-right'
              style={{
                color: '#928f77',
                fontSize: '6vw',
              }}
            />
          </span>
        </div>
      </section>
    </div>
  )
}

export default SlideShow