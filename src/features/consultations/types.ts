export type Creator = {
  id: string;
  display_name: string;
  birthdate: string;
  gender: string;
  profile_image_url: string | null;
};

export type Consultation = {
  id: string;
  title: string;
  description: string;
  consultation_date: string;
  created_at: string;
  creator: Creator;
};

export type ConsultationDetail = {
  id: string; // UUID of the consultation
  creator_id: string; // UUID of the creator
  title: string; // Title of the consultation
  description: string; // Description of the consultation
  created_at: string; // Timestamp of creation
  updated_at: string; // Timestamp of last update
  consultation_date: string; // Date of the consultation
  is_deleted: boolean; // Soft delete flag
  creator: {
    id: string; // UUID of the creator
    gender: 'male' | 'female' | 'other'; // Gender of the creator
    birthdate: string; // Birthdate of the creator
    display_name: string; // Display name of the creator
    profile_image_url: string | null; // URL of the creator's profile image
  };
};

export type Match = {
  id: string;
  request_id: string;
  participant_id: string;
  status: 'pending' | 'approved' | 'rejected' | 'done' | 'invited';
  created_at: string;
  updated_at: string;
  is_deleted: boolean;
  deleted_at?: string | null;
};
