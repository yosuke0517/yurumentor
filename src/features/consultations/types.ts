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
