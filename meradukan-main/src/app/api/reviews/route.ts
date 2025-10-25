
import { NextRequest, NextResponse } from 'next/server';
import { supabaseAdmin } from '@/lib/supabase';

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const status = searchParams.get('status') || 'approved';
    const page = parseInt(searchParams.get('page') || '1');
    const limit = parseInt(searchParams.get('limit') || '10');
    const skip = (page - 1) * limit;

    const { data: reviews, error, count } = await supabaseAdmin
      .from('reviews')
      .select('*, users(full_name, email)', { count: 'exact' })
      .eq('status', status)
      .order('created_at', { ascending: false })
      .range(skip, skip + limit - 1);

    if (error) throw error;

    const totalReviews = count || 0;

    return NextResponse.json({
      reviews,
      pagination: {
        currentPage: page,
        totalPages: Math.ceil(totalReviews / limit),
        totalReviews,
        hasNext: page * limit < totalReviews,
        hasPrev: page > 1
      }
    });

  } catch (error) {
    console.error('Error fetching reviews:', error);
    return NextResponse.json(
      { error: 'Failed to fetch reviews' },
      { status: 500 }
    );
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { userId, userName, userEmail, rating, title, comment, images = [] } = body;

    // Check if user already reviewed
    const { data: existingReview, error: existingError } = await supabaseAdmin
      .from('reviews')
      .select('id')
      .eq('user_id', userId)
      .single();

    if (existingError && existingError.code !== 'PGRST116') { // PGRST116: no rows found
        throw existingError;
    }

    if (existingReview) {
      return NextResponse.json(
        { error: 'You have already submitted a review' },
        { status: 400 }
      );
    }

    const { data: review, error } = await supabaseAdmin
      .from('reviews')
      .insert([{
        user_id: userId,
        user_name: userName,
        user_email: userEmail,
        rating: parseInt(rating),
        title,
        comment,
        images,
        status: 'approved' // Auto-approve for now
      }])
      .select()
      .single();

    if (error) throw error;

    return NextResponse.json({
      message: 'Review submitted successfully',
      review
    }, { status: 201 });

  } catch (error) {
    console.error('Error creating review:', error);
    return NextResponse.json(
      { error: 'Failed to submit review' },
      { status: 500 }
    );
  }
}
