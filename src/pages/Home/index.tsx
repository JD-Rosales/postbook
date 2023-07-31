import styles from './home.module.css';
import PostDialog from '@components/PostDialog';

const Index = () => {
  return (
    <>
      <div className='max-w-xl mx-auto'>
        <PostDialog>
          <div className='fixed right-20 bottom-20'>
            <button className={styles['icon-btn'] + ' ' + styles['add-btn']}>
              <div className={styles['add-icon']}></div>
              <div className={styles['btn-txt']}>Create Post</div>
            </button>
          </div>
        </PostDialog>
      </div>
    </>
  );
};

export default Index;
