import React, { useState, useRef } from 'react';
import { Modal, Button, TextField, Box, List } from '@mui/material';
import { DndProvider, useDrag, useDrop } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';

const ItemType = 'MENU_ITEM';

interface MenuItem {
    id: string;
    name: string;
    url: string;
}

const NavBar: React.FC = () => {
    const [menuItems, setMenuItems] = useState<MenuItem[]>([
        { id: '1', name: 'Home', url: '/' },
        { id: '2', name: 'New Properties', url: '/new-properties' },
        { id: '3', name: 'About us', url: '/about' },
        { id: '4', name: 'Contact us', url: '/contact' },
    ]);

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [newItem, setNewItem] = useState<MenuItem>({ id: '', name: '', url: '' });

    const handleAddItem = () => {
        if (newItem.name && newItem.url) {
            setMenuItems([...menuItems, { ...newItem, id: `${Date.now()}` }]);
            setNewItem({ id: '', name: '', url: '' });
            setIsModalOpen(false);
        }
    };

    const moveListItem = (dragIndex: number, hoverIndex: number) => {
        const reorderedItems = [...menuItems];
        const [removed] = reorderedItems.splice(dragIndex, 1);
        reorderedItems.splice(hoverIndex, 0, removed);
        setMenuItems(reorderedItems);
    };

    return (
        <DndProvider backend={HTML5Backend}>
            <div>
                <List sx={{ display: 'flex', alignItems: 'center', padding: 1, borderBottom: '1px solid #ddd', }}>
                    {menuItems.map((item, index) => (
                        <DraggableListItem
                            key={item.id}
                            index={index}
                            text={item.name}
                            moveListItem={moveListItem}
                        />
                    ))}
                    <Button
                        variant='outlined'
                        onClick={() => setIsModalOpen(true)}
                        sx={{
                            marginLeft: 'auto',
                            color: '#d32f2f',
                            mr: 4,
                        }}
                    >
                        Add+
                    </Button>
                </List>

                <Modal open={isModalOpen} onClose={() => setIsModalOpen(false)}>
                    <Box
                        sx={{
                            position: 'absolute',
                            top: '50%',
                            left: '50%',
                            transform: 'translate(-50%, -50%)',
                            width: 400,
                            bgcolor: 'background.paper',
                            boxShadow: 24,
                            p: 4,
                        }}
                    >
                        <TextField
                            label="Menu Name"
                            fullWidth
                            margin="normal"
                            value={newItem.name}
                            onChange={(e) => setNewItem({ ...newItem, name: e.target.value })}
                        />
                        <TextField
                            label="URL"
                            fullWidth
                            margin="normal"
                            value={newItem.url}
                            onChange={(e) => setNewItem({ ...newItem, url: e.target.value })}
                        />
                        <Button
                            variant="contained"
                            color="primary"
                            onClick={handleAddItem}
                            sx={{ marginTop: 2 }}
                        >
                            Save
                        </Button>
                    </Box>
                </Modal>
            </div>
        </DndProvider>
    );
};

// Draggable List Item Component
const DraggableListItem: React.FC<{ text: string; index: number; moveListItem: (dragIndex: number, hoverIndex: number) => void; }> = ({ text, index, moveListItem }) => {
    const ref = useRef<HTMLDivElement | null>(null);

    const [, drop] = useDrop({
        accept: ItemType,
        hover(item: { index: number }, monitor) {
            if (!ref.current) {
                return;
            }
            const dragIndex = item.index;
            const hoverIndex = index;

            if (dragIndex === hoverIndex) {
                return;
            }

            const hoverBoundingRect = ref.current.getBoundingClientRect();
            const hoverMiddleY = (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;
            const clientOffset = monitor.getClientOffset();
            const hoverClientY = clientOffset!.y - hoverBoundingRect.top;

            if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
                return;
            }

            if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
                return;
            }

            moveListItem(dragIndex, hoverIndex);
            item.index = hoverIndex;
        },
    });

    const [{ isDragging }, drag] = useDrag({
        type: ItemType,
        item: { index },
        collect: (monitor) => ({
            isDragging: monitor.isDragging(),
        }),
    });

    drag(drop(ref));

    return (
        <div ref={ref} style={{ opacity: isDragging ? 0 : 1, padding: '8px', border: '1px solid #ddd', borderRadius: '4px', margin: '0 4px', backgroundColor: '#f0f0f0' }}>
            {text}
        </div>
    );
};

export default NavBar;