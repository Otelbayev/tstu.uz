// import React, { useEffect, useMemo, useState } from "react";
// import { Container } from "./style";
// import TopNews from "../../components/News/TopNews";
// import { Title } from "../../components/Generics";
// import VideoCart from "../../components/News/VideoCart";
// import axios from "axios";
// import { useParams } from "react-router-dom";
// import { getDate } from "../../utils/month";
// import { useTranslation } from "react-i18next";
// import { useBlog } from "../../hooks/useBog";
// import { Helmet } from "react-helmet";
// import { useBlogContext } from "../../context/BlogContext";

// const BlogID = () => {
//   const { id } = useParams();
//   const { data: news } = useBlog("Yangiliklar", true);
//   const { t, i18n } = useTranslation();
//   const { d1, d2, d3, ktdata, thdata, tdata } = useBlogContext();

//   const d1Filtered = useMemo(
//     () =>
//       d1?.list?.filter((e) => {
//         if (i18n.language === "uz") {
//           return e.id == id;
//         } else {
//           return e.blog_id == id;
//         }
//       }),
//     [d1, id]
//   );
//   const d2Filtered = useMemo(
//     () =>
//       d2?.list?.filter((e) => {
//         if (i18n.language === "uz") {
//           return e.id == id;
//         } else {
//           return e.blog_id == id;
//         }
//       }),
//     [d2, id]
//   );
//   const d3Filtered = useMemo(
//     () =>
//       d3?.list?.filter((e) => {
//         if (i18n.language === "uz") {
//           return e.id == id;
//         } else {
//           return e.blog_id == id;
//         }
//       }),
//     [d3, id]
//   );
//   const kdataFiltered = useMemo(
//     () =>
//       ktdata?.list?.filter((e) => {
//         if (i18n.language === "uz") {
//           return e.id == id;
//         } else {
//           return e.blog_id == id;
//         }
//       }),
//     [ktdata, id]
//   );
//   const thdataFiltered = useMemo(
//     () =>
//       thdata?.list?.filter((e) => {
//         if (i18n.language === "uz") {
//           return e.id == id;
//         } else {
//           return e.blog_id == id;
//         }
//       }),
//     [thdata, id]
//   );
//   const tdataFiltered = useMemo(
//     () =>
//       tdata?.list?.filter((e) => {
//         if (i18n.language === "uz") {
//           return e.id == id;
//         } else {
//           return e.blog_id == id;
//         }
//       }),
//     [tdata, id]
//   );

//   useEffect(() => {
//     window.scrollTo(0, 0);
//   }, [id]);

//   const [data, setData] = useState({});

//   const fetchData = async () => {
//     if (
//       d1Filtered?.length > 0 ||
//       d2Filtered?.length > 0 ||
//       d3Filtered?.length > 0 ||
//       kdataFiltered?.length > 0 ||
//       thdataFiltered?.length > 0 ||
//       tdataFiltered?.length > 0
//     ) {
//       setData(
//         d1Filtered[0] ||
//           d2Filtered[0] ||
//           d3Filtered[0] ||
//           kdataFiltered[0] ||
//           thdataFiltered[0] ||
//           tdataFiltered[0]
//       );
// 
//     } else {
//       try {
//         const res = await axios.get(
//           i18n.language === "uz"
//             ? `${
//                 import.meta.env.VITE_BASE_URL_API
//               }/blogcontroller/sitegetbyidblog/${id}`
//             : `${
//                 import.meta.env.VITE_BASE_URL_API
//               }/blogcontroller/sitegetbyuzidblogtranslation/${id}?language_code=${
//                 i18n.language
//               }`
//         );
//         if (res.status === 200) {
//           setData(res.data);
//         } else {
//           setData({});
//         }
//       } catch (error) {
//         setLoading(false);
//         console.error("Failed to fetch blog data:", error);
//         setData({});
//       }
//     }
//   };

//   useEffect(() => {
//     fetchData();
//   }, [id]);

//   return (
//     <div>
//       <Helmet>
//         <title>{data?.title}</title>
//         <meta name="description" content={data?.title} />
//       </Helmet>

//       <div className="root-container">
//         <div className="root-wrapper">
//           <Container>
//             <div className="title">{data?.title}</div>
//             <div className="news-date">
//               <span>
//                 {getDate(data?.event_date?.split("T")[0])} -{" "}
//                 {getDate(data?.event_end_date?.split("T")[0])}
//               </span>
//               <span>
//                 {data?.blog_category_?.title ||
//                   data?.blog_category_translation_?.title}
//               </span>
//             </div>
//             <div className="content">
//               <div className="content__left">
//                 <img
//                   loading="lazy"
//                   src={`${import.meta.env.VITE_BASE_URL_IMG}${
//                     data?.img_?.url || data?.img_translation_?.url
//                   }`}
//                   style={{ width: "100%" }}
//                   alt=""
//                 />
//                 <div
//                   dangerouslySetInnerHTML={{ __html: data?.text }}
//                   data-aos="fade-up"
//                   className="my-5"
//                 />
//               </div>
//               <div className="content__right">
//                 <TopNews data={news?.list} dataAos="fade-left" />
//               </div>
//             </div>
//             <Title title={t("news.t")} button={t("news.btn")} to={`blog`}>
//               <div className="newsid-bottom">
//                 {news?.list
//                   ?.filter((e) => e.id != id)
//                   ?.slice(0, 2)
//                   .map((e) => (
//                     <VideoCart
//                       dataAos={"zoom-in"}
//                       key={e.id}
//                       prop={e}
//                       to={`blog/${i18n.language === "uz" ? e?.id : e?.blog_id}`}
//                     />
//                   ))}
//               </div>
//             </Title>
//           </Container>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default BlogID;

import React, { useEffect, useState } from "react";
import { Container } from "./style";
import TopNews from "../../components/News/TopNews";
import { Title } from "../../components/Generics";
import VideoCart from "../../components/News/VideoCart";
import axios from "axios";
import { useParams } from "react-router-dom";
import { getDate } from "../../utils/month";
import { useTranslation } from "react-i18next";
import { useBlog } from "../../hooks/useBog";
import { Helmet } from "react-helmet";

const BlogID = () => {
  const { id } = useParams();
  const { data: news } = useBlog("Yangiliklar", true);
  const { t, i18n } = useTranslation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [id]);

  const [data, setData] = useState({});

  const fetchData = async () => {
    try {
      const res = await axios.get(
        i18n.language === "uz"
          ? `${
              import.meta.env.VITE_BASE_URL_API
            }/blogcontroller/sitegetbyidblog/${id}`
          : `${
              import.meta.env.VITE_BASE_URL_API
            }/blogcontroller/sitegetbyuzidblogtranslation/${id}?language_code=${
              i18n.language
            }`
      );
      if (res.status === 200) {
        setData(res.data);
      } else {
        setData({});
      }
    } catch (error) {
      setLoading(false);
      console.error("Failed to fetch blog data:", error);
      setData({});
    }
  };

  useEffect(() => {
    fetchData();
  }, [id, i18n.language]);

  return (
    <div>
      <Helmet>
        <title>{data?.title}</title>
        <meta name="description" content={data?.title} />
      </Helmet>

      <div className="root-container">
        <div className="root-wrapper">
          <Container>
            <div className="title">{data?.title}</div>
            <div className="news-date">
              <span>
                {getDate(data?.event_date?.split("T")[0])} -{" "}
                {getDate(data?.event_end_date?.split("T")[0])}
              </span>
              <span>
                {data?.blog_category_?.title ||
                  data?.blog_category_translation_?.title}
              </span>
            </div>
            <div className="content">
              <div className="content__left">
                <img
                  loading="lazy"
                  src={`${import.meta.env.VITE_BASE_URL_IMG}${
                    data?.img_?.url || data?.img_translation_?.url
                  }`}
                  style={{ width: "100%" }}
                  alt=""
                />
                <div
                  dangerouslySetInnerHTML={{ __html: data?.text }}
                  data-aos="fade-up"
                  className="my-5"
                />
              </div>
              <div className="content__right">
                <TopNews data={news?.list} dataAos="fade-left" />
              </div>
            </div>
            <Title title={t("news.t")} button={t("news.btn")} to={`blog`}>
              <div className="newsid-bottom">
                {news?.list
                  ?.filter((e) => e.id != id)
                  ?.slice(0, 2)
                  .map((e) => (
                    <VideoCart
                      dataAos={"zoom-in"}
                      key={e.id}
                      prop={e}
                      to={`blog/${i18n.language === "uz" ? e?.id : e?.blog_id}`}
                    />
                  ))}
              </div>
            </Title>
          </Container>
        </div>
      </div>
    </div>
  );
};

export default BlogID;
