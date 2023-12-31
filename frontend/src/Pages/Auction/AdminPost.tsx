import React, { useState, useEffect } from 'react';
import './Auction.css';
import axios from 'axios';
import { Link } from 'react-router-dom';

interface AuctionItem {
  post_id: number;
  name: string;
  amount: string;
  price: string;
  total_bidding_placed: number;
  start_time: string;
  end_time: string;
  current_time: string;
  items: { type: string; description: string }[];
}

const AdminPost: React.FC = () => {
  const [auctionProducts, setAuctionProducts] = useState<AuctionItem[]>([]);
  const [resizedImages, setResizedImages] = useState<string[]>([]);

  const fetchData = async () => {
    try {
      const response = await axios.get('http://127.0.0.1:8000/register_add_auction_products/');
      setAuctionProducts(response.data);

      const imageResponses = await Promise.all(
        response.data.map(async (product: AuctionItem) => {
          const imageResponse = await axios.post(
            'http://127.0.0.1:8000/login_auction_images/',
            {
              post_id: product.post_id,
            },
            {
              responseType: 'arraybuffer',
            }
          );

          const base64 = btoa(
            new Uint8Array(imageResponse.data).reduce(
              (data, byte) => data + String.fromCharCode(byte),
              ''
            )
          );

          return `data:${imageResponse.headers['content-type']};base64,${base64}`;
        })
      );
      setResizedImages(imageResponses);
    } catch (error) {
      console.error('Error fetching auction products:', error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handlePlaceBidding = async (post_id: number) => {
    try {
      // Check if remainingHours > 0
      const remainingTime =
        new Date(auctionProducts.find((p) => p.post_id === post_id)?.end_time || '').getTime() -
        new Date().getTime();
      const remainingHours = Math.floor(remainingTime / (1000 * 60 * 60));

      if (remainingHours > 0) {
        // Navigate to details page
        window.location.href = `/adminDetails/${post_id}`;
      } else {
        // Call function to post post_id to the specified URLs
        await postToUrls(post_id);
        fetchData(); // Fetch data again after posting
      }
    } catch (error) {
      console.error('Error handling bidding:', error);
    }
  };

  const postToUrls = async (post_id: number) => {
    try {
      // Post to http://127.0.0.1:8000/delete_auction_products/
      await axios.post('http://127.0.0.1:8000/delete_auction_products/', { post_id });

      // Post to http://127.0.0.1:8000/delete_latest_bidding/

    } catch (error) {
      console.error('Error posting to URLs:', error);
    }
  };

  return (
    <div className="amazon-container" style={{ maxHeight: '90vh', overflowY: 'auto' }}>
      <div className="amazon-products">
        {auctionProducts.map((product, index) => {
          const remainingTime =
            new Date(product.end_time).getTime() - new Date().getTime();
          const remainingHours = Math.floor(remainingTime / (1000 * 60 * 60));

          return (
            <div key={product.post_id} className="product-card">
              {resizedImages[index] && (
                <img
                  src={resizedImages[index]}
                  alt={product.name}
                  style={{ width: '200px', height: '150px' }}
                />
              )}
              <h3>{product.name}</h3>
              <h6>Amount: {product.amount} kg</h6>
              <h6>Price: {product.price} Taka only</h6>
              <h6>Total Bidding Placed: {product.total_bidding_placed}</h6>
              <h6>
                {remainingHours > 0
                  ? `${remainingHours} hours remaining`
                  : 'Auction has ended'}
              </h6>
              <div>
                <button
                  type="button"
                  className="btnn"
                  onClick={() => handlePlaceBidding(product.post_id)}
                >
                  Preview Bidding Post
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default AdminPost;
