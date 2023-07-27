import styles from './home.module.css';
import CreatePostDialog from '@components/CreatePostDialog';

const Index = () => {
  return (
    <>
      <div className='max-w-xl mx-auto'>
        <CreatePostDialog>
          <div className='fixed right-20 bottom-20'>
            <button className={styles['icon-btn'] + ' ' + styles['add-btn']}>
              <div className={styles['add-icon']}></div>
              <div className={styles['btn-txt']}>Create Post</div>
            </button>
          </div>
        </CreatePostDialog>
      </div>
    </>
  );
};

export default Index;
