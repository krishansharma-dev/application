import { createClient } from '@/lib/server';
import { NextRequest, NextResponse } from 'next/server';


export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const supabase = await createClient();
    
    // Get the authenticated user
    const { data: { user }, error: authError } = await supabase.auth.getUser();
    
    if (authError || !user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const body = await request.json();
    const applicationId = params.id;

    // Validate required fields
    if (!body.company_name || !body.job_title || !body.application_date) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    const updateData = {
      ...body,
      contact_email: body.contact_email || null,
      portal_link: body.portal_link || null,
      job_description: body.job_description || '',
      notes: body.notes || '',
      follow_up_date: body.follow_up_date || null,
    };

    // Update the application (RLS will ensure user can only update their own)
    const { data: application, error } = await supabase
      .from('applications')
      .update(updateData)
      .eq('id', applicationId)
      .eq('user_id', user.id)
      .select()
      .single();

    if (error) {
      console.error('Database error:', error);
      if (error.code === 'PGRST116') {
        return NextResponse.json({ error: 'Application not found' }, { status: 404 });
      }
      return NextResponse.json({ error: 'Database error' }, { status: 500 });
    }

    return NextResponse.json({ application });
  } catch (error) {
    console.error('Server error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const supabase = await createClient();
    
    // Get the authenticated user
    const { data: { user }, error: authError } = await supabase.auth.getUser();
    
    if (authError || !user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const applicationId = params.id;

    // Delete the application (RLS will ensure user can only delete their own)
    const { error } = await supabase
      .from('applications')
      .delete()
      .eq('id', applicationId)
      .eq('user_id', user.id);

    if (error) {
      console.error('Database error:', error);
      return NextResponse.json({ error: 'Database error' }, { status: 500 });
    }

    return NextResponse.json({ message: 'Application deleted successfully' });
  } catch (error) {
    console.error('Server error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const supabase = await createClient();
    
    // Get the authenticated user
    const { data: { user }, error: authError } = await supabase.auth.getUser();
    
    if (authError || !user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const applicationId = params.id;

    // Get the specific application
    const { data: application, error } = await supabase
      .from('applications')
      .select('*')
      .eq('id', applicationId)
      .eq('user_id', user.id)
      .single();

    if (error) {
      console.error('Database error:', error);
      if (error.code === 'PGRST116') {
        return NextResponse.json({ error: 'Application not found' }, { status: 404 });
      }
      return NextResponse.json({ error: 'Database error' }, { status: 500 });
    }

    return NextResponse.json({ application });
  } catch (error) {
    console.error('Server error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}