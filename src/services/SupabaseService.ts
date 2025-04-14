import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://todesdfwurnlscrefoyb.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InRvZGVzZGZ3dXJubHNjcmVmb3liIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDI0NzUyMjksImV4cCI6MjA1ODA1MTIyOX0.3km15e30Q9xWTpsJGEsgMJgMfg-icYpNkcCIGfL3RiQ';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

type uploadImageProps = {
    file: File;
    entity: string; 
};

export const uploadImage = async ({ file, entity }: uploadImageProps) => {
    const fileExt = file.name.split('.').pop();
    const fileName = `${file.name.split('.')[0]}.${fileExt}`;
    const filePath = `${fileName}`; 

    const { error: uploadError } = await supabase.storage
        .from(entity)
        .upload(filePath, file);

    if (uploadError) {
        console.error('Error uploading image:', uploadError.message);
        return null;
    }

    const { data } = await supabase.storage.from(entity).getPublicUrl(filePath);
    return data?.publicUrl ?? null;
};
