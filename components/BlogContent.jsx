'use client'
import React, { useRef, useState, useEffect } from 'react'

const removeHtmlTags = (html) => {
  return html.replace(/<[^>]*>/g, '')
}

const BlogContent = ({ content }) => {
  const targetRef = useRef(null)
  const [selectedIndex, setSelectedIndex] = useState(null)
  const closedH1Texts = (content?.match(/<h1>(.*?)<\/h1>/g) || []).map(
    (tag, index) => {
      const text = removeHtmlTags(tag)
      return <li key={index} className={index === selectedIndex ? ' font-bold' : ''}>{text}</li>
    }
  )

  useEffect(() => {
    const handleScroll = () => {
      if (targetRef.current) {
        const h1Elements = targetRef.current.querySelectorAll('h1')
        let currentIndex = null
        h1Elements.forEach((element, index) => {
          const rect = element.getBoundingClientRect()
          if (rect.top <= 700 && rect.bottom > 100) {
            currentIndex = index
          }
        })
        if (currentIndex !== null && currentIndex !== selectedIndex) {
          setSelectedIndex(currentIndex)
        }
      }
    }
    window.addEventListener('scroll', handleScroll)
    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  }, [selectedIndex])
  const scrollToIndex = (index) => {
    if (targetRef.current) {
      const h1Element = targetRef.current.querySelectorAll('h1')
      if (h1Element && h1Element[index]) {
        h1Element[index]?.scrollIntoView({ behavior: 'smooth', block: 'center', inline: 'nearest' })
        setSelectedIndex(index)
      }
    }
  }
  return (
        <div>
            <div className="w-full max-md:px-2 flex gap-[163px]">
                <div className="flex w-[400px]  flex-col  max-lg:hidden">
                    <div className="sticky top-[150px] ">
                        <div className="flex w-full  justify-center items-center gap-4 h-[70px]">
                            <span className="text-[24px] font-bold">Summary</span>
                            <hr className="w-full" />
                        </div>
                        <ul className="flex gap-8 flex-col text-[18px]">
                            {closedH1Texts.map((e, index) => (
                                <div
                                    key={index}
                                    onClick={() => scrollToIndex(index)}
                                    className={`flex gap-3 cursor-pointer ${index === selectedIndex ? 'font-bold' : ''}`}
                                >
                                    <span>{`${index + 1})`}</span>
                                    {e}
                                </div>
                            ))}
                        </ul>
                    </div>
                </div>
                <div className="flex flex-col flex-1 ">
                    <div
                        ref={targetRef}
                        className="h-auto gap-3 sticky w-full flex flex-col justify-center"
                        dangerouslySetInnerHTML={{
                          __html: content
                            .replace(
                              /<h1/g,
                              '<h1 id="targetH1" class="text-[30px] font-bold max-sm:text-[18px]"'
                            )
                            .replace(/<p/g, '<p class="text-[19px] leading-26  max-sm:text-[15px]"')
                        }}
                    ></div>
                </div>
            </div>
        </div>
  )
}

export default BlogContent
