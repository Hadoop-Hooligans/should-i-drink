import { useState } from 'react'
import '../Styles/BlogContainer.css'
import SearchBar from './SearchBar'
import { data } from 'autoprefixer'
import CustomModal from './Modal'

function SegmentedItem({ item, handleActiveSegmentedItem }) {
    return (
        <div className={`blog-segmented-item row al-ctr jc-ctr ${item.active ? 'active' : ''}`}
            onClick={() => handleActiveSegmentedItem(item.id)}
        >
            <p className="title-small">{item.title}</p>
        </div>
    )
}

function BlogItem({ item }) {
    return (
        <div className="grid-item col">
            <div className="blog-img-container">
                <img src={item.thumbnail} alt="" />
            </div>
            <div className="blog-article-content col gp-8">
                <div className="author-info row gp-8">
                    <p className="title-small">{item.author}</p>
                    <p className="title-small">{item.date}</p>
                </div>
                <div className="article-info col gp-8">
                    <p className="title-large">{item.title}</p>
                    <p className="body-large description">{item.description}</p>
                </div>
            </div>
        </div>
    )

}

export default function BlogContainer() {
    const [segmentedItems, setSegmentedItems] = useState([
        {
            id: 0,
            title: 'Featured',
            active: true
        },
        {
            id: 1,
            title: 'Just In',
            active: false
        },
        {
            id: 2,
            title: 'Roadmap',
            active: false
        },
        {
            id: 3,
            title: 'Guides',
            active: false
        }
    ])
    function handleActiveSegmentedItem(id) {
        let newItems = segmentedItems.map((item, index) => {
            if (index === id) {
                return { ...item, active: true }
            }
            return { ...item, active: false }
        })
        setSegmentedItems(newItems)
    }
    const [blogArticles, setBlogArticles] = useState([

        {
            title: 'How to use the website?',
            author: 'Naman R',
            date: '23 July 2003',
            description: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Fugit doloremque labore earum quod quae saepe, quibusdam aspernatur totam voluptates repellat esse atque quis provident? Suscipit iure facilis ullam corporis atque? Lorem ipsum dolor sit amet consectetur adipisicing elit. Quos ea praesentium repudiandae ullam, voluptatum nostrum molestiae molestias possimus ducimus ratione et numquam. Soluta magni dignissimos cumque magnam harum voluptatem delectus?',
            thumbnail: 'https://images.unsplash.com/photo-1707149414369-5989e250c788?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwxfDB8MXxyYW5kb218MHx8fHx8fHx8MTcxNTE2ODI5MA&ixlib=rb-4.0.3&q=80&w=1080'
        },
        {
            title: 'Introduction to React',
            author: 'John Doe',
            date: '15 September 2023',
            description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus auctor, nisi vel accumsan ultricies, justo nisi volutpat magna, vitae placerat mi enim et libero. Phasellus vehicula nisi a justo sagittis congue. Integer lacinia, dui quis vestibulum placerat, eros sapien tristique mi, nec tincidunt lorem purus at nulla. Nullam condimentum, purus eu tempus vulputate, elit ex sollicitudin libero, eget laoreet ipsum nulla eu sapien.',
            thumbnail: 'https://images.unsplash.com/photo-1707391453717-ce4103d0e8c4?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwxfDB8MXxyYW5kb218MHx8fHx8fHx8MTcxNTE2ODM5MQ&ixlib=rb-4.0.3&q=80&w=1080'
        },
        {
            title: 'JavaScript Best Practices',
            author: 'Jane Smith',
            date: '10 March 2024',
            description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam ultricies mauris vitae ex cursus, sit amet euismod elit fermentum. Quisque eget ex vel urna viverra consequat. Proin congue, eros nec bibendum dapibus, nisi est pharetra leo, sit amet pharetra risus justo nec orci. Fusce vitae dui eget felis viverra gravida. Sed consequat, libero ut posuere tempus, purus lacus tristique mauris, eu gravida mi libero eu justo. Donec volutpat commodo vehicula.',
            thumbnail: 'https://images.unsplash.com/photo-1709770554994-f11ff89b0246?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwxfDB8MXxyYW5kb218MHx8fHx8fHx8MTcxNTE2ODM5OA&ixlib=rb-4.0.3&q=80&w=1080'
        },
        {
            title: 'React Hooks',
            author: 'John Doe',
            date: '15 September 2023',
            description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus auctor, nisi vel accumsan ultricies, justo nisi volutpat magna, vitae placerat mi enim et libero. Phasellus vehicula nisi a justo sagittis congue. Integer lacinia, dui quis vestibulum placerat, eros sapien tristique mi, nec tincidunt lorem purus at nulla. Nullam condimentum, purus eu tempus vulputate, elit ex sollicitudin libero, eget laoreet ipsum nulla eu sapien.',
            thumbnail: 'https://images.unsplash.com/photo-1707391453717-ce4103d0e8c4?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwxfDB8MXxyYW5kb218MHx8fHx8fHx8MTcxNTE2ODM5MQ&ixlib=rb-4.0.3&q=80&w=1080'
        },


    ])
    return (
        <div className="body-container blog-container-main col">
            {/* <CustomModal /> */}
            <div className="blogs-wrapper col gp-24">
                <div className="blog-header row al-ctr jc-sb">
                    <div className="col">
                        <p className="vw-headline">
                            Documentation
                        </p>
                        <p className="title-medium subtext">
                            This section contains all the documents you will ever need to guide you through the website.
                        </p>
                    </div>
                    {/* <p className="vw-body">Handbook for all the important information.</p> */}
                </div>
                <div className="blog-segmented-container row gp-16 flx-wrp jc-sb">
                    <div className="blog-segmented-items row flx-wrp jc-sa">
                        {
                            segmentedItems.map(item => {
                                return <SegmentedItem item={item} key={item.id} handleActiveSegmentedItem={handleActiveSegmentedItem} />
                            })
                        }
                    </div>
                    <SearchBar placeholder="Search for an article." minWidth={'200px'} />
                </div>
                {/* <div className="divider"></div> */}
                <div className="blogs-container">
                    {
                        blogArticles.map((item, index) => {
                            return <BlogItem item={item} key={index} />
                        })
                    }
                </div>
            </div>
        </div>
    )
}
