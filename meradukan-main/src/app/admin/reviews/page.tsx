'use client'
import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Star, ThumbsUp, ThumbsDown } from 'lucide-react'

export default function ReviewsPage() {
  const [reviews, setReviews] = useState([])
  const [searchTerm, setSearchTerm] = useState('')
  const [replyText, setReplyText] = useState({})
  const [showReplyBox, setShowReplyBox] = useState({})

  const mockReviews = [
    {
      id: '1',
      productName: 'Wireless Bluetooth Earbuds',
      customerName: 'John Doe',
      customerEmail: 'john@example.com',
      rating: 5,
      comment: 'Excellent sound quality and battery life. Highly recommended!',
      date: '2024-01-15',
      status: 'approved',
      likes: 12,
      replies: [
        { id: 'r1', text: 'Thank you for your feedback!', date: '2024-01-16', author: 'Admin' }
      ]
    },
    {
      id: '2',
      productName: 'Smart Fitness Tracker',
      customerName: 'Jane Smith',
      customerEmail: 'jane@example.com',
      rating: 4,
      comment: 'Good product but could have better app integration.',
      date: '2024-01-14',
      status: 'pending',
      likes: 5,
      replies: []
    },
    {
      id: '3',
      productName: 'Kitchen Mixer',
      customerName: 'Mike Johnson',
      customerEmail: 'mike@example.com',
      rating: 3,
      comment: 'Average product, works fine but nothing special.',
      date: '2024-01-13',
      status: 'approved',
      likes: 2,
      replies: []
    }
  ]

  useEffect(() => {
    setReviews(mockReviews)
  }, [])

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        className={`h-4 w-4 ${i < rating ? 'text-yellow-400 fill-current' : 'text-gray-300'}`}
      />
    ))
  }

  const deleteReview = (reviewId: string) => {
    if (confirm('Are you sure you want to delete this review?')) {
      setReviews(reviews.filter(r => r.id !== reviewId))
    }
  }

  const likeReview = (reviewId: string) => {
    setReviews(reviews.map(r => 
      r.id === reviewId ? { ...r, likes: r.likes + 1 } : r
    ))
  }

  const addReply = (reviewId: string) => {
    const reply = replyText[reviewId]
    if (!reply?.trim()) return
    
    setReviews(reviews.map(r => 
      r.id === reviewId ? {
        ...r,
        replies: [...r.replies, {
          id: Date.now().toString(),
          text: reply,
          date: new Date().toISOString().split('T')[0],
          author: 'Admin'
        }]
      } : r
    ))
    
    setReplyText({ ...replyText, [reviewId]: '' })
    setShowReplyBox({ ...showReplyBox, [reviewId]: false })
  }

  const filteredReviews = reviews.filter(review =>
    review.productName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    review.customerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    review.comment.toLowerCase().includes(searchTerm.toLowerCase())
  )

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-6">Reviews & Ratings</h1>

      <div className="bg-white rounded-lg shadow">
        <div className="p-6 border-b">
          <Input
            placeholder="Search reviews..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="max-w-md"
          />
        </div>

        <div className="p-4 border-b bg-gray-50">
          <div className="text-sm text-gray-600">
            Total Reviews: {filteredReviews.length} | 
            Approved: {filteredReviews.filter(r => r.status === 'approved').length} | 
            Pending: {filteredReviews.filter(r => r.status === 'pending').length}
          </div>
        </div>
        
        <div className="divide-y divide-gray-200">
          {filteredReviews.map((review: any) => (
            <div key={review.id} className="p-6">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h3 className="font-medium">{review.productName}</h3>
                  <p className="text-sm text-gray-500">by {review.customerName} ({review.customerEmail})</p>
                </div>
                <div className="flex items-center gap-2">
                  <div className="flex">{renderStars(review.rating)}</div>
                  <Button 
                    size="sm" 
                    variant="destructive"
                    onClick={() => deleteReview(review.id)}
                  >
                    Delete
                  </Button>
                </div>
              </div>
              
              <p className="text-gray-700 mb-4">{review.comment}</p>
              
              {/* Replies Section */}
              {review.replies.length > 0 && (
                <div className="bg-gray-50 p-3 rounded mb-4">
                  <h4 className="font-medium text-sm mb-2">Replies:</h4>
                  {review.replies.map((reply: any) => (
                    <div key={reply.id} className="mb-2 p-2 bg-white rounded">
                      <p className="text-sm">{reply.text}</p>
                      <p className="text-xs text-gray-500 mt-1">{reply.author} - {reply.date}</p>
                    </div>
                  ))}
                </div>
              )}
              
              <div className="flex justify-between items-center">
                <div className="flex items-center gap-4">
                  <span className="text-sm text-gray-500">{review.date}</span>
                  <button 
                    onClick={() => likeReview(review.id)}
                    className="flex items-center gap-1 text-sm text-blue-600 hover:text-blue-800"
                  >
                    <ThumbsUp className="h-3 w-3" />
                    {review.likes} likes
                  </button>
                  <button 
                    onClick={() => setShowReplyBox({ ...showReplyBox, [review.id]: !showReplyBox[review.id] })}
                    className="text-sm text-green-600 hover:text-green-800"
                  >
                    Reply
                  </button>
                </div>
                
                <div className="flex gap-2 items-center">
                  <span className={`px-2 py-1 text-xs rounded-full ${
                    review.status === 'approved' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
                  }`}>
                    {review.status}
                  </span>
                  {review.status === 'pending' && (
                    <>
                      <Button 
                        size="sm" 
                        variant="outline"
                        onClick={() => {
                          setReviews(reviews.map(r => 
                            r.id === review.id ? { ...r, status: 'approved' } : r
                          ))
                        }}
                      >
                        <ThumbsUp className="h-3 w-3" />
                      </Button>
                      <Button 
                        size="sm" 
                        variant="destructive"
                        onClick={() => {
                          setReviews(reviews.map(r => 
                            r.id === review.id ? { ...r, status: 'rejected' } : r
                          ))
                        }}
                      >
                        <ThumbsDown className="h-3 w-3" />
                      </Button>
                    </>
                  )}
                </div>
              </div>
              
              {/* Reply Box */}
              {showReplyBox[review.id] && (
                <div className="mt-4 p-3 bg-gray-50 rounded">
                  <textarea
                    placeholder="Write your reply..."
                    value={replyText[review.id] || ''}
                    onChange={(e) => setReplyText({ ...replyText, [review.id]: e.target.value })}
                    className="w-full p-2 border rounded text-sm"
                    rows={3}
                  />
                  <div className="flex gap-2 mt-2">
                    <Button size="sm" onClick={() => addReply(review.id)}>
                      Send Reply
                    </Button>
                    <Button 
                      size="sm" 
                      variant="outline" 
                      onClick={() => setShowReplyBox({ ...showReplyBox, [review.id]: false })}
                    >
                      Cancel
                    </Button>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}