import axios from 'axios';

export async function fetchStartDate(): Promise<string> {
  try {
    const response = await axios.get<string>('http://localhost:3001/');
    return response.data;
  } catch (error) {
    console.error('Error fetching start date:', error);
    throw error;
  }
}
