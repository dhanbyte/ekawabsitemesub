import { supabase, supabaseAdmin, TABLES } from './supabase';

// Generic CRUD Operations

export const createRecord = async (table, data) => {
  const { data: record, error } = await supabase
    .from(table)
    .insert([data])
    .select()
    .single();
  
  if (error) throw error;
  return record;
};

export const updateRecord = async (table, id, updates) => {
  const { data: record, error } = await supabase
    .from(table)
    .update(updates)
    .eq('id', id)
    .select()
    .single();
    
  if (error) throw error;
  return record;
};

export const deleteRecord = async (table, id) => {
  const { error } = await supabase
    .from(table)
    .delete()
    .eq('id', id);
    
  if (error) throw error;
  return true;
};

export const getRecordById = async (table, id) => {
  const { data: record, error } = await supabase
    .from(table)
    .select('*')
    .eq('id', id)
    .single();
    
  if (error && error.code !== 'PGRST116') throw error; // PGRST116 = no rows returned
  return record;
};

export const getAllRecords = async (table, filters = {}) => {
  let query = supabase.from(table).select('*');
  
  // Apply filters
  Object.entries(filters).forEach(([key, value]) => {
    if (value !== undefined) {
      query = query.eq(key, value);
    }
  });
  
  const { data: records, error } = await query;
  
  if (error) throw error;
  return records || [];
};

// Admin specific operations (uses service role)
export const adminGetAllRecords = async (table) => {
  const { data: records, error } = await supabaseAdmin
    .from(table)
    .select('*');
    
  if (error) throw error;
  return records || [];
};

// File upload to Supabase Storage
export const uploadFile = async (bucket, path, file) => {
  const { data, error } = await supabase.storage
    .from(bucket)
    .upload(path, file, {
      cacheControl: '3600',
      upsert: false
    });

  if (error) throw error;
  return data;
};

// Get public URL for a file
export const getFileUrl = (bucket, path) => {
  const { data } = supabase.storage
    .from(bucket)
    .getPublicUrl(path);
    
  return data.publicUrl;
};
