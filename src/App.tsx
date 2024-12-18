

import { useState, useEffect } from 'react';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import axios from 'axios';

interface Artwork {
  id: number;
  title: string;
  place_of_origin: string;
  artist_display: string;
  inscriptions: string;
  date_start: number;
  date_end: number;
}

const App = () => {
  const [artworks, setArtworks] = useState<Artwork[]>([]);
  const [selectedArtworks, setSelectedArtworks] = useState<Artwork[]>([]);
  const [totalRecords, setTotalRecords] = useState<number>(0);
  const [loading, setLoading] = useState<boolean>(false);
  const [page, setPage] = useState<number>(1);

  // Fetch the data based on page
  const fetchArtworks = async (pageNumber: number) => {
    setLoading(true);
    try {
      const response = await axios.get(`https://api.artic.edu/api/v1/artworks`, {
        params: {
          page: pageNumber,
        },
      });
      setArtworks(response.data.data);
      setTotalRecords(response.data.pagination.total);
    } catch (error) {
      console.error('Error fetching artworks', error);
    } finally {
      setLoading(false);
    }
  };

  // Handle pagination change
  const handlePageChange = (event: any) => {
    setPage(event.page + 1);
    fetchArtworks(event.page + 1);
  };

  // Row selection handler
  const onSelectionChange = (e: any) => {
    setSelectedArtworks(e.value);
    // Save selected rows to localStorage
    localStorage.setItem('selectedArtworks', JSON.stringify(e.value));
  };

  useEffect(() => {
    // Load previously selected artworks from localStorage
    const storedSelection = localStorage.getItem('selectedArtworks');
    if (storedSelection) {
      setSelectedArtworks(JSON.parse(storedSelection));
    }

    fetchArtworks(page);
  }, [page]);

  return (
    <div className="App">
      <h1>Artwork List</h1>
      <DataTable
        value={artworks}
        paginator
        rows={10}
        totalRecords={totalRecords}
        lazy
        loading={loading}
        onPage={handlePageChange}
        selection={selectedArtworks}
        onSelectionChange={onSelectionChange}
        dataKey="id"
        selectionMode="multiple"  // Added selectionMode
      >
        <Column selectionMode="multiple" headerStyle={{ width: '3em' }} />
        <Column field="title" header="Title" />
        <Column field="place_of_origin" header="Place of Origin" />
        <Column field="artist_display" header="Artist" />
        <Column field="inscriptions" header="Inscriptions" />
        <Column field="date_start" header="Start Date" />
        <Column field="date_end" header="End Date" />
      </DataTable>
    </div>
  );
};

export default App;
