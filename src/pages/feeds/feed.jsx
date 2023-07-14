import { useDispatch, useSelector } from 'react-redux';
import style from './feed.module.css';
import { useEffect } from 'react';
import { wsFeedConnect, wsFeedDisconnect } from './services/actions/feedActions';
import { wssFeedsURL } from '../../utils/constants';
import OrderInfoRectangle from '../../components/order-info-rectangle/order-info-rectangle';
import OrderNumbersInfo from '../../components/order-numbers-info/order-numbers-info';

export default function Feed() {

  const dispatch = useDispatch();

  const feeds = useSelector(state => state.feed.feeds);

  const getOrderInfo = data => {
    return data.map(item => {
      return <OrderInfoRectangle data={item} key={item._id} />
    })
  }

  const getOrdersNum = data => <OrderNumbersInfo data={data}/>

  useEffect(() => {
    dispatch(wsFeedConnect(wssFeedsURL))
    return () => {
      dispatch(wsFeedDisconnect())
    }
  }, [dispatch])

  return (
    <section className={style.main}>
      <h2 className={`${style.title} text text_type_main-medium mt-10`}>Лента заказов</h2>
      <article className={style.orders}><ul className={style.list}>{getOrderInfo(feeds)}</ul></article>
      <article className={style.info}>{getOrdersNum(feeds)}</article>
    </section>
  )
}